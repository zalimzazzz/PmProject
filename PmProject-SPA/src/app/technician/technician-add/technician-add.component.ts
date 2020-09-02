import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { User } from 'src/app/_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Company } from 'src/app/_models/company';
import { AuthService } from 'src/app/_services/auth.service';
import { CompanyService } from 'src/app/_services/company.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TechnicianComponent } from '../technician.component';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-technician-add-edit',
  templateUrl: './technician-add.component.html',
  styleUrls: ['./technician-add.component.css']
})
export class TechnicianAddComponent implements OnInit {

  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  company: Company[];
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
    this.createRegisterFrom();

  }
  createRegisterFrom() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        fullName: ['', Validators.required],
        roleId: [2],
        companyId: [''],
        phoneNumber: [''],
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
    console.log('getUser', this.authService.getUser());
    // return;
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.user.companyId = this.authService.getUser().companyId;
      this.authService.register(this.user).subscribe(
        () => {
          this.alertify.success('create technician successful');
        },
        (error) => {
          this.alertify.error(error);
        }, () => {
          this.dialogRef.close();
        }
      );
    }
  }

  cancel() {
  }
}