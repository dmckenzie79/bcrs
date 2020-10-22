/**
 * Title: user.js
 * Author: Diandra McKenzie
 * Date: 20 October 2020
 * Description: User Model file
 */

const mongoose = require('mongoose');
const userRoleSchema = require('../schemas/user-role');
const Schema = mongoose.Schema;
const selectedSecurityQuestionSchema = require('../schemas/selected-security-question');

/**
 * user schema, sprint 1
 */

let userSchema = new Schema ({
   userName: {type: String, required:true, unique: true, dropDups: true},
   password: {type: String, required: true},
   firstName: {type: String},
   lastName: {type: String},
   phoneNumber: {type: String},
   address: {type: String},
   email: {type: String},
   isDisabled: {type: Boolean, default: false},
   role: userRoleSchema,
   selectedSecurityQuestions: [selectedSecurityQuestionSchema],
   date_created: {type: Date, default: new Date()},
   date_modified: {type: Date}
 }, { collection: 'users'});

module.exports = mongoose.model('User', userSchema);
