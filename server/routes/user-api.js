/* ============================================
 ; Title:  user-api.js
 ; Author: Jeff Lintel, Zach Dahir, Diandra McKenzie
 ; Date:   19 October 2020
 ; Description: api logic for users
 ===========================================*/


/**
 * Require statements
*/
const express = require('express');
const bcrypt = require('bcryptjs');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const User = require('../models/user');


const router= express.Router();
const saltRounds = 10; //default salt rounds for hashing algorithm

 //find all

 //find all users by id

 /**
 * API: createUser
*/
router.post('/', async(req, res) => {
  try {
    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); //salt/hash the password

    //user object
    let newUser = {
      userName: res.body.userName,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email
    };

    User.create(newUser, function(err, user) {
      if (err) {
        console.log(err);
        const createUserMongoDbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(createUserMongoDbErrorResponse.toObject());
      } else {
        console.log(user);
        const createUserResponse = new BaseResponse(200, 'Query successful', user);
        res.json(createUserResponse.toObject());
      }
    })
  } catch (e) {
    console.log(e);
    const createUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(createUserCatchErrorResponse.toObject());
    }
  });


 //update user question

 //"delete" user question


 module.exports = router;
