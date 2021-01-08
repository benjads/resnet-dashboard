const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

/*
Middleware: authenticated users only
 */
const withAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401);
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        return;
      }

      req.cruzid = decoded.cruzid;
      req.role = decoded.role;
      next();
    });
  }
};

/*
Middleware: supervisors only
 */
const asPrivileged = (req, res, next) => {
  if (!req.cruzid || !req.role) {
    next();
  }

  if (req.role !== 'supervisor' && req.role !== 'dev-tech') {
    res.status(401);
    return;
  }

  next();
};

/*
Route: add a new user (user mgmt)
 */
router.post('/add', (req, res) => {
  const { cruzid, password, role } = req.body;

  if (!cruzid || !password || !role) {
    res.status(400).send('Invalid parameter!');
    return;
  }

  const user = new User({ cruzid, password, role });

  user.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error register a new user!');
    } else {
      res.status(200).send('User successfully registered');
    }
  });
});

/*
Route: main login page
 */
router.post('/login', (req, res) => {
  const { cruzid, password, role } = req.body;

  User.findOne({ cruzid }, (dbErr, user) => {
    if (dbErr) {
      res.status(500);
    } else if (!user) {
      res.status(401);
    } else {
      user.isCorrectPassword(password, (cryptErr, same) => {
        if (cryptErr) {
          res.status(500);
        } else if (!same) {
          res.status(401);
        } else {
          const payload = { cruzid, role };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: '1h',
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
