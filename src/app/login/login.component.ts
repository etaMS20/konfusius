import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GuestAuth } from '../services/auth.model';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly fb = inject(UntypedFormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly pw: string = 'miaumiau';
  loginForm: any;
  redirectUrl: string | null = null;

  constructor() {
    this.loginForm = this.fb.group({
      password: new FormControl('', [
        Validators.required,
        // this.passwordValidator.bind(this),
      ]),
      remember: [true],
    });
  }

  ngOnInit(): void {
    this.redirectUrl = this.route.snapshot.queryParamMap.get('redirect');
    this.loginForm.controls['password'].markAsTouched();
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  get errorMessage(): string {
    const control = this.loginForm.get('password');
    if (control?.hasError('required')) {
      return 'Passwort ist erforderlich';
    }
    if (control?.hasError('incorrect')) {
      return 'Falsches Passwort';
    }
    return '';
  }

  updateErrorMessage() {
    const passwordControl = this.loginForm.controls['password'];
    if (passwordControl.invalid && passwordControl.touched) {
      // You can manually set or update error messages here if needed
    }
  }

  onInput() {
    this.loginForm.controls['password'].markAsTouched();
  }

  onSubmit(): void {
    const password = this.loginForm.get('password')?.value;

    this.auth.authenticateGuest(password).subscribe({
      next: (response: GuestAuth) => {
        sessionStorage.setItem('auth', JSON.stringify(response));
        const targetRoute = this.redirectUrl ? this.redirectUrl : '/';
        this.router.navigate([targetRoute]);
      },
      error: (error) => {
        if (error.status === 403) {
          this.loginForm.get('password')?.setErrors({ incorrect: true });
          this.loginForm.controls['password'].markAsTouched();
        } else {
          alert('An error occurred. Please try again later.');
        }
      },
    });
  }
}
