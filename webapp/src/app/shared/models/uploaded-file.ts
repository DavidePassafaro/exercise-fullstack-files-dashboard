import { User } from './user';

export interface UploadedFile {
  _id: string;
  name: string;
  originalName: string;
  type: 'csv';
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
  columnName: string;
  dataType: 'text' | 'number' | 'date';
}
