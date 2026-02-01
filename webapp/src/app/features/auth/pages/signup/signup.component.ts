import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { PrimaryInputComponent } from '../../../../shared/components/primary-input/primary-input.component';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'csv-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [RouterLink, ReactiveFormsModule, PrimaryButtonComponent, PrimaryInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.authService
        .signup(this.form.value.name!, this.form.value.email!, this.form.value.password!)
        .pipe(
          tap(() => {
            // Successfully signed up
            this.router.navigate(['/login']);
          }),
          catchError((error) => {
            // Failed to sign up
            this.form.setErrors({ invalid: true });
            return of(error);
          }),
        )
        .subscribe();
    }
  }
}
