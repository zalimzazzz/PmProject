import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Company } from 'src/app/_models/company';
import { AuthService } from 'src/app/_services/auth.service';
import { CompanyService } from 'src/app/_services/company.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef } from '@angular/material/dialog';
import { UserManagementComponent } from '../user-management.component';

@Component({
  selector: 'app-user-management-add-edit',
  templateUrl: './user-management-add-edit.component.html',
  styleUrls: ['./user-management-add-edit.component.css']
})
export class UserManagementAddEditComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  company: Company[];
  mode = 'New'
  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<UserManagementComponent>,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.companyService.get().then((res: Array<Company>) => {
      console.log(res);
      this.company = res;
    }).catch(ex => {
      console.log(ex);
      this.alertify.error('Internal Server Error');
    }).finally(() => {
      this.spinner.hide();
    });


    (this.bsConfig = {
      containerClass: 'theme-orange',
    }),
      this.createRegisterFrom();
  }

  createRegisterFrom() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        roleId: [1, Validators.required],
        companyId: ['', Validators.required],
        fullName: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  save() {
    if (this.registerForm.valid) {
      console.log('valid');

      this.user = Object.assign({}, this.registerForm.value);
      // this.user.roleId = +this.user.roleId;
      // this.user.companyId = 'c80a3b5e-3106-4276-8ac2-c449905d9bff'
      this.authService.register(this.user).subscribe(
        () => {
          this.alertify.success('create admin successful');
        },
        (error) => {
          this.alertify.error(error);
        }, () => {
          this.dialogRef.close();
        }
      );
    }
    /* this.authService.register(this.model).subscribe(() => {
      this.alertify.success('registration successful');
    }, error => {
      this.alertify.error(error);
    }); */
    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
