import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { User } from '../../../shared/models/user';
import { InitialsPipe } from '../../../shared/pipes/initials.pipe';
import { AuthService } from '../../services/auth.service';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

@Component({
  selector: 'fd-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InitialsPipe, ClickOutsideDirective],
})
export class UserDropdownComponent {
  private authService = inject(AuthService);

  user = input.required<User>();

  isOpen = signal(false);

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  closeDropdown() {
    this.isOpen.set(false);
  }

  onLogoutClick() {
    this.authService.logout().subscribe();
  }
}
