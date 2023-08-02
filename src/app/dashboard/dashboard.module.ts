import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../modules/material/material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AlumnosModule } from './pages/alumnos/alumnos.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    AlumnosModule
  ]
})
export class DashboardModule { }
