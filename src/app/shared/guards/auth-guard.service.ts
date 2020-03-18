import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private store: Store<any>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authDetails = JSON.parse(localStorage.getItem('auth'));
    const isUserLoggedIn = authDetails && authDetails.auth.isLoggedIn;

    if (!isUserLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
