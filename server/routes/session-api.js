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
    } catch (err) {
        console.log(e);
        const signinCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(signinCatchErrorResponse.toObject());
    }
});

module.exports = router;
