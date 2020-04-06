import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { navItems } from '../../_nav';
import { AuthenticationService } from '../../services/authentication.service';
import { PasswordChangeComponent } from '../../shared/components/password-modal/password-change.component';
import * as EntriesAction from '../../views/entry/store/actions/clearEntries';
import * as clearAuthAction from '../../views/login/store/actions/clearAuthAction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  // public navItems = navItems;
  public navItems = [];
  currentUser: any;

  bsModalRef: BsModalRef;

  authDetails: any;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private store: Store<any>,
    private toast: ToastrService,
    private authService: AuthenticationService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.authDetails = JSON.parse(localStorage.getItem('auth'));
    const role =
      this.authDetails && this.authDetails.auth && this.authDetails.auth.role;

    navItems.map(navItem => {
      if (navItem.allowedRoles.includes(role)) {
        this.navItems.push(navItem);
      }
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  changePassword() {
    this.angularFireAuth.auth
      .sendPasswordResetEmail(this.authDetails.auth.email)
      .then(() => {
        this.toast.success('Password Reset Email Sent Successfully');
      })
      .catch(error => {
        this.toast.error(error.message);
      });
  }

  onLogout() {
    this.authService
      .SignOut()
      .then(() => {
        this.navToLogin();
      })
      .catch(() => {
        this.navToLogin();
      });
  }

  navToLogin() {
    this.store.dispatch(new clearAuthAction.ClearAuth());
    this.store.dispatch(new EntriesAction.ClearEntries());
    this.router.navigate(['/login']);
    this.toast.success('Logged Out Successfully !');
  }
}
