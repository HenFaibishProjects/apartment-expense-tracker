import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  OwnershipStatus,
  PropertyData,
  PropertyStatus,
} from '../models/property.model';
import { apiBase } from '../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  selectedProperty: PropertyData | null = null;
  searchTerm = '';
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedPropertyForFiles: PropertyData | null = null;
  isFilesModalOpen = false;
  showFilesModal = false;
  selectedPropertyId = '';


  constructor(private fb: FormBuilder, private http: HttpClient) {
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
      zip:312335,
      toilets: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadSampleData();
    this.filteredProperties = [...this.properties];
  }

  loadSampleData() {
    //this.properties = []
    this.getAllProperties();
    this.filteredProperties = [...this.properties];
  }

  getCountByStatus(status: PropertyStatus): number {
    return this.filteredProperties.filter(p => p.propertyStatus === status).length;
  }

  getCountByOwnership(status: OwnershipStatus): number {
    return this.filteredProperties.filter(p => p.ownershipStatus === status).length;
  }

  openAddModal() {
    this.isEditMode = false;
    this.editingPropertyId = null;
    this.selectedProperty = null;
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
    this.selectedProperty = {
      ...property,
      datePurchase: property.datePurchase ? new Date(property.datePurchase) : null
    };
    this.modalVisible = true;
    document.body.style.overflow = 'hidden';
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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    if (confirm('Are you sure you want to delete this property?')) {
      this.http.delete(`${apiBase}/properties/${id}`, { headers }).subscribe({
        next: () => {
          this.propertyForm.reset();
          this.properties = this.properties.filter(p => p.id !== id);
          this.applyFilters();
        },
        error: (err) => {
          console.error('Failed to save property', err);
          if (err.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Authentication Required',
              text: 'You must be logged in to perform this action.',
            });

          } else {
            Swal.fire({
              icon: 'error',
              title: 'Failed to delete property.',
              text: 'Please try again later.',
            });
          }
        }
      });




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


  public getAllProperties() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get<PropertyData[]>(`${apiBase}/properties`, { headers }).subscribe({
      next: (data) => {
        this.properties = data;
        this.filteredProperties = [...data];
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to get property list', err);
        if (err.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Required',
            text: 'You must be logged in to perform this action.',
          });

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to get properties list',
            text: 'Please try again later.',
          });
        }
      }
    });
  }

  openFileUpload() {
    this.showFilesModal = true;
  }


  closeFilesModal() {
    this.selectedPropertyForFiles = null;
    this.isFilesModalOpen = false;
  }

  onFilesUploaded(files: File[]) {
    console.log('Files uploaded:', files);

    // Update the file count for the current property
    //this.updatePropertyFileCount(this.selectedPropertyId, files.length);

    // Show success message
    //this.showSuccessMessage(`Successfully uploaded ${files.length} file(s)`);

    // Here you would typically:
    // 1. Upload files to your backend
    // 2. Update the database
    // 3. Refresh the property data
    //this.uploadFilesToBackend(files);
  }

  onFileDeleted($event: string) {
    console.log('File deleted:');

    // Update the file count for the current property
    //this.updatePropertyFileCount(this.selectedPropertyId, -1);

    // Show success message
    //this.showSuccessMessage('File deleted successfully');

    // Here you would typically:
    // 1. Delete file from your backend
    // 2. Update the database
    // 3. Refresh the property data
    //this.deleteFileFromBackend(fileId);
  }
}
