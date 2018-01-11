var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;

var userSchema = new Schema({

});

userSchema.virtual("password").set((password) => {
    this.hash_password = encryptoPassword(password);
});

function encryptoPassword(password) {
    return crypto.createHash("md5").update(password).digest("base64");
}

mongoose.model('Users', userSchema);
// const user = mongoose.model("user", new Schema({

// }), "users");

// module.exports = user;