import { User } from './user';

export interface UploadedFile {
  _id: string;
  originalName: string;
  name: string;
  size: number;
  storagePath: string;
  uploadDate: Date;
  columnConfigs: ColumnConfig[];
  owner: User;
}

interface ColumnConfig {
  columnName: string;
  dataType: 'text' | 'number' | 'date';
}
