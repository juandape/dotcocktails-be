const { Router } = require('express');

const {
  getAllHandler,
  getByIdHandler,
  createHandler,
  updateHandler,
  deleteHandler,
} = require('./cocktails.controller');

const { isAuthenticated } = require('../../auth/auth.service');

const router = Router();

router.get('/', getAllHandler);
router.get('/:id', getByIdHandler);
router.post('/', isAuthenticated, createHandler);
router.patch('/:id', isAuthenticated, updateHandler);
router.delete('/:id', isAuthenticated, deleteHandler);

module.exports = router;
