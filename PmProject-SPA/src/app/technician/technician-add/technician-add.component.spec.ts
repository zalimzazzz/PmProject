/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TechnicianAddComponent } from './technician-add.component';

describe('TechnicianAddComponent', () => {
  let component: TechnicianAddComponent;
  let fixture: ComponentFixture<TechnicianAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicianAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
