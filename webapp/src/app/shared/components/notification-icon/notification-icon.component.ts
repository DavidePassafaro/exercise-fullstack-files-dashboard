import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'csv-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationIconComponent {
  hasNotification = input<boolean>();
}
