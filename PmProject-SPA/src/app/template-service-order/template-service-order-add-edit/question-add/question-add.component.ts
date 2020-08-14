import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemplateServiceOrderAddEditComponent } from '../template-service-order-add-edit.component';
import { TemplateServiceOrderQuestion } from '../../models/templateServiceOrderQuestion';
import { TemplateServiceOrderAnswer } from '../../models/templateServiceOrderAnswer';
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
    // console.log(this.question);
    // this.question.name = 'Question 1';
    // this.question.answerType = 1;
    // this.question.templateServiceOrderAnswer = [{ id: 1, choice: 'choice1' }, { id: 2, choice: 'choice2' }, { id: 3, choice: 'choice3' }];
  }

  addChoice() {
    let templateServiceOrderAnswer = new TemplateServiceOrderAnswer();
    this.question.templateServiceOrderAnswer.push(templateServiceOrderAnswer)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

// export class TemplateServiceOrderQuestion {
//   constructor() { }
//   public question: string;
//   public answerType: number;
//   public templateServiceOrderAnswer: Array<TemplateServiceOrderAnswer>;
// }

// export class TemplateServiceOrderAnswer {
//   constructor() { }
//   public id: number;
//   public choice: string;
// }