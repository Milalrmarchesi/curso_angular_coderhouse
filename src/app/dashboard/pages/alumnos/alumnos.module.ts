import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAlumnosComponent } from './pages/lista-alumnos/lista-alumnos.component';
import { EdicionAlumnosComponent } from './pages/edicion-alumnos/edicion-alumnos.component';
import { AgregarAlumnosComponent } from './pages/agregar-alumnos/agregar-alumnos.component';
import { DetalleAlumnosComponent } from './pages/detalle-alumnos/detalle-alumnos.component';
import { MaterialModule } from '../../../modules/material/material.module';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListaAlumnosComponent,
    EdicionAlumnosComponent,
    AgregarAlumnosComponent,
    DetalleAlumnosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AlumnosRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AlumnosModule { }
