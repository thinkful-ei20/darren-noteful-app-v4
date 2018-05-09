'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const  { JWT_SECRET, JWT_EXPIRY } = require('../config');

const options = {session: false, failWithError: true};

const passport = require('passport');


function createAuthToken (user) {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

const localAuth = passport.authenticate('local', options);

// ===== Protected endpoint =====
// router.post('/login', localAuth, function (req, res) {
//   // console.log(`${req.user.username} successfully logged in.`);
//   return res.json(`${req.user.username} logged in`);
// });
router.post('/login', localAuth, (req, res) => {
  console.log(`${req.user} successfully logged in.`);
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});


module.exports = router;