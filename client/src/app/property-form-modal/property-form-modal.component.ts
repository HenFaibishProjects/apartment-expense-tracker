import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiBase } from '../../config';
import { ElevatorPresence, OwnershipStatus, PropertyStatus, PropertyType } from '../models/property.model';
import Swal from 'sweetalert2';

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
export class PropertyFormModalComponent implements OnInit {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Output() propertySaved = new EventEmitter<void>();
  @Input() initialData?: any;

  propertyForm: FormGroup;

  propertyTypes = Object.values(PropertyType);
  ownershipStatuses = Object.values(OwnershipStatus);
  elevatorOptions = Object.values(ElevatorPresence);
  propertyStatuses = Object.values(PropertyStatus);

  constructor(private fb: FormBuilder, private http: HttpClient) {
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

  ngOnInit() {
    if (this.initialData) {
      // Format the date properly for the date input
      const formattedData = {
        ...this.initialData,
        datePurchase: this.initialData.datePurchase
          ? this.formatDateForInput(this.initialData.datePurchase)
          : ''
      };

      this.propertyForm.patchValue(formattedData);
    }
  }

  // Helper method to format date for HTML date input
  private formatDateForInput(date: Date | string | null): string {
    if (!date) return '';

    const dateObj = date instanceof Date ? date : new Date(date);

    // Check if date is valid
    if (isNaN(dateObj.getTime())) return '';

    // Format to YYYY-MM-DD
    return dateObj.toISOString().split('T')[0];
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


      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      // Determine if this is an edit or create operation
      const isEdit = this.initialData && this.initialData.id;
      const apiUrl = isEdit
        ? `${apiBase}/properties/${this.initialData.id}`
        : `${apiBase}/properties`;

      const httpMethod = isEdit ? 'put' : 'post';

      this.http[httpMethod](apiUrl, payload, { headers }).subscribe({
        next: () => {
          this.propertyForm.reset();
          this.close.emit();
          this.propertySaved.emit();
          httpMethod === 'put' ?
            Swal.fire({
              icon: 'success',
              title: 'Edit Property Successful!',
            }):
            Swal.fire({
              icon: 'success',
              title: 'Add Property Successful!',
            })
        },

        error: (err) => {
          console.error('Failed to save property', err); // Keep your console log for debugging

          if (err.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Authentication Required',
              text: 'You must be logged in to perform this action.'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Save Failed',
              text: 'Failed to save property. Please try again later.'
            });
          }
        }
      });
    }
  }

  onClose() {
    this.close.emit();
  }

  blockInvalidChar(event: KeyboardEvent) {
    if (['e', 'E', '+', '-'].includes(event.key)) {
      event.preventDefault();
    }
  }
}
