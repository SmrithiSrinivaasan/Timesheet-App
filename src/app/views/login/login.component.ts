import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../user/user.service';
import { IAuthDetails } from './model';
import * as updateAuthAction from './store/actions/updateAuthAction';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  submitted: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private toast: ToastrService,
    private store: Store<any>,
    private userService: UserService,
    private ngZone: NgZone
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
        // refer CRUD
        const authDetails: IAuthDetails = {
          uid: response.user.uid,
          name: '',
          role: '',
          email: response.user.email,
          isLoggedIn: true,
        };
        if (response) {
          const userKey = this.loginForm.value.email.replace('.', '_dot_');
          this.userService
            .getSelectedUser(userKey)
            .then((snapshot: any) => {
              const val = snapshot.val();
              if (val) {
                authDetails.role = val.role;
                authDetails.name = val.name;
              } else {
                authDetails.role = environment.Role.Admin;
                authDetails.name = environment.Role.Admin;
              }
              this.submitted = false;
              this.store.dispatch(new updateAuthAction.UpdateAuth(authDetails));
              // this calls the actions folder then from there reducer and stores it in the store
              this.toast.success('Login Successful !');
              this.ngZone.run(() => this.router.navigate(['/dashboard']));
            })
            .catch((error: any) => {
              this.submitted = false;
              this.toast.error(error.message);
            });
        }
      })
      .catch((error: any) => {
        this.submitted = false;
        this.toast.error(error.message);
      });
  }
}
