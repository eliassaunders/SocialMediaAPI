const router = require('express').Router();
const {
    findOneThought,
    findThoughts,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
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

router
.route('/:thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction)


module.exports = router;