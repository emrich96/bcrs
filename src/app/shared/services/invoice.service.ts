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
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../interfaces/invoice.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private http: HttpClient) { }

  createInvoice(userName: string, invoice: Invoice): Observable<any> {
    return this.http.post('/api/invoices/' + userName, {
      userName: userName,
      lineItems: invoice.lineItem,
      partsAmount: invoice.partsAmount,
      laborAmount: invoice.laborAmount,
      lineItemTotal: invoice.lineItemTotal,
      total: invoice.total
    })
  }
  // tslint:disable-next-line: typedef
  findPurchasesByServiceGraph() {
    return this.http.get('/api/invoices/purchases-graph');
}
}
