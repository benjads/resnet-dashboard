const express = require('express');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const whitelist = ['http://localhost:3000', 'http://localhost:9000'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

const mongoUri = 'mongodb://localhost:27018/resdash';
mongoose.connect(mongoUri, { useNewUrlParser: true }, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongoUri}`);
  }
});

app.use('/auth', authRouter);

module.exports = app;
