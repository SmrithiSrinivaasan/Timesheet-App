import { NgModule } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedModule } from '../../shared/shared/shared.module';
import { ListComponent } from '../phase/list/list.component';
import { PhaseRoutingModule } from '../phase/phase-routing.module';

@NgModule({
  declarations: [ListComponent],
  imports: [PhaseRoutingModule, SharedModule],
  providers: [BsModalRef],
})
export class PhaseModule {}
