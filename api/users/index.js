const { Router } = require('express');

const {
  getAllHandler,
  getByIdHandler,
  createHandler,
  updateHandler,
  deleteHandler,
} = require('./users.controller');

const { isAuthenticated, hasRole } = require('../../auth/auth.controller');

const router = Router();

router.get('/', getAllHandler);
router.get('/:id', getByIdHandler);
router.post('/', createHandler);
router.patch('/:id', isAuthenticated, updateHandler);
router.delete('/:id', isAuthenticated, hasRole(['ADMIN']), deleteHandler);

module.exports = router;
