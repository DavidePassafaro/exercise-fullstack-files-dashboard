import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../../shared/models/user';
import { BASE_URL } from '../../shared/models/base-url';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  private userService = inject(UserService);

  signup(email: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/signup`, { email, password });
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(switchMap(() => this.userService.getUser()));
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/auth/logout`, {})
      .pipe(tap(() => window.location.reload()));
  }
}
