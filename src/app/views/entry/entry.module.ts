import { NgModule } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedModule } from '../../shared/shared/shared.module';
import { AddComponent } from './add/add.component';
import { EntryRoutingModule } from './entry-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [EntryRoutingModule, SharedModule],
  providers: [BsModalRef],
})
export class EntryModule {}
