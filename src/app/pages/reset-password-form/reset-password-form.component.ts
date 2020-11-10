/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {
  isAuthenticated: string;
  username: string;
  form: FormGroup;

  constructor(private http: HttpClient,  private route: ActivatedRoute, private fb: FormBuilder, private cookieService: CookieService, private router: Router) {
    this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated');
    this.username = this.route.snapshot.queryParamMap.get('username');

    if(!this.isAuthenticated) {
      this.router.navigate(['/session/sign-in']);
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}')
      ]]
    });
  }

  resetPassword(){
    this.http.post('/api/session/users/' + this.username + '/reset-password', {
      password: this.form.controls['password'].value
    }).subscribe(res => {
      // Username is authenticated and we can grant them access
      this.cookieService.set('sessionUser', this.username, 1);
      this.router.navigate(['/']);
    }, err => {
      console.log('error message: ', err);
    })
  }

}
