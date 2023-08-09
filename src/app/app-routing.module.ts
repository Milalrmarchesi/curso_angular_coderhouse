import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { authGuard } from './core/guards/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './dashboard/layout/layout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: LayoutComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    // ** Se usa para decir "cualquier path que no sea ninguno de los declarados anteriormente"
    path: '**',
    redirectTo: '/auth/login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
