import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css'],
  standalone: false
})
export class ActivationComponent implements OnInit {
  email = '';
  code = '';
  result = '';
  isVerifying = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.code = params['code'] || '';
    });
  }

  verifyCode(): void {
    if (!this.email || !this.code) {
      this.result = '❌ Missing email or code.';
      return;
    }

    this.isVerifying = true;
    this.http.post<{ message?: string }>('/api/auth/verify-code', { email: this.email, code: this.code })
      .subscribe({
        next: (res) => {
          this.result = res.message || '✅ Verified!';
          // optionally redirect after 2 sec
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: () => {
          this.result = '❌ Verification failed.';
        },
        complete: () => {
          this.isVerifying = false;
        }
      });
  }
}
