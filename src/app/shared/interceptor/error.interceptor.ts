/**
 * Title: error.interceptor.ts
 * Author: Diandra McKenzie
 * Date: 29 October 2020
 * Description: Error Handling file
 */

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError (err => {

      if ([404].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/404']);
      }

      if ([500].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/500']);
      }

      // Otherwise, catch the error and throw
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
