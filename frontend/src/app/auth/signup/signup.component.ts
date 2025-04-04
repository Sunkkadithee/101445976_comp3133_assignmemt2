import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) return;

    const { username, email, password } = this.signupForm.value;

    this.authService.signup(username, email, password).subscribe({
      next: (res) => {
        this.message = res.message || 'Signup successful';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 1500); // redirect after delay
      },
      error: (err) => {
        this.errorMessage = err.message || 'Signup failed';
        this.message = '';
      },
    });
  }
}
