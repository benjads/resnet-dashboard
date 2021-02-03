/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  cruzid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
});

UserSchema.pre('save', function (next) {
  const doc = this;
  bcrypt.hash(doc.password, 10,
    (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        doc.password = hashedPassword;
        next();
      }
    });
});

UserSchema.methods.setPassword = function (newPassword) {
  this.password = newPassword;
};

UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
