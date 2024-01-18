const { Router } = require('express');

const {
  getAllHandler,
  getByIdHandler,
  createHandler,
  updateHandler,
  deleteHandler,
} = require('./histories.controller');

const { isAuthenticated, hasRole } = require('../../auth/auth.controller');

const router = Router();

router.get('/', getAllHandler);
router.get('/:id', getByIdHandler);
router.post('/', isAuthenticated, hasRole(['ADMIN']), createHandler);
router.patch('/:id', isAuthenticated, hasRole(['ADMIN']), updateHandler);
router.delete('/:id', isAuthenticated, hasRole(['ADMIN']), deleteHandler);

module.exports = router;