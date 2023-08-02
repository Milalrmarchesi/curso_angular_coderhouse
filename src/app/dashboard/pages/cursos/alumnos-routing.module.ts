import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosComponent } from './pages/lista-alumnos/lista-alumnos.component';
import { EdicionAlumnosComponent } from './pages/edicion-alumnos/edicion-alumnos.component';
import { AgregarAlumnosComponent } from './pages/agregar-alumnos/agregar-alumnos.component';

const routes: Routes = [
  { path: '', component: ListaAlumnosComponent },
  { path: 'editar', component: EdicionAlumnosComponent },
  { path: 'agregar', component: AgregarAlumnosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosRoutingModule {}