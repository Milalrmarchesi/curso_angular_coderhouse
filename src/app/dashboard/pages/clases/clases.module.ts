import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaClasesComponent } from './pages/lista-clases/lista-clases.component'; 
import { EdicionClasesComponent } from './pages/edicion-clases/edicion-clases.component'; 
import { AgregarClasesComponent } from './pages/agregar-clases/agregar-clases.component';
import { DetalleClasesComponent } from './pages/detalle-clases/detalle-clases.component';
import { MaterialModule } from '../../../modules/material/material.module';
import { ClasesRoutingModule } from './clases-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListaClasesComponent,
    EdicionClasesComponent,
    AgregarClasesComponent,
    DetalleClasesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ClasesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ClasesModule { }
