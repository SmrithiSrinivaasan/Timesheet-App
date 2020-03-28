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
      title: 'Users',
      roles: [environment.Role.Admin],
    },
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: 'User List',
          roles: [environment.Role.Admin],
        },
        canActivate: [AuthGuardService],
      },
      {
        path: 'add',
        component: AddComponent,
        data: {
          title: 'Add User',
          roles: [environment.Role.Admin],
        },
        canActivate: [AuthGuardService],
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        data: {
          title: 'Edit User',
          roles: [environment.Role.Admin],
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
export class UserRoutingModule {}
