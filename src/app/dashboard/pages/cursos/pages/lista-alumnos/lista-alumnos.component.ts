import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentInterface } from '../../interfaces/student.interface';
import { AlumnosService } from '../../services/alumnos.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleAlumnosComponent } from '../detalle-alumnos/detalle-alumnos.component';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})
export class ListaAlumnosComponent {
  dataSource$!: Observable<StudentInterface[]>;
  studentForm!: FormGroup;
  dataLoaded: boolean = false;
  searchForm!: FormGroup;
  filteredStudents$!: Observable<StudentInterface[]>;
  students: StudentInterface[] = [];
  
  constructor(private formBuilder: FormBuilder, private studentsService: AlumnosService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadStudents();
    this.initializeForm();
    this.initializeSearch();
    
  }
  
  loadStudents() {
    this.dataLoaded = false;
  
    this.studentsService.getData().subscribe((studentsArray) => {
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
        (student: StudentInterface) =>
          student.subject.toLowerCase().includes(query.toLowerCase())
      );
    }
    return [];
  }

  addNewStudent(){
    this.router.navigate(['agregar'], { relativeTo: this.route });
  }

  editStudent(student:StudentInterface){
    this.studentsService.current = student;
    this.router.navigate(['editar'], { relativeTo: this.route });
  }

  deleteStudent(student_id: number) {
    // Se borra "on the fly" para evitar la recarga. Luego mediante el servicio se elimina 
    // de los datos del mock. 
    this.filteredStudents$ = this.filteredStudents$.pipe(
      map((students) => students.filter((student) => student.id !== student_id))
    );
    this.studentsService.deleteStudent(student_id);
  }

  showStudentDetails(student_param: StudentInterface) {
    const dialogRef = this.dialog.open(DetalleAlumnosComponent, {
      width: '30rem',
      data: student_param 
    });
  }
}
