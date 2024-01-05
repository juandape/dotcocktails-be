const { getUserByEmail } = require('../../api/users/users.service');
const { comparePassword } = require('../../auth/utils/bcrypt');
const jwt = require('jsonwebtoken');

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
    const SECRET_KEY = process.env.SECRET_KEY;

    const token = jwt.sign(payload, SECRET_KEY);

    return res
      .status(200)
      .json({ token, user: user.name, message: 'Login success' });
  } catch (error) {
    next(error);
  }
}

module.exports = { loginHandler };
