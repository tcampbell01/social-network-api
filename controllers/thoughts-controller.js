const { Thoughts, Users } = require('../models');

const thoughtsController = {
 
getAllThoughts(req,res) {
  Thoughts.find({})
  .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
  .then(dbThoughtsData=> res.json(dbThoughtsData))
  .catch(err => {
    console.log(err);
    res.status(404).json(err);
  });
},

getThoughtsById({ params }, res) {
  Thoughts.findOne({ _id: params.id })
  .populate({path: 'reactions',select: '-__v'})

      // - minus sign in front of the field indicates that we don't want it to be returned.  If we didn't have it, it would mean that it would return only the __v field
      .select('-__v')
      .sort({_id: -1})

    
    
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
},

addThought({body}, res) {
  Thoughts.create(body)
      .then((ThoughtsData) => {
          return Users.findOneAndUpdate(
              //create a thought using current user
              {
                  _id: params.userId
              }, {
                  $push: {
                      thoughts: _id
                  }
              }, {
                  new: true
              }
          );
      })
      .then(dbThoughtsData => {
          if (!dbThoughtsData) {
              res.status(404).json({
                  message: 'No thoughts found with this id.'
              });
              return;
          }
          res.json(dbThoughtsData)
      })
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
},
updateThoughts({ params, body }, res) {
  Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
  .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
    .then(dbThoughtsData => {
      if (!dbThoughtsData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtsData);
    })
    .catch(err => res.json(err));
},

  removeThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
           res.status(404).json({ message: 'No thoughts with this id!' });
        }
        return;
      })
      .catch(err => res.json(err));
  },

  addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
          .then(dbThoughtsData => {
            if (!dbThoughtsData) {
              res.status(404).json({ message: 'No reaction found with this id!' });
              return;
            }
            res.json(dbThoughtsData);
          })
          .catch(err => res.json(err));
      },
    
  // remove reply
  removeReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    then(dbThoughtsData => {
      if (!dbThoughtsData) {
          res.status(404).json({message: 'No thoughts with this ID!'});
          return;
      }
      res.json(dbThoughtsData);
  })
  .catch(err => res.status(400).json(err));
}

};

module.exports = thoughtsController;
