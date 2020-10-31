/*
============================================
; Title: selected-security-question.js
; Author: Diandra McKenzie
; Date: 29 October 2020
; Description: Selected security question Model
;===========================================
*/


const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 let selectedSecurityQuestionSchema = new Schema({
     questionText: { type: String},
     answerText:   { type: String}
 });

 module.exports = selectedSecurityQuestionSchema;
