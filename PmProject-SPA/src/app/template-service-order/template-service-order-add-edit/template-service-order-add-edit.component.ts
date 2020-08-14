import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionAddComponent } from './question-add/question-add.component';
import { TemplateServiceOrderServiceService } from '../../_services/template-service-order-service.service';
import { AlertifyService } from '../../_services/alertify.service';
import { TemplateServiceOrder } from '../../_models/template-service-order';
import { TemplateServiceOrderQuestion } from '../../_models/template-service-order-question';
import { TemplateServiceOrderAnswer } from '../../_models/template-service-order-answer';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-template-service-order-add-edit',
  templateUrl: './template-service-order-add-edit.component.html',
  styleUrls: ['./template-service-order-add-edit.component.scss']
})
export class TemplateServiceOrderAddEditComponent implements OnInit {

  displayedColumns: string[] = ['question', 'action'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: any;
  templateServiceOrder = new TemplateServiceOrder();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public dialog: MatDialog,
    private templateServiceOrderServiceService: TemplateServiceOrderServiceService,
    private alertify: AlertifyService,
    private router: Router,
    private spinner: NgxSpinnerService) {
    this.templateServiceOrder.templateServiceOrderQuestion = new Array<TemplateServiceOrderQuestion>();
  }
  ngOnInit() {
    this.setTable();
  }
  setTable() {
    this.dataSource = new MatTableDataSource<TemplateServiceOrderQuestion>(this.templateServiceOrder.templateServiceOrderQuestion);
    this.dataSource.paginator = this.paginator;
  }
  openDialog() {
    let templateServiceOrderAnswer = new TemplateServiceOrderAnswer();
    const dialogRef = this.dialog.open(QuestionAddComponent, {
      data: {
        name: '',
        templateServiceOrderAnswerId: 0,
        templateServiceOrderAnswer: [templateServiceOrderAnswer]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      console.log(result);
      result.templateServiceOrderAnswerId = +result.templateServiceOrderAnswerId;
      this.templateServiceOrder.templateServiceOrderQuestion.push(result);
      console.log(this.templateServiceOrder.templateServiceOrderQuestion);

      this.setTable();
    });
  }

  save() {
    this.spinner.show();
    this.templateServiceOrderServiceService.add(this.templateServiceOrder).then(res => {
      console.log('save', res);
      this.spinner.hide();
      this.router.navigate(['/template']);
    }).catch(ex => {
      this.alertify.error('Save Failed');
    });
  }

}
