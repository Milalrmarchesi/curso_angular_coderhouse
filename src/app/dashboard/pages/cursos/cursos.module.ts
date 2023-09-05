import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCursosComponent } from './pages/lista-curso/lista-cursos.component';
import { EdicionCursoComponent } from './pages/edicion-curso/edicion-curso.component';
import { AgregarCursoComponent } from './pages/agregar-curso/agregar-curso.component';
import { DetalleCursoComponent } from './pages/detalle-curso/detalle-curso.component';
import { MaterialModule } from '../../../modules/material/material.module';
import { AlumnosRoutingModule } from './cursos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListaCursosComponent,
    EdicionCursoComponent,
    AgregarCursoComponent,
    DetalleCursoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AlumnosRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CursosModule { }
