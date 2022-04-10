import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post('http://localhost:3000/login', { email: email, password: password })
      .pipe(tap((res) => this.setSession(res)));
  }

  healthCheck() {
    return this.http.get('http://localhost:3000/protected');
  }

  isLoggedIn() {
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('idToken');
  }

  private setSession(res: any) {
    localStorage.setItem('idToken', res.access_token);
  }
}
