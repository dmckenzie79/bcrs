/* ============================================
 ; Title:  security-question.js
 ; Author: Jeff Lintel
 ; Date:   19 October 2020
 ; Description: security questions model
 ===========================================*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//

let securityQuestionSchema = new Schema({
  text: { type: String }
});

module.exports = securityQuestionSchema;
