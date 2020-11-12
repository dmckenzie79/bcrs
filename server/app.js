/* ============================================
 ; Title:  app.js
 ; Author: Zach Dahir, Jeff Lintel, Diandra McKenzie
 ; Date:   19 October 2020
 ; Description: app js for server logic and APIs
 ===========================================*/

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const securityQuestionApi = require('./routes/security-questions-api'); //import the security questions API
const UserApi = require('./routes/user-api'); //import the User API
const SessionApi = require('./routes/session-api'); //import the session API
const RoleApi = require('./routes/role-api'); //import the role API
const InvoiceApi = require('./routes/invoice-api');

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));
//app.use(cors());

/**
 * Variables
 */
const port = process.env.PORT || 3000; // server port

// actual database connection string
const conn = 'mongodb+srv://bcrs_admin:8JvEBB2ghNwslIYi@cluster0.wcj86.mongodb.net/bcrs?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`);
}); // end mongoose connection

/**
 * APIs
 */

app.use('/api/security-questions', securityQuestionApi);
app.use('/api/users', UserApi);
app.use('/api/session', SessionApi);
app.use('/api/roles', RoleApi);
app.use('/api/invoices', InvoiceApi); //added s to match service

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function
