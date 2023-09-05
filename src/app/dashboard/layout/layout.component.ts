import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../pages/users/models/user';
import { Store } from '@ngrx/store';
import { authUserLogout } from 'src/app/store/auth/auth.actions';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

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
  isAdmin$: Observable<boolean> = new Observable();

  constructor(
    private store:Store<any>,
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private authService: AuthService
  ) {
    this.subscription = this.authService.sessionObservable.subscribe((value) => {
      this.currentUserSession = value;
      this.currentUser = value.name;
    });
    
    this.isAdmin$ = this.store.select(selectIsAdmin);
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

  abrirCursos(){
    this.router.navigate(['/dashboard', 'cursos']);
  }

  abrirUsuarios(): void {
    this.router.navigate(['/dashboard', 'usuarios']);
  }

  abrirInscripciones(): void {
    this.router.navigate(['/dashboard', 'inscripciones']);
  }

  logout(): void {
    this.router.navigate(['auth', 'login'], {})
    this.store.dispatch(authUserLogout());
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

