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

  ngOnInit() {
    //console.log('question', this.question);
  }

  addChoice() {
    let templateServiceOrderAnswer = new TemplateServiceOrderAnswer();
    this.question.templateServiceOrderAnswer.push(templateServiceOrderAnswer)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}