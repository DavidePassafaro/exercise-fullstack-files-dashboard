import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { Observable, tap } from 'rxjs';
import { BASE_URL } from '../../shared/models/base-url';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  private _user = signal<User | null>(null);

  public user = this._user.asReadonly();

  getUser(): Observable<User> {
    return this.http
      .get<User>(`${this.baseUrl}/users/me`, { withCredentials: true })
      .pipe(tap((user: User) => this._user.set(user)));
  }
}
