import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentInterface } from './alumno.interface';
import { StudentsService } from '../services/students/students.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { StudentDetailComponent } from './student-detail/student-detail.component'


@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})


export class ListaAlumnosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullname', 'email', 'score', 'actions'];
  dataSource$!: Observable<StudentInterface[]>;
  showList:boolean = true;
  showAddForm:boolean = false;
  showEditForm:boolean = false;
  studentForm!: FormGroup;
  currentStudent!: StudentInterface;
  studentEditForm!: FormGroup;
  dataLoaded: boolean = false;
  searchForm!: FormGroup;
  filteredStudents$!: Observable<StudentInterface[]>;
  students: StudentInterface[] = [];


  constructor(private formBuilder: FormBuilder, private studentsService: StudentsService, private dialog: MatDialog) {}

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
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      score: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
    });

    this.studentEditForm = this.formBuilder.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      score: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
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
          student.name.toLowerCase().includes(query.toLowerCase()) ||
          student.lastname.toLowerCase().includes(query.toLowerCase())
      );
    }
    return [];
  }

  saveStudent() {
    if (this.studentForm.valid) {
      const newStudent = this.studentForm.value;
      this.getNewStudentId().subscribe((id) => {
        newStudent['id'] = id;
      });
      console.log("newStudent['id']: ", newStudent['id']);
      newStudent['enabled'] = true;
  
      this.filteredStudents$ = this.filteredStudents$.pipe(
        map((students) => [...students, newStudent])
      );
  
      this.showList = true;
      this.showAddForm = false;
      this.showEditForm = false;
      this.studentForm.reset();
    }
  }

  saveEditedStudent() {
    if (this.studentEditForm.valid) {
      const editedStudent = this.studentEditForm.value;
      editedStudent['id'] = this.currentStudent.id;
  
      this.filteredStudents$ = this.filteredStudents$.pipe(
        map((students) => students.map((student) => (student.id !== editedStudent.id ? student : editedStudent)))
      );
  
      this.showList = true;
      this.showAddForm = false;
      this.showEditForm = false;
      this.studentEditForm.reset();
    }
  }
  
  addNewStudent(){
    this.showList = false;
    this.showAddForm = true;
    this.showEditForm = false;
  }

  editStudent(student:StudentInterface){
    this.showList = false;
    this.showAddForm = false;
    this.showEditForm = true;
    this.currentStudent = student;
    let data_to_set = {name: student.name, lastname: student.lastname, email: student.email, score: student.score}
    this.studentEditForm.setValue(data_to_set);
  }

  deleteStudent(student_id: number) {
    this.filteredStudents$ = this.filteredStudents$.pipe(
      map((students) => students.filter((student) => student.id !== student_id))
    );
  }

  getNewStudentId() {
    return this.dataSource$.pipe(
      map((students) => {
        let max_value = 0;
        for (let student of students) {
          if (student.id > max_value) {
            max_value = student.id;
          }
        }
        return max_value + 1;
      })
    );
  }


  showStudentDetails(student_param: StudentInterface) {
    let student_from_promise = this.studentsService.getStudentById(student_param.id);

    student_from_promise
      .then((student: StudentInterface | null) => {
        if (student) {
          console.log('Student found by id:', student);
          const dialogRef = this.dialog.open(StudentDetailComponent, {
            width: '30rem',
            data: student 
          });
        } else {
          console.log('No student was found with the provided ID.');
        }
      })
      .catch((error) => {
        console.error('Error getting student:', error);
      });
  }
  

}
