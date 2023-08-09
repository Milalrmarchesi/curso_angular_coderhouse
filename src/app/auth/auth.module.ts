import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../modules/material/material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    RouterModule, 
    AuthRoutingModule,
    MaterialModule, 
    ReactiveFormsModule,
    HttpClientModule, 
  ]
})
export class AuthModule { }
