/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { ServiceRepairService } from '../../shared/services/service-repair.service';
import { LineItem } from '../../shared/interfaces/line-item.interface';
import { Invoice } from '../../shared/interfaces/invoice.interface';
import { InvoiceService } from '../../shared/services/invoice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { InvoiceSummaryDialogComponent } from 'src/app/dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import { ServiceRepairItem } from 'src/app/shared/interfaces/service-repair-item.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  userName: string;
  services: ServiceRepairItem[];
  lineItem: LineItem[];

  constructor(private cookieService: CookieService,
    private fb: FormBuilder, private dialog: MatDialog, private router: Router,
    private serviceRepairService: ServiceRepairService, private invoiceService: InvoiceService) {

    this.userName = this.cookieService.get('sessionuser');
    this.services = this.serviceRepairService.getServiceRepairItem();
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      parts: [null, Validators.compose([Validators.required])],
      labor: [null, Validators.compose([Validators.required])],
      alternator: [null, null]
    });
  }

  submit(form) {
    console.log(form);
    const selectedServiceIds = [];
    for (const [key, value] of Object.entries(form.checkGroup)) {
      if (value) {
        selectedServiceIds.push({
          id: key
        });
      }
    }
    this.lineItems = [];
    /*Build  the invoice object
    */

    for (const savedService of this.services) {
      for (const selectedService of selectedServiceIds) {
        if (savedService.id === selectedService.id) {
          this.lineItems.push({
            title: savedService.title,
            price: savedService.price
          });
        }
      }
    }
    console.log(this.lineItems);

    const partsAmount = parseFloat(form.parts);
    const laborAmount = form.labor = 50;
    const lineItemTotal = this.lineItems.reduce({ prev, cur) => prev + cur.price, 0);
    const total = partsAmount + laborAmount + lineItemTotal;

    const invoice = {
      userName: this.userName,
      lineItems: this.lineItems,
      partsAmount: partsAmount,
      laborAmount: laborAmount,
      lineItemTotal: lineItemTotal,
      total: total,
      orderDate: new Date()
    } as Invoice;

    console.log(invoice);

    const dialogRef = this.dialog.open(InvoiceSummaryDialogComponent, {
      data: {
        invoice: invoice
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        console.log('Invoice saved');

        this.invoiceService.createInvoice(invoice.userName, invoice).subscribe(res => {
          this.router.navigate(['/']);
        }, err => {
          console.log(err);
        })
      }
    });
  }
}
