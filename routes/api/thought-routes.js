const router = require('express').Router();
const {
    findOneThought,
    findThoughts,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

router
.route('/')
.get(findThoughts)

router.route('/:userId').post(createThought)

router
.route('/:id')
.put(updateThought)
.get(findOneThought)
.delete(deleteThought)


module.exports = router;