import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../shared/guards/auth-guard.service';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'Projects',
      roles: ['admin'],
    },
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
