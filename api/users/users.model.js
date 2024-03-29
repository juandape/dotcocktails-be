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
      default: 'https://res.cloudinary.com/dpvmwsbq8/image/upload/v1706058687/upload-folder/default-avatar_cgpa3v.jpg'
    },
    role: {
      type: [String], // ['ADMIN', 'GUEST']
      required: false,
      trim: true,
      enum: ['ADMIN', 'GUEST'],
      default: 'GUEST',
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
