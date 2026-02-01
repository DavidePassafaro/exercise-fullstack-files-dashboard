import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UploadFileComponent } from '../../components/upload-file/upload-file.component';

@Component({
  selector: 'csv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UploadFileComponent],
})
export class DashboardComponent {}
