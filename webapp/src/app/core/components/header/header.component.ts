import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { NotificationIconComponent } from '../../../shared/components/notification-icon/notification-icon.component';
import { UserService } from '../../services/user.service';
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'fd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NotificationIconComponent, UserDropdownComponent],
})
export class HeaderComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  protected breadcrumbs = signal<Breadcrumb[]>([]);
  protected user = this.userService.user;
  protected isAuthenticated = computed(() => !!this.user());

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      this.breadcrumbs.set(breadcrumbs);
    });
  }

  onNotificationClick(): void {
    alert('Feature not implemented');
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = [],
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data?.['breadcrumbs'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
