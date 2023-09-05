import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCursosComponent } from './pages/lista-curso/lista-cursos.component';
import { EdicionCursoComponent } from './pages/edicion-curso/edicion-curso.component';
import { AgregarCursoComponent } from './pages/agregar-curso/agregar-curso.component';

const routes: Routes = [
  { path: '', component: ListaCursosComponent },
  { path: 'editar', component: EdicionCursoComponent },
  { path: 'agregar', component: AgregarCursoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosRoutingModule {}