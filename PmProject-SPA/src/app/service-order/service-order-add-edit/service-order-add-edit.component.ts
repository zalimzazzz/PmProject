import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { ServiceOrderService } from 'src/app/_services/service-order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateServiceOrderQuestion } from 'src/app/_models/template-service-order-question';
import { ServiceOrder } from 'src/app/_models/service-order';
import { ServiceOrderQAndA } from 'src/app/_models/service-order-q-and-a';
import { ServiceOrderImage } from 'src/app/_models/service-order-image';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-service-order-add-edit',
  templateUrl: './service-order-add-edit.component.html',
  styleUrls: ['./service-order-add-edit.component.css']
})
export class ServiceOrderAddEditComponent implements OnInit {

  @ViewChild('sPad', { static: true }) signaturePadElement;
  signaturePad: any;
  id: string
  mode = 'New';
  questionList = new Array<TemplateServiceOrderQuestion>();
  serviceOrder = new ServiceOrder();
  images = new Array<FormData>();
  isNew: boolean;
  projecid: string;
  technician: any;
  userId: string;
  constructor(private serviceOrderService: ServiceOrderService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService) {
    this.serviceOrder.serviceOrderQAndA = new Array<ServiceOrderQAndA>();
    this.serviceOrder.serviceOrderImage = new Array<ServiceOrderImage>();

  }

  ngOnInit(): void {
    this.userId = this.authService.getUser().id;
    this.route.params.subscribe(params => {
      this.id = params['id'] === undefined ? '' : params['id'];
      this.isNew = params['mode'] === 'add';
      this.projecid = params['projecid'];
      this.spinner.show();
      this.serviceOrderService.getQuestion(this.projecid).then((res: Array<TemplateServiceOrderQuestion>) => {
        // console.log(res);
        this.questionList = res;
        //console.log(this.serviceOrder.serviceOrderQAndA);
        return this.serviceOrderService.getById(this.id)
      }).then((res: ServiceOrder) => {
        //console.log('ServiceOrder', res);
        if (res !== null && !this.isNew) {
          this.mode = 'Edit';
          this.serviceOrder = res;
          //console.log(this.signaturePad);
          // this.signaturePad.fromDataURL(this.serviceOrder.customerSignature);
        }
        else {
          this.createAnswer();
        }
        return this.userService.getTechnician(this.userId);
      }).then((res: Array<User>) => {
        //console.log('getTechnician', res);
        this.technician = res;
      }).catch(ex => {
        //console.log(ex);
        this.alertify.error('Internal Server Error');
      }).finally(() => {
        this.spinner.hide();
      });
    });
  }
  answerText(id: string) {
    let answer = this.serviceOrder.serviceOrderQAndA?.filter(f => f.questionId === id)[0];
    return answer?.answer;
  }
  answerMany(id: string, value: string) {

    let answer = this.serviceOrder.serviceOrderQAndA?.filter(f => f.questionId === id)[0];

    if (answer === undefined)
      return;

    let answerMany = JSON.parse(answer.answer);
    // let answerMany = [];
    let isHeve = answerMany.filter(f => f === value)

    if (isHeve.length !== 0) {
      return true
    }
    else {
      return false
    }
  }
  answerOne(id: string) {
    let answer = this.serviceOrder.serviceOrderQAndA?.filter(f => f.questionId === id)[0];
    return answer?.answer;
  }
  setAnswerText(id: string, value: string) {
    let answer = this.serviceOrder.serviceOrderQAndA?.filter(f => f.questionId === id)[0];
    answer.answer = value;
    //console.log(answer);
  }
  setAnswerMany(id: string, value: string, checked: boolean) {
    //console.log(checked);

    let answer = this.serviceOrder.serviceOrderQAndA?.filter(f => f.questionId === id)[0];
    let answerMany = JSON.parse(answer.answer);
    // let answerMany = [];
    let isHeve = answerMany.filter(f => f === value)

    if (isHeve.length !== 0 && !checked) {
      var index = answerMany.indexOf(value);
      answerMany.splice(index, 1);
    }
    else if (checked) {
      answerMany.push(value);
    }
    answer.answer = JSON.stringify(answerMany);
    // answer.answer = value;
    //console.log(answer);
  }


