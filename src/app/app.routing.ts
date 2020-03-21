import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  {
    path: '', // calls when localhost:4200/
    redirectTo: 'dashboard', // calls ln 32
    pathMatch: 'full',
    canActivate: [AuthGuardService], // calls the canActivate function ln 12
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            m => m.DashboardModule
          ),
      },
      {
        path: 'project',
        loadChildren: () =>
          import('./views/project/project.module').then(m => m.ProjectModule),
      },
      {
        path: 'phase',
        loadChildren: () =>
          import('./views/phase/phase.module').then(m => m.PhaseModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./views/user/user.module').then(m => m.UserModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
