/* ============================================
 ; Title:  invoice.js
 ; Author: Jeff Lintel, Zach Dahir, Diandra McKenzie
 ; Date:   4 November 2020
 ; Description: invoice model
 ===========================================*/

 const mongoose = require('mongoose');
 const LineItemSchema = require('../schemas/line-item');

 const Schema = mongoose.Schema;

 let invoiceSchema = new Schema({
   userName: { type: String },
   lineItems: [LineItemSchema],
   partsAmount: { type: Number },
   laborAmount: { type: Number },
   total: { type: Number},
   orderDate: { type: Date, default: new Date() }
 });

 module.exports = mongoose.model('Invoice', invoiceSchema)
