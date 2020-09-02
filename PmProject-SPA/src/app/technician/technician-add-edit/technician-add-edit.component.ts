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

@Component({
  selector: 'app-technician-add-edit',
  templateUrl: './technician-add-edit.component.html',
  styleUrls: ['./technician-add-edit.component.css']
})
export class TechnicianAddEditComponent implements OnInit {

  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  company: Company[];
  mode = 'New'
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {

    this.createRegisterFrom();
  }

  createRegisterFrom() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        fullName: ['', Validators.required],
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
    if (this.registerForm.valid) {
      console.log('valid');

      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.alertify.success('registration successful');
        },
        (error) => {
          this.alertify.error(error);
        }, () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/']);
          });
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
  }
}