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
const selectedSecurityQuestions = require('../models/selected-security-question');
const Role = require('../models/role');
const router= express.Router();
const saltRounds = 10; //default salt rounds for hashing algorithm

//constants to pass into responses
const serverError = "Internal server error";
const querySuccess = "Query successful - ";
const findAllUsers = "find all users";
const findUserById = "find user by id";
const createUser = "create user";
const updateUser = "update user";
const deleteUser = "delete user";
const findSelectedSecurityQuestions = "find selected security questions";

 //find all
router.get('/', async(req, res) => {
  try {
    User.find({}).where('isDisabled').equals(false).exec(function(err, users) {
      if (err) {
        console.log(err);
        const userFindAllMongodbErrorResponse = new ErrorResponse(500, serverError, err);
        res.status(500).send(userFindAllMongodbErrorResponse.toObject());
      } else {
        console.log(users);
        const userFindAllSuccessResponse = new BaseResponse(200, querySuccess + findAllUsers, users);
        res.json(userFindAllSuccessResponse.toObject());
      }
    });
  } catch (e) {
    const userFindAllCatchErrorResponse = new ErrorResponse(500, serverError, e.message);
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

        const mongoDbErrorResponse = new ErrorResponse ('500', serverError, err);

        res.status(500).send(mongoDbErrorResponse.toObject());
      } else {

        console.log(user);
        const findUserByIdSuccessResponse = new BaseResponse('200', 'User Found', user)
        res.json(findUserByIdSuccessResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);

    const errorCatchResponse = new ErrorResponse('500', serverError, err);
    res.status(500).send(errorCatchResponse.toObject());
  }
});

 //update user
 router.put('/:id', async(req, res) => {
   try {
     User.findOne({'_id': req.params.id}, function(err, user) {
       if (err) {
         console.log(err);
         const userUpdateMongodbErrorResponse = new ErrorResponse(500, serverError, err);
         res.status(500).send(userUpdateMongodbErrorResponse.toObject());
       } else {
         console.log(user);

         user.set({
           firstName: req.body.firstName,
           lastName: req.body.lastName,
           phoneNumber: req.body.phoneNumber,
           address: req.body.address,
           email: req.body.email,
         });

         user.role.set({
           role: req.body.role
         });

         user.save(function(err, savedUser) {
           if (err) {
             console.log(err);
             const saveUserMongodbErrorResponse = new ErrorResponse(500, serverError, err);
             res.status(500).send(saveUserMongodbErrorResponse.toObject());
           } else {
            console.log(savedUser);

            const userUpdateOnSaveSuccessResponse = new BaseResponse('200', querySuccess + updateUser, savedUser);

            res.json(userUpdateOnSaveSuccessResponse.toObject());
          }
         });
       }
     });
   }
   catch (e) {
     console.log(e);
     const updateUserCatchErrorResponse = new ErrorResponse(500, serverError, e.message);
     res.status(500).send(updateUserCatchErrorResponse.toObject());
   }
 });
 //"delete" user - set isDisabled to true, not remove from collection

 router.delete('/:id', async (req, res) => {
  try {
    User.findOne({'_id': req.params.id}, function(err, user) {
      if (err) {
        console.log(err);
        const deleteUserMongodbErrorResponse = new ErrorResponse(500, serverError, err);
        res.status(500).send(deleteUserMongodbErrorResponse.toObject());
      } else {
        console.log(user);

        user.set({
          isDisabled: true
        });

        user.save(function(err, savedUser) {
          if (err) {
            console.log(err);
            const savedUserMongoDbErrorResponse = new ErrorResponse(500, serverError, err);
            res.status(500).send(savedUserMongoDbErrorResponse.toObject());
          } else {
            console.log(savedUser);
            const userDeleteSuccessResponse = new BaseResponse(200, querySuccess + deleteUser, savedUser);
            res.json(userDeleteSuccessResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const userDeleteCatchErrorResponse = new ErrorResponse('500', serverError, e.message);
    res.status(500).send(userDeleteCatchErrorResponse.toObject());
  }
});

/**
 * FindSelectedSecurityQuestion
 */

 router.get('/:userName/security-questions', async (req, res) => {
   try
   {
     User.findOne({'userName': req.params.userName}, function(err, user)
     {
       if (err)
       {
         console.log(err);
         const findSelectedSecurityQuestionsMongoDbErrorResponse = new ErrorResponse('500', serverError, err);
         res.status(500).send(findSelectedSecurityQuestionsMongoDbErrorResponse.toObject());
       }
       else{
         console.log(user);
         const findSelectedSecurityQuestionResponse = new BaseResponse('200', querySuccess + findSelectedSecurityQuestions, user.selectedSecurityQuestions);
         res.json(findSelectedSecurityQuestionResponse.toObject());
       }
     });
   }
   catch(e) {
     console.log(e);
     const findSelectedSecurityQuestionCatchErrorResponse = new ErrorResponse('500', serverError, e.message);
     res.status(500).send(findSelectedSecurityQuestionCatchErrorResponse.toObject());

    }
 });

//find user role api
router.get('/:userName/role', async(req, res) => {
  try {
    //find user by username
    User.findOne({'userName': req.params.userName}, function(err, user) {
      //if err log and return err
      if (err) {
        console.log(err);
        const findUserRoleMongodbErrorResponse = new ErrorResponse ('500', 'Internal Server Error', err);
        res.status(500).send(findUserRoleMongodbErrorResponse.toObject());
      }
      else {
        console.log(user);
        const findUserRoleSuccessResponse = new BaseResponse ('200', 'Role Found', user.role);
        res.json(findUserRoleSuccessResponse.toObject());
      }
    })
  }
  catch (e) {
    console.log(e);
    const findUserRoleCatchErrorResponse = new ErrorResponse ('500', 'Internal Server Error', e.message);
    res.status(500).send(findUserRoleCatchErrorResponse.toObject());
  }
});

 module.exports = router;
