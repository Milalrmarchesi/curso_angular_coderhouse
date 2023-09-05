import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectListUsers } from 'src/app/store/users/users.selectors';
import { userListLoad } from 'src/app/store/users/users.actions';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})

export class ListaUsuariosComponent {
  studentForm!: FormGroup;
  dataLoaded: boolean = false;
  searchForm!: FormGroup;
  currentUserSession!: User;
  users$: Observable<any> = new Observable();

  constructor(private store:Store<any>, private formBuilder: FormBuilder) {}
  
  ngOnInit() {
    this.users$ = this.store.select(selectListUsers);
    console.log("Dispatching store of users: ")
    this.store.dispatch(userListLoad({ users: null }));
  }
  
}
