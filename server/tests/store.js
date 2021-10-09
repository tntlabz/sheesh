const store = {};

const add = () => {
    store[String(Math.random())] = 1;
}

module.exports = {
    store,
    add
}