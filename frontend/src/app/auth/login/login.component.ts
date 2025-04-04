import { Component } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {NgIf} from '@angular/common';
//import { ApolloModule } from 'apollo-angular'; // ← Causing Problems

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    //ApolloModule, // Required to resolve Apollo injection
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Login failed';
      },
    });
  }
}
