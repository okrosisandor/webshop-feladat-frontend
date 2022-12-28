import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}
  token = localStorage.getItem('token');

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token) {
      // If we have a token, we set it to the header
      req = req.clone({
        setHeaders: { Authorization: 'Bearer ' + this.token },
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
        return throwError(err);
      })
    );
  }
}

// let jwtToken: any;

//   jwtToken = req.clone({
//     setHeaders: {
//       Authorization: 'Bearer ' + this.token
//     },
//   });
// return next.handle(jwtToken);
