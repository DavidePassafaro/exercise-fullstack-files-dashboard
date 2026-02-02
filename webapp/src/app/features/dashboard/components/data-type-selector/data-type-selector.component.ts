import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

type DataType = 'text' | 'number' | 'date';

@Component({
  selector: 'fd-data-type-selector',
  templateUrl: './data-type-selector.component.html',
  styleUrls: ['./data-type-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
})
export class DataTypeSelectorComponent {
  selectedType = model<DataType>('text');

  protected readonly dataTypeLabels = new Map<DataType, string>([
    ['text', 'Text'],
    ['number', 'Number'],
    ['date', 'Date'],
  ]);

  onTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedType.set(target.value as DataType);
  }
}
