/*
============================================
; Title: BCRS
; Authors: Mike Goldberg, Emily Richter, Ashleigh Lyman
; Date: 10/20/2020
; Modified By: Mike Goldberg
; Description: E2E MEAN Stack Application
;===========================================
*/

// require Statements
const express = require('express');
const Role = require('../models/role');
const User = require('../models/user');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

const router = express.Router();

// findAll
router.get('/', async (req, res) => {
  try {
    Role.find({})
      .where('isDisabled')
      .equals(false)
      .exec(function(err, roles) {
        if (err) {
          console.log(err);
          const findAllRolesErrorResponse = new ErrorResponse(500, 'Internal server error', err);
          res.status(500).send(findAllRolesErrorResponse.toObject());
        } else {
          console.log(roles);
          const findAllUserRolesResponse = new BaseResponse(200, 'Query successful', roles);
          res.json(findAllUserRolesResponse.toObject());
        }
      })
  } catch (e) {
    console.log(e);
    const findAllRolesCatchResponse = new ErrorResponse(500, 'Internal server error', e);
    res.status(500).send(findAllRolesCatchResponse.toObject());
  }
})

// findById
router.get('/:roleId', async(req, res) => {
  try {
      Role.findOne({ '_id': req.params.roleId }, function(err, role) {
          if (err) {
              console.log(err);
              const findRoleByIdMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
              res.status(500).send(findRoleByIdMongoDbErrorResponse.toObject());
          } else {
              console.log(role);
              const findRoleByIdResponse = new BaseResponse(200, "Query successful", role);
              res.json(findRoleByIdResponse.toObject());
          }
      })
  } catch (e) {
      console.log(e);
      const findRoleByIdCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
      res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
  }
});

// createRole
router.post('/', async (req, res) => {
  try {
    const newRole = {
      text: req.body.text
    }
    Role.create(newRole, function(err, role) {
      if (err) {
        console.log(err);
        const createRoleMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(createRoleMongoDbErrorResponse.toObject());
    } else {
        console.log(role);
        const createRoleResponse = new BaseResponse(200, "Query successful", role);
        res.json(createRoleResponse.toObject());
    }
    })
  } catch (e) {
    console.log(e);
    const createRoleCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(createRoleCatchErrorResponse.toObject());
  }
});

// updateRole
router.put('/:roleId', async (req, res) => {
  try {
    Role.findOne({ '_id': req.params.roleId }, function(err, role) {
      if (err) {
          console.log(err);
          const updateRoleMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
          res.status(500).send(updateRoleMongoDbErrorResponse.toObject());
      } else {
          console.log(role);

          role.set({
            text: req.body.text
          });

          role.save(function(err, updatedRole) {
            if (err){
              console.log(err);
              const updatedRoleMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
              res.status(500).send(updatedRoleMongoDbErrorResponse.toObject());
            } else {
              console.log(updatedRole)
              const updatedRoleResponse = new BaseResponse(200, "Query successful", updatedRole);
              res.json(updatedRoleResponse.toObject());
            }
          })
        }
    })
  } catch (e) {
    console.log(e);
    const findRoleByIdCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
  }
});

// deleteRole
router.delete('/:roleId', async (req,res) => {
  try {
    // find the document by ID
    Role.findOne({ '_id': req.params.roleId }, function(err, role) {
      if (err) {
        console.log(err);
        const updateRoleMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
        res.status(500).send(updateRoleMongoDbErrorResponse.toObject());
      } else {
        console.log(role);

        // Aggregate query to determine if the role being delete is already mapped to an existing user
        User.aggregate(
          [
            {
              $lookup:
              {
                from: 'roles',
                localField: 'role.role',
                foreignField: 'text',
                as: 'userRoles'
              },
            },
            {
              $match:
              {
                'userRoles.text': role.text
              }
            }
          ], function(err, users) {
            if (err) {
              console.log(err);
              const usersRoleMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
              res.status(500).send(usersRoleMongoDbErrorResponse.toObject());
            } else {
              // If the query returns one or more users, then the role is already in use and shouldn't be disabled
              if (users.length > 0) {
                console.log(`Role <${role.text}> is already in use and should not be disabled`)
                const inUseRoleResponse = new BaseResponse(200, `Role <${role.text}> is already in use and should not be disabled`, role);
                res.json(inUseRoleResponse.toObject());
              } else {
                // Role is not in use and can safely be disabled
                console.log(`Role <${role.text}> is not in use and can safely be disabled`);

                role.set({
                  isDisabled: true
                });

                role.save(function(err, updatedRole) {
                  if (err){
                    console.log(err);
                    const updatedRoleMongoDbErrorResponse = new ErrorResponse(500, "Internal server error", err);
                    res.status(500).send(updatedRoleMongoDbErrorResponse.toObject());
                  } else {
                    console.log(updatedRole)
                    const deletedRoleResponse = new BaseResponse(200, `Role <${role.text}> has been removed successfully`, updatedRole);
                    res.json(deletedRoleResponse.toObject());
                  }
                })
              }
            }
          }
        )
      }
    });
  } catch (e) {
    console.log(e);
    const deleteRoleCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(deleteRoleCatchErrorResponse.toObject());
  }
});

module.exports = router;
