const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../api/users/users.service');

const SECRET_KEY = process.env.SECRET_KEY;

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
}

function signToken(payload) {
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '1d',
  });
  return token;
}

async function isAuthenticated(req, res, next) {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const user = getUserByEmail(decoded.email);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  isAuthenticated,
  verifyToken,
  signToken,
};
