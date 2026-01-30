import {
  ChangeDetectionStrategy,
  Component,
  output,
  HostBinding,
  HostListener,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'button[csv-primary-button], a[csv-primary-button]',
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrimaryButtonComponent {
  clicked = output<void>();

  @HostBinding('class.primary-button')
  buttonClass = true;

  @HostListener('click')
  onButtonClick() {
    this.clicked.emit();
  }
}
