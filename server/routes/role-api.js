/* ============================================
 ; Title:  role-api.js
 ; Author: Jeff Lintel, Zach Dahir, Diandra McKenzie
 ; Date:   5 November 2020
 ; Description: api logic for roles
 ===========================================*/


/**
 * Require statements
*/
const express = require('express');
const Role = require('../models/role');
const User = require('../models/user');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

const router= express.Router();

/**
 * FindAll
*/

router.get('/', async (req, res) => {
  try
  {
    Role.find({})
        .where('isDisabled')
        .equals(false)
        .exec(function(err, roles)
        {
          if (err)
          {
            console.log(err);
            const findAllRolesMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
            res.status(500).send(findAllRolesMongoDbErrorResponse.toObject());
          }
          else {
            console.log(roles);
            const findAllRolesSuccessResponse = new BaseResponse('200', 'Query Successful', roles);
            res.json(findAllRolesSuccessResponse.toObject());
          }
        });
      }
      catch (e)
      {
        console.log(e);
        const findAllRolesCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(findAllRolesCatchErrorResponse.toObject());
      }
});

/**
 * FindById
*/

router.get('/:roleId', async(req, res) => {
  try
  {
    Role.findOne({'_id': req.params.roleId}, function(err, role)
    {
      if (err)
      {
        console.log(err);
        const findRoleByIdMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
      res.status(500).send(findRoleByIdMongoDbErrorResponse.toObject());
      }
      else
      {
        console.log(role);
        const findRoleByIdMongoDbSuccessResponse = new BaseResponse('200', 'Query Successful', role);
        res.json(findRoleByIdMongoDbSuccessResponse.toObject());
      }
    });
  }
  catch (e)
  {
    console.log(e);
    const findRoleByIdCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
  }
});

/**
 * CreateRole
*/

router.post('/', async(req, res) => {
  try
  {
    const newRole = {
      text:req.body.text
    };

    Role.create(newRole, function(err, role)
    {
      if (err)
      {
        console.log(err);
        const createRoleMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(createRoleMongoDbErrorResponse.toObject());
      }
      else
      {
        console.log(role);
        const createRoleMongoDbSuccessResponse = new BaseResponse('200', 'Query Successful', role);
        res.json(createRoleMongoDbSuccessResponse.toObject());
      }
    });
  }
  catch (e)
  {
    console.log(e);
    const createRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(createRoleCatchErrorResponse.toObject());
  }
});

/**
 * UpdateRole
*/
router.put('/:roleId', async(req, res) => {
  try
  {
    Role.findOne({'_id': req.params.roleId}, function(err, role)
    {
      if (err)
      {
        console.log(err);
        const updateRoleMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(updateRoleMongoDbErrorResponse.toObject());
      }
      else
      {
        console.log(role);

        role.set({
          text: req.body.text
        });

        role.save(function(err, updatedRole)
        {
          if (err)
          {
            console.log(err);
            const updateSaveRoleMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
            res.status(500).send(updateSaveRoleMongoDbErrorResponse.toObject());
          }
          else
          {
            console.log(updatedRole);
            const updateRoleSuccessResponse = new BaseResponse('200', 'Query Successful', updatedRole);
            res.json(updateRoleSuccessResponse.toObject());
          }
        });
      }
    });
  }
  catch (e)
  {
    console.log(e);
    const updateRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(updateRoleCatchErrorResponse.toObject());
  }
});

/**
 * DeleteRole
*/

router.delete('/:roleId', async(req, res) => {
  try
  {
    /**
     * Find the role by document Id
    */
    Role.findOne({'_id': req.params.roleId}, function(err, role)
    {
     if (err)
     {
       console.log(err);
       const deleteRoleMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
       res.status(500).send(deleteRoleMongoDbErrorResponse.toObject());
     }
     else
     {
       console.log(role);
       /**
         * Aggregate query to determine if the role being deleted is already mapped to an existing user
        */
       User.aggregate(
         [
           {
            $lookup:
            {
              from: 'roles',
              localField: 'role.role',
              foreignField: 'text',
              as: 'userRoles'
            }
           },
           {
             $match:
             {
               'userRoles.text': role.text
             }
           }
         ], function(err, users)
         {
           if(err)
           {
             console.log(err);
             const usersMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
             res.status(500).send(usersMongoDbErrorResponse.toObject());
           }
           else
           {
             /**
               * If the query returns one or more users, then the role is already in use and shouldn't be disabled
              */
             if (users.length > 0)
             {
               console.log(`Role <${role.text}> is already is use and cannot be deleted`);
               const userRoleAlreadyInUseResponse = new BaseResponse('200', `Role <${role.text}> is already in use and cannot be deleted`, users);
               res.json(userRoleAlreadyInUseResponse.toObject());
             }
             else
             {
                /**
                 * Otherwise, the role requesting to be disabled is not in use and can be safely removed
                */
               console.log(`Role <${role.text}> is not an active role and can be safely removed`);

               role.set({
                 isDisabled: true
               });

               role.save(function(err, updatedRole)
               {
                if (err)
                {
                  console.log(err);
                  const updatedRoleMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                  res.status(500).send(updatedRoleMongoDbErrorResponse.toObject());
                }
                else
                {
                  console.log(updatedRole);
                  const roleDeletedResponse = new BaseResponse('200', `Role <${role.text}> has been removed successfully`, updatedRole);
                  res.json(roleDeletedResponse.toObject());
                }
               });
             }
           }
         }
       );
     }
   });
  }
  catch(e)
  {
    console.log(e);
    const deleteRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(deleteRoleCatchErrorResponse.toObject());
  }

});

module.exports = router;
