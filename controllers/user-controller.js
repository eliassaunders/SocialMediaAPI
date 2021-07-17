const User = require('../models/User')

const userController = {
    findUsers(req, res) {
        User.find({}).then(users => {
            res.json(users);
        })
            .catch(err => res.json(err))
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
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
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
    }
}

module.exports = userController;