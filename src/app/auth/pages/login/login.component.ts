import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) {
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
    localStorage.setItem('token', '');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userId = this.loginForm.value.userId;
      const password = this.loginForm.value.password;
      this.authService.login(userId, password);
    }    
  }
}