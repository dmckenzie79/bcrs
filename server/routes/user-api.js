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
//const { try } = require('bluebird');


const router= express.Router();
const saltRounds = 10; //default salt rounds for hashing algorithm

 //find all
router.get('/', async(req, res) => {
  try {
    User.find({}).where('isDisabled').equals(false).exec(function(err, users) {
      if (err) {
        console.log(err);
        const userFindAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(userFindAllMongodbErrorResponse.toObject());
      } else {
        console.log(users);
        const userFindAllSuccessResponse = new BaseResponse(200, 'Find All was Successful', users);
        res.json(userFindAllSuccessResponse.toObject());
      }
    })
  } catch (e) {
    const userFindAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(userFindAllCatchErrorResponse.toObject());
  }
});

 //find user by id

 router.get('/:id', async(req, res) => {
  try {
    User.findOne({'_id': req.params.id}, function(err, user) {

      console.log(req.params.id)

      if (err) {
        console.log(err);

        const mongoDbErrorResponse = new ErrorResponse ('500', 'Internal server error', err);

        res.status(500).send(mongoDbErrorResponse.toObject());
      } else {

        console.log(user);
        res.json(user);
      }
    })
  } catch (e) {
    console.log(e);

    const errorCatchResponse = new ErrorResponse('500', 'Internal server error', err)
    res.status(500).send(errorCatchResponse.toObject());
  }
});

 /**
 * API: createUser
*/
router.post('/', async(req, res) => {
  try {
    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); //salt/hash the password

    //user object
    let newUser = {
      userName: req.body.userName,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
      role: standardRole //from slack update from krasso
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
    });
  } catch (e) {
    console.log(e);
    const createUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(createUserCatchErrorResponse.toObject());
    }
  });


 //update user
 router.put('/:id', async(req, res) => {
   try {
     User.findOne({'_id': req.params.id}, function(err, user) {
       if (err) {
         console.log(err);
         const userUpdateMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
         res.status(500).send(userUpdateMongodbErrorResponse.toObject());
       } else {
         console.log(user);

         user.set({
           firstName: req.body.firstName,
           lastName: req.body.lastName,
           phoneNumber: req.body.phoneNumber,
           address: req.body.address,
           email: req.body.email
         })

         user.save(function(err, savedUser) {
           if (err) {
             console.log(err);
             const saveUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
             res.status(500).send(saveUserMongodbErrorResponse.toObject());
           }
         })
       }
     })
   }
   catch (e) {
     console.log(e);
     const updateUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
     res.status(500).send(updateUserCatchErrorResponse.toObject());
   }
 })
 //"delete" user - set isDisabled to true, not remove from collection

 router.delete('/:id', async (req, res) => {
  try {
    User.findOne({'_id': req.params.id}, function(err, securityQuestion) {
      if (err) {
        console.log(err);
        const DeleteSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(DeleteSecurityQuestionMongodbErrorResponse.toObject());
      } else {
        console.log(securityQuestion);

        securityQuestion.set({
          isDisabled: true
        });

        securityQuestion.save(function(err, savedSecurityQuestion) {
          if (err) {
            console.log(err);
            const savedSecurityQuestionOnSaveMongoDbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(savedSecurityQuestionOnSaveMongoDbErrorResponse.toObject());
          } else {
            console.log(savedSecurityQuestion);
            const DeleteSecurityQuestionSuccessResponse = new BaseResponse(200, 'Security Question was deleted', savedSecurityQuestion);
            res.json(DeleteSecurityQuestionSuccessResponse.toObject());
          }
        })
      }
    })
  } catch (e) {
    console.log(e);
    const DeleteSecurityQuestionCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(DeleteSecurityQuestionCatchErrorResponse.toObject());
  }
})




 module.exports = router;
