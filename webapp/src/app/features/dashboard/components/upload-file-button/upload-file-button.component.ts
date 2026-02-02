import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { FileService } from '../../../../core/services/file.service';

@Component({
  selector: 'fd-upload-file-button',
  templateUrl: './upload-file-button.component.html',
  styleUrls: ['./upload-file-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFileButtonComponent {
  private fileService = inject(FileService);

  protected isUploading = signal<boolean>(false);

  uploadFile(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv,.xlsx';
    fileInput.multiple = true;
    fileInput.click();

    fileInput.addEventListener('change', (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        this.handleMultipleUpload(files);
      }
    });
  }

  handleMultipleUpload(files: FileList) {
    if (files.length === 0) {
      alert('Select at least one .csv or .xlsx file');
      return;
    }

    this.isUploading.set(true);

    this.fileService
      .uploadFile(Array.from(files))
      .pipe(
        tap(() => {
          alert('File uploaded successfully!');
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
