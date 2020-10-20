/**
 * Title: user.js
 * Author: Diandra McKenzie
 * Date: 20 October 2020
 * Description: User Model file
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const securityQuestion = require('./security-question');

/**
 * user schema, sprint 1
 */

let userSchema = new Schema ({
   _id: {type: String},
   userName: {type: String, required:true, unique: true, dropDups: true},
   password: {type: String, required: true},
   firstName: {type: String},
   lastName: {type: String},
   phoneNumber: {type: String},
   address: {type: String},
   email: {type: String},
   isDisabled: {type: Boolean, default: false},
   role: {type: String, default: 'standard'},
   securityQuestions: [securityQuestion],
   date_created: {type: Date, default: new Date()},
   date_modified: {type: Date}
 }, { collection: 'users'});

module.exports = mongoose.model('User', userSchema);
