import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../shared/guards/auth-guard.service';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Entries',
      // roles: ['admin'],
    },
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: 'Entry List',
          // roles: ['admin'],
        },
      },
      {
        path: 'add',
        component: AddComponent,
        data: {
          title: 'Add Entry',
          // roles: ['user'],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryRoutingModule {}
