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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SecurityQuestion } from 'src/app/shared/interfaces/security-question.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  securityQuestions: SecurityQuestion[];
  form: FormGroup;
  registrationForm: FormGroup;
  errorMessage: string;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
    this.http.get('/api/security-questions').subscribe(res => {
      this.securityQuestions = res['data'];
    }, err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      contactInformation: new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        phoneNumber: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required)
      }),
      securityQuestions: new FormGroup({
        securityQuestion1: new FormControl(null, Validators.required),
        securityQuestion2: new FormControl(null, Validators.required),
        securityQuestion3: new FormControl(null, Validators.required),
        answerToSecurityQuestion1: new FormControl(null, Validators.required),
        answerToSecurityQuestion2: new FormControl(null, Validators.required),
        answerToSecurityQuestion3: new FormControl(null, Validators.required)
      }),
      credentials: new FormGroup({
        userName: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
      })
    });
  }

  register(form) {
    const contactInformation = form.contactInformation;
    const securityQuestions = form.securityQuestions;
    const credentials = form.credentials;

    const selectedSecurityQuestions = [
      {
        questionText: securityQuestions.securityQuestion1,
        answerText: securityQuestions.answerToSecurityQuestion1
      },
      {
        questionText: securityQuestions.securityQuestion2,
        answerText: securityQuestions.answerToSecurityQuestion2
      },
      {
        questionText: securityQuestions.securityQuestion3,
        answerText: securityQuestions.answerToSecurityQuestion3
      },
    ];

    console.log(selectedSecurityQuestions);

    this.http.post('/api/session/register', {
      userName: credentials.userName,
      password: credentials.password,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      phoneNumber: credentials.phoneNumber,
      address: credentials.address,
      email: credentials.email,
      selectedSecurityQuestions: selectedSecurityQuestions
    }).subscribe(res => {
      if (res['data']) {
        this.cookieService.set('sessionUser', credentials.userName, 1);
        this.router.navigate(['/']);
      } else {
        // user is not authenticated and need to return error
        this.errorMessage = res['text'];
      }
    }, err => {
      console.log(err);
      this.errorMessage = err;
    })
  }

}
