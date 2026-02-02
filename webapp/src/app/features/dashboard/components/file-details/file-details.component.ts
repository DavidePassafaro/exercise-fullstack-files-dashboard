import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FileSizePipe } from '../../../../shared/pipes/file-size.pipe';
import { UploadedFile } from '../../../../shared/models/uploaded-file';
import { DatePipe } from '@angular/common';
import { DataLayoutComponent } from '../data-layout/data-layout.component';

@Component({
  selector: 'csv-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataLayoutComponent, DatePipe, FileSizePipe],
})
export class FileDetailsComponent {
  file = input.required<UploadedFile>();
}
