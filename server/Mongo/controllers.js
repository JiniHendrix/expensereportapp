const mongoose = require('mongoose');
const Users = require('./models');

const userCntl = {};

userCntl.getUser = (req, res) => {
  Users.findOne({ username: req.params.username }, {fields: '-password'}, (err, user) => {
    if (err) return res.send(err);
    res.send(user);
  })
}

userCntl.addUser = (req, res) => {
  Users.findOneAndUpdate({username: req.body.username}, {$setOnInsert: req.body}, {upsert: true, new: true}, (err, doc) => {
    if (err) return res.send(err);
    console.log(doc);
    res.send(doc);
  });
}

userCntl.editUser = (req, res) => {
  //update username or password given a username
}

userCntl.deleteUser = (req, res) => {
  //delete user given a username
}

userCntl.addExpense = (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username },
    { $push: { expenses: req.body } },
    { new: true, fields: '-password' },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    });
}

userCntl.updateExpense = (req, res) => {
  //get info from body
  //use Update Person.update({'items.id': 2}, {'$set': {
  //     'items.$.name': 'updated item2',
  //     'items.$.value': 'two updated'
  // }}, function(err) { ...
}

userCntl.deleteExpense = (req, res) => {
  //delete using expense id
}


userCntl.getAllUsers = (req, res) => {
  //use find to get all user info from all users
  //maybe use cookies to determine whether it's a use manager or admin
  //and only get usernames and passwords if its a user manager, and all info if admin
}

module.exports = userCntl;
