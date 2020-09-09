import { Component, OnInit, Inject } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TemplateServiceOrder } from 'src/app/_models/template-service-order';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyComponent } from '../company.component';
import { CompanyService } from 'src/app/_services/company.service';
import { Company } from 'src/app/_models/company';

@Component({
  selector: 'app-company-add-edit',
  templateUrl: './company-add-edit.component.html',
  styleUrls: ['./company-add-edit.component.scss']
})
export class CompanyAddEditComponent implements OnInit {
  mode = 'New'
  template = new Array<TemplateServiceOrder>();
  btnSave = true;
  company = new Company();
  constructor(private projectService: CompanyService,
    private alertify: AlertifyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<CompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data.id === null) {
      return;
    }
    this.spinner.show();
    this.projectService.getById(this.data.id).then((res: Company) => {
      if (res !== null) {
        this.mode = 'Edit'
        this.company = res;
        //console.log('this.project ', this.company);
      }
    }).catch(ex => {
      this.alertify.error(ex);
    }).finally(() => {
      this.spinner.hide();
    });
    //console.log(this.data);
  }


  change() {
    this.btnSave = false;
  }
  save() {
    this.spinner.show();
    if (this.mode === 'New') {
      this.projectService.add(this.company).then(res => {
        //console.log('save', res);
        this.router.navigate(['/company']);
      }).catch(ex => {
        this.alertify.error('Save Failed');
      }).finally(() => {
        this.spinner.hide();
        this.dialogRef.close();
      });
    }
    else {
      this.projectService.update(this.company).then(res => {
        //console.log('save', res);
        this.router.navigate(['/company']);
      }).catch(ex => {
        this.alertify.error('Update Failed');
      }).finally(() => {
        this.spinner.hide();
        this.dialogRef.close();
      });
    }
  }
}