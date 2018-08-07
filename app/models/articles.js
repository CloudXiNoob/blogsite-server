const mongoose = require('mongoose');
const schema = mongoose.Schema

var article = new schema({
  "title": String,
  "tag": String,
  "desc": String,
  "content": String,
  "publish": {
    type: Boolean,
    default: false
  },
  "createTime": {
    type: Date,
    default: Date.now
  },
  "lastEditTime": {
    type: Date,
    default: Date.now
  },
}, { versionKey: false });
module.exports = mongoose.model('Article', article)