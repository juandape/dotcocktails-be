const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    passwordResetToken: {
      type: String,
      required: false,
      trim: true,
    },
    passwordResetExpires: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;
