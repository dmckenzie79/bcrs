/* ============================================
 ; Title:  security-question.js
 ; Author: Jeff Lintel, Zach Dahir
 ; Date:   19 October 2020
 ; Description: security questions model
 ===========================================*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



let securityQuestionSchema = new Schema({
  text: { type: String },
  isDisabled: { type: Boolean, default: false}
},
{ collection: 'security questions'}
);

module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);
