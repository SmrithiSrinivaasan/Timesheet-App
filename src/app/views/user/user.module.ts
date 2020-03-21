import { NgModule } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedModule } from '../../shared/shared/shared.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [UserRoutingModule, SharedModule],
  providers: [BsModalRef],
})
export class UserModule {}
