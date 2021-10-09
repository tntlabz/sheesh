const { model, Schema } = require("mongoose");

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        default: []
    },
    chats : {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50
    },
    friendRequests: {
        type: Array,
        default: []
    }
},
{
    timestamps: true
});

module.exports = model("User", UserSchema, "users");
