import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { apiBase } from '../../config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent {
  email = '';
  password = '';
  token = '';

  constructor(private http: HttpClient, private router: Router) {}


  login() {
    console.log('email:' + this.email, '  password:' + this.password);
    this.http.post<{ access_token: string }>(`${apiBase}/api/auth/login`, {
      email: this.email,
      password: this.password,
    }).subscribe({
      next: res => {
        this.token = res.access_token;
        localStorage.setItem('token', res.access_token);
        this.router.navigate(['/dashboard']);  // Navigate directly to dashboard
      },
      error: () => alert('Login failed')
    });
  }
}
