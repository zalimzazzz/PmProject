import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionAddComponent } from './question-add/question-add.component';
import { TemplateServiceOrder } from '../models/templateServiceOrder';
import { TemplateServiceOrderQuestion } from '../models/templateServiceOrderQuestion';

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
  constructor(public dialog: MatDialog) {
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
    const dialogRef = this.dialog.open(QuestionAddComponent, {
      data: {
        name: '',
        templateServiceOrderAnswerId: 0,
        templateServiceOrderAnswer: ['']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      console.log(result);
      this.templateServiceOrder.templateServiceOrderQuestion.push(result);
      console.log(this.templateServiceOrder.templateServiceOrderQuestion);

      this.setTable();
    });
  }


}
