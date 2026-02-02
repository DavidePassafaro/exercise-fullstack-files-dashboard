import { Component, input } from '@angular/core';

@Component({
  selector: 'csv-data-layout',
  templateUrl: './data-layout.component.html',
  styleUrls: ['./data-layout.component.scss'],
})
export class DataLayoutComponent {
  icon = input.required<string>();
  title = input.required<string>();
  description = input<string>();
}
