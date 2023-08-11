import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasesInterface } from '../../interfaces/clases.interface';
import { ClasesService } from '../../services/clases.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleClasesComponent } from '../detalle-clases/detalle-clases.component';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../../users/models/user';

@Component({
  selector: 'app-lista-clases',
  templateUrl: './lista-clases.component.html',
  styleUrls: ['./lista-clases.component.scss']
})
export class ListaClasesComponent {
  dataSource$!: Observable<ClasesInterface[]>;
  claseForm!: FormGroup;
  dataLoaded: boolean = false;
  searchForm!: FormGroup;
  filteredClases$!: Observable<ClasesInterface[]>;
  clases: ClasesInterface[] = [];
  currentUserSession!: User;
  private subscription: Subscription;  

  constructor(private formBuilder: FormBuilder, private clasesService: ClasesService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.subscription = this.authService.sessionObservable.subscribe((value) => {
      this.currentUserSession = value;
    });
  }
  ngOnInit() {
    this.loadClases();
    this.initializeForm();
    this.initializeSearch();
    
  }
  
  loadClases() {
    this.dataLoaded = false;
  
    this.clasesService.getData().subscribe((clasesArray) => {
      this.clases = clasesArray;
      this.filteredClases$ = of(clasesArray);
      this.dataSource$ = of(clasesArray);   
      this.dataLoaded = true;
    });
  }

  initializeForm() {

    this.claseForm = this.formBuilder.group({
      subject: [null, Validators.required],
      teacher: [null, [Validators.required]],
      schedule: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
    });

    this.searchForm = this.formBuilder.group({
      searchQuery: ['']
    });

    const searchControl = this.searchForm.get('searchQuery');

    if (searchControl) {
      this.filteredClases$ = searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300), 
        distinctUntilChanged(), 
        map((query: string) => this.filterClases(query))
      );
    }
  }

  initializeSearch() {
    const searchControl = this.searchForm.get('searchQuery');
  
    if (searchControl) {
      searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        map((query: string) => this.filterClases(query))
      ).subscribe(filteredClases => {
        this.filteredClases$ = of(filteredClases);
      });
    }
  }

  filterClases(query: string) {
    if (this.clases) {
      return this.clases.filter(
        (clase: ClasesInterface) =>
          clase.subject.toLowerCase().includes(query.toLowerCase()) ||
          clase.teacher.toLowerCase().includes(query.toLowerCase())
      );
    }
    return [];
  }

  addNewClase(){
    this.router.navigate(['agregar'], { relativeTo: this.route });
  }

  editClase(clase:ClasesInterface){
    this.clasesService.current = clase;
    this.router.navigate(['editar'], { relativeTo: this.route });
  }

  deleteClase(clase_id: number) {
    // Se borra "on the fly" para evitar la recarga. Luego mediante el servicio se elimina 
    // de los datos del mock. 
    this.filteredClases$ = this.filteredClases$.pipe(
      map((clases) => clases.filter((clase) => clase.id !== clase_id))
    );
    this.clasesService.deleteClase(clase_id);
  }

  showClaseDetails(clase_param: ClasesInterface) {
    const dialogRef = this.dialog.open(DetalleClasesComponent, {
      width: '30rem',
      data: clase_param 
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  check_admin(){
    return 'role' in this.currentUserSession && this.currentUserSession['role'] == 'admin'
  }

}
