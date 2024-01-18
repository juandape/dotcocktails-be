const { Router } = require('express');

const {
  getAllHandler,
  getByIdHandler,
  createHandler,
  updateHandler,
  deleteHandler,
} = require('./users.controller');

const { isAuthenticated } = require('../../auth/auth.service');

const router = Router();

router.get('/', isAuthenticated, getAllHandler);
router.get('/:id', isAuthenticated, getByIdHandler);
router.post('/', createHandler);
router.patch('/:id', isAuthenticated, updateHandler);
router.delete('/:id', isAuthenticated, deleteHandler);

module.exports = router;
