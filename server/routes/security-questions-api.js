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
//const securityQuestionSchema = require('../models/security-question');
//const { bluebird } = require('bluebird');
//const { create } = require('../models/security-question');


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


//find security questions by id
router.get('/:id', async(req, res) => {
  try {
    securityQuestion.findOne({'_id': req.params._id}, function(err, question) {

      if (err) {
        console.log(err);

        const mongoDbErrorResponse = new ErrorResponse ('500', 'Internal server error', err);

        res.status(500).send(mongoDbErrorResponse.toObject());
      } else {

        console.log(question);
        res.json(question);
      }
    })
  } catch (e) {
    console.log(e);

    const errorCatchResponse = new ErrorResponse('500', 'Internal server error', err)
    res.status(500).send(errorCatchResponse.toObject());
  }
});

 //create security question

 router.post('/', async(req, res) => {
   try
   {
     let newSecurityQuestion = {
       text: req.body.text
     };

     securityQuestion.create(newSecurityQuestion, function(err, securityQuestion) {
       if(err) {
         console.log(err);
         const createSecurityQuestionMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
         res.status(500).send(createSecurityQuestionMongoDbErrorResponse.toObject());
       } else {
         console.log(securityQuestion);
         const createSecurityQuestionResponse = new BaseResponse('200', 'Query successful', securityQuestion);
         res.json(createSecurityQuestionResponse.toObject());
       }
     })
   } catch(e) {
     console.log(e);
     const createSecurityQuestionCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
     res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
   }
 })

 /*router.post(':/', async(req, res) => {
   try {
     SecurityQuestion.findOne({'_id': req.params._id}, function(err, question) {
       if (err) {
         console.log(err);

         const createSecurityQuestionMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

         res.status(500).send(createSecurityQuestionMongoDbErrorResponse.toObject());
       } else {

        const question = {
          text: req.body.text
        };

        securityQuestion.push(question);
        securityQuestion.save(function(err, updatedQuestion) {
          if (err) {
            console.log(err);

            const createSecurityQuestionOnSaveMongoDbErrorResponse = new ErrorResponse ('500', 'Internal server error', err);

            res.status(500).send(createSecurityQuestionOnSaveMongoDbErrorResponse.toObject());
          } else {

            console.log(updatedQuestion);

            const createSecurityQuestionOnSaveSuccessResponse = new BaseResponse('200', 'Entry successful', updatedQuestion);

            res.json(createSecurityQuestionOnSaveSuccessResponse.toObject());
          }
        });
       }
     });
   } catch (e) {
     console.log(e);

     const createQuestionCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);

     res.status(500).send(createQuestionCatchErrorResponse.toObject());
   }
 })
*/

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
router.delete('/:id', async (req, res) => {
  try {
    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
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



