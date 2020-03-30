import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthGuardService } from '../../shared/guards/auth-guard.service';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Entries',
      roles: [environment.Role.Admin, environment.Role.User],
    },
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: 'Entry List',
          roles: [environment.Role.Admin, environment.Role.User],
        },
        canActivate: [AuthGuardService],
      },
      {
        path: 'add',
        component: AddComponent,
        data: {
          title: 'Add Entry',
          roles: [environment.Role.User],
        },
        canActivate: [AuthGuardService],
      },
      {
        path: 'edit/:id', // mentioned as id but sending key only
        component: EditComponent,
        data: {
          title: 'Edit Entry',
          roles: [environment.Role.User],
        },
        canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryRoutingModule {}
