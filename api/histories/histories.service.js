const History = require('./histories.model');

function getAllHistories() {
  return History.find();
}

async function getHistoryById(id) {
  const history = await History.findById(id);

  if (!history) {
    throw new Error('History not found');
  }
  return history;
}

function createHistory(data) {
  return History.create(data);
}

async function updateHistory(id, data) {
  const foundHistory = await History.findById(id);

  if (!foundHistory) {
    throw new Error(`History not found with id ${id}`);
  }

  return History.findByIdAndUpdate(id, data, { new: true, upsert: true });
}

async function deleteHistory(id) {
  const history = await History.findById(id);

  if (!history) {
    throw new Error(`History not found with id ${id}`);
  }

  return History.findByIdAndDelete(id);
}

module.exports = {
  getAllHistories,
  getHistoryById,
  createHistory,
  updateHistory,
  deleteHistory,
};