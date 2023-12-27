const mongoose = require('mongoose');

const HistoriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: Array,
      required: false,
      trim: true,
    },
    content1: {
      type: String,
      required: false,
      trim: true,
    },
    content2: {
      type: String,
      required: false,
      trim: true,
    },
    content3: {
      type: String,
      required: false,
      trim: true,
    },
    content4: {
      type: String,
      required: false,
      trim: true,
    },
    content5: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Histories = mongoose.model('Histories', HistoriesSchema);
module.exports = Histories;