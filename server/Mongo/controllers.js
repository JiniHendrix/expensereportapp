const mongoose = require('mongoose');
const Users = require('./models');

const userCntl = {};

userCntl.addUser = (req, res) => {
  //get username and password from body
  console.log(req.body);
  Users.create(req.body, (err, doc) => {
    if (err) return res.send(err);
    res.send(doc);
  })
  //look for username in DB
  //if exists return error or something saying user already exits
  //otherwise create new user and reroute to sign in page
  // Users.find()
}

userCntl.editUser = (req, res) => {
  //update username or password given a username
}

userCntl.deleteUser = (req, res) => {
  //delete user given a username
}

userCntl.addExpense = (req, res) => {
  //get info from body
  console.log(req.body, req.params.username);
  //use findOneAndUpdate
  //return whether it was successful or not
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

userCntl.getUser = (req, res) => {
  //use findOneAndUpdate to get all user info from one user
}

userCntl.getAllUsers = (req, res) => {
  //use find to get all user info from all users
  //maybe use cookies to determine whether it's a use manager or admin
  //and only get usernames and passwords if its a user manager, and all info if admin
}

module.exports = userCntl;
