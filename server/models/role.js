/* ============================================
 ; Title:  role.js
 ; Author: Jeff Lintel, Zach Dahir, Diandra McKenzie
 ; Date:   4 November 2020
 ; Description: role model for assigning access
 ===========================================*/

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 let roleSchema = new Schema({
   text: { type: String, unique: true },
   isDisabled: { type: Boolean, default: false }
 });

 module.exports = mongoose.model('Role', roleSchema);
