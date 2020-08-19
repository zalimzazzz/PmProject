import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/_services/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { ServiceOrderService } from 'src/app/_services/service-order.service';
import { ServiceOrder } from 'src/app/_models/service-order';
import { ServiceOrderImage } from 'src/app/_models/service-order-image';
import { async } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

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
  constructor(private projectService: ProjectService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private serviceOrderService: ServiceOrderService,) {

    this.serviceOrder.project = new Project();
    this.serviceOrder.serviceOrderImage = new Array<ServiceOrderImage>();

  }

  ngOnInit() {

    // this.serviceOrderService.download('0011_0.jpg');
    // this.serviceOrderService.download('0011_1.png');
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.spinner.show();
      this.serviceOrderService.getById(this.id).then(async (res: ServiceOrder) => {
        console.log(res);
        this.serviceOrder = res;
        await this.getImg();
      }).catch(ex => {
        console.log(ex);
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
      console.log(index);

    }
    this.isDataAvailable = true;
  }

  export() {

    let images = this.serviceOrder.serviceOrderImage;
    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      window.URL.revokeObjectURL(this.baseUrl + element.imagePath);
      console.log(index);

    }
  }
}
