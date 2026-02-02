import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BASE_URL } from '../../shared/models/base-url';
import { Observable, switchMap, tap } from 'rxjs';
import { UploadedFile } from '../../shared/models/uploaded-file';

@Injectable({ providedIn: 'root' })
export class FileService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  private files = signal<Map<string, UploadedFile>>(new Map());

  filesList = computed(() => Array.from(this.files().values()));

  uploadFile(files: File[]): Observable<UploadedFile[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return this.http
      .post<void>(`${this.baseUrl}/files/upload`, formData)
      .pipe(switchMap(() => this.getFiles()));
  }

  getFiles(): Observable<UploadedFile[]> {
    return this.http.get<UploadedFile[]>(`${this.baseUrl}/files`).pipe(
      tap((files) => {
        this.files.set(new Map(files.map((file) => [file._id, file])));
      }),
    );
  }

  getFileById(id: string): Observable<UploadedFile> {
    return this.http.get<UploadedFile>(`${this.baseUrl}/files/${id}`).pipe(
      tap((file) => {
        this.files.update((prev) => {
          const newMap = new Map(prev);
          newMap.set(file._id, file);
          return newMap;
        });
      }),
    );
  }

  updateFile(id: string, file: Partial<UploadedFile>): Observable<UploadedFile> {
    return this.http.put<UploadedFile>(`${this.baseUrl}/files/${id}`, file).pipe(
      tap((file) => {
        this.files.update((prev) => {
          const newMap = new Map(prev);
          newMap.set(file._id, file);
          return newMap;
        });
      }),
    );
  }

  deleteFile(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/files/${id}`).pipe(
      tap(() => {
        this.files.update((prev) => {
          const newMap = new Map(prev);
          newMap.delete(id);
          return newMap;
        });
      }),
    );
  }
}
