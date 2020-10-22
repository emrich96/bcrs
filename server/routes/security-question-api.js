/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashliegh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/


// require statements
const express = require('express');
const SecurityQuestion = require('../models/security-question');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

//  configurations
const router = express.Router();


// FindAll
router.get('/', async(req, res) => {
  try {
    SecurityQuestion.find({})
      .where('isDisabled')
      .equals(false)
      .exec(function(err, securityQuestions)
    {
      if (err) {
        console.log(err);
        const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(findAllMongodbErrorResponse.toObject());
      } else {
        console.log(securityQuestions);
        const findAllResponse = new BaseResponse(200, 'Query successful', securityQuestions);
        res.json(findAllResponse.toObject());
      }
    })
  } catch (e) {
    console.log(e);
    const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});


// FindByID
router.get('/:id', async(req, res) => {
  try {
    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion){
      if (err) {
        console.log(err);
        const findByIdMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(findByIdMongoDbErrorResponse.toObject());
      } else {
        console.log(securityQuestion);
        const findByIdResponse = new BaseResponse(200, "Query successful", securityQuestion);
        res.json(findByIdResponse.toObject());
      }
    })
  } catch (e) {
    console.log(e);
    const findByIdCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findByIdCatchErrorResponse.toObject());
  }
});


// CreateSecurityQuestion
router.post('/', async(req, res) => {
  try {
    let newSecurityQuestion = {
      text: req.body.text
    };

    SecurityQuestion.create(newSecurityQuestion, function(err, securityQuestion){
      if (err) {
        console.log(err);
        const createSecurityQuestionMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(createSecurityQuestionMongoDbErrorResponse.toObject());
      } else {
        console.log(securityQuestion);
        const createSecurityQuestionResponse = new BaseResponse(200, "Query successful", securityQuestion);
        res.json(createSecurityQuestionResponse.toObject());
      }
    })
  } catch (error) {
    console.log(e);
    const createSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
  }
});


// UpdateSecurityQuestion
router.put('/', async(req, res) => {
  try {
    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
      if (err){
        console.log(err);
        const updateSecurityQuestionMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(updateSecurityQuestionMongoDbErrorResponse.toObject());
      } else {
        console.log(securityQuestion);

        securityQuestion.set({
          text: req.body.text
        });

        securityQuestion.save(function (err, savedSecurityQuestion) {
          if (err) {
            console.log(err);
            const savedSecurityQuestionMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
            res.status(500).send(savedSecurityQuestionMongoDbErrorResponse.toObject());
          } else {
            console.log(savedSecurityQuestion);
            const savedSecurityQuestionResponse = new BaseResponse(200, "Query successful", securityQuestion);
            res.json(savedSecurityQuestionResponse.toObject());
          }
        })
      }
    })
  } catch (e) {
    console.log(e);
    const updateSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(updateSecurityQuestionCatchErrorResponse.toObject());
  }
});


// DeleteSecurityQuestion
router.delete('/:id', async (req, res) => {
  try {
    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
      if (err) {
        console.log(err);
        const deleteSecurityQuestionMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(deleteSecurityQuestionMongoDbErrorResponse.toObject());
      } else {
        console.log(securityQuestion);

        securityQuestion.set({
          isDisabled: true
        });

        securityQuestion.save(function (err, savedSecurityQuestion) {
          if (err) {
            console.log(err);
            const savedSecurityQuestionMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
            res.status(500).send(savedSecurityQuestionMongoDbErrorResponse.toObject());
          } else {
            console.log(savedSecurityQuestion);
            const deleteSecurityQuestionResponse = new BaseResponse(200, "Query successful", securityQuestion);
            res.json(deleteSecurityQuestionResponse.toObject());
          }
        })
      }
    })
  } catch (e) {
    console.log(e);
    const deleteSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(deleteSecurityQuestionCatchErrorResponse.toObject());
  }
});

module.exports = router;
