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
import { HttpClient } from '@angular/common/http';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: ['./purchases-by-service-graph.component.css']
})
export class PurchasesByServiceGraphComponent implements OnInit {
  purchases: any;
  data: any;
  itemCount = [];
  labels = [];

  constructor(private http: HttpClient, private invoiceService: InvoiceService) {

    // call the API to get the data
    this.invoiceService.findPurchasesByServiceGraph().subscribe(res => {
      // map the data to the purchase variable
      console.log('call success!', res['data'])
      this.purchases = res['data'];

      // loop through the purchases and slip out the services and item count
      for (const item of this.purchases) {
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
      }

      // build the object literal for the primeNG bar graph
      this.data = {
        labels: this.labels, // label for services
        datasets: [
          // graph object
          {
            backgroundColor: [
              '#ed0a3f',
              '#ff8833',
              '#5fa777',
              '#0066cc',
              '#6b3fa0',
              '#af593e',
              '#6cdae7'
            ],
            hoverBackgroundColor: [
              '#ff596a',
              '#ffb963',
              '#8fd9a6',
              '#5c93ff',
              '#9c6cd2',
              '#e58769',
              '#a2ffff'
            ],
            data: this.itemCount
          },
        ]
      };

      // verify the data objects structure matches the primeNG's expected format
      console.log('Data Object');
      console.log(this.data);

    })
  }

  ngOnInit(): void {
  }

}
