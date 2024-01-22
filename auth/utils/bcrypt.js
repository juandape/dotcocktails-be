const bcrypt = require('bcrypt');
const crypto = require('crypto');

/**
 * Hash password
 * @param password password to hash
 * @param factor Number of rounds to hash the password, default is 10
 * @returns Promise<string> hashed password
 */

async function hashPassword(password, factor) {
  // salt
  const salt = await bcrypt.genSalt(factor);

  // hash
  return bcrypt.hash(password, salt);
}

async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

function createHashToken(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

module.exports = {
  hashPassword,
  comparePassword,
  createHashToken,
};
