import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  isLogin = true; 
  loginData = { email: '', password: '' };
  registerData = {
    email: '', 
    password: '', 
    name: '', 
    phone: '', 
    agreedToTermsAndConditions: false, 
    consentForAdvertising: false
  };
  errorMessage: string = '';
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }

  onLogin() {
    if (this.loginData.email && this.loginData.password) {
      this.authService.login(this.loginData.email, this.loginData.password).subscribe(
        response => {
          if (response.token) {
            localStorage.setItem('currentUserToken', response.token);
            this.router.navigate(['/perfil']);
          }
        },
        error => {
          this.errorMessage = error.error?.message || 'Falha no login. Por favor, tente novamente.';
        }
      );
    }
  }

  onRegister() {
    if (!this.registerData.agreedToTermsAndConditions) {
      this.errorMessage = 'Você deve concordar com os Termos e Condições.';
      return;
    }

    const newClient = { ...this.registerData };

    this.authService.register(newClient).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        this.errorMessage = error.error?.message || 'Falha no registro. Por favor, tente novamente.';
      }
    );
  }
}