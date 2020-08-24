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

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    (this.bsConfig = {
      containerClass: 'theme-orange',
    }),
      this.createRegisterFrom();
  }

  createRegisterFrom() {
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        username: ['', Validators.required],
        roleId: [2, Validators.required],
        companyId: ['', Validators.required],
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
    console.log('1');

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
    this.cancelRegister.emit(false);
  }
}
