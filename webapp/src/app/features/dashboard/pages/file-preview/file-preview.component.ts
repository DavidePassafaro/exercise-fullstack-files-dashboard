import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'csv-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilePreviewComponent {}
