/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/

const mongoose = require('mongoose');
const LineItemSchema = require('../schemas/line-item');

const Schema = mongoose.Schema;

let invoiceSchema = new Schema({
  userName: { type: String },
  lineItems:  [LineItemSchema],
  partsAmount: { type: Number},
  laborAmount: { type: Number},
  lineItemTotal: { type: Number},
  total: { type: Number},
  orderDate: { type: Date, default: new Date() }
})

module.exports = mongoose.model('Invoice', invoiceSchema);
