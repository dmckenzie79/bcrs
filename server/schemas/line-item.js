/* ============================================
 ; Title:  line-item.js
 ; Author: Jeff Lintel, Zach Dahir, Diandra McKenzie
 ; Date:   4 November 2020
 ; Description: line item schema for invoices
 ===========================================*/

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 let lineItemSchema = new Schema({
   title: { type: String },
   price: { type: Number }
 });

 module.exports = lineItemSchema;
