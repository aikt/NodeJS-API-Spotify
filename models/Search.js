const { Schema, model } = require('mongoose');

const searchSchema = new Schema({
  query: {
    type: String,
    unique: true
  },
  count: {
    type: Number
  }
});


module.exports = model('Search',searchSchema);
