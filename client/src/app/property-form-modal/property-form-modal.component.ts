import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ElevatorPresence, OwnershipStatus, PropertyStatus, PropertyType } from '../properties/properties.component';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
      nickname: ['', Validators.required],
      propertyType: ['', Validators.required],
      ownershipStatus: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      blockNumber: ['', Validators.required],
      floor: [null],
      floorsCount: [null],
      apartmentNumber: ['', Validators.required],
      elevator: ['', Validators.required],
      sizeUtil: [null, Validators.required],
      sizeYard: [0],
      bedRooms: [null, Validators.required],
      bathNumber: [null, Validators.required],
      propertyStatus: ['', Validators.required],
      datePurchase: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      this.save.emit(this.propertyForm.value);
      this.propertyForm.reset();
    }
  }

  onClose() {
    this.close.emit();
  }
}
