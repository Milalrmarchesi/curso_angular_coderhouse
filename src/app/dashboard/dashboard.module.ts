import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../modules/material/material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';
import { CursosModule } from './pages/cursos/cursos.module'; 
import { UsersModule } from './pages/users/users.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    AlumnosModule,
    InscripcionesModule,
    CursosModule,
    UsersModule
  ]
})
export class DashboardModule { }
