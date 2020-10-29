/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/23/2020
; Modified By: Ashleigh Lyman
; Description: E2E MEAN Stack Application
;===========================================
*/


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestionServiceService } from './../../shared/security-question.service.service';
import { SecurityQuestion } from './../../shared/security-question.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css']
})
export class SecurityQuestionDetailsComponent implements OnInit {

  question: SecurityQuestion;
  questionId: string;
  form: FormGroup;

  // capture and place questionId, set value of selected questionId
  // Submit and cancel button in dialog box
  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private securityQuestionServiceService: SecurityQuestionServiceService) {
    this.questionId = this.route.snapshot.paramMap.get('questionId');

    this.securityQuestionServiceService.findAllSecurityQuestionsById(this.questionId).subscribe(res => {
      this.question = res.data;
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls.text.setValue(this.question.text);
    });
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  // tslint:disable-next-line: typedef
  saveQuestion() {
    const updatedSecurityQuestion = {} as SecurityQuestion;
    updatedSecurityQuestion.text = this.form.controls.text.value;

    this.securityQuestionServiceService.updateSecurityQuestionsById(this.questionId, updatedSecurityQuestion).subscribe(res => {
      this.router.navigate(['/security-questions']);
    });
  }

  // tslint:disable-next-line: typedef
  cancel() {
    this.router.navigate(['/security-questions']);
  }

}
