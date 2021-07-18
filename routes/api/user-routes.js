const router = require('express').Router();
const {
    findUsers,
    findOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

router
.route('/')
.get(findUsers)
.post(createUser);

router
.route('/:id')
.get(findOneUser)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/friends/:friendId')
.put(addFriend)
.delete(removeFriend)

module.exports = router;