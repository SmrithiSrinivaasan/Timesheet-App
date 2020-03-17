import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Store} from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import * as updateAuthAction from './store/actions/updateAuthAction';

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
    private toast: ToastrService,
    private store: Store<any>
  ) {}

  ngOnInit() {}

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    this.submitted = true;
    this.authenticationService
      .SignIn(this.loginForm.value.email, this.loginForm.value.password)
      .then((response: any) => {
        this.submitted = false;

        // refer CRUD
        const authDetails = {
          uid : response.user.uid,
          name : response.user.displayName,
          email : response.user.email,
          isLoggedIn: true
        };
        this.store.dispatch(new updateAuthAction.UpdateAuth(authDetails));
        // this calls the actions folder then from there reducer and stores it in the store

        this.toast.success('Login Successful !');
        this.router.navigate(['/dashboard']);
      })
      .catch((error: any) => {
        this.submitted = false;
        this.toast.error(error.message);
      });
  }
}
