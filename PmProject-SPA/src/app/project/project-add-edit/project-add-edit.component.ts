import { Component, OnInit, Inject } from '@angular/core';
import { ProjectService } from 'src/app/_services/project.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Project } from 'src/app/_models/project';
import { TemplateServiceOrderServiceService } from 'src/app/_services/template-service-order-service.service';
import { TemplateServiceOrder } from 'src/app/_models/template-service-order';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectComponent } from '../project.component';
import { resolve } from 'dns';

@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.css']
})
export class ProjectAddEditComponent implements OnInit {
  mode = 'New'
  project = new Project();
  template = new Array<TemplateServiceOrder>();
  btnSave = true;
  constructor(private projectService: ProjectService,
    private alertify: AlertifyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private templateServiceOrderServiceService: TemplateServiceOrderServiceService,
    public dialogRef: MatDialogRef<ProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.spinner.show();

    // if (this.data.id !== null) {
    //   this.mode = 'Edit';
    //   this.spinner.show();
    //   this.templateServiceOrderServiceService.getById(this.data.id).then((res: Project) => {
    //    
    //     this.project = res;
    //   }).catch(ex => {
    //     this.alertify.error(ex);
    //   });
    // }

    this.templateServiceOrderServiceService.get().then((res: Array<TemplateServiceOrder>) => {

      this.template = res;

      if (this.data.id !== null) {
        this.mode = 'Edit';
        return this.projectService.getById(this.data.id);
      }
      return Promise.resolve(null);
    }).then((res: Project) => {
      if (res !== null) {
        this.project = res;

      }
    }).catch(ex => {
      this.alertify.error(ex);
    }).finally(() => {
      this.spinner.hide();
    });

  }
  change() {
    this.btnSave = false;
  }
  save() {
    this.spinner.show();
    this.project.status = 0;
    if (this.mode === 'New') {
      this.projectService.add(this.project).then(res => {

        this.router.navigate(['/project']);
      }).catch(ex => {
        this.alertify.error('Save Failed');
      }).finally(() => {
        this.spinner.hide();
        this.dialogRef.close();
      });
    }
    else {
      this.projectService.update(this.project).then(res => {

        this.router.navigate(['/project']);
      }).catch(ex => {
        this.alertify.error('Update Failed');
      }).finally(() => {
        this.spinner.hide();
        this.dialogRef.close();
      });
    }
  }
}