/**
 * Title: selected-security-question.js
 * Author: Diandra McKenzie
 * Date: 20 October 2020
 * Description: Selected Security Question Schema file
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * user selected security questions schema, sprint 1
 */

let selectedSecurityQuestionSchema = new Schema ({
  questionText: {type: String},
  answerText: { type: String}
});

module.exports = selectedSecurityQuestionSchema;
