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
import { MatDialog } from '@angular/material/dialog';
import { SecurityQuestionServiceService } from '../../shared/services/security-question.service.service';
import { DeleteRecordDialogComponent } from '../../shared/delete-record-dialog/delete-record-dialog.component';
import { SecurityQuestion } from '../../shared/interfaces/security-question.interface';
import { SecurityQuestionDetailsComponent } from '../security-question-details/security-question-details.component'


@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']
})
export class SecurityQuestionListComponent implements OnInit {

  securityQuestions: SecurityQuestion[];
  displayedColumns: string[] = ['question', 'functions'];


// return security question service data and subscribe to data
  constructor(private dialog: MatDialog, private securityQuestionServiceService: SecurityQuestionServiceService) {

    this.securityQuestionServiceService.findAllSecurityQuestions().subscribe(res => {
      this.securityQuestions = res.data;
      console.log(this.securityQuestions);
    }, err => {
      console.log(err);
    });
   }

  // tslint:disable-next-line: typedef
  ngOnInit(): void{
  }

  edit(id, question) {
    const dialogRef = this.dialog.open(SecurityQuestionDetailsComponent, {
      data: {
        questionData: question
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data)
        this.securityQuestionServiceService.updateSecurityQuestionsById(id, data).subscribe(() => {
          console.log('question Updated');
          this.securityQuestionServiceService.findAllSecurityQuestions().subscribe(res => {
            this.securityQuestions = res.data;
            console.log(this.securityQuestions);
          }, err => {
            console.log(err);
          });
        })
      }
    })
  }

  /*
    delete record function
    Calls dialog box with message and options
  */
  // tslint:disable-next-line: typedef
  delete(recordText: string, recordId: string) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordText,
        dialogHeader: `Delete Security Question`,
        dialogBody: `Are you sure you want to delete security question <strong>${recordText}</strong>?`
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
