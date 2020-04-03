import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { ConnectionStatusComponent } from './shared/components/connection-status/connection-status.component';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet ></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {
  public offlineEvent: Observable<Event>;
  public onlineEvent: Observable<Event>;
  public subscriptions: Subscription[] = [];
  bsModalRef: BsModalRef;

  constructor(private router: Router, private modalService: BsModalService) {}

  ngOnInit() {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(
      this.onlineEvent.subscribe(event => {
        this.bsModalRef.hide();
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe(e => {
        this.bsModalRef = this.modalService.show(ConnectionStatusComponent);
      })
    );

    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
