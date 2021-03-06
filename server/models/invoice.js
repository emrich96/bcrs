/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/

/* This is the model for the invoice-summary-dialog.
It is connected to the invoice database in MongoDB.
Accepted data is in parameters
*/


const mongoose = require('mongoose');
const LineItemSchema = require('../schemas/line-item');

const Schema = mongoose.Schema;

let invoiceSchema = new Schema({
    userName: { type: String },
    lineItems: [LineItemSchema],
    partsAmount: { type: Number },
    laborAmount: { type: Number },
    lineItemTotal: { type: Number },
    total: { type: Number },
    orderDate: { type: Date, default: new Date() }
}, { collection: "invoice" })

module.exports = mongoose.model('Invoice', invoiceSchema);