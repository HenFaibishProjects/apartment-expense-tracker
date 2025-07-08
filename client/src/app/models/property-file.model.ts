export interface PropertyFile {
  id: string;
  name: string;
  type: 'photo' | 'contract' | 'other';
  size: number;
  uploadDate: Date;
  url?: string;
  thumbnailUrl?: string;
}
