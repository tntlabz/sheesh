const mongoose = require("mongoose");

const { test, Lol } = require("./db.js");


exports.test = function() {

}

class Lol {

    constructor() {
        this._test = 5;
    }

    add() {

    }

    get test() {
        return this._test * 30;
    }

    set test(v) {
        this._test = v*20
    }


}

lol = new Lol();
lol.test = 5;   // ruft die set test(v) funktion mit v=5
lol.test        // ruft die get test() funktion auf

key_name = "hi"

const {
    a,
    b,
    test,
    hi,
    michgibtsnicht: mGN = "mich gabs ned"
} = {
    a: 5,
    b: "test",
    [key_name]: "was geht",
    test: 1234
};
console.log(a, b, test, hi, mGB)


// module.exports = {
//     test,
//     Lol
// }