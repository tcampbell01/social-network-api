const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  //add to friend list
  //remove from friend list
} = require('../../controllers/user-controller');

// /api/pizzas
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/pizzas/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  router
  .route('/:userId/friends/:friendId')
  .post(addToFriendList);


router
  .route('/:userId/friends/:friendId')
  .delete(removefromFriendList);

module.exports = router;
