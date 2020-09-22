import { Component, OnInit } from '@angular/core';
import { ServiceOrderService } from '../_services/service-order.service';
import { AuthService } from '../_services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceOrder } from '../_models/service-order';

@Component({
  selector: 'app-service-order-technician',
  templateUrl: './service-order-technician.component.html',
  styleUrls: ['./service-order-technician.component.css']
})
export class ServiceOrderTechnicianComponent implements OnInit {
  folders: any[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: any[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
  serviceOrder = new Array<ServiceOrder>();
  id: string;
  constructor(private serviceOrderService: ServiceOrderService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.spinner.show();
    this.id = this.authService.getUser().id;
    this.serviceOrderService.getByTechnicianId(this.id)
      .then(async (res: Array<ServiceOrder>) => {

        this.serviceOrder = res;
      }).catch(ex => {
        this.alertify.error('Server Internet Error');
      }).finally(() => {
        this.spinner.hide();
      });
  }

}
