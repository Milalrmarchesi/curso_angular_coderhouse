import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  showHome:boolean = true;
  showAlumnos:boolean =false;

  abrirAlumnos(){
    this.showAlumnos=true;
    this.showHome=false;
  }
  abrirHome(){
    this.showHome=true;
    this.showAlumnos=false;
  }
}

