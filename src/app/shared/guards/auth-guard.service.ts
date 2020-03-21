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

    // if (!isUserLoggedIn) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    // return true;
    if (isUserLoggedIn) {
      // both admin n user
      if (
        route.data.roles &&
        route.data.roles.indexOf(authDetails.auth.role) === -1
      ) {
        // first is admin tat we gave , second is the role of the entered user
        console.log('authDetails', authDetails);

        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
