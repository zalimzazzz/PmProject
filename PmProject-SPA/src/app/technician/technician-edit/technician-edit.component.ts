import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Company } from 'src/app/_models/company';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TechnicianComponent } from '../technician.component';
import { UserService } from 'src/app/_services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-technician-edit',
  templateUrl: './technician-edit.component.html',
  styleUrls: ['./technician-edit.component.css']
})
export class TechnicianEditComponent implements OnInit {


  user: User;
  id: string;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TechnicianComponent>,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        username: [''],
        fullName: ['', Validators.required],
        phoneNumber: [''],
        roleId: [2],
        companyId: [''],
      },
    );
    console.log(this.registerForm);

    this.setValue();
  }

  // createRegisterFrom() {
  //   this.registerForm = this.fb.group(
  //     {
  //       username: ['', Validators.required],
  //       fullName: ['', Validators.required],
  //       phoneNumber: [''],
  //       roleId: [2],
  //       companyId: [''],
  //     },
  //   );
  // }

  setValue() {

    this.userService.getById(this.data.id).then((res: User) => {

      console.log(res);
      this.id = res.id;
      this.registerForm.get('username').setValue(res.username);
      this.registerForm.get('fullName').setValue(res.fullName);
      this.registerForm.get('phoneNumber').setValue(res.phoneNumber);
    }).catch(ex => {
      this.alertify.error(ex);
    }).finally(() => {
      this.spinner.hide();
    });
  }

  save() {
    this.spinner.show();
    console.log('getUser', this.authService.getUser());
    // return;
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.user.companyId = this.authService.getUser().companyId;
      this.user.id = this.id;
      this.userService.update(this.user)
        .catch(ex => {
          this.alertify.error(ex);
        }).finally(() => {
          this.dialogRef.close();
          this.spinner.hide();
        });
    }
  }

  cancel() {
  }
}