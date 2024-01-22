const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('./users.service');

const { transporter } = require('../../utils/mail');

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

async function createHandler(req, res, next) {
  try {
    const user = await createUser(req.body);

    //send email
    transporter.sendMail({
      from: 'No reply <dotcocktails@gmail.com>',
      to: user.email,
      subject: '[Dot Cocktails] Activa tu cuenta',
      text: 'Bienvenido a Dot Cocktails',
      html: `
      <h1>Hola ${user.name}</h1>
      <h2>Bienvenido a Dot Cocktails</h2>
      <p>Para activar tu cuenta, haz click en el siguiente boton</p>
      <button><a href="${process.env.FRONTEND_URL}/verify-account/${user.passwordResetToken}">Activar cuenta</a></button>
      `,
    });

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
  createHandler,
  updateHandler,
  deleteHandler,
};
