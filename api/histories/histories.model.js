const mongoose = require('mongoose');

const HistoriesSchema = new mongoose.Schema(
  {
    nameId: {
      type: String,
      required: true,
      trim: true,
    },
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
    content6: {
      type: String,
      required: false,
      trim: true,
    },
    content7: {
      type: String,
      required: false,
      trim: true,
    },
    content8: {
      type: String,
      required: false,
      trim: true,
    },
    content9: {
      type: String,
      required: false,
      trim: true,
    },
    content10: {
      type: String,
      required: false,
      trim: true,
    },
    content11: {
      type: String,
      required: false,
      trim: true,
    },
    content12: {
      type: String,
      required: false,
      trim: true,
    },
    content13: {
      type: String,
      required: false,
      trim: true,
    },
    content14: {
      type: String,
      required: false,
      trim: true,
    },
    content15: {
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
