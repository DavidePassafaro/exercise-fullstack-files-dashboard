import {
  ChangeDetectionStrategy,
  Component,
  output,
  HostBinding,
  HostListener,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'input[csv-primary-input]',
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrimaryInputComponent {
  @HostBinding('class.primary-input')
  inputClass = true;
}
