import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface ICanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable()
export class CanDeactivateGuardsService
  implements CanDeactivate<ICanComponentDeactivate> {
  backButtonClicked = false;

  constructor(public location: LocationStrategy) {
    location.onPopState(() => {
      // every page is stored in a stack n when backing the page is popped
      this.backButtonClicked = true;
    });
  }

  canDeactivate(component: ICanComponentDeactivate) {
    if (this.backButtonClicked) {
      history.pushState(null, null, location.href); // holds all pages that were clicked
    }
    return component.canDeactivate ? component.canDeactivate() : true;
    // first checks for guard in user/entry-routing ? this checks for function in ts : when its not there in routing
  }
}
