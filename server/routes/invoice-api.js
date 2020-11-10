/* ============================================
 ; Title:  invoice-api.js
 ; Author: Jeff Lintel, Zach Dahir, Diandra McKenzie
 ; Date:   5 November 2020
 ; Description: api's for invoices
 ===========================================*/

const express = require('express');
const User = require('../models/user');
const Invoice = require('../models/invoice');
const LineItem = require('../schemas/line-item');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const invoice = require('../models/invoice');

const router= express.Router();

//constants to pass into server responses
const serverError = "Internal server error";
const querySuccess = "Query successful - ";
const createInvoice = "create invoice";
const findPurchasesByService = "find purchases by service";

//create invoice api
router.post('/:userName', async(req, res) => {
  try {
    const userName = req.params.userName;

    //create new invoice from req body
    const newInvoice = {
      userName: userName,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: req.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total
    }

    //log new invoice
    console.log(newInvoice);

    Invoice.create(newInvoice, function(err, invoice)
    {
      if (err) {
        console.log(err);
        const createInvoiceMongodbErrorResponse = new ErrorResponse('500', serverError, err); //updated to use message constants
        res.status(500).send(createInvoiceMongodbErrorResponse.toObject());
      }
      else {
        console.log(invoice);
        const createInvoiceResponse = new BaseResponse('200', `${querySuccess} ${createInvoice}`, invoice); //updated to use message constants
        res.json(createInvoiceResponse.toObject());
      }
    })
  }
  catch (e) {
    console.log(e);
    const createInvoiceCatchErrorResponse = new ErrorResponse('500', serverError, e.message); //updated to use message constants
    res.status(500).send(createInvoiceCatchErrorResponse.toObject());
  }
});

//find purchases by service (for data visualization)
router.get('/purchases-graph', async(req, res) => {
  try{
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
      if(err) {
        console.log(err);
        const findPurchasesByServiceGraphMongoDbErrorResponse = new ErrorResponse('500', serverError, err);
        res.status(500).send(findPurchasesByServiceGraphMongoDbErrorResponse.toObject());
      } else {
        console.log(purchaseGraph);
        const findPurchasesByServiceGraphResponse = new BaseResponse('200', `${querySuccess} ${findPurchasesByService}`, purchaseGraph);
        res.json(findPurchasesByServiceGraphResponse.toObject());
      }
    })
  } catch(e) {
    console.log(e);
    const findPurchasesByServiceCatchErrorResponse = new ErrorResponse('500', serverError, e.message);
    res.status(500).send(findPurchasesByServiceCatchErrorResponse.toObject());
  }
});

module.exports = router;
