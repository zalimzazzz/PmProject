import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/_services/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { ServiceOrderService } from 'src/app/_services/service-order.service';
import { ServiceOrder } from 'src/app/_models/service-order';
import { ServiceOrderImage } from 'src/app/_models/service-order-image';
import { environment } from 'src/environments/environment';

import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, Media } from 'docx';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  id: string;
  serviceOrder = new ServiceOrder();
  baseUrl = environment.apiUrl + 'ServiceOrder/Download/';
  isDataAvailable: boolean;
  document: any;
  numberDisplay: number;
  imageLength: number;
  constructor(private projectService: ProjectService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    private serviceOrderService: ServiceOrderService,) {

    this.serviceOrder.project = new Project();
    this.serviceOrder.serviceOrderImage = new Array<ServiceOrderImage>();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.spinner.show();
      this.serviceOrderService.getById(this.id).then(async (res: ServiceOrder) => {
        //console.log(res);
        if (res === null) {
          this.alertify.warning('Please enter service order before export');
          this.router.navigate(['/serviceOrder/edit/', this.id]);
          return;
        }
        this.serviceOrder = res;
        await this.getImg();
        this.isDataAvailable = true;
        this.numberDisplay = this.serviceOrder.serviceOrderImage.length;
        this.imageLength = this.serviceOrder.serviceOrderImage.length;
      }).catch(ex => {
        //console.log(ex);
        this.alertify.error('Internal Server Error');
      }).finally(() => {
        this.spinner.hide();
      });
    });

  }

  async getImg() {
    let images = this.serviceOrder.serviceOrderImage;
    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      let res = await this.serviceOrderService.download(element.imagePath).catch(ex => { });
      // //console.log(index);
    }

  }


  public async download() {
    // let x = 'http://localhost:5000/api/ServiceOrder/Download/s01_2.jpg';
    // this.base64(x).then(res => {
    //   // this.export(res);
    // })
    this.document = new Document();
    let images = this.serviceOrder.serviceOrderImage;
    let paragraph = Array<Paragraph>();
    for (let index = 0; index < images.length; index++) {

      if (this.numberDisplay < (index + 1)) {
        continue;
      }
      const element = images[index];
      let url = 'http://localhost:5000/api/ServiceOrder/Download/' + element.imagePath;
      let res_paragraph = await this.base64(url).then((res: any) => {
        const image = Media.addImage(this.document, res, 400, 300);
        //console.log(index);
        paragraph.push(new Paragraph(element.imagePath));
        paragraph.push(new Paragraph(image));
      })
    }
    this.export(paragraph);
  }
  async base64(url: string) {
    var res = await fetch(url);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }


  export(paragraph: Array<Paragraph>) {
    //console.log('paragraph', paragraph);

    this.document.addSection({
      children: paragraph
    });

    Packer.toBlob(this.document).then(blob => {
      //console.log(blob);
      saveAs(blob, this.serviceOrder.project.name + ".docx");
      //console.log("Document created successfully");
    });
  }



}
