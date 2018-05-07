'use strict';

const express = require('express');
const router = express.Router();

// const mongoose = require('mongoose');

const User = require('../models/user');

router.post('/', (req,res,next) => {
  const {fullName, username, password} = req.body;

  // const newUser = {
  //   fullName,
  //   username,
  //   password
  // };

  // User.create(newUser)
  //   .then(result => {
  //     res
  //       .location(`${req.originalUrl}/${result.id}`)
  //       .status(201)
  //       .json(result);
  //   }).catch(err => {
  //     next(err);
  //   });

  return User.hashPassword(password)
    .then(digest => {
      const newUser = {
        username,
        password: digest,
        fullName
      };
      return User.create(newUser);
    })
    .then(result => {
      return res.status(201).location(`/api/users/${result.id}`).json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The username already exists');
        err.status = 400;
      }
      next(err);
    });

});


module.exports = router;