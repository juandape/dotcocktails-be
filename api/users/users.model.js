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
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      required: false,
      trim: true,
    },
    role: {
      type: String,
      required: false,
      trim: true,
      enum: ['admin', 'user'],
      default: 'user',
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

const Users = mongoose.model('User', UsersSchema);
module.exports = Users;
