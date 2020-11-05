/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/

// require Statements
const express = require('express');
const Invoice = require('../models/invoice');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

const router = express.Router();

// createInvoice
router.post('/:userName', async (req, res) => {
  try {
    const userName = req.params.userName;

    const newInvoice = {
      username: userName,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: req.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total
    }

    console.log(newInvoice);

    Invoice.create(newInvoice, function(err, invoice) {
      if (err) {
        console.log(err);
        const createInvoiceErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(createInvoiceErrorResponse.toObject());
      } else {
        console.log(invoice);
        const createInvoiceResponse = new BaseResponse(200, 'Query successful', invoice);
        res.json(createInvoiceResponse.toObject());
      }
    })
  } catch (e) {
    console.log(e);
    const createInvoiceCatchResponse = new ErrorResponse(500, 'Internal server error', e);
    res.status(500).send(createInvoiceCatchResponse.toObject());
  }
});


// findPurchasesByService
router.get('/purchases-graph', async (req,res) => {
  try {
    Invoice.aggregate([
      {
        $unwind: '$lineItems'
      },
      {
        $group:
        {
          '_id':
          {
            'title': '$lineItems.title',
            'price': '$lineItems.price'
          },
          'count':
          {
            $sum: 1
          }
        }
      },
      {
        $sort:
        {
          '_id.title': 1
        }
      }
    ], function(err, purchaseGraph) {
      if (err) {
        console.log(err);
        const findPurchaseErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(findPurchaseErrorResponse.toObject());
      } else {
        console.log(invoice);
        const findPurchaseResponse = new BaseResponse(200, 'Query successful', purchaseGraph);
        res.json(findPurchaseResponse.toObject());
      }
    })
  } catch (e) {
    console.log(e);
    const findPurchaseCatchResponse = new ErrorResponse(500, 'Internal server error', e);
    res.status(500).send(findPurchaseCatchResponse.toObject());
  }
})

module.exports = router;
