import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { CompanyService } from '../_services/company.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Company } from '../_models/company';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  company: Company[];

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.companyService.get().then((res: Array<Company>) => {

      this.company = res;
    }).catch(ex => {

      this.alertify.error('Internal Server Error');
    }).finally(() => {
      this.spinner.hide();
    });

    if (this.authService.loggedIn()) {
      let url = this.authService.getMenu()[0].path;
      this.router.navigate([url]);
    }
    (this.bsConfig = {
      containerClass: 'theme-orange',
    }),
      this.createRegisterFrom();
  }

  createRegisterFrom() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        roleId: [2, Validators.required],
        companyId: [''],
        fullName: ['', Validators.required],
        // knownAs: ['', Validators.required],
        // dateOfBirth: [null, Validators.required],
        // city: ['', Validators.required],
        // country: ['', Validators.required],
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

  register() {
    if (this.registerForm.valid) {


      this.user = Object.assign({}, this.registerForm.value);
      // this.user.roleId = +this.user.roleId;
      // this.user.companyId = 'c80a3b5e-3106-4276-8ac2-c449905d9bff'
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

  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
