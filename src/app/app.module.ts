import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { LayoutComponent } from './layout/layout.component';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { HomeComponent } from './home/home.component';
import { FullnamePipe } from './lista-alumnos/fullname.pipe';
import { BigTitleDirective } from './lista-alumnos/big-title.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentDetailComponent } from './lista-alumnos/student-detail/student-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ListaAlumnosComponent,
    HomeComponent,
    FullnamePipe,
    BigTitleDirective,
    StudentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
