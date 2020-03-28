import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { navItems } from '../../_nav';
import { AuthenticationService } from '../../services/authentication.service';
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

  constructor(
    private router: Router,
    private store: Store<any>,
    private toast: ToastrService,
    private authService: AuthenticationService
  ) {
    const authDetails = JSON.parse(localStorage.getItem('auth'));
    const role = authDetails && authDetails.auth && authDetails.auth.role;

    navItems.map(navItem => {
      if (navItem.allowedRoles.includes(role)) {
        this.navItems.push(navItem);
      }
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  onLogout() {
    this.store.dispatch(new clearAuthAction.ClearAuth());
    this.router.navigate(['/login']);
    this.toast.success('Logged Out Successfully !');
  }
}
