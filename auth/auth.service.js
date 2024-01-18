const jwt = require('jsonwebtoken');


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

module.exports = {
  verifyToken,
  signToken,
};
