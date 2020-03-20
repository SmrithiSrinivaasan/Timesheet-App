import { NgModule } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedModule } from '../../shared/shared/shared.module';
import { ListComponent } from '../project/list/list.component';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  declarations: [ListComponent],
  imports: [ProjectRoutingModule, SharedModule],
  providers: [BsModalRef],
})
export class ProjectModule {}
