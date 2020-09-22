import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemplateServiceOrderAddEditComponent } from '../template-service-order-add-edit.component';
import { TemplateServiceOrderQuestion } from 'src/app/_models/template-service-order-question';
import { TemplateServiceOrderAnswer } from 'src/app/_models/template-service-order-answer';
@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.scss']
})
export class QuestionAddComponent implements OnInit {
  // question = new TemplateServiceOrderQuestion();
  constructor(public dialogRef: MatDialogRef<TemplateServiceOrderAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public question: TemplateServiceOrderQuestion) {

  }

  submited = false;
  ngOnInit() {

  }

  addChoice() {
    let templateServiceOrderAnswer = new TemplateServiceOrderAnswer();
    templateServiceOrderAnswer.answer = '';
    this.question.templateServiceOrderAnswer.push(templateServiceOrderAnswer)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOk() {
    this.submited = true;
    if (!this.validate())
      return;

    this.dialogRef.close(this.question);

  }

  validate() {

    if (this.question.name === '' && this.question.name === '')
      return false;

    if (this.question.answerTypeId === '1')
      return true;

    let items = this.question.templateServiceOrderAnswer;

    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if ((element.answer === '' || element.answer === null))
        return false;
    }

    return true;
  }


}