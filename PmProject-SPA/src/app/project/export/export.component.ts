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
import { Document, Packer, Paragraph, Media, TextWrappingType, HorizontalPositionAlign, HorizontalPositionRelativeFrom, VerticalPositionAlign, VerticalPositionRelativeFrom, TextWrappingSide } from 'docx';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  id: string;
  serviceOrders = new Array<ServiceOrder>();
  serviceOrderImage = new Array<ServiceOrderImage>()
  project = new Project();
  baseUrl = environment.apiUrl + 'ServiceOrder/Download/';
  isDataAvailable: boolean;
  document = new Document();
  numberDisplay: number;
  imageLength: number;
  serviceOrderCheckboxItem = Array<any>();
  constructor(private projectService: ProjectService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    private serviceOrderService: ServiceOrderService) {

    // this.serviceOrder.project = new Project();
    // this.serviceOrder.serviceOrderImage = new Array<ServiceOrderImage>();
  }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.projectService.getById(this.id).then(async (res: Project) => {

        // if (res === null) {
        //   this.alertify.warning('Please enter service order before export');
        //   this.router.navigate(['/serviceOrder/edit/', this.id]);
        //   return;
        // }
        // this.serviceOrder = res;
        this.project = res;
        this.serviceOrders = this.project.serviceOrder;

        let item = {
          serviceId: 'all',
          name: 'ทั้งหมด',
          checked: false
        }
        this.serviceOrderCheckboxItem.push(item);
        this.setServiceOrderCheckboxItem();
        // await this.getImg();
        this.isDataAvailable = true;
        // this.numberDisplay = this.serviceOrder.serviceOrderImage.length;
        // this.imageLength = this.serviceOrder.serviceOrderImage.length;
      }).catch(ex => {

        this.alertify.error('Internal Server Error');
      }).finally(() => {
        this.spinner.hide();
      });
    });

  }

  async getImg(serviceOrderId: string) {
    var allChecked = this.serviceOrderCheckboxItem.filter(f => f.serviceId === 'all')[0].checked
    if (serviceOrderId === 'all' && allChecked) {
      this.getImgAll();
      return;
    }
    else if (serviceOrderId === 'all' && !allChecked) {
      this.getImgRemoveAll();
      return;
    }

    this.serviceOrderCheckboxItem.filter(f => f.serviceId === 'all')[0].checked = false;

    let checked = this.serviceOrderCheckboxItem.filter(f => f.serviceId === serviceOrderId)[0].checked;
    if (checked)
      await this.getImgAdd(serviceOrderId);
    else
      this.getImgRemove(serviceOrderId);

  }

  async getImgAll() {
    this.serviceOrderCheckboxItem.forEach(f => f.checked = true);
    this.serviceOrderImage = new Array<ServiceOrderImage>();
    let serviceOrders = this.serviceOrders;
    for (let index = 0; index < serviceOrders.length; index++) {
      const serviceOrderImage = serviceOrders[index].serviceOrderImage;
      for (let index = 0; index < serviceOrderImage.length; index++) {
        const element = serviceOrderImage[index];
        let res = await this.serviceOrderService.download(element.imagePath).catch(ex => { });
        this.serviceOrderImage.push(element);
      }
    }

  }

  getImgRemoveAll() {
    this.serviceOrderCheckboxItem.forEach(f => f.checked = false);
    this.serviceOrderImage = new Array<ServiceOrderImage>();
  }

  async getImgAdd(serviceOrderId: string) {

    let serviceOrders = this.serviceOrders;
    const serviceOrderImage = serviceOrders.filter(f => f.id === serviceOrderId)[0]?.serviceOrderImage;

    if (serviceOrderImage === undefined)
      return;

    for (let index = 0; index < serviceOrderImage.length; index++) {
      const element = serviceOrderImage[index];
      let res = await this.serviceOrderService.download(element.imagePath).catch(ex => { });
      this.serviceOrderImage.push(element);
    }

  }


  getImgRemove(serviceOrderId: string) {
    let removed = this.serviceOrderImage.filter(f => f.serviceOrderId !== serviceOrderId);
    this.serviceOrderImage = removed;
  }


  setServiceOrderCheckboxItem() {

    this.serviceOrders.forEach(f => {
      let item = {
        serviceId: f.id,
        name: f.serviceOrderNo,
        checked: false
      }
      this.serviceOrderCheckboxItem.push(item)
    })
  }
  public async download() {
    //https://github.com/dolanmiu/docx  ### Documentation
    //https://docx.js.org/#/
    this.document = new Document();
    let x = this.document
    let images = this.serviceOrderImage;

    let paragraph = Array<Paragraph>();
    var _offset = 1000000;
    for (let index = 0; index < images.length; index++) {

      const element = images[index];
      let url = this.baseUrl + element.imagePath;

      let res_paragraph = await this.base64(url).then((res: any) => {

        const image = Media.addImage(this.document, res, 300, 226
          // , {
          //   floating: {
          //     horizontalPosition: {
          //       offset: 2014400,
          //     },
          //     verticalPosition: {
          //       offset: 2014400,
          //     },
          //     wrap: {
          //       type: TextWrappingType.SQUARE,
          //       side: TextWrappingSide.LARGEST,
          //     }
          //   },
          // }
        );

        paragraph.push(new Paragraph(element.imagePath));
        paragraph.push(new Paragraph(image));
      });
      _offset = _offset + _offset;
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


    this.document.addSection({
      children: paragraph
    });

    Packer.toBlob(this.document).then(blob => {

      saveAs(blob, this.project.name + ".docx");

    });
  }



}
