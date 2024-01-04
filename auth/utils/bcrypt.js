const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const costFactor = 10;
  const salt = await bcrypt.genSalt(costFactor);
  return bcrypt.hash(password, salt);
}

async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};