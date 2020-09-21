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
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Guid } from 'guid-typescript';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-template-service-order-add-edit',
  templateUrl: './template-service-order-add-edit.component.html',
  styleUrls: ['./template-service-order-add-edit.component.scss']
})
export class TemplateServiceOrderAddEditComponent implements OnInit {

  displayedColumns: string[] = ['question', 'action'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: any;
  mode = 'New'
  templateServiceOrder = new TemplateServiceOrder();
  id: string
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public dialog: MatDialog,
    private templateServiceOrderServiceService: TemplateServiceOrderServiceService,
    private alertify: AlertifyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private authService: AuthService) {
    this.templateServiceOrder.templateServiceOrderQuestion = new Array<TemplateServiceOrderQuestion>();
  }
  ngOnInit() {
    //console.log(this.templateServiceOrder);

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id !== undefined) {
        this.mode = 'Edit'
        this.templateServiceOrderServiceService.getById(this.id).then((res: TemplateServiceOrder) => {
          //console.log(res);
          this.templateServiceOrder = res;
          this.setTable();
        });
      }
    });
  }
  setTable() {
    this.dataSource = new MatTableDataSource<TemplateServiceOrderQuestion>(this.templateServiceOrder.templateServiceOrderQuestion);
    this.dataSource.paginator = this.paginator;
  }
  openDialog() {
    let templateServiceOrderAnswer = new TemplateServiceOrderAnswer();
    templateServiceOrderAnswer.answer = '';
    const dialogRef = this.dialog.open(QuestionAddComponent, {
      data: {
        name: '',
        answerTypeId: '1',
        templateServiceOrderAnswer: [templateServiceOrderAnswer]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      //console.log(result);
      result.id = Guid.create().toString();
      result.answerTypeId = result.answerTypeId;
      this.templateServiceOrder.templateServiceOrderQuestion.push(result);
      //console.log(this.templateServiceOrder.templateServiceOrderQuestion);

      this.setTable();
    });
  }

  openDialogEdite(id: string) {
    //console.log('openDialogEdite');

    let question = this.templateServiceOrder.templateServiceOrderQuestion.filter(f => f.id === id)[0];
    const dialogRef = this.dialog.open(QuestionAddComponent, {
      data: question,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      //console.log(result.id);
      let question = this.templateServiceOrder.templateServiceOrderQuestion.filter(f => f.id === result.id)[0];

      // question.templateServiceOrderAnswer = +result.templateServiceOrderAnswerId;
      question.answerTypeId = result.answerTypeId
      //   this.templateServiceOrder.templateServiceOrderQuestion.push(result);
      //console.log(this.templateServiceOrder.templateServiceOrderQuestion);

      this.setTable();
    });
  }

  save() {
    if (this.templateServiceOrder.templateServiceOrderQuestion.length === 0) {
      this.alertify.warning('Pless Add Question')
      return;
    }
    this.spinner.show();
    this.templateServiceOrder.companyId = this.authService.getUser().companyId;
    //console.log(this.templateServiceOrder.companyId);
    //console.log(this.authService.getUser().companyId);

    if (this.mode === 'New') {
      this.templateServiceOrderServiceService.add(this.templateServiceOrder).then(res => {
        //console.log('save', res);
        this.router.navigate(['/template']);
      }).catch(ex => {
        this.alertify.error('Save Failed');
      }).finally(() => {
        this.spinner.hide();
      });
    }
    else {
      this.templateServiceOrderServiceService.update(this.templateServiceOrder).then(res => {
        //console.log('update', res);
        this.router.navigate(['/template']);
      }).catch(ex => {
        this.alertify.error('Save Failed');
      }).finally(() => {
        this.spinner.hide();
      });
    }
  }

  delete(id: string) {
    //console.log(id);

    let question = this.templateServiceOrder.templateServiceOrderQuestion;
    let item = question.filter(f => f.id === id)[0];
    var index = question.indexOf(item);
    question.splice(index, 1);
    this.setTable();
  }
}
