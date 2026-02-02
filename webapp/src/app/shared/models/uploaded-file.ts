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
  columnConfigs: ColumnConfig[];
}

interface ColumnConfig {
  columnName: string;
  dataType: 'text' | 'number' | 'date';
}
