const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const {
  invalidLinkMessage,
  requiredKeywordMessage,
  requiredTitleMessage,
  requiredTextMessage,
  requiredDateMessage,
  requiredSourceMessage,
  requiredLinkMessage,
  requiredImageMessage,
} = require('../utils/constants');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, requiredKeywordMessage],
  },
  title: {
    type: String,
    required: [true, requiredTitleMessage],
  },
  text: {
    type: String,
    required: [true, requiredTextMessage],
  },
  date: {
    type: String,
    required: [true, requiredDateMessage],
  },
  source: {
    type: String,
    required: [true, requiredSourceMessage],
  },
  link: {
    type: String,
    required: [true, requiredLinkMessage],
    validate: {
      validator: (v) => isURL(v),
      message: invalidLinkMessage,
    },
  },
  image: {
    type: String,
    required: [true, requiredImageMessage],
    validate: {
      validator: (v) => isURL(v),
      message: invalidLinkMessage,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
