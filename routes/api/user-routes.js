const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addToFriendList,
  removeFromFriendList
} = require('../../controllers/user-controller');

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  router
  .route('/:id/friends/:friendId')
  .post(addToFriendList)
  .delete(removeFromFriendList)



module.exports = router;
