import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { UsersRoutingModule } from './pages/users-routing.module';

@NgModule({
  declarations: [
    ListaUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  exports: [
    ListaUsuariosComponent
  ]
})
export class UsersModule { }
