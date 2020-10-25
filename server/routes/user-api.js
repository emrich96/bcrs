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
const saltRounds = 10; // default salt rounds for hashing algorithm

// findAll
router.get('/', async(req, res) => {
    try {
        User.find({}).where('isDisabled').equals(false).exec(function(err, users) {
            if (err) {
                console.log(err);
                const findAllUsersMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(findAllUsersMongodbErrorResponse.toObject());
            } else {
                console.log(users);
                const findAllUsersResponse = new BaseResponse(200, 'Query successful', users);
                res.json(findAllUsersResponse.toObject());
            }
        })
    } catch (e) {
        console.log(e);
        const findAllUsersCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(findAllUsersCatchErrorResponse.toObject());
    }
});


// findById
router.get('/:id', async(req, res) => {
    try {
        User.findOne({ '_id': req.params.id }, function(err, user) {
            if (err) {
                console.log(err);
                const findUserByIdMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
                res.status(500).send(findUserByIdMongoDbErrorResponse.toObject());
            } else {
                console.log(user);
                const findUserByIdResponse = new BaseResponse(200, "Query successful", user);
                res.json(findUserByIdResponse.toObject());
            }
        })
    } catch (e) {
        console.log(e);
        const findUserByIdCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(findUserByIdCatchErrorResponse.toObject());
    }
});


// createUser
router.post('/', async(req, res) => {
    try {
        let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password

        let newUser = {
            userName: req.body.userName,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email
        }

        User.create(newUser, function(err, user) {
            if (err) {
                console.log(err);
                const createUserMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
                res.status(500).send(createUserMongoDbErrorResponse.toObject());
            } else {
                console.log(user);
                const createUserResponse = new BaseResponse(200, "Query successful", user);
                res.json(createUserResponse.toObject());
            }
        })
    } catch (error) {
        console.log(e);
        const createUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(createUserCatchErrorResponse.toObject());
    }
});

// updateUser
router.put('/:id', async(req, res) => {
    try {
        User.findOne({ '_id': req.params.id }, function(err, user) {
            if (err) {
                console.log(err);
                const updateUserMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
                res.status(500).send(updateUserMongoDbErrorResponse.toObject());
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
                        const savedUserMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
                        res.status(500).send(savedUserMongoDbErrorResponse.toObject());
                    } else {
                        console.log(savedUser);
                        const savedUserResponse = new BaseResponse(200, "Query successful", savedUser);
                        res.json(savedUserResponse.toObject());
                    }
                })
            }
        })
    } catch (e) {
        console.log(e);
        const updateUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(updateUserCatchErrorResponse.toObject());
    }
});

// delete user
router.delete('/:id', async(req, res) => {
    try {
        User.findOne({ '_id': req.params.id }, function(err, user) {
            if (err) {
                console.log(err);
                const deleteUserMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
                res.status(500).send(deleteUserMongoDbErrorResponse.toObject());
            } else {
                console.log(user);

                user.set({
                    isDisabled: true
                });

                user.save(function(err, savedUser) {
                    if (err) {
                        console.log(err);
                        const savedUserMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
                        res.status(500).send(savedUserMongoDbErrorResponse.toObject());
                    } else {
                        console.log(savedUser);
                        const deleteUserResponse = new BaseResponse(200, "Query successful", user);
                        res.json(deleteUserResponse.toObject());
                    }
                })
            }
        })
    } catch (e) {
        console.log(e);
        const deleteUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(deleteUserCatchErrorResponse.toObject());
    }
});

module.exports = router;
