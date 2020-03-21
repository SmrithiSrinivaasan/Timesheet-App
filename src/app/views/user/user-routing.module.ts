import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users',
    },
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
