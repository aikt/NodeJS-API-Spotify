const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  display_name: {
    type: String,
  },
  country: {
    type: String
  },
  n_followers:{
    type: Number
  },
  email: {
    type: String,
    unique: true
  },
  type_user:{
    type: String
  }
});


module.exports = model('User',userSchema);
