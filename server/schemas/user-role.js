/**
 * Title: user-role.js
 * Author: Diandra McKenzie
 * Date: 20 October 2020
 * Description: User Role Schema file
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * user role schema, sprint 1
 */

let userRoleSchema = new Schema ({
  role: {type: String, default: 'standard'}
});


module.exports = userRoleSchema;
