import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  computed,
} from '@angular/core';

@Component({
  selector: 'button[csv-primary-button], a[csv-primary-button]',
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.primary-button]': 'true',
    '[class.primary-button--secondary]': 'isSecondary()',
  },
})
export class PrimaryButtonComponent {
  color = input<'primary' | 'secondary'>('primary');

  protected isSecondary = computed(() => this.color() === 'secondary');
}
