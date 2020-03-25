import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../shared/guards/auth-guard.service';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users',
      roles: ['admin'],
    },
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: 'User List',
        },
      },
      {
        path: 'add',
        component: AddComponent,
        data: {
          title: 'Add User',
        },
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        data: {
          title: 'Edit User',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
