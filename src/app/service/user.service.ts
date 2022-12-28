import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:8086/users';

  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  logout() {
    localStorage.removeItem('token');
  }

  getUser(username: string) {
    return this.http.get(`${this.apiUrl}/user/${username}`);
  }

  updateUser(user: any){
    return this.http.patch(`${this.apiUrl}`, user).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getUserName(){
    const decoded: any = jwt_decode(localStorage.getItem('token'));

    return decoded.sub.split(',')[1];
  }

  isAdmin(){
    const decoded: any = jwt_decode(localStorage.getItem('token'));
    return decoded.roles.includes("ROLE_ADMIN");
  }
}
