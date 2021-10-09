const Error = require("../util/error");
const Chat = require("../models/Chat");

// createChat
// updateChat
// leaveChat

async function createChat (req, respond) {

    const { members, name="", desc="" } = req;

    if (members.length === 0) {
        respond(Error.TooFewArguments)
    }

    try {

        const newChat = await new Chat({ members, name, desc });
        const chat = await newChat.save();

        respond({ chat });

    } catch(e) {
        respond(Error.ServerError);
        return;
    }


}

async function updateChat (req, respond) {

    const { chatId, members, name, desc } = req;

    try {

        let updateQuery = { members, name, desc };

        updateQuery = Object.fromEntries(Object.entries(updateQuery).filter(v=>!!v[1]));

        const chat = Chat.findByIdAndUpdate(chatId, updateQuery);

        respond({ chat });
    } catch (e) {
        
    }

}

async function sendMessage (req, respond) {

    const { chatId, message } = req;

    try {

        const chat = await Chat.findByIdAndUpdate(
            chatId,
            { $push: { messages: message } }
        );

        // TODO: Chat zurücksenden oder nicht? Nachrichten aufteilen?
        respond({ chat });

    } catch(e) {
        respond(Error.ServerError);
        return;
    }

}