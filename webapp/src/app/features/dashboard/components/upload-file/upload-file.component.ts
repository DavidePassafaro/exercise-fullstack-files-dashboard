import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FileService } from '../../../../core/services/file.service';
import { catchError, of, tap } from 'rxjs';
import { FileCardComponent } from '../file-card/file-card.component';

@Component({
  selector: 'fd-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FileCardComponent],
})
export class UploadFileComponent {
  private fileService = inject(FileService);

  selectedFiles = signal<File[]>([]);
  isDragOver = signal(false);
  isUploading = signal(false);

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    if (event.dataTransfer?.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
    }
  }

  private addFiles(fileList: FileList) {
    const files = Array.from(fileList).filter(
      (file) => file.name.endsWith('.csv') || file.name.endsWith('.xlsx'),
    );
    const currentFiles = this.selectedFiles();
    const newFiles = files.filter(
      (f) => !currentFiles.some((cf) => cf.name === f.name && cf.size === f.size),
    );
    this.selectedFiles.set([...currentFiles, ...newFiles]);
  }

  removeFile(index: number) {
    this.selectedFiles.update((files) => files.filter((_, i) => i !== index));
  }

  handleMultipleUpload() {
    const files = this.selectedFiles();
    if (files.length === 0) {
      alert('Select at least one .csv or .xlsx file');
      return;
    }

    this.isUploading.set(true);
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    this.fileService
      .uploadFile(files)
      .pipe(
        tap(() => {
          alert('File uploaded successfully!');
          this.selectedFiles.set([]);
          this.isUploading.set(false);
        }),
        catchError((err) => {
          console.error(err);
          alert('Error during file upload.');
          this.isUploading.set(false);
          return of(null);
        }),
      )
      .subscribe();
  }
}
