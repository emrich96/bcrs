/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/23/2020
; Modified By: Ashleigh Lyman
; Description: E2E MEAN Stack Application
;===========================================
*/


import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SecurityQuestionServiceService } from '../../shared/services/security-question.service.service';
import { SecurityQuestion } from '../../shared/interfaces/security-question.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css']
})
export class SecurityQuestionDetailsComponent implements OnInit {

  questionData: SecurityQuestion;
  questionForm: FormGroup;

  // capture and place questionId, set value of selected questionId
  // Submit and cancel button in dialog box
  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<SecurityQuestionDetailsComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.questionData = data.questionData
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    console.log(this.questionData.text)
    this.questionForm = new FormGroup({
      text: new FormControl(this.questionData.text, Validators.required)
    })
  }

  updateUser() {
    // pass the updated values to back to the parent
    this.dialogRef.close(this.questionForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }

}
