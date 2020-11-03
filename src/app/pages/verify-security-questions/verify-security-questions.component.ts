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
import { SelectedSecurityQuestion } from '../../shared/selected-security-question'

@Component({
  selector: 'app-verify-security-questions',
  templateUrl: './verify-security-questions.component.html',
  styleUrls: ['./verify-security-questions.component.css']
})
export class VerifySecurityQuestionsComponent implements OnInit {
  errorText: string;
  selectedSecurityQuestions: SelectedSecurityQuestion;
  question1: string;
  question2: string;
  question3: string;
  username: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder) {
    this.username = this.route.snapshot.queryParamMap.get('username');
    console.log(this.username);

    this.http.get('/api/users/' + this.username + '/security-questions').subscribe(res => {
      this.selectedSecurityQuestions = res['data'];
      console.log(this.selectedSecurityQuestions);
      console.log(res);
    }, err => {
      console.log(err)
    }, () => {
      this.question1 = this.selectedSecurityQuestions[0].questionText;
      this.question2 = this.selectedSecurityQuestions[1].questionText;
      this.question3 = this.selectedSecurityQuestions[2].questionText;

      console.log(this.question1);
      console.log(this.question2);
      console.log(this.question3);
    })
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])],
    });
  }

  verifySecurityQuestions(){
    const answerToSecurityQuestion1 = this.form.controls['answerToSecurityQuestion1'].value;
    const answerToSecurityQuestion2 = this.form.controls['answerToSecurityQuestion2'].value;
    const answerToSecurityQuestion3 = this.form.controls['answerToSecurityQuestion3'].value;

    console.log(answerToSecurityQuestion1);
    console.log(answerToSecurityQuestion2);
    console.log(answerToSecurityQuestion3);

    this.http.post('/api/session/verify/users/' + this.username + '/security-questions', {
      questionText1: this.question1,
      questionText2: this.question2,
      questionText3: this.question3,
      answerText1: answerToSecurityQuestion1,
      answerText2: answerToSecurityQuestion2,
      answerText3: answerToSecurityQuestion3,
    }).subscribe(res => {
      console.log(res);

      if(res['message'] === 'success') {
        this.router.navigate(['session/reset-password'], {queryParams: {isAuthenticated: 'true', username: this.username}, skipLocationChange: true})
      } else {
        this.errorText = "The security questions were not answered correctly"
        console.log('unable to verify security questions')
      }
    });
  }
}
