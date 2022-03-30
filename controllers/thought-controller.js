const { Thought } = require('../models/Thought');

const thoughtController = {
 
getAllThoughts(req,res) {
  Thought.find({})
  // .populate({path: 'reactions', select: '-__v'})
  //       .select('-__v')
  .then(dbThoughtsData=> res.json(dbThoughtsData))
  .catch(err => {
    console.log(err);
    res.status(404).json(err);
  });
},

getThoughtById({ params }, res) {
  Thought.findOne({ _id: params.thoughtId })
  // .populate({path: 'reactions',select: '-__v'})

  //     // - minus sign in front of the field indicates that we don't want it to be returned.  If we didn't have it, it would mean that it would return only the __v field
  //     .select('-__v')
  //     .sort({_id: -1})

    
    
  .then(dbThoughtData => {
    if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
    }
    res.json(dbThoughtData);
})
.catch(err => {
    console.log(err);
    res.status(400).json(err);
});
},

addThought({params, body}, res) {
  Thought.create(body)
  .then(({ _id }) => {
    return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: _id } },
        { new: true }
    );
})
.then(dbUserData => {
    if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
    }
    res.json(dbUserData);
})
.catch(err => res.json(err));
},


updateThought({ params, body }, res) {
  Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
  // .populate({path: 'reactions', select: '-__v'})
  //       .select('-___v')
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
},

  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(deletedThought => {
      if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
      }
      return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
      );
  })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => res.json(err));
},


  addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
        // .populate({path: 'reactions', select: '-__v'})
        // .select('-__v')
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No reaction found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },
    
  // remove reply
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
}
};

module.exports = thoughtController;
