const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');

const userSchema = new Schema({
  username: String,
  password: String,
  type: String,
  expenses: [{
    dateTime: Date,
    amount: Number,
    description: String,
    comments: [{
      created_at: Date,
      comment: String
    }]
  }],
}) 

module.exports = mongoose.model('User', userSchema);