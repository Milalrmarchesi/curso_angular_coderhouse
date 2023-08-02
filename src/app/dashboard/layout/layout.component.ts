import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.navigate(['/dashboard', 'home'], {});
  }

  abrirAlumnos(){
    this.router.navigate(['/dashboard', 'alumnos']);
  }
  abrirHome(){
    this.router.navigate(['/dashboard', 'home'], {});
  }
  abrirClases(){
    this.router.navigate(['/dashboard', 'clases']);
  }

  abrirCursos(){
    this.router.navigate(['/dashboard', 'cursos']);
  }

  logout(): void {
    this.router.navigate(['auth', 'login'], {})
  }
}

