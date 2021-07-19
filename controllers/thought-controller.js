const User = require('../models/User');
const Thought = require('../models/Thought');

const thoughtController = {

    findThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .then(thoughts => res.json(thoughts))
            .catch(err => res.json(err))
    },

    findOneThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(thought => res.json(thought))
            .catch(err => res.json(err))
    },

    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true })
            })
            .then(newThought => res.json(newThought))
            .catch(err => res.json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(updatedThought => {
                if (!updatedThought) {
                    res.status(404).json({ message: 'No thought found with this ID' })
                }
                res.json(updatedThought)
            })
            .catch(err => res.json(err))
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(result => res.json(result))
            .catch(err => res.json(err))
    },

    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, {
            $addToSet: {
                reactions: body
            }
        }, { new: true }).then(thought => {
            res.json(thought)
        })
        .catch(err => res.json(err))
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId },
            {$pull: { reactions: {reactionId: params.reactionId}}},
            {new: true})
            .then(result => {
                console.log(result)
                res.json(result);
            }) 
            .catch(err => res.json(err))
    }
}

module.exports = thoughtController;