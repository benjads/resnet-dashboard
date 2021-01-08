const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  cruzid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
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
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = (password, callback) => {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
