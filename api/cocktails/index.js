const { Router } = require('express');

const {
  getAllHandler,
  getByIdHandler,
  createHandler,
  updateHandler,
  deleteHandler,
} = require('./cocktails.controller');

const router = Router();

router.get('/', getAllHandler);
router.get('/:id', getByIdHandler);
router.post('/', createHandler);
router.patch('/:id', updateHandler);
router.delete('/:id', deleteHandler);

module.exports = router;
