/* ============================================
 ; Title:  security-question-api.js
 ; Author: Jeff Lintel, Zach Dahir, Diandra McKenzie
 ; Date:   19 October 2020
 ; Description: api logic for security questions
 ===========================================*/


/**
 * Require statements
*/
const express = require('express');
const SecurityQuestion = require('../models/security-question');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const User = require('../models/user');


const router= express.Router();


/**
 * API: findAllSecurityQuestions
 * Returns a list of JSON security question objects
*/
router.get('/', async(req, res) => {
  try {
        SecurityQuestion.find({})
          .where('isDisabled') //query where disable equals false
          .equals(false)
          .exec(function(err, securityQuestions) { //execute the query

        if (err) {
          console.log(err);

          const findAllMongoDbErrorResponse = new ErrorResponse ('500', 'Internal server error', err);

          res.status(500).send(findAllMongoDbErrorResponse.toObject());

        } else {
          console.log(securityQuestions);

          const findAllResponse = new BaseResponse('200', 'Query successful', securityQuestions);

          res.json(findAllResponse.toObject());
        }
      });

  } catch(e) {

      console.log(e);

      const findAllErrorCatchResponse = new ErrorResponse('500', 'Internal server error', e.message);

          res.status(500).send(findAllErrorCatchResponse.toObject());

      }
  });


 //find all security questions by id

 //create security question


/**
 * API: updateSecurityQuestion
 * Updates a JSON security question object
*/

router.put('/:id', async(req, res) => {
  try {

   SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {

     if (err) {
       console.log(err);

       const updateSecurityQuestionMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

       res.status(500).send(updateSecurityQuestionMongoDbErrorResponse.toObject());
     } else {
         console.log(securityQuestion);

         securityQuestion.set({
           text: req.body.text
         });

         securityQuestion.save(function(err, savedSecurityQuestion) {
           if (err) {
             console.log(err);

             const updateSecurityQuestionOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

             res.status(500).send(updateSecurityQuestionOnSaveMongoDbErrorResponse.toObject());
           } else {
             console.log(savedSecurityQuestion);

             const updateSecurityQuestionOnSaveSuccessResponse = new BaseResponse('200', 'Update Successful', savedSecurityQuestion);

             res.json(updateSecurityQuestionOnSaveSuccessResponse.toObject());
           }
         });
     }
   });

  } catch (e) {

     console.log(e);

     const updateSecurityQuestionCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);

     res.status(500).send(updateSecurityQuestionCatchErrorResponse.toObject());
  }
});


 //"delete" security question



module.exports = router;



