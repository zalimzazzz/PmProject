import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.css']
})
export class ProjectAddEditComponent implements OnInit {

  question: TemplateServiceOrderQuestion = new TemplateServiceOrderQuestion();
  constructor() { }

  ngOnInit() {
    console.log(this.question);
    this.question.question = 'Question 1';
    this.question.answerType = 1;
    this.question.templateServiceOrderAnswer = [{ id: 1, choice: 'choice1' }, { id: 2, choice: 'choice2' }, { id: 3, choice: 'choice3' }];
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