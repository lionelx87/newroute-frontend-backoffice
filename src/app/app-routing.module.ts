import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { LoggedInAuthGuard } from './modules/auth/guards/logged-in-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
