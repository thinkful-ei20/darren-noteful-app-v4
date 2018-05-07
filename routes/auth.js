'use strict';

const express = require('express');
const router = express.Router();

const options = {session: false, failWithError: true};

const passport = require('passport');


const localAuth = passport.authenticate('local', options);

// ===== Protected endpoint =====
router.post('/login', localAuth, function (req, res) {
  // console.log(`${req.user.username} successfully logged in.`);
  return res.json(`${req.user.username} logged in`);
});



module.exports = router;