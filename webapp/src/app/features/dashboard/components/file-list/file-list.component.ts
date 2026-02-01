import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FileSizePipe } from '../../../../shared/pipes/file-size.pipe';
import { UploadedFile } from '../../../../shared/models/uploaded-file';
import { NgClass } from '@angular/common';

@Component({
  selector: 'csv-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, FileSizePipe],
})
export class FileListComponent {
  files = input<UploadedFile[] | File[]>([]);
  isClickable = input<boolean>(false);

  removeFile = output<number>();

  onRemoveFile(index: number) {
    this.removeFile.emit(index);
  }
}
