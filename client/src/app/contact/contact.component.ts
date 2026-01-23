import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true
})
export class ContactComponent {
  primaryEmail = 'support@apartmenttracker.com';
  phoneNumber = '(555) 013-8724';
  officeHours = 'Mon–Fri, 9:00 AM – 6:00 PM';
}
