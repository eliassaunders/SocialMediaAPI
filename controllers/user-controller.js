const User = require('../models/User')

const userController = {
    findUsers(req, res) {
        User.find()
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .then(users => {
            res.json(users);
        })
        .catch(err =>  console.log(err))
    },

    findOneUser({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thought',
                select: '-__v'
            })
            .then(result => res.json(result))
            .catch(err => res.json(err))
    },

    createUser({ body }, res) {
        User.create(body).then(user => res.json(user))
            .catch(err => res.json(err))
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, {$set: body}, { new: true })
            .then(updatedUser => {
                res.json(updatedUser);
            })
            .catch(err => res.json(err))
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(deletedUser => {
            res.json(deletedUser);
        })
        .catch(err => res.json(err))
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId }, 
            {$addToSet: {friends: params.friendId}}, 
            {new: true})
        .then(newFriend => res.json(newFriend))
        .catch(err => console.log(err))
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true})
            .then(byeFriend => res.json(byeFriend))
            .catch(err => res.json(err))
    }
}

module.exports = userController;