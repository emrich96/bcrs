/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/

import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {

      if([404].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/404']);
      }

      if([500].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/500']);
      }

      // Otherwise, catch the error and throw
      const error = err.error.message || err.statusText;
      return throwError;
    }));
  }
}
