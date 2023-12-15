const User = require('./user.model');

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

function createUser(data) {
  return User.create(data);
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
  createUser,
  updateUser,
  deleteUser,
};
