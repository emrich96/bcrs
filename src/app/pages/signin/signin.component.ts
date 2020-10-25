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
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) { }

  // Validates the user sign in data with parameters
  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      // password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      password: [null, Validators.compose([Validators.required])],
    });
  }


  // Sign in route navigation
  // tslint:disable-next-line: typedef
  signin() {
    const userName = this.form.controls.userName.value;
    const password = this.form.controls.password.value;

    this.http.post('/api/session/signin', {
      userName,
      password
    }).subscribe(res => {
      console.log(res['data']);
      if (res['data'].userName) {
        // user is authenticated adn we can grant them access
        this.cookieService.set('sessionUser', res['data'].userName, 1);
        this.router.navigate(['/']);
      }
    }, err => {
      console.log(err);
      this.errorMessage = err.error.message;
    });
  }

}
