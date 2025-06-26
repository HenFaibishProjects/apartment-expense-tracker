import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent {
  constructor(private router: Router) {}

  addApartment() {
    console.log('Navigating to add apartment...');
    this.router.navigate(['/add-apartment']);
  }

  viewExpenses() {
    console.log('Navigating to expenses...');
    this.router.navigate(['/expenses']);
  }

  viewRentalStatus() {
    console.log('Viewing rental status...');
    this.router.navigate(['/rental-status']);
  }

  viewDocuments() {
    console.log('Navigating to documents...');
    this.router.navigate(['/documents']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
