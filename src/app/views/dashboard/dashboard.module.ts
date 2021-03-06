import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
