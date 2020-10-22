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

 //find all users by id
router.get('/:id', async(req, res) => {
  try
  {
    User.findOne({'_id': req.params.id}, function(err, user) {
      if (err) {
        console.log(err);
        const findByIdMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error',err);
        res.status(500).send(findByIdMongoDbErrorResponse.toObject())
      }
      else
      {
        console.log(user);
        const findByIdResponse = new BaseResponse('200', 'Query successful', user);
        res.json(findByIdResponse.toObject());
      }
    });
  }
  catch(e)
  {
    console.log(e);
    const findByIdCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(findByIdCatchErrorResponse.toObject());
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
 //"delete" user

 router.delete('/:id', async(req, res) => {
   try
   {
     User.findOne({'_id': req.params.id}, function(err, user) {
       if (err) {
         console.log(err);
         const deleteUserMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
         res.status(500).send(deleteUserMongoDbErrorResponse.toObject());
       }
       else
       {
         console.log(user);
         user.set({isDisabled: true});

         user.save(function(err, savedUser) {
           if (err) {
             console.log(err);
             const savedUserMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
             res.status(500).send(savedUserMongoDbErrorResponse.toObject());
           }
           else
           {
             console.log(savedUser);
             const savedUserResponse = new BaseResponse('200', 'Query successful', savedUser);
             res.json(savedUserResponse.toObject());
           }
         });
       }
     });
   }
   catch(e)
   {
     console.log(e);
     const deleteUserCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
     res.status(500).send(deleteUserCatchErrorResponse.toObject());
   }
 });




 module.exports = router;
