import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseInterface } from '../../models/curso.interface';
import { CursosService } from '../../services/cursos.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleCursoComponent } from '../detalle-curso/detalle-curso.component';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../../users/models/user';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent {
  dataSource$!: Observable<CourseInterface[]>;
  studentForm!: FormGroup;
  dataLoaded: boolean = false;
  searchForm!: FormGroup;
  filteredStudents$!: Observable<CourseInterface[]>;
  students: CourseInterface[] = [];
  currentUserSession!: User;
  private subscription: Subscription;  
  isAdmin$: Observable<boolean> = new Observable();

  constructor(private store:Store<any>, private formBuilder: FormBuilder, private cursosService: CursosService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.subscription = this.authService.sessionObservable.subscribe((value) => {
      this.currentUserSession = value;
    });  
  }

  ngOnInit() {
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.loadStudents();
    this.initializeForm();
    this.initializeSearch();
    
  }
  
  loadStudents() {
    this.dataLoaded = false;
  
    this.cursosService.getData().subscribe((studentsArray) => {
      this.students = studentsArray;
      this.filteredStudents$ = of(studentsArray);
      this.dataSource$ = of(studentsArray);   
      this.dataLoaded = true;
    });
  }

  initializeForm() {

    this.studentForm = this.formBuilder.group({
      subject: [null, Validators.required],
      classes: [null, Validators.required]
    });

    this.searchForm = this.formBuilder.group({
      searchQuery: ['']
    });

    const searchControl = this.searchForm.get('searchQuery');

    if (searchControl) {
      this.filteredStudents$ = searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300), 
        distinctUntilChanged(), 
        map((query: string) => this.filterStudents(query))
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
        map((query: string) => this.filterStudents(query))
      ).subscribe(filteredStudents => {
        this.filteredStudents$ = of(filteredStudents);
      });
    }
  }

  filterStudents(query: string) {
    if (this.students) {
      return this.students.filter(
        (student: CourseInterface) =>
          student.subject.toLowerCase().includes(query.toLowerCase())
      );
    }
    return [];
  }

  addNewStudent(){
    this.router.navigate(['agregar'], { relativeTo: this.route });
  }

  editStudent(student:CourseInterface){
    this.cursosService.current = student;
    this.router.navigate(['editar'], { relativeTo: this.route });
  }

  deleteStudent(student_id: number) {
    // Se borra "on the fly" para evitar la recarga. Luego mediante el servicio se elimina 
    // de los datos del mock. 
    this.filteredStudents$ = this.filteredStudents$.pipe(
      map((students) => students.filter((student) => student.id !== student_id))
    );
    this.cursosService.deleteStudent(student_id);
  }

  showStudentDetails(student_param: CourseInterface) {
    const dialogRef = this.dialog.open(DetalleCursoComponent, {
      width: '30rem',
      data: student_param 
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
