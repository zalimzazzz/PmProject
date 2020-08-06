import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.scss']
})
export class QuestionAddComponent implements OnInit {
  question: TemplateServiceOrderQuestion = new TemplateServiceOrderQuestion();
  constructor() { }

  ngOnInit() {
    console.log(this.question);
    this.question.question = 'Question 1';
    this.question.answerType = 1;
    this.question.templateServiceOrderAnswer = [{ id: 1, choice: 'choice1' }, { id: 2, choice: 'choice2' }, { id: 3, choice: 'choice3' }];
  }

  addChoice() {
    this.question.templateServiceOrderAnswer.push({ id: null, choice: '' })
  }
}

export class TemplateServiceOrderQuestion {
  constructor() { }
  public question: string;
  public answerType: number;
  public templateServiceOrderAnswer: Array<TemplateServiceOrderAnswer>;
}

export class TemplateServiceOrderAnswer {
  constructor() { }
  public id: number;
  public choice: string;
}