const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require('./users.service');

const {
  comparePassword,
} = require('../../auth/utils/bcrypt');

async function getAllHandler(req, res, next) {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

async function getByIdHandler(req, res, next) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function getByEmailHandler(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'email or password not match' });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function createHandler(req, res, next) {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ user, message: 'User created' });
  } catch (error) {
    next(error);
  }
}

async function updateHandler(req, res, next) {
  try {
    const { id } = req.params;
    const user = await updateUser(id, req.body);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user, message: 'User updated' });
  } catch (error) {
    next(error);
  }
}

async function deleteHandler(req, res, next) {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllHandler,
  getByIdHandler,
  getByEmailHandler,
  createHandler,
  updateHandler,
  deleteHandler,
};
