import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../shared/models/base-url';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  uploadFile(files: File[]): Observable<void> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return this.http.post<void>(`${this.baseUrl}/files/upload`, formData);
  }
}
