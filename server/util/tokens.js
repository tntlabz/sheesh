const bcrypt = require("bcrypt");

const tokens = {};


/** Create new token */
async function create (user, lifespan=7*24) {

    const { username, password, email } = user;

    const now = new Date();
    const base = username + password + email + String(now.getTime());

    const token = await bcrypt.hash(base, 10);

    tokens[token] = {
        expiryDate: new Date(now.getTime() + lifespan*60*60*1000),
        user
    }

    return token;
}


/** Get data about token */
function get (token) {
    return tokens[token];
}


/** Clean up expired tokens */
function cleanup () {
    for (const [token, info] of Object.entries(tokens)) {
        if ((new Date() - info.expiryDate) >= 0)
            delete tokens[token];
    }
}


/** Delete the old token and create a new one */
async function renew (token, user, lifespan=7*24) {
    delete tokens[token];
    return await create(user, lifespan);
}


module.exports = {
    tokens,
    create,
    get,
    cleanup,
    renew
}