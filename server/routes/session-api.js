/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/

// require statements
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

//  configurations
const router = express.Router();

// User sign-in
router.post('/signin', async(req, res) => {
    try {
        User.findOne({ 'userName': req.body.userName }, function(err, user) {
            if (err) {
                console.log(err);
                const signinMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
                res.status(500).send(signinMongoDbErrorResponse.toObject());
            } else {
                console.log(user);

                // if the username is valid
                if (user) {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password); // compare the saved hashed password against the saved

                    // if the password is valid
                    if (passwordIsValid) {
                        console.log("Login Successful");
                        const signinResponse = new BaseResponse(200, "Login successful", user);
                        res.json(signinResponse.toObject());
                    } else {
                        // if the password is not valid
                        console.log(`Invalid password for username: ${user.userName}`);
                        const invalidPasswordResponse = new BaseResponse(401, "Invalid user name and/or password, please try again", null);
                        res.status(401).send(invalidPasswordResponse.toObject());
                    }
                } else {
                    console.log(`Username: ${req.body.userName} is invalid`);
                    const invalidUserNameResponse = new BaseResponse(200, 'Invalid user name and/or password, please try again', null)
                    res.status(401).send(invalidUserNameResponse.toObject());
                }
            }
        })
    } catch (e) {
        console.log(e);
        const signinCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(signinCatchErrorResponse.toObject());
    }
});

// Register
router.post('/', async(req, res) => {
  try {
    User.findOne({'userName': req.body.userName}, function (err, user) {
      if (err) {
        console.log(err);
        const registerUserMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(registerUserMongoDbErrorResponse.toObject());

      } else {
        if (!user){
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password
          standardRole = {
            role: 'Standard'
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
          }

          User.create(registeredUser, function(err, newUser) {
              if (err) {
                  console.log(err);
                  const newUserMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
                  res.status(500).send(newUserMongoDbErrorResponse.toObject());
              } else {
                  console.log(newUser);
                  const newUserResponse = new BaseResponse(200, "Query successful", newUser);
                  res.json(newUserResponse.toObject());
              }
          })
        } else {
          console.log('The provided username already exists in our system');
          const userExistsErrorResponse = new ErrorResponse(500, "User already exists in our system", err);
          res.status(500).send(userExistsErrorResponse.toObject());
        }
      }
    })
  } catch (e) {
      console.log(e);
      const createUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
      res.status(500).send(createUserCatchErrorResponse.toObject());
  }
});

// verify user
router.get('/verify/users/:userName', async (req, res) => {
  try {
    User.findOne({'userName': req.params.userName}, function(err, user){
      if (err) {
        console.log(err);
        const verifyUserMongoErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(verifyUserMongoErrorResponse.toObject());
      } else {
        console.log(user);
        const verifyUserMongoResponse = new BaseResponse(200, "Query successful", user);
        res.json(verifyUserMongoResponse.toObject());
      }
    })
  } catch (e) {
    console.log(e);
      const verifyUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
      res.status(500).send(verifyUserCatchErrorResponse.toObject());
  }
});


// verify security questions
router.post('/verify/users/:userName/security-questions', async (req, res) => {
  try {
    User.findOne({'userName': req.params.userName}, function(err, user){
      if (err) {
        console.log(err);
        const verifySecurityQuestionsErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(verifySecurityQuestionsErrorResponse.toObject());
      } else {
        console.log(user);

        const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(q => q.questionText === req.body.questionText1);
        const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(q2 => q2.questionText === req.body.questionText2);
        const selectedSecurityQuestionThree = user.selectedSecurityQuestions.find(q3 => q3.questionText === req.body.questionText3);

        const isValidAnswerOne = selectedSecurityQuestionOne.answerText === req.body.answerText1;
        const isValidAnswerTwo = selectedSecurityQuestionTwo.answerText === req.body.answerText2;
        const isValidAnswerThree = selectedSecurityQuestionThree.answerText === req.body.answerText3;

        if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree) {
          console.log(`User ${user.userName} answered their security questions correctly`);
          const validAnswersResponse = new BaseResponse(200, "success", user);
          res.json(validAnswersResponse.toObject());
        } else {
          console.log(`User ${user.userName} did NOT answer their security questions correctly`);
          const invalidAnswersResponse = new BaseResponse(200, "error", user);
          res.json(invalidAnswersResponse.toObject());
        }
      }
    })
  } catch (e) {
    console.log(e);
    const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(verifySecurityQuestionsCatchErrorResponse.toObject());
  }
});

// reset password
router.post('/users/:userName/reset-password', async(req, res) => {
  try {
    const password = req.body.password;

    User.findOne({'userName': req.params.userName}, function(err, user){
      if (err){
        console.log(err);
        const resetPasswordMongoError = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(resetPasswordMongoError.toObject());
      } else {
        console.log(user);

        let hashedPassword = bcrypt.hashSync(password, saltRounds);
        user.set({
          password: hashedPassword
        });

        user.save(function (err, updatedUser) {
          if (err) {
            console.log(err);
            const updatedUserErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
            res.status(500).send(updatedUserErrorResponse.toObject());
          } else {
            console.log(updatedUser);
            const updatedPasswordResponse = new BaseResponse(200, "Query successful", updatedUser);
            res.json(updatedPasswordResponse.toObject());
          }
        })
      }
    })
  } catch (e) {
    console.log(e);
    const resetPasswordCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(resetPasswordCatchErrorResponse.toObject());
  }
});

module.exports = router;
