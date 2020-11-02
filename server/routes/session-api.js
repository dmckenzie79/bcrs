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
const selectedSecurityQuestions = require('../models/selected-security-question');
//const cors = require('cors');


//configurations

const router= express.Router();

//constants to pass into responses
const serverError = "Internal server error";

//saltrounds for hashing password
const saltRounds = 10;
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

/**
 * VerifyUser
 */

router.get('/verify/users/:userName', async (req, res) => {
  try {
    User.findOne({'userName': req.params.userName}, function(err, user) {

      console.log(req.params.userName);

      if (err) {
        console.log(err);
        const verifyUserMongodbErrorResponse = new ErrorResponse('500', serverError, err);
        res.status(500).send(verifyUserMongodbErrorResponse.toObject());
      }
      else {
        console.log(user);
        const verifyUserResponse = new BaseResponse('200', "User Successfully Verified", user);
        res.json(verifyUserResponse.toObject());
      }
    });
  }
  catch (e) {
    console.log(e);
    const verifyUserCatchErrorResponse = new ErrorResponse('500', serverError, e.message);
    res.status(500).send(verifyUserCatchErrorResponse.toObject());
  }
});

/**
 * VerifySecurityQuestions
 */

router.post('/verify/users/:userName/security-questions', async (req, res) => {
  try {
    User.findOne({'userName': req.params.userName}, function(err, user){
      if (err) {
        console.log(err);
        const verifySecurityQuestionsMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
        res.status(500).send(verifySecurityQuestionsMongodbErrorResponse.toObject());
      }
      else {
        //find security question answer and set to new const
        const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(q1 => q1.questionText === req.body.questionText1);
        const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(q2 => q2.questionText === req.body.questionText2);
        const selectedSecurityQuestionThree = user.selectedSecurityQuestions.find(q3 => q3.questionText === req.body.questionText3);

        //verify that answer is correct for each question
        const isValidAnswerOne = selectedSecurityQuestionOne.answerText === req.body.answerText1;
        const isValidAnswerTwo = selectedSecurityQuestionTwo.answerText === req.body.answerText2;
        const isValidAnswerThree = selectedSecurityQuestionThree.answerText === req.body.answerText3;

        //Check if all three are correct
        if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree) {
          console.log(`User ${user.userName} is verified`);
          const validSecurityQuestionResponse = new BaseResponse ('200', 'success', user);
          res.json(validSecurityQuestionResponse.toObject());
        }
        else {
          console.log(`User ${user.userName} did not answer correctly`);
          const invalidSecurityQuestionResponse = new BaseResponse('200', 'Error: Incorrect Answer', user);
          res.json(invalidSecurityQuestionResponse.toObject());
        }

      }
    });
  }
  catch (e) {
    console.log(e);
    const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
    res.status(500).send(verifySecurityQuestionsCatchErrorResponse.toObject());
  }
});

/**
 * ResetPassword
 */

router.post('/users/:userName/reset-password', async(req, res) => {
  try {
    const password = req.body.password;

    User.findOne({'userName': req.params.userName}, function(err, user) {
      if (err) {
        console.log(err);
        const resetPasswordMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
        res.status(500).send(resetPasswordMongodbErrorResponse.toObject());
      }
      else {
        console.log(user);

        let hashedPassword = bcrypt.hashSync(password, saltRounds);

        user.set({
          password: hashedPassword
        });

        user.save(function(err, updatedUser) {
          if (err) {
            console.log(err);
            const updatedUserMongodbErrorResponse = new ErrorResponse ('500', 'Internal Server Error', err);
            res.status(500).send(updatedUserMongodbErrorResponse.toObject());
          }
          else {
            console.log(updatedUser);
            const updatedUserPasswordResponse = new BaseResponse ('200', 'Password Updated', updatedUser);
            res.json(updatedUserPasswordResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const resetPasswordCatchErrorResponse = new ErrorResponse ('500', 'Internal Server Error', e.message);
    res.status(500).send(resetPasswordCatchErrorResponse.toObject());
  }
});
/**
 * Register
 */
router.post('/register', async (req, res) => {
  try {
    User.findOne({'userName': req.body.userName}, function(err, user)
    {
      if (err) {
        console.log(err);
        const registerUserMongodbErrorResponse = new ErrorResponse ('500', serverError, err);
        res.status(500).send(registerUserMongodbErrorResponse.toObject());
      }
      else {
        if (!user) {
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
          standardRole = {
            role: 'standard'
          }

              // user object
          let registeredUser = {
            userName: req.body.userName,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            role: standardRole,
            selectedSecurityQuestions: req.body.selectedSecurityQuestions
          };

          User.create(registeredUser, function(err, newUser)
          {
            if (err) {
              console.log(err);
              const newUserMongodbErrorResponse = new ErrorResponse('500', serverError, err);
              res.status(500).send(newUserMongodbErrorResponse.toObject());
            }
            else {
              console.log(newUser);
              const registerUserSuccessResponse = new BaseResponse('200', 'User Added', newUser);
              res.json(registerUserSuccessResponse.toObject());
            }
          })
        }
        else {
          console.log('Username already in use');
          const userNameInUseErrorResponse = new ErrorResponse('500', 'Username is already in use', null);
          res.status(500).send(userNameInUseErrorResponse.toObject());
        }
      }
    })
  } catch (e) {
    console.log(e);
    const registerUserCatchErrorResponse = new ErrorResponse ('500', serverError, e.message);
    res.status(500).send(registerUserCatchErrorResponse.toObject());
  }
})

module.exports = router;
