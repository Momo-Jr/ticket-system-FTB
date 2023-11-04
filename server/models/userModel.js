const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Please add email'],
      unique: true, // Ensure email is unique
    },
    password: {
      type: String,
      required: [true, 'Please add password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model('User', userSchema);
