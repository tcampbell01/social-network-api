const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughts-controller');


router
.route('/')
.get(getAllThoughts)
.post(addThought);

router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought);


router
  .route('/:thoughtId/reactions')
  .post(addReaction);


router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;
