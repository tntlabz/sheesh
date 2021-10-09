const Error = require("../util/error");
const User = require("../models/User");



/** update user information */
async function updateUser (req, respond) {

    const { username, email, password, profilePicture, desc } = req;

    const paramCount = Object.values({username, email, password}).filter(v=>!!v).length;
    if (paramCount != 1) {
        respond(paramCount < 1 ? Error.TooFewArguments : Error.TooManyArguments);
        return;
    }

    try {

        let updateQuery = username ? {username} : ( email ? {email} : {password} );

        updateQuery = Object.assign(updateQuery, { profilePicture, desc });
        updateQuery = Object.fromEntries(Object.entries(updateQuery).filter(v=>!!v[1]));

        const user = await User.findByIdAndUpdate(this.user.__id, updateQuery);
        respond({ user });


    } catch(e) {
        respond(Error.ServerError);
        console.log("Error:", e);
    }
}


/** Sends a friend Request to a user */
async function addFriend (req, respond) {

    const { username } = req;

    try {
        const user = await User.findOne({ username });
        if (!user) respond(Error.UsernameInvalid);

        await user.updateOne({ $push: { friendRequests: this.user._id } });

    } catch (e) {
        respond(Error.ServerError);
        console.log(e);
    }
}


/** Accept a friend request */
async function acceptFriend (req, respond) {

    const { _id } = req;

    try {
        const thisUser = await User.findById(this.user._id);
        const friend = await User.findById(_id);

        await thisUser.updateOne({ $pull: { friendRequests: _id } });

        await thisUser.updateOne({ $push: { friends: _id } });
        await friend.updateOne({ $push: { friends: this.user._id } });

    } catch (e) {
        respond(Error.ServerError);
        console.log(e);
    }
}


/** Removes a friend */
async function removeFriend (req, respond) {

    const { _id } = req;

    try {
        const thisUser = await User.findById(this.user._id);
        const friend = await User.findById(_id);

        await thisUser.updateOne({ $pull: { friends: _id } });
        await friend.updateOne({ $pull: { friends: this.user._id } });

    } catch (e) {
        respond(Error.ServerError);
        console.log(e);
    }
}


module.exports = {
    updateUser,
    addFriend,
    acceptFriend,
    removeFriend
}