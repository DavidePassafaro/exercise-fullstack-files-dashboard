export interface UploadedFile {
  _id: string;
  originalName: string;
  name: string;
  size: number;
  storagePath: string;
  owner: string;
  columnConfigs: any[];
}
