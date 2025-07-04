import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiBase } from '../../config';
import { ElevatorPresence, OwnershipStatus, PropertyStatus, PropertyType } from '../models/property.model';

@Component({
  selector: 'app-property-form-modal',
  templateUrl: './property-form-modal.component.html',
  styleUrls: ['./property-form-modal.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  standalone: true
})
export class PropertyFormModalComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Output() propertySaved = new EventEmitter<void>();


  propertyForm: FormGroup;

  propertyTypes = Object.values(PropertyType);
  ownershipStatuses = Object.values(OwnershipStatus);
  elevatorOptions = Object.values(ElevatorPresence);
  propertyStatuses = Object.values(PropertyStatus);

  constructor(private fb: FormBuilder, private http: HttpClient ) {
    this.propertyForm = this.fb.group({
      nickname: ['', Validators.required],
      propertyType: ['', Validators.required],
      ownershipStatus: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      blockNumber: ['', Validators.required],
      floor: [null],
      floorsCount: [null],
      apartmentNumber: [''],
      elevator: [null, Validators.required],
      sizeUtil: [null, Validators.required],
      sizeYard: [0],
      bedRooms: [null, Validators.required],
      bathNumber: [null, Validators.required],
      toilets: [null, Validators.required],
      propertyStatus: ['', Validators.required],
      datePurchase: ['', Validators.required],
      zip: [null]
    });
  }


  onSubmit() {
    if (this.propertyForm.valid) {
      const formData = this.propertyForm.value;

      const payload = {
        ...formData,
        floor: formData.floor ? +formData.floor : null,
        floorsCount: formData.floorsCount ? +formData.floorsCount : null,
        sizeUtil: +formData.sizeUtil,
        sizeYard: +formData.sizeYard,
        bedRooms: +formData.bedRooms,
        bathNumber: +formData.bathNumber,
        toilets: +formData.toilets,
        zip: formData.zip ? +formData.zip : null,
        datePurchase: formData.datePurchase
          ? new Date(formData.datePurchase).toISOString()
          : null,
      };
      console.log("ziiiiiiiiiiiiiip" , payload.zip)
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      this.http.post(`${apiBase}/properties`, payload, { headers }).subscribe({
        next: () => {
          this.propertyForm.reset();
          this.close.emit();
          this.propertySaved.emit();
        },
        error: (err) => {
          console.error('Failed to save property', err);
          if (err.status === 401) {
            alert('❌ You must be logged in to perform this action.');
          } else {
            alert('❌ Failed to save property. Please try again later.');
          }
        }
      });
    }
  }

  onClose() {
    this.close.emit();
  }
}
