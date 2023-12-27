const {
  getAllHistories,
  getHistoryById,
  createHistory,
  updateHistory,
  deleteHistory
} = require('./histories.service');

async function getAllHandler(req, res, next) {
  try {
    const histories = await getAllHistories();
    res.status(200).json(histories);
  } catch (error) {
    next(error);
  }
}

async function getByIdHandler(req, res, next) {
  try {
    const { id } = req.params;
    const history = await getHistoryById(id);

    if (!history) {
      return res.status(404).json({ message: 'History not found' });
    }

    return res.status(200).json(history);
  } catch (error) {
    next(error);
  }
}

async function createHandler(req, res, next){
  try {
    const history = await createHistory(req.body);
    res.status(201).json({history, message: 'History created' });
  } catch (error) {
    next(error);
  }
}

async function updateHandler(req, res, next) {
  try {
    const { id } = req.params;
    const history = await updateHistory(id, req.body);

    if (!history) {
      return res.status(404).json({ message: 'History not found' });
    }

    return res.status(200).json({history, message: 'History updated' });
  } catch (error) {
    next(error);
  }
}

async function deleteHandler
  (req, res, next) {
  try {
    const { id } = req.params;
    const history = await deleteHistory(id);

    if (!history) {
      return res.status(404).json({ message: 'History not found' });
    }

    return res.status(200).json({ message: 'History deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllHandler,
  getByIdHandler,
  createHandler,
  updateHandler,
  deleteHandler
};