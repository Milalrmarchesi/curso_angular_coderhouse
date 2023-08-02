import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClasesComponent } from './pages/lista-clases/lista-clases.component'; 
import { EdicionClasesComponent } from './pages/edicion-clases/edicion-clases.component'; 
import { AgregarClasesComponent } from './pages/agregar-clases/agregar-clases.component';
import { DetalleClasesComponent } from './pages/detalle-clases/detalle-clases.component'; 

const routes: Routes = [
  { path: '', component: ListaClasesComponent },
  { path: 'editar', component: EdicionClasesComponent },
  { path: 'agregar', component: AgregarClasesComponent },
  { path: 'detalle/:id', component: DetalleClasesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesRoutingModule {}