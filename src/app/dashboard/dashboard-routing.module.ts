import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    { 
      path: 'alumnos', 
      loadChildren: () => import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule) 
    },
    {
      path: 'home',
      component: HomeComponent
    },
    { 
      path: 'inscripciones', 
      loadChildren: () => import('./pages/inscripciones/inscripciones.module').then((m) => m.InscripcionesModule) 
    },
    { 
      path: 'cursos', 
      loadChildren: () => import('./pages/cursos/cursos.module').then((m) => m.CursosModule) 
    },
    { 
      path: 'usuarios', 
      loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule) 
    },                             
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}