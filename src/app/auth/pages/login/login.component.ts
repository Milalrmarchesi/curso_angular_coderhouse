import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authUserLogin } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
    localStorage.setItem('token', '');
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const userId = this.loginForm.value.userId;
      const password = this.loginForm.value.password;
      let user_data = await this.authService.login(userId, password);
      this.store.dispatch(authUserLogin({user: user_data["response"], token: user_data["token"]}))
    }    
  }
}