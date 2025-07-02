// property-management.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  UNDER_CONSTRUCTION = 'UNDER_CONSTRUCTION',
  UNDER_RENOVATION = 'UNDER_RENOVATION',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
  OFF_MARKET = 'OFF_MARKET',
}

export enum OwnershipStatus {
  OWNED = 'OWNED',
  MORTGAGED = 'MORTGAGED',
  RENTED = 'RENTED',
  LEASED = 'LEASED',
  INHERITED = 'INHERITED',
  TRANSFER_PENDING = 'TRANSFER_PENDING',
  SOLD = 'SOLD',
  OTHER = 'OTHER',
}

export enum ElevatorPresence {
  YES = 'YES',
  NO = 'NO',
  PLANNED = 'PLANNED',
  NOT_REQUIRED = 'NOT_REQUIRED',
  UNKNOWN = 'UNKNOWN',
}

export enum PropertyType {
  APARTMENT = 'Apartment',
  HOUSE = 'House',
  DUPLEX = 'Duplex',
  PENTHOUSE = 'Penthouse',
  STUDIO = 'Studio',
  VILLA = 'Villa',
  TOWNHOUSE = 'Townhouse',
  COTTAGE = 'Cottage',
  LOFT = 'Loft',
  BUNGALOW = 'Bungalow',
  FARMHOUSE = 'Farmhouse',
  COMMERCIAL = 'Commercial',
  OFFICE = 'Office',
  WAREHOUSE = 'Warehouse',
  OTHER = 'Other',
}

export interface PropertyData {
  id?: number;
  nickname: string;
  ownershipStatus: OwnershipStatus;
  propertyType: PropertyType;
  city: string;
  street: string;
  blockNumber: string;
  floor: number | null;
  floorsCount: number | null;
  apartmentNumber: string;
  elevator: ElevatorPresence;
  sizeUtil: number;
  sizeYard: number;
  bedRooms: number;
  bathNumber: number;
  propertyStatus: PropertyStatus;
  datePurchase: Date | null;
  dateOfSell: Date | null;
  zip:number;
}

@Component({
  selector: 'app-property-management',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
  standalone: false
})
export class PropertyManagementComponent implements OnInit {
  modalVisible = false;
  properties: PropertyData[] = [];
  filteredProperties: PropertyData[] = [];
  propertyForm: FormGroup;
  isModalOpen = false;
  isEditMode = false;
  editingPropertyId: number | null = null;
  searchTerm = '';
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Enum values for dropdowns
  propertyStatuses = Object.values(PropertyStatus);
  ownershipStatuses = Object.values(OwnershipStatus);
  elevatorOptions = Object.values(ElevatorPresence);
  propertyTypes = Object.values(PropertyType);

  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(2)]],
      ownershipStatus: ['', Validators.required],
      propertyType: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      blockNumber: ['', Validators.required],
      floor: [null],
      floorsCount: [null],
      apartmentNumber: ['', Validators.required],
      elevator: ['', Validators.required],
      sizeUtil: [0, [Validators.required, Validators.min(0)]],
      sizeYard: [0, [Validators.min(0)]],
      bedRooms: [0, [Validators.required, Validators.min(0)]],
      bathNumber: [0, [Validators.required, Validators.min(0)]],
      propertyStatus: ['', Validators.required],
      datePurchase: [null],
      dateOfSell: [null],
      zip:312335
    });
  }

  ngOnInit() {
    this.loadSampleData();
    this.filteredProperties = [...this.properties];
  }

  loadSampleData() {
    this.properties = [
      {
        id: 1,
        nickname: 'Downtown Apartment',
        ownershipStatus: OwnershipStatus.OWNED,
        propertyType: PropertyType.APARTMENT,
        city: 'Tel Aviv',
        street: 'Rothschild Blvd',
        blockNumber: '15',
        floor: 3,
        floorsCount: 8,
        apartmentNumber: '12',
        elevator: ElevatorPresence.YES,
        sizeUtil: 85.5,
        sizeYard: 0,
        bedRooms: 2,
        bathNumber: 1,
        propertyStatus: PropertyStatus.OCCUPIED,
        datePurchase: new Date('2020-05-15'),
        dateOfSell: null,
        zip: 774242
      },
      {
        id: 2,
        nickname: 'Seaside Villa',
        ownershipStatus: OwnershipStatus.MORTGAGED,
        propertyType: PropertyType.VILLA,
        city: 'Herzliya',
        street: 'Beach Road',
        blockNumber: '42',
        floor: null,
        floorsCount: 2,
        apartmentNumber: '1',
        elevator: ElevatorPresence.NOT_REQUIRED,
        sizeUtil: 180,
        sizeYard: 150,
        bedRooms: 4,
        bathNumber: 3,
        propertyStatus: PropertyStatus.AVAILABLE,
        datePurchase: new Date('2022-01-10'),
        dateOfSell: null,
        zip: 338982
      }
    ];
    this.filteredProperties = [...this.properties];
  }

  getCountByStatus(status: PropertyStatus): number {
    return this.filteredProperties.filter(p => p.propertyStatus === status).length;
  }

  getCountByOwnership(status: OwnershipStatus): number {
    return this.filteredProperties.filter(p => p.ownershipStatus === status).length;
  }

  openAddModal() {
    this.modalVisible = true;
    document.body.style.overflow = 'hidden';
  }

  onModalClose() {
    this.modalVisible = false;
    document.body.style.overflow = 'auto';
  }

  private generateId(): number {
    return Math.max(0, ...this.properties.map(p => p.id || 0)) + 1;
  }

  onPropertySave(newProperty: PropertyData) {
    this.properties.push({ ...newProperty, id: this.generateId() });
    this.modalVisible = false;
  }

  openEditModal(property: PropertyData) {
    this.isEditMode = true;
    this.editingPropertyId = property.id!;
    this.propertyForm.patchValue({
      ...property,
      datePurchase: property.datePurchase ? this.formatDateForInput(property.datePurchase) : null,
      dateOfSell: property.dateOfSell ? this.formatDateForInput(property.dateOfSell) : null
    });
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.propertyForm.reset();
  }

  saveProperty() {
    if (this.propertyForm.valid) {
      const formValue = this.propertyForm.value;
      const property: PropertyData = {
        ...formValue,
        datePurchase: formValue.datePurchase ? new Date(formValue.datePurchase) : null,
        dateOfSell: formValue.dateOfSell ? new Date(formValue.dateOfSell) : null
      };

      if (this.isEditMode && this.editingPropertyId) {
        const index = this.properties.findIndex(p => p.id === this.editingPropertyId);
        if (index !== -1) {
          this.properties[index] = { ...property, id: this.editingPropertyId };
        }
      } else {
        property.id = Math.max(...this.properties.map(p => p.id || 0), 0) + 1;
        this.properties.push(property);
      }

      this.applyFilters();
      this.closeModal();
    }
  }

  deleteProperty(id: number) {
    if (confirm('Are you sure you want to delete this property?')) {
      this.properties = this.properties.filter(p => p.id !== id);
      this.applyFilters();
    }
  }

  applyFilters() {
    let filtered = [...this.properties];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(property =>
        property.nickname.toLowerCase().includes(term) ||
        property.city.toLowerCase().includes(term) ||
        property.street.toLowerCase().includes(term) ||
        property.propertyType.toLowerCase().includes(term)
      );
    }

    if (this.sortColumn) {
      filtered.sort((a, b) => {
        const aVal = (a as any)[this.sortColumn];
        const bVal = (b as any)[this.sortColumn];

        if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.filteredProperties = filtered;
  }

  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  formatDate(date: Date | null): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  }

  getStatusBadgeClass(status: PropertyStatus): string {
    const statusClasses: { [key in PropertyStatus]: string } = {
      [PropertyStatus.AVAILABLE]: 'status-available',
      [PropertyStatus.OCCUPIED]: 'status-occupied',
      [PropertyStatus.UNDER_CONSTRUCTION]: 'status-construction',
      [PropertyStatus.UNDER_RENOVATION]: 'status-renovation',
      [PropertyStatus.SOLD]: 'status-sold',
      [PropertyStatus.RENTED]: 'status-rented',
      [PropertyStatus.OFF_MARKET]: 'status-off-market'
    };
    return statusClasses[status] || '';
  }

  getOwnershipBadgeClass(status: OwnershipStatus): string {
    const statusClasses: { [key in OwnershipStatus]: string } = {
      [OwnershipStatus.OWNED]: 'ownership-owned',
      [OwnershipStatus.MORTGAGED]: 'ownership-mortgaged',
      [OwnershipStatus.RENTED]: 'ownership-rented',
      [OwnershipStatus.LEASED]: 'ownership-leased',
      [OwnershipStatus.INHERITED]: 'ownership-inherited',
      [OwnershipStatus.TRANSFER_PENDING]: 'ownership-pending',
      [OwnershipStatus.SOLD]: 'ownership-sold',
      [OwnershipStatus.OTHER]: 'ownership-other'
    };
    return statusClasses[status] || '';
  }

  getAvailableCount(): number {
    return this.getCountByStatus(PropertyStatus.AVAILABLE);
  }

  getOccupiedCount(): number {
    return this.getCountByStatus(PropertyStatus.OCCUPIED);
  }

  getOwnedCount(): number {
    return this.getCountByOwnership(OwnershipStatus.OWNED);
  }

  trackByPropertyId(index: number, property: PropertyData): number {
    return property.id!;
  }
}
