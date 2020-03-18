import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { navItems } from '../../_nav';
import * as clearAuthAction from '../../views/login/store/actions/clearAuthAction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(
    private router: Router,
    private store: Store<any>,
    private toast: ToastrService
  ) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  onLogout() {
    this.store.dispatch(new clearAuthAction.ClearAuth());
    this.router.navigate(['/login']);
    this.toast.success('Logged Out Successfully !');
  }
}
