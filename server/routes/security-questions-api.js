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
const securityQuestion = require('../models/security-question');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const User = require('../models/user');


const router= express.Router();


/**
 * API: findAllSecurityQuestions
 * Returns a list of JSON security question objects
*/
router.get('', async(req, res) => {
  try {
        securityQuestion.findOne({'text': req.params.text}, 'isDisabled: false', function(err, question) {

        if (err) {
          console.log(err);

          const mongoDbErrorResponse = new ErrorResponse ('500', 'Internal server error', err);

          res.status(500).send(mongoDbErrorResponse.toObject());

        } else {
          console.log(question);

          const securityQuestionResponse = new BaseResponse('200', 'Query successful', question);

          res.json(securityQuestionResponse.toObject());
        }
      });

  } catch(e) {

      console.log(e);

      const errorCatchResponse = new ErrorResponse('500', 'Internal server error', e.message);

          res.status(500).send(errorCatchResponse.toObject());

      }
  });


 //find all security questions by id

 //create security question


/**
 * API: updateSecurityQuestion
 * Updates a JSON security question object
*/

router.put('/:_id', async(req, res) => {
  try {

   securityQuestion.findOne({'_id': req.params._id}, function(err, question) {

     if (err) {
       console.log(err);

       const updateSecurityQuestionMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

       res.status(500).send(updateSecurityQuestionMongoDbErrorResponse.toObject());
     } else {
         console.log(question);

         question.set({
           text: req.body.text,
         });

         question.save(function(err, updatedQuestion) {
           if (err) {
             console.log(err);

             const updateSecurityQuestionOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

             res.status(500).send(updateSecurityQuestionOnSaveMongoDbErrorResponse.toObject());
           } else {
             console.log(updatedQuestion);

             const updateSecurityQuestionOnSaveSuccessResponse = new BaseResponse('200', 'Update Successful', updatedQuestion);

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



