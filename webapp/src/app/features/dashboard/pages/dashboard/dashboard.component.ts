import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UploadFileComponent } from '../../components/upload-file/upload-file.component';
import { FileService } from '../../../../core/services/file.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { UploadFileButtonComponent } from '../../components/upload-file-button/upload-file-button.component';
import { FileCardComponent } from '../../components/file-card/file-card.component';
import { UploadedFile } from '../../../../shared/models/uploaded-file';
import { Router } from '@angular/router';

@Component({
  selector: 'fd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UploadFileComponent, FileCardComponent, UploadFileButtonComponent, ScrollingModule],
})
export class DashboardComponent {
  private router = inject(Router);
  private fileService = inject(FileService);

  files = this.fileService.filesList;

  onRemoveFile(fileIndex: number): void {
    if (confirm('Are you sure you want to delete this file?')) {
      this.fileService.deleteFile(this.files()[fileIndex]._id).subscribe();
    }
  }

  onSelectFile(fileIndex: number): void {
    this.router.navigate(['/dashboard', this.files()[fileIndex]._id]);
  }

  trackByFn(index: number, item: UploadedFile) {
    return item._id;
  }
}
