import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaInscripcionesComponent } from './pages/lista-inscripciones/lista-inscripciones.component'; 
import { MaterialModule } from '../../../modules/material/material.module';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListaInscripcionesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InscripcionesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class InscripcionesModule { }
