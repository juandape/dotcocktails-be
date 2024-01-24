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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
      <h1 style="color: teal;">Hola <strong>${user.name}</strong></h1>
      <h2>Bienvenido a Dot Cocktails</h2>
      <p>Para activar tu cuenta, haz click en el siguiente enlace</p>
      <p style="text-align: center;">
        <a href="${process.env.FRONTEND_URL}/verify-account/${user.passwordResetToken}" style="display: inline-block; padding: 10px 20px; background-color: #4caf50; color: white; text-decoration: none; border-radius: 5px;">Activar cuenta</a>
      </p>
      <br>
      <p>Si no puedes hacer click en el enlace, copia y pega el siguiente enlace en tu navegador</p>
      <p>${process.env.FRONTEND_URL}/verify-account/${user.passwordResetToken}</p>
    </div>
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
