const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// const { route } = require('./user-routes');


router
.route('/')
.get(getAllThoughts)


router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)


router
.route('/:userId')
.post(addThought)

router
    .route('/:userId/:thoughtId')
    .delete(removeThought);


router
  .route('/:thoughtId/reactions')
  .post(addReaction);


router
.route('/:thoughtsId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;
