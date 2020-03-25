import { NgModule } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedModule } from '../../shared/shared/shared.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent],
  imports: [UserRoutingModule, SharedModule],
  providers: [BsModalRef],
})
export class UserModule {}
