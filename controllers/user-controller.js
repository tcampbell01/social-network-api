const { User, Thought} = require("../models");


const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      // .populate({
      //   path: "thoughts",
      //   select: "-__v",
      // })
      // .populate({
      //   path: "friends",
      //   select: "-__v",
      // })
      // .select("-__v")
      
   
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
  });
},

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate( 'thoughts' )
      .populate('friends')
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

 
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  addToFriendList({ params }, res) {
    User.findOneAndUpdate(
      {
        _id: params.id,
      },
      {
        $addToSet: {
          friends: params.friendId,
        },
      },
      // {
      //   new: true
      // },
      {
        runValidators: true
      }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "No user found with this id!",
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  //delete friend
  removeFromFriendList({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { runValidators: true }
    )
      // .populate({ path: "friends", select: "-__v" })
      // .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "No friend found with this id.",
          });

          return;
        }

        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
