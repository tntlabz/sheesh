require('dotenv').config()
const mongoose = require("mongoose");


class DB {
    constructor() {
        const app = express();
        const dbURI = process.env.MONGODB_URI
        mongoose.connect(this.dbURI)
            then((result) => app.listen(3000);)
    }


}
