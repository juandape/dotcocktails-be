const { Router } = require('express');

const {
  getAllHandler,
  getByIdHandler,
  getByEmailHandler,
  createHandler,
  updateHandler,
  deleteHandler,
} = require('./users.controller');

const router = Router();

router.get('/', getAllHandler);
router.get('/:id', getByIdHandler);
router.post('/login', getByEmailHandler);
router.post('/', createHandler);
router.patch('/:id', updateHandler);
router.delete('/:id', deleteHandler);

module.exports = router;
