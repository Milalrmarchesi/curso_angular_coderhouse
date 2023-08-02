import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { 
        path: 'alumnos', 
        loadChildren: () => import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule) 
      },
      {
        path: 'home',
        component: HomeComponent
      },
      { 
        path: 'clases', 
        loadChildren: () => import('./pages/clases/clases.module').then((m) => m.ClasesModule) 
      },
      { 
        path: 'cursos', 
        loadChildren: () => import('./pages/cursos/cursos.module').then((m) => m.CursosModule) 
      },                      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}