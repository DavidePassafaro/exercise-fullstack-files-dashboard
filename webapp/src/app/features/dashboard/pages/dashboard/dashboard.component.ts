import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UploadFileComponent } from '../../components/upload-file/upload-file.component';
import { FileService } from '../../../../core/services/file.service';
import { FileListComponent } from '../../components/file-list/file-list.component';
import { UploadedFile } from '../../../../shared/models/uploaded-file';
import { UploadFileButtonComponent } from '../../components/upload-file-button/upload-file-button.component';

@Component({
  selector: 'csv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UploadFileComponent, FileListComponent, UploadFileButtonComponent],
})
export class DashboardComponent {
  private fileService = inject(FileService);

  files = this.fileService.filesList;

  onRemoveFile(fileIndex: number): void {
    if (confirm('Are you sure you want to delete this file?')) {
      this.fileService.deleteFile(this.files()[fileIndex]._id).subscribe();
    }
  }
}
