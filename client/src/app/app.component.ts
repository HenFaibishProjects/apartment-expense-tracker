import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  email = '';
  password = '';
  token = '';

  constructor(private http: HttpClient) {}

  login() {
    console.log('email:' + this.email , '  password:' + this.password)
    this.http.post<{ access_token: string }>('http://localhost:3000/api/auth/login', {
      email: this.email,
      password: this.password,
    }).subscribe({
      next: res => {
        this.token = res.access_token;
        localStorage.setItem('token', res.access_token);

        this.http.get<any[]>('http://localhost:3000/apartments').subscribe({
          next: data => {
            console.log('Apartments:', data);
          },
          error: err => {
            console.error('Auth OK but GET failed', err);
          }
        });
      },
      error: () => alert('Login failed')
    });
  }
}
