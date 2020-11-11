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

@Component({
  selector: 'app-verify-user-name',
  templateUrl: './verify-user-name.component.html',
  styleUrls: ['./verify-user-name.component.css']
})
export class VerifyUserNameComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])]
    });
  }

  validateUsername() {
    const username = this.form.controls['username'].value;

    this.http.get('/api/session/verify/users/' + username).subscribe(res => {
      if (res['data']) {
        this.router.navigate(['/session/verify-security-questions'], {queryParams: {username: username}, skipLocationChange: true});
      } else {
        this.errorMessage = "The user name does not match our records. Please try again";
      }
    }, err => {
      console.log(err);
      this.errorMessage = err;
    })
  }
}
