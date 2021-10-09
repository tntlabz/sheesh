const { model, Schema } = require("mongoose");

const ChatSchema = new Schema({
    members: {
        type: Array,
        default: [],
        required: true
    },
    name: {
        type: String,
        max: 30
    },
    desc: {
        type: String,
        max: 500
    },
    messages: {
        type: Array,
        default: []
    }
},
{
    timestamps: true
}
);

module.exports = model("Chat", ChatSchema, "chats");