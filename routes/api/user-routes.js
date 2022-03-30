const router = require('express').Router();
const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  addToFriendList,
  removeFromFriendList
} = require('../../controllers/user-controller');

// /api/pizzas
router
  .route('/')
  .get(getAllUsers)
  .post(createUsers);

// /api/pizzas/:id
router
  .route('/:id')
  .get(getUsersById)
  .put(updateUsers)
  .delete(deleteUsers);

  router
  .route('/:userId/friends/:friendId')
  .post(addToFriendList);


router
  .route('/:userId/friends/:friendId')
  .delete(removeFromFriendList);

module.exports = router;
