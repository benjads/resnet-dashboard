const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

/*
Middleware: authenticated users only
 */
const withAuth = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(401).json({
      error: 'Auth request did not include a web token',
    });
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: 'Error processing web token',
        });
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
    res.status(401).json({
      error: 'Error processing request',
    });
    return;
  }

  if (req.role !== 'supervisor' && req.role !== 'dev-tech') {
    res.status(401).json({
      error: 'You do not have permission to do this',
    });
    return;
  }

  next();
};

/*
Route: list all users (user mgmt)
 */
router.post('/list', withAuth, asPrivileged, (req, res) => {
  User.find({}, (dbErr, users) => {
    if (dbErr) {
      res.status(500).json({
        error: 'Internal server error.',
      });
      return;
    }

    res.status(200).json({
      users,
    });
  });
});

/*
Route: add a new user (user mgmt)
 */
router.post('/add', (req, res) => {
  // TODO: Auth verification

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
  // TODO: Brute force

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
          const { role } = user;
          const payload = {
            cruzid, role,
          };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: '1h',
          });

          const { firstName, lastName } = user;

          res.status(200).json({
            cruzid, firstName, lastName, role, token,
          });
        }
      });
    }
  });
});

/*
Route: self change password
 */
router.post('/changePassword', withAuth, (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { cruzid } = req;

  if (!cruzid || !oldPassword || !newPassword) {
    res.status(400).json({
      error: 'Invalid parameter.',
    });
    return;
  }

  User.findOne({ cruzid }, (dbErr, user) => {
    if (dbErr || !user) {
      res.status(500).json({
        error: 'Internal server error.',
      });
    } else {
      user.isCorrectPassword(oldPassword, (cryptErr, same) => {
        if (cryptErr) {
          res.status(500).json({
            error: 'Internal server error.',
          });
          return;
        }

        if (!same) {
          res.status(401).json({
            error: 'Invalid old password!',
          });
          return;
        }

        user.setPassword(newPassword);

        user.save((err) => {
          if (err) {
            res.status(500).json({
              error: 'Internal server error while saving new password!',
            });
          } else {
            res.sendStatus(200);
          }
        });
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