  setAnswerOne(id: string, event: any) {
    let answer = this.serviceOrder.serviceOrderQAndA.filter(f => f.questionId === id)[0];
    answer.answer = event.value;
    //console.log(answer);
  }


  createAnswer() {
    for (let index = 0; index < this.questionList.length; index++) {
      const element = this.questionList[index];

      let answer = new ServiceOrderQAndA();
      answer.questionId = element.id;
      answer.answerTypeId = +element.answerTypeId;
      answer.answer = '';

      if (answer.answerTypeId === 3)
        answer.answer = '[]';
      this.serviceOrder.serviceOrderQAndA.push(answer);
    }
  }

  handleFileInput(fileList: FileList) {
    //console.log(fileList);
    if (fileList.length < 0)
      return;

    if (this.serviceOrder.serviceOrderImage == null)
      this.serviceOrder.serviceOrderImage = new Array<ServiceOrderImage>();
    for (let index = 0; index < fileList.length; index++) {
      let file = fileList[index];
      let formData: FormData = new FormData();

      let type = '.' + file.name.split(".").pop();
      let num = this.serviceOrder.serviceOrderImage.length + 1;
      let name = this.serviceOrder.serviceOrderNo + '_' + num + type;
      formData.append('uploadFile', file, name);
      this.images.push(formData);
      let serviceOrderImage = new ServiceOrderImage();
      serviceOrderImage.imagePath = name;


      if (this.serviceOrder.serviceOrderImage.length !== 0) {
        let index = this.serviceOrder.serviceOrderImage.length;
        //console.log(this.serviceOrder.serviceOrderImage[index - 1].imagePath);
        let path = this.serviceOrder.serviceOrderImage[index - 1].imagePath;
        let name = this.serviceOrder.serviceOrderNo + '_' + this.getLast(path) + type;

        serviceOrderImage.imagePath = name;
      }

      this.serviceOrder.serviceOrderImage.push(serviceOrderImage);
    }
  }
  getLast(name: string) {
    let a = name.split('_').pop();
    let b = a.split('.');
    return (+b[0]) + 1;
  }
  deleteImg(name: string) {
    let img = this.serviceOrder.serviceOrderImage.filter(f => f.imagePath === name)[0];
    var index = this.serviceOrder.serviceOrderImage.indexOf(img);
    this.serviceOrder.serviceOrderImage.splice(index, 1);
  }

  async seve() {
    // await this.uploadFile();
    this.spinner.show();
    // this.serviceOrder.customerSignature = '';
    this.serviceOrder.projectId = this.projecid;
    if (this.mode === 'New') {
      this.serviceOrderService.add(this.serviceOrder).then(async res => {
        this.router.navigate(['/serviceOrder']);
      }).catch(ex => {
        this.alertify.error('Save Failed');
      }).finally(() => {
        this.spinner.hide();
      });
    }
    else {
      this.serviceOrderService.update(this.serviceOrder).then(async res => {
        this.router.navigate(['/serviceOrder']);
      }).catch(ex => {
        this.alertify.error('Save Failed');
      }).finally(() => {
        this.spinner.hide();
      });
    }
  }

  async uploadFile() {
    for (let index = 0; index < this.images.length; index++) {
      const image = this.images[index];
      let res = await this.serviceOrderService.uploadFile(image);
      //console.log(index);
    }
    //console.log('End UploadFile');
    return Promise.resolve('Uploaded');
  }
  // ngAfterViewInit(): void {
  //   this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
  // }

  changeColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    const color = 'rgb(' + r + ',' + g + ',' + b + ')';
    this.signaturePad.penColor = color;
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }

  download(dataURL, filename) {
    if (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1) {
      window.open(dataURL);
    } else {
      const blob = this.dataURLToBlob(dataURL);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
    }
  }

  dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }

  savePNG() {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = this.signaturePad.toDataURL();
      this.download(dataURL, 'signature.png');
    }
  }

  saveJPG() {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = this.signaturePad.toDataURL('image/jpeg');
      this.download(dataURL, 'signature.jpg');
    }
  }

  saveSVG() {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = this.signaturePad.toDataURL('image/svg+xml');
      this.download(dataURL, 'signature.svg');
    }
  }
}
