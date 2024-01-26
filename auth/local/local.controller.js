const {
  getUserByEmail,
  getUserByToken,
  updateUser,
} = require('../../api/users/users.service');
const { comparePassword } = require('../../auth/utils/bcrypt');
const { signToken } = require('../../auth/auth.service');

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

module.exports = { loginHandler, activateHandler };
