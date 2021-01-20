const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

/*
Middleware: authenticated users only
 */
const withAuth = (req, res, next) => {
  const token = req.body.token
      || req.query.token
      || req.headers['X-Access-Token']
      || req.cookies.token;

  if (!token) {
    res.sendStatus(401);
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
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
      res.status(500).json({
        error: 'Internal server error while registering new user!',
      });
    } else {
      res.status(200);
    }
  });
});

/*
Route: main login page
 */
router.post('/login', (req, res) => {
  const { cruzid, password } = req.body;

  User.findOne({ cruzid }, (dbErr, user) => {
    if (dbErr) {
      res.status(500).json({
        error: 'Internal server error.',
      });
    } else if (!user) {
      res.status(401).json({
        error: 'Invalid username/password!',
      });
    } else {
      user.isCorrectPassword(password, (cryptErr, same) => {
        if (cryptErr) {
          res.status(500).json({
            error: 'Internal server error.',
          });
        } else if (!same) {
          res.status(401).json({
            error: 'Invalid username/password!',
          });
        } else {
          const payload = {
            cruzid,
          };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: '1h',
          });

          const { firstName, lastName } = user;

          res.status(200).send({
            cruzid, firstName, lastName, token,
          });
        }
      });
    }
  });
});

/*
Route: verify validity of client token
 */
router.get('/verify', withAuth, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
