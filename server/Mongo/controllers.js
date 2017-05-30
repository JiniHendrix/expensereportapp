const mongoose = require('mongoose');
const Users = require('./models');

const userCntl = {};

userCntl.authenticate = (req, res) => {
  Users.findOne(req.params)
    .select('-password')
    .exec((err, user) => {
      if (err) return res.send(err);
      if (!user) return res.status(401).send();
      return res.send(user);
    })
}

userCntl.getUser = (req, res) => {
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
  // req.body.$sort = {amount : -1};
  Users.findOneAndUpdate({ username: req.params.username },
    { $push: { expenses: { $each: [req.body], $sort: { dateTime: -1 } } } },
    { new: true }).select('-password')
    .exec((err, result) => {
      if (err) return res.send(err);
      res.send(result);
    });
}

userCntl.updateExpense = (req, res) => {
  Users.findOneAndUpdate({
    username: req.params.username,
    "expenses._id": req.params.expId
  }, {
      $set: {
        "expenses.$.amount": req.body.amount,
        "expenses.$.description": req.body.description,
        "expenses.$.dateTime": req.body.dateTime
      }
    }, { new: true }).select('-password')
    .exec((err, result) => {
      console.log(result)
      if (err) return res.send(err);
      res.send(result);
    })
}

userCntl.deleteExpense = (req, res) => {
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

userCntl.addComment = (req, res) => {
  console.log(req.body, req.params);
  Users.findOneAndUpdate({
    username: req.params.username,
    'expenses._id': req.params.expId
  },
    { $push: { 'expenses.$.comments': req.body } },
    { new: true }).select('-password')
    .exec((err, result) => {
      if (err) return res.send(err);
      res.send(result);
    });
}

// userCntl.deleteComment = (req, res) => {
//   Users.findOneAndUpdate({ username: req.params.username, 'expenses._id': req.params.expId },
//     { $push: { 'expenses.comments': req.body}},
//     { new: true }).select('-password')
//     .exec((err, result) => {
//       if (err) return res.send(err);
//       res.send(result);
//     });
// }

userCntl.getAllUsers = (req, res) => {
  //use find to get all user info from all users
  //maybe use cookies to determine whether it's a use manager or admin
  //and only get usernames and passwords if its a user manager, and all info if admin
}

module.exports = userCntl;
