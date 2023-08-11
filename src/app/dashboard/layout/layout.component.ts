import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../pages/users/models/user';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  currentUserSession!: User;
  private subscription: Subscription; 
  currentRouteSegment: string = '';
  currentUser: string = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.subscription = this.authService.sessionObservable.subscribe((value) => {
      this.currentUserSession = value;
      this.currentUser = value.name;
    });    
    this.router.navigate(['/dashboard', 'home'], {});
  }

  ngOnInit() {
    this.currentRouteSegment = this.getLastRouteSegment();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRouteSegment = this.getLastRouteSegment();
      console.log("this.currentRouteSegment", this.currentRouteSegment);
    });
  }

  private getLastRouteSegment(): string {
    const segments = location.href.split("/");
    if (segments.length > 0) {
      return segments.pop()!;
    }
    return '';

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  check_admin(){
    return 'role' in this.currentUserSession && this.currentUserSession['role'] == 'admin'
  }
}

