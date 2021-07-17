const router = require('express').Router();
const {
    findUsers,
    findOneUser,
    createUser,
    updateUser,
    deleteUser
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

module.exports = router;