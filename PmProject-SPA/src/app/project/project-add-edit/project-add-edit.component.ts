import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/_services/project.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Project } from 'src/app/_models/project';
import { TemplateServiceOrderServiceService } from 'src/app/_services/template-service-order-service.service';
import { TemplateServiceOrder } from 'src/app/_models/template-service-order';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectComponent } from '../project.component';

@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.css']
})
export class ProjectAddEditComponent implements OnInit {

  project = new Project();
  template = new Array<TemplateServiceOrder>();
  constructor(private projectService: ProjectService,
    private alertify: AlertifyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private templateServiceOrderServiceService: TemplateServiceOrderServiceService,
    public dialogRef: MatDialogRef<ProjectComponent>,) { }

  ngOnInit() {
    this.spinner.show();
    this.templateServiceOrderServiceService.get().then((res: Array<TemplateServiceOrder>) => {
      console.log(res);
      this.template = res;
    }).catch(ex => {
      this.alertify.error(ex);
    }).finally(() => {
      this.spinner.hide();
    });
  }
  save() {
    this.spinner.show();
    if (true) {
      this.projectService.add(this.project).then(res => {
        console.log('save', res);
        this.router.navigate(['/project']);
      }).catch(ex => {
        this.alertify.error('Save Failed');
      }).finally(() => {
        this.spinner.hide();
        this.dialogRef.close();
      });
    }
  }
}