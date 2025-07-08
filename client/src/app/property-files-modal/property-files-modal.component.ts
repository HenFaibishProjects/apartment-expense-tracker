import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyFile } from '../models/property-file.model';

@Component({
  selector: 'app-property-files-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-files-modal.component.html',
  styleUrls: ['./property-files-modal.component.css']
})
export class PropertyFilesModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() propertyId: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() fileUploaded = new EventEmitter<File[]>();
  @Output() fileDeleted = new EventEmitter<string>();

  files: PropertyFile[] = [];
  selectedFilter: 'all' | 'photo' | 'contract' | 'other' = 'all';
  isDragOver = false;

  ngOnInit() {
    // Mock data - replace with actual API call
    this.loadFiles();
  }

  loadFiles() {
    // Mock data - replace with actual service call
    this.files = [
      {
        id: '1',
        name: 'kitchen_photo.jpg',
        type: 'photo',
        size: 2048576,
        uploadDate: new Date('2024-01-15'),
        thumbnailUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop'
      },
      {
        id: '2',
        name: 'lease_agreement.pdf',
        type: 'contract',
        size: 1024000,
        uploadDate: new Date('2024-01-10')
      },
      {
        id: '3',
        name: 'property_deed.pdf',
        type: 'contract',
        size: 512000,
        uploadDate: new Date('2024-01-05')
      },
      {
        id: '4',
        name: 'inspection_report.doc',
        type: 'other',
        size: 256000,
        uploadDate: new Date('2024-01-12')
      }
    ];
  }

  closeModal() {
    this.close.emit();
  }

  setFilter(filter: 'all' | 'photo' | 'contract' | 'other') {
    this.selectedFilter = filter;
  }

  getFilteredFiles(): PropertyFile[] {
    if (this.selectedFilter === 'all') {
      return this.files;
    }
    return this.files.filter(file => file.type === this.selectedFilter);
  }

  getFilesByType(type: 'photo' | 'contract' | 'other'): PropertyFile[] {
    return this.files.filter(file => file.type === type);
  }

  getTotalFiles(): number {
    return this.files.length;
  }

  getEmptyStateMessage(): string {
    switch (this.selectedFilter) {
      case 'photo':
        return 'No photos uploaded yet. Add some property photos to get started.';
      case 'contract':
        return 'No contracts uploaded yet. Upload lease agreements, deeds, or other contracts.';
      case 'other':
        return 'No other documents uploaded yet. Add inspection reports or other documents.';
      default:
        return 'No files uploaded yet. Start by uploading some property files.';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    const files = Array.from(event.dataTransfer?.files || []);
    this.handleFiles(files);
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files || []);
    this.handleFiles(files);
  }

  handleFiles(files: File[]) {
    // Process and categorize files
    const processedFiles = files.map(file => {
      let type: 'photo' | 'contract' | 'other';

      if (file.type.startsWith('image/')) {
        type = 'photo';
      } else if (file.type === 'application/pdf' || file.name.toLowerCase().includes('contract') || file.name.toLowerCase().includes('lease')) {
        type = 'contract';
      } else {
        type = 'other';
      }

      const newFile: PropertyFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type,
        size: file.size,
        uploadDate: new Date(),
        thumbnailUrl: type === 'photo' ? URL.createObjectURL(file) : undefined
      };

      return newFile;
    });

    this.files = [...this.files, ...processedFiles];
    this.fileUploaded.emit(files);
  }

  viewFile(file: PropertyFile) {
    // Implement file viewing logic
    console.log('Viewing file:', file.name);
    // You can open a new modal or navigate to file viewer
  }

  downloadFile(file: PropertyFile) {
    // Implement file download logic
    console.log('Downloading file:', file.name);
    // Create download link and trigger download
  }

  deleteFile(file: PropertyFile) {
    if (confirm(`Are you sure you want to delete ${file.name}?`)) {
      this.files = this.files.filter(f => f.id !== file.id);
      this.fileDeleted.emit(file.id);
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  trackByFileId(index: number, file: PropertyFile): string {
    return file.id;
  }
}
