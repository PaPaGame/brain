const mongoose = require("mongoose");
// mongoose.connect("mongodb://solszl:sol870627@ds245277.mlab.com:45277/readmap");
mongoose.Promise = global.Promise;
let db = mongoose.createConnection("mongodb://solszl:sol870627@ds245277.mlab.com:45277/readmap");
// mongoose.PromiseProvider = global.Promise;

db.on("error", () => {
    console.log("db connect failed");
});

db.on("open", () => {
    console.log("db connect success");
});

const userSchema = mongoose.Schema({
    username: String,
    password: String
});

const model = {
    User: db.model('users', userSchema)
}

module.exports = model;