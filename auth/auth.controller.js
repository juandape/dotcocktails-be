const { getUserByEmail } = require('../api/users/users.service');
const { verifyToken } = require('./auth.service');

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

    const user = await getUserByEmail(decoded.email);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

function hasRole(allowRoles) {
  return (req, res, next) => {
    const { role } = req.user;

    const userRoles = role.map((r) => r.toUpperCase());
    const hasPermission = allowRoles.some((r) => userRoles.includes(r));

    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
}

module.exports = { isAuthenticated, hasRole };
