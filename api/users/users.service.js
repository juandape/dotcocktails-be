const User = require('./users.model');
const { hashPassword, createHashToken } = require('../../auth/utils/bcrypt');

function getAllUsers() {
  return User.find();
}

async function getUserById(id) {
  const user = await User.findById(id);

  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

async function createUser(data) {
  if (!data.password) {
    throw new Error('Password is required');
  }

  const hashedPassword = await hashPassword(data.password);

  const newUser = new User({
    ...data,
    password: hashedPassword,
    passwordResetToken: createHashToken(data.email),
    passwordResetExpires:  Date.now() + 3600000, // 1 hour
  });

  return newUser.save();
}

async function updateUser(id, data) {
  const foundUser = await User.findById(id);

  if (!foundUser) {
    throw new Error(`User not found with id ${id}`);
  }

  return User.findByIdAndUpdate(id, data, { new: true, upsert: true });
}

async function deleteUser(id) {
  const user = await User.findById(id);

  if (!user) {
    throw new Error(`User not found with id ${id}`);
  }

  return User.findByIdAndDelete(id);
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
