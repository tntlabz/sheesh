const bcrypt = require("bcrypt");

const User = require("../models/User");
const tokens = require("../util/tokens");
const Error = require("../util/error");


/** Register new account with username, email and password */
async function register(req, respond) {

    const { username, email, password } = req;

    // check if all necessary Information is present
    if ( !username || !email || !password ) {
        console.log("Responding with:", Error.TooFewArguments);
        respond(Error.TooFewArguments);
        return;
    }

    // check password
    if (!password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$)(?!.*['"\\]).{8,20}$/)) {
        respond(Error.PasswordNotSecure);
        return;
    }
    // check email
    if (!email.match(/^\S{2,30}@\S.{2,20}\..{2,5}$/)) {
        respond(Error.InvalidEmail);
        return;
    }
    // check if username is valid
    if(!username.match(/^(?=.+[a-z])[^\._][a-zA-Z0-9_.]{2,20}$/)) {
        respond(Error.UsernameInvalid);
        return;
    } else if (await User.findOne({ username })) {
        respond(Error.UsernameTaken);
        return;
    }

    // hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save new user in database
    try {
        const newUser = await new User({ username, email, password: hashedPassword });
        const user = await newUser.save();

        const {updatedAt, password, __v, ...other} = user._doc;

        this.isAuthorized = true;
        this.user = other;

        const sessionToken = await tokens.create(user);

        other.id = other._id;
        delete other._id;

        respond({
            user: other,
            sessionToken
        }, "user");

    } catch (e) {
        respond(Error.ServerError);
        console.log(e);
    }
}

/** Log into existing account with username/email & password */
async function login(req, respond) {

    const { username, email, password } = req;

    if (!((username || email) && password)) respond(Error.TooFewArguments);

    const filter = username ? { username } : { email };
    const user = await User.findOne(filter);

    if (!user) {
        respond(Error.UserEmailInvalid);
        return;
    }

    if (await bcrypt.compare(password, user.password)) {

        const sessionToken = await tokens.create(user);
        const {updatedAt, password, __v, ...other} = user._doc;

        other.id = other._id;
        delete other._id;
        
        respond({
            user: other,
            sessionToken
        }, "user");
        
    } else {
        respond(Error.PasswordInvalid);
    }
    
}

/** Authorize using a SessionToken */
async function reconnect(req, respond) {
    
    if (!(req.sessionToken && req.username)) respond(Error.TooFewArguments);
    
    try {
        const sessionToken = tokens.renew(req.sessionToken);
        tokens.get
        const user = await User.findOne({ username: req.username });
        const {updatedAt, password, __v, ...other} = user;

        other.id = other._id;
        delete other._id;

        respond({
            user: other,
            sessionToken
        }, "user")

    } catch(e) {
        respond(Error.ServerError);
        console.log(e);
    }

}

module.exports = {
    register,
    login,
    reconnect
};