import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ElevatorPresence, OwnershipStatus, PropertyStatus, PropertyType } from '../properties/properties.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { apiBase } from '../../config';

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
      propertyStatus: ['', Validators.required],
      datePurchase: ['', Validators.required],
      zipCode: [null]
    });
  }

  onSubmit() {
    if (1===1) {
      const formData = this.propertyForm.value;

      const payload = {
        ...formData,
        floor: formData.floor ? +formData.floor : null,
        floorsCount: formData.floorsCount ? +formData.floorsCount : null,
        sizeUtil: +formData.sizeUtil,
        sizeYard: +formData.sizeYard,
        bedRooms: +formData.bedRooms,
        bathNumber: +formData.bathNumber,
        zip: formData.zip ? +formData.zip : null,
        datePurchase: formData.datePurchase ? new Date(formData.datePurchase).toISOString() : null,
      };
      console.log('🚨 elevator raw form value:', this.propertyForm.get('elevator')?.value);
      console.log('🚨 payload elevator value:', payload.elevator);
      console.log("payload: " + JSON.stringify(payload));
      this.http.post(`${apiBase}/properties`, payload).subscribe({
        next: () => {
          this.propertyForm.reset();
          this.close.emit(); // close modal
        },
        error: err => {
          console.error('Failed to save property', err);
        }
      });
    }
  }


  onClose() {
    this.close.emit();
  }


}
