/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashliegh Lyman
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

  findAllSecurityQuestions(): Observable<any> {
    return this.http.get('/api/security-questions');
  }

  findAllSecurityQuestionsById(questionId: string): Observable<any> {
    return this.http.get('/api/security-questions/' + questionId);
  }

  createSecurityQuestionsById(newSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.post('/api/security-questions', {
      text: newSecurityQuestion['text']
    })
  }

  updateSecurityQuestionsById(questionId: string, updatedSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.put('/api/security-questions/' + questionId, {
      text: updatedSecurityQuestion['text']
    })
  }

  deleteSecurityQuestionsById(questionId: string): Observable<any> {
    return this.http.delete('/api/security-questions/' + questionId);
  }
}
