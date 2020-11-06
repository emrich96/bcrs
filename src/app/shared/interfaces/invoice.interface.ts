/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/

import { LineItem } from './line-item.interface';

export interface Invoice {
  userName: string;
  LineItem: LineItem[];
  partsAmount: number;
  laborAmount: number;
  lineItemTotal: number;
  total: number;
  orderDate: Date;
}
