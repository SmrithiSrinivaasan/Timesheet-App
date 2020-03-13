import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  submitted: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private toast: ToastrService
  ) {}

  ngOnInit() {}

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    console.log('values', this.loginForm.value);
    this.submitted = true;
    this.authenticationService
      .SignIn(this.loginForm.value.email, this.loginForm.value.password)
      .then((response: any) => {
        this.submitted = false;
        console.log('user detail', response);
        this.toast.success('Login Successful !');
        this.router.navigate(['/dashboard']);
      })
      .catch((error: any) => {
        this.submitted = false;
        console.log('error', error);
        this.toast.error(error.message);
      });
  }
}
