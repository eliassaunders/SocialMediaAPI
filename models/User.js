const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        req: "Username is Required",
        trim: true
    },
    email: {
        type: String,
        unique: true,
        req: "Email is Required",
        match: [/.+@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
})

UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, user) => total + user.username.length + 1, 0)
})

const User = model('User', UserSchema);

module.exports = User;