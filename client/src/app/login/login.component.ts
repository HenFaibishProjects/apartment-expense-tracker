import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiBase } from '../../config';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  loginEmail = '';
  loginPassword = '';
  registerName = '';
  registerEmail = '';
  registerPassword = '';
  confirmPassword = '';
  forgotEmail = '';
  authMessage = '';
  loginError = '';
  registerPhone = '';
  selectedCountryCode = '+972';
  activeTab = 'login';

  constructor(private http: HttpClient, private router: Router) {}

  switchTab(tab: string) {
    this.activeTab = tab;
    this.loginError = '';
    this.authMessage = '';
  }

  loginSubmit() {
    const payload = {
      email: this.loginEmail,
      password: this.loginPassword,
    };
    this.http.post<any>(`${apiBase}/auth/login`, payload).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem(
          'user',
          JSON.stringify({
            fullName: res.fullName,
            email: res.email,
          })
        );
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loginError = err.error?.message || 'Login failed';
      },
    });
  }


  showSuccessModal() {
    const modalElement = document.getElementById('registrationSuccessModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();

      modalElement.addEventListener('hidden.bs.modal', () => {
        this.switchTab('login');
        const loginTabElement = document.querySelector('#login-tab');
        if (loginTabElement) {
          const triggerTab = new bootstrap.Tab(loginTabElement);
          triggerTab.show();
        }
      });
    } else {
      alert('✅ Registration successful! Please check your email.');
      this.switchTab('login');
    }
  }

  registerSubmit() {
    console.log("clicked");
    const name = this.registerName.trim();
    const email = this.registerEmail.trim();
    const password = this.registerPassword.trim();
    const confirmPassword = this.confirmPassword.trim();
    const phone = this.registerPhone.trim();

    // Password validation
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    if (!isValid) {
      this.authMessage = '❌ Password must be at least 8 characters long and include upper, lower case letters and a number.';
      return;
    }

    // Password confirmation check
    if (password !== confirmPassword) {
      this.authMessage = '❌ New password and confirmation do not match.';
      return;
    }

    const payload = {
      fullName: name,
      email: email,
      password: password,
      phone: phone
    };

    this.http.post(`${apiBase}/auth/register`, payload, { responseType: 'text' }).subscribe({
      next: (data) => {
        console.log("Success");
        this.showSuccessModal();
      },
      error: (err) => {
        const msg = err.error?.message || 'Registration failed';
        this.authMessage = '❌ ' + msg;
        console.log("error");
      },
    });
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  forgotPasswordSubmit() {
    if (!this.forgotEmail) {
      alert('Please enter your email.');
      return;
    }

    this.http
      .post('/api/auth/request-reset-password', { email: this.forgotEmail })
      .subscribe({
        next: () => {
          this.router.navigate([
            '/afterChangePw',
            { email: this.forgotEmail },
          ]);
        },
        error: () => {
          alert('❌ Failed to send reset link. Try again.');
        },
      });
  }

  // Social login functions
  socialLogin(provider: string) {
    // This will be called when login tab is active
    console.log(`Social login with ${provider}`);
    // TODO: Implement your social login logic here
    // Example: this.authService.socialLogin(provider);
  }

  socialRegister(provider: string) {
    // This will be called when register tab is active
    console.log(`Social register with ${provider}`);
    // TODO: Implement your social register logic here
    // Example: this.authService.socialRegister(provider);
  }

  // Helper method to handle social button clicks
  handleSocialClick(provider: string) {
    if (this.activeTab === 'login') {
      this.socialLogin(provider);
    } else if (this.activeTab === 'register') {
      this.socialRegister(provider);
    }
  }

  onPhoneValidationChange(isValid: boolean) {
    console.log('Phone is valid:', isValid);
  }
}
