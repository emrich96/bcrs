
/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/


import { Injectable } from '@angular/core';
import { SecurityQuestion } from './security-question.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionServiceService {

  constructor(private http: HttpClient) { }


// findAllSecurityQuestions Service API route
  findAllSecurityQuestions(): Observable<any> {
    return this.http.get('/api/security-question');
  }


// findAllSecurityQuestionsById Service API route
  findAllSecurityQuestionsById(questionId: string): Observable<any> {
    return this.http.get('/api/security-question/' + questionId);
  }


// createSecurityQuestionsById Service API route
  createSecurityQuestionsById(newSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.post('/api/security-question', {
      text: newSecurityQuestion.text
    });
  }


// updateSecurityQuestionsById Service API route
  updateSecurityQuestionsById(questionId: string, updatedSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.put('/api/security-question/' + questionId, {
      text: updatedSecurityQuestion.text
    });
  }


// deleteSecurityQuestionsById Service API route
  deleteSecurityQuestionsById(questionId: string): Observable<any> {
    return this.http.delete('/api/security-question/' + questionId);
  }
}
