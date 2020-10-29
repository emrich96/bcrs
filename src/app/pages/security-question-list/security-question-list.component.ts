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
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SecurityQuestionServiceService } from './../../shared/security-question.service.service';
import { DeleteRecordDialogComponent } from '../../shared/delete-record-dialog/delete-record-dialog.component';
import { SecurityQuestion } from './../../shared/security-question.interface';


@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']
})
export class SecurityQuestionListComponent implements OnInit {

  securityQuestions: SecurityQuestion[];
  displayedColumns: string[] = ['question', 'functions'];


// return security question service data and subscribe to data
  constructor(private http: HttpClient, private dialog: MatDialog, private securityQuestionServiceService: SecurityQuestionServiceService) {

    this.securityQuestionServiceService.findAllSecurityQuestions().subscribe(res => {
      this.securityQuestions = res.data;
      console.log(this.securityQuestions);
    }, err => {
      console.log(err);
    });
   }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  /*
    delete record function
    Calls dialog box with message and options
  */
  // tslint:disable-next-line: typedef
  delete(recordId: string) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: `Delete Record Dialog`,
        dialogBody: `Are you sure you want to delete security question ${recordId}?`
      },
      disableClose: true,
      width: `800px`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.securityQuestionServiceService.deleteSecurityQuestionsById(recordId).subscribe(res => {
          console.log(`Security question deleted`);
          this.securityQuestions = this.securityQuestions.filter(q => q._id !== recordId);
        });
      }
    });
 }

}
