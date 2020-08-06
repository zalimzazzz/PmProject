/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TemplateServiceOrderAddEditComponent } from './template-service-order-add-edit.component';

describe('TemplateServiceOrderAddEditComponent', () => {
  let component: TemplateServiceOrderAddEditComponent;
  let fixture: ComponentFixture<TemplateServiceOrderAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateServiceOrderAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateServiceOrderAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
