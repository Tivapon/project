const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: function () {
      return !this.isAdmin;
    },
  },
  email: {
    type: String,
    required: function () {
      return this.isAdmin;
    },
  },
  password: {
    type: String,
    required: function () {
      return this.isAdmin;
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
