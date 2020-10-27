/* ============================================
 ; Title:  session-api.js
 ; Author: Professor Krasso
 ; Date:   21 October 2020
 ; Modified By: Diandra McKenzie
 ; Description: api logic for managing session users
 ===========================================*/

/**
 * Require statements
*/
const express = require('express');
const bcrypt = require('bcryptjs');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const User = require('../models/user');


//configurations

const router= express.Router();

//constants to pass into responses
const serverError = "Internal server error";

/**
 * User sign-in
 */
router.post('/signin', async(req, res) => {
  try
  {
    User.findOne({'userName': req.body.userName}, function(err, user)
    {
      if (err)
      {
        console.log(err);
        const signInMongoDbErrorResponse = new ErrorResponse(500, serverError, err);
        res.status(500).send(signInMongoDbErrorResponse.toObject());
      }
      else{
        console.log(user);

        /**
         * if the user name is valid
         */
        if (user)
        {
          let passwordIsValid = bcrypt.compareSync(req.body.password, user.password); //compare the saved hashed password against the saved user password

          /**
           * if the password is valid
           */
          if (passwordIsValid)
          {
            console.log(`Login successful`);
            const signInResponse = new BaseResponse(200, 'Login successful', user);
            res.json(signInResponse.toObject());
          }
          /**
           * if the password is not valid
           */
          else{
            console.log(`Invalid password for username: ${user.userName}`);
            const invalidPasswordResponse = new BaseResponse(401, 'Invalid username and/or password, please try again', null);
            res.status(401).send(invalidPasswordResponse.toObject());
          }
        }
        /**
           * if the username is not valid
           */
          else{
            console.log(`Username: ${req.body.userName} is invalid`);
            const invalidUserNameResponse = new BaseResponse(401, 'Invalid username and/or password, please try again', null);
            res.status(401).send(invalidUserNameResponse.toObject());
          }
      }
    });
  }
  catch(e)
  {
    console.log(e);
    const signInCatchErrorResponse = new ErrorResponse(500, serverError, e.message);
    res.status(500).send(signInCatchErrorResponse.toObject());
  }
});

module.exports = router;
