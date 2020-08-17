import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { ServiceOrderService } from 'src/app/_services/service-order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateServiceOrderQuestion } from 'src/app/_models/template-service-order-question';
import { ServiceOrder } from 'src/app/_models/service-order';

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
  constructor(private serviceOrderService: ServiceOrderService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.spinner.show();
      this.serviceOrderService.getQuestion(this.id).then((res: Array<TemplateServiceOrderQuestion>) => {
        console.log(res);
        this.questionList = res;
        return this.serviceOrderService.getById(this.id)
      }).then((res: ServiceOrder) => {
        console.log(this.serviceOrder);
        if (res !== null) {
          this.serviceOrder = res;
          this.signaturePad.fromDataURL(this.serviceOrder.customerSignature)
        }
        if (Object.keys(this.serviceOrder).length !== 0) {
          this.mode = 'Edit';
        }
      }).catch(ex => {
        console.log(ex);
        this.alertify.error('Internal Server Error');
      }).finally(() => {
        this.spinner.hide();
      });
    });



  }
  seve() {
    this.spinner.show();
    this.serviceOrder.customerSignature = this.signaturePad.toDataURL();
    this.serviceOrder.projectId = this.id;
    this.serviceOrder.technicianId = '8dd7fda4-a143-4111-ae9a-bf6f50082dc6';
    if (this.mode === 'New') {
      this.serviceOrderService.add(this.serviceOrder).then(res => {
        console.log('save', res);
        this.router.navigate(['/serviceOrder']);
      }).catch(ex => {
        this.alertify.error('Save Failed');
      }).finally(() => {
        this.spinner.hide();
      });
    }
    else {
      this.serviceOrderService.update(this.serviceOrder).then(res => {
        console.log('update', res);
        this.router.navigate(['/serviceOrder']);
      }).catch(ex => {
        this.alertify.error('Save Failed');
      }).finally(() => {
        this.spinner.hide();
      });
    }
  }
  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
  }

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
