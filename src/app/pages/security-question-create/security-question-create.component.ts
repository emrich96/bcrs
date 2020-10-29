
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
import { SecurityQuestion } from '../../shared/security-question.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityQuestionServiceService } from 'src/app/shared/security-question.service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-security-question-create',
  templateUrl: './security-question-create.component.html',
  styleUrls: ['./security-question-create.component.css']
})
export class SecurityQuestionCreateComponent implements OnInit {

  form: FormGroup;

  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private router: Router, private securityQuestionServiceService: SecurityQuestionServiceService) {
   }

  // tslint:disable-next-line: typedef
  ngOnInit() {

    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  // Create new security question function
  // tslint:disable-next-line: typedef
  create() {
    const newSecurityQuestion = {} as SecurityQuestion;
    newSecurityQuestion.text = this.form.controls.text.value;

    this.securityQuestionServiceService.createSecurityQuestionsById(newSecurityQuestion).subscribe(res => {
      this.router.navigate(['/security-questions']);
    });
  }

  // tslint:disable-next-line: typedef
  cancel() {
    this.router.navigate(['/security-questions']);
  }
}
