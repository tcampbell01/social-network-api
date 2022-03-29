const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
      User.find({})
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .select('-__v')
        // .sort method helps us to return the newest pizza first.  .sort({_id: -1}) sorts in DESC order by the _id value 
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one user by id
    getUserById({ params }, res) {
      User.findOne({ _id: params.id })
        .populate({
          path: 'thoughts',
  
          // - minus sign in front of the field indicates that we don't want it to be returned.  If we didn't have it, it would mean that it would return only the __v field
          select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // createPizza
    createUser({ body }, res) {
      User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
  
    // update pizza by id
    updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
  
    // delete pizza
    deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
  };
  
  module.exports = userController;
  