const mongoose = require('mongoose');
const Users = require('./models');

const userCntl = {};

userCntl.authenticate = (req, res) => {
  Users.findOne(req.params)
    .select('-password')
    .exec((err, user) => {
      if (err) return res.send(err);

      if (!user) return res.status(401).send();

      if (user.type === 'User') return res.send({ user });

      else {
        Users.find({ userType: 'User' },
          (err, usersList) => {
            if (err) return res.send(err);
            return res.send({
              user,
              usersList
            })
          })
      }
    })
}

userCntl.getUser = (req, res) => {
  Users.findOne({ username: req.params.username }).select('-password').exec((err, user) => {
    if (err) return res.send(err);
    res.send(user);
  })
}

userCntl.signup = (req, res) => {
  Users.findOneAndUpdate({ username: req.body.username }, { $setOnInsert: req.body }, { upsert: true, new: false })
    .select('-password')
    .exec((err, doc) => {
      if (err) return res.send(err);
      //doc exists only if username is found and no upsert happened thanks to new: false
      if (doc) return res.status(401).send();
      return res.send();
    });
}

userCntl.deleteUser = (req, res, next) => {
  Users.findOneAndRemove({ username: req.params.username }, (err, res) => {
    next();
  })
}

userCntl.addExpense = (req, res) => {
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

userCntl.deleteComment = (req, res) => {
  Users.findOneAndUpdate({
    username: req.params.username,
    'expenses._id': req.params.expId,
  },
    {
      $pull: {
        'expenses.$.comments': {
          _id: req.params.commentId
        }
      }
    }, { new: true },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    })
}

userCntl.getAllUsers = (req, res) => {
  Users.find({ userType: 'User' }, (err, users) => {
    if (err) res.send(err);
    res.send(users);
  })
}

userCntl.addUser = (req, res, next) => {
  Users.findOneAndUpdate({ username: req.body.username }, { $setOnInsert: req.body }, { upsert: true, new: false })
    .select('-password')
    .exec((err, doc) => {
      if (err) return res.send(err);
      //doc exists only if username is found and no upsert happened thanks to new: false
      if (doc) return res.status(401).send();
      else next();
    });
}

userCntl.updateUser = (req, res, next) => {
  Users.findOne({ username: req.body.username }, (err, found) => {
    if (found && found._id + '' !== req.params.userId) return res.status(401).send();
    if (err) return res.send(err);
    else {
      Users.findOneAndUpdate({ _id: req.params.userId }, req.body, (err, result) => {
        if (err) return res.send(err);
        next();
      })
    }
  })
}

module.exports = userCntl;
