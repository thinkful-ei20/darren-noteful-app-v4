'use strict';

const express = require('express');
const router = express.Router();

const options = {session: false, failWithError: true};

const passport = require('passport');


const localAuth = passport.authenticate('local', options);

// const mongoose = require('mongoose');

// const User = require('../models/user');


// ===== Protected endpoint =====
router.post('/', localAuth, function (req, res) {
  // console.log(`${req.user.username} successfully logged in.`);
  return res.json(`${req.user.username} logged in`);
});



module.exports = router;