import { User } from './user';

export interface UploadedFile {
  _id: string;
  name: string;
  originalName: string;
  type: 'csv' | 'xlsx';
  size: number;
  uploadDate: Date;
  owner: User;
  storagePath: string;
  columnConfigs: UploadedFileColumn[];
  preview: {
    [key: string]: string | number | Date;
  }[];
}

export interface UploadedFileColumn {
  _id: string;
  columnName: string;
  dataType: 'text' | 'number' | 'date';
}
