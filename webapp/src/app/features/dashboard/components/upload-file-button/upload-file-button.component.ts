import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { FileService } from '../../../../core/services/file.service';

@Component({
  selector: 'csv-upload-file-button',
  templateUrl: './upload-file-button.component.html',
  styleUrls: ['./upload-file-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PrimaryButtonComponent],
})
export class UploadFileButtonComponent {
  private fileService = inject(FileService);

  protected isUploading = signal<boolean>(false);

  uploadFile(): void {
    // trigger csv file upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
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
      alert('Select at least one .csv file');
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
