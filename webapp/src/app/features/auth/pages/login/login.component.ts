import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { PrimaryInputComponent } from '../../../../shared/components/primary-input/primary-input.component';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'csv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [RouterLink, ReactiveFormsModule, PrimaryButtonComponent, PrimaryInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.authService
        .login(this.form.value.email!, this.form.value.password!)
        .pipe(
          tap(() => {
            // Successfully logged in
            this.router.navigate(['/dashboard']);
          }),
          catchError((error) => {
            // Failed to log in
            this.form.setErrors({ invalid: true });
            return of(error);
          }),
        )
        .subscribe();
    }
  }
}
