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

const router= express.Router();

//create invoice api
router.post('/:userName', async(req, res) => {
  try {
    const userName = req.params.userName;

    //create new unvoice from req body
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
        const createInvoiceMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
        res.status(500).send(createInvoiceMongodbErrorResponse.toObject());
      }
      else {
        console.log(invoice);
        const createInvoiceResponse = new BaseResponse('200', 'Invoice created', invoice);
        res.json(createInvoiceResponse.toObject());
      }
    })
  }
  catch (e) {
    console.log(e);
    const createInvoiceCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
    res.status(500).send(createInvoiceCatchErrorResponse.toObject());
  }
});
