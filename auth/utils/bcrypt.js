const bcrypt = require('bcrypt');

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

module.exports = {
  hashPassword,
  comparePassword,
};
