import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FileSizePipe } from '../../../../shared/pipes/file-size.pipe';

@Component({
  selector: 'fd-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FileSizePipe],
})
export class FileCardComponent {
  name = input.required<string>();
  size = input.required<number>();

  removeFile = output<void>();

  onRemoveFile() {
    this.removeFile.emit();
  }
}
