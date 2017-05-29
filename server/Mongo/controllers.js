const mongoose = require('mongoose');
const Users = require('./models');

const userCntl = {};

userCntl.authenticate = (req, res) => {
  console.log(req.params);
  Users.findOne(req.params)
    .select('-password')
    .exec((err, user) => {
      console.log(user);
      if (err) return res.send(err);
      if (!user) return res.status(401).send();
      return res.send(user);
    })
}

userCntl.getUser = (req, res) => {
  console.log('HELLO');
  Users.findOne({ username: req.params.username }).select('-password').exec((err, user) => {
    if (err) return res.send(err);
    res.send(user);
  })
}

userCntl.addUser = (req, res) => {
  Users.findOneAndUpdate({ username: req.body.username }, { $setOnInsert: req.body }, { upsert: true, new: false })
    .select('-password')
    .exec((err, doc) => {
      if (err) return res.send(err);
      //doc exists only if username is found and no upsert happened thanks to new: false
      if (doc) return res.status(401).send();
      return res.send();
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
    { new: true }).select('-password')
    .exec((err, result) => {
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

userCntl.deleteExpense = (req, res, next) => {
  console.log(req.params);
  Users.findOneAndUpdate({
    username: req.params.username,
  }, {
      $pull: {
        expenses: {
          _id: req.params.expId
        }
      }
    }, { new: true }, 
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    })
}


userCntl.getAllUsers = (req, res) => {
  //use find to get all user info from all users
  //maybe use cookies to determine whether it's a use manager or admin
  //and only get usernames and passwords if its a user manager, and all info if admin
}

module.exports = userCntl;
