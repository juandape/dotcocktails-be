const {
  getUserByEmail,
  getUserByToken,
  updateUser,
  createPasswordResetToken,
} = require('../../api/users/users.service');
const { comparePassword, hashPassword } = require('../../auth/utils/bcrypt');
const { signToken } = require('../../auth/auth.service');
const { transporter } = require('../../utils/mail');

async function loginHandler(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //compare password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'email or password not match' });
    }

    //jwt
    const payload = { id: user._id, email: user.email };
    const token = signToken(payload);

    const profile = {
      id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({ token, profile, message: 'Login success' });
  } catch (error) {
    next(error);
  }
}

async function activateHandler(req, res, next) {
  try {
    const { token } = req.params;
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(404).json({ message: 'Invalid token' });
    }

    if (user.passwordResetExpires) {
      if (Date.now() > user.passwordResetExpires.getTime()) {
        return res.status(400).json({
          message: 'Token expired',
        });
      }
    }

    const updatedUser = await updateUser(user._id, {
      isActive: true,
      passwordResetToken: null,
      passwordResetExpires: null,
    });

    if (!updatedUser) {
      return res.status(400).json({ message: 'Error activating account' });
    }

    //jwt
    const payload = { id: user._id, email: user.email };
    const jwtToken = signToken(payload);

    const profile = {
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
    };

    return res
      .status(200)
      .json({ jwtToken, profile, message: 'Account activated' });
  } catch (error) {
    next(error);
  }
}

const forgotHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //generate token
    const token = await createPasswordResetToken(email);
    const updatedUser = await updateUser(user._id, {
      passwordResetToken: token,
      passwordResetExpires: Date.now() + 3600000, // 1 hour
    });
    await updatedUser.save();

    if (!updatedUser) {
      return res.status(400).json({ message: 'Error updating user' });
    }

    //send email
    transporter.sendMail({
      from: 'No reply <dotcocktails@gmail.com>',
      to: user.email,
      subject: '[Dot Cocktails] Reset your password',
      text: 'Reset your password',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
      <h1 style="color: teal;">Hola <strong>${user.name}</strong></h1>
      <h2>Reset your password</h2>
      <p>Para resetear tu password, da click en el siguiente link:</p>
      <p style="text-align: center;">
        <a href="${process.env.FRONTEND_URL}/reset-password/${token}" style="display: inline-block; padding: 10px 20px; background-color: teal; color: white; text-decoration: none; border-radius: 5px;">Reset password</a>
      </p>
      <br>
      <p>Si no puedes dar click, copia y pega el siguiente link en el navegador</p>
      <p>${process.env.FRONTEND_URL}/reset-password/${token}</p>
    </div>
      `,
    });

    return res.status(200).json({ message: 'Token sent to email' });
  } catch (error) {
    next(error);
  }
};

const resetHandler = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await hashPassword(password);

    const updatedUser = await updateUser(user._id, {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    });

    if (!updatedUser) {
      return res.status(400).json({ message: 'Error updating user' });
    }
    return res.status(200).json({ message: 'Password updated' });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginHandler, activateHandler, forgotHandler, resetHandler };
