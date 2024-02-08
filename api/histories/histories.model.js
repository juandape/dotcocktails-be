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
    image1: {
      type: Array,
      required: false,
      trim: true,
    },
    content1: {
      type: String,
      required: false,
      trim: true,
    },
    image2: {
      type: Array,
      required: false,
      trim: true,
    },
    content2: {
      type: String,
      required: false,
      trim: true,
    },
    image3: {
      type: Array,
      required: false,
      trim: true,
    },
    content3: {
      type: String,
      required: false,
      trim: true,
    },
    image4: {
      type: Array,
      required: false,
      trim: true,
    },
    content4: {
      type: String,
      required: false,
      trim: true,
    },
    image5: {
      type: Array,
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