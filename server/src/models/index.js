var mongoose = require("mongoose");
var fs = require("fs");

//"mongodb://solszl:sol870627@ds245277.mlab.com:45277/readmap"
mongoose.connect("mongodb://solszl:sol870627@ds245277.mlab.com:45277/readmap");

var db = mongoose.connection;

db.on("error", () => {
    console.log("db connect failed");
});

db.on("open", () => {
    console.log("db connect success");
    // var StudentSchema = mongoose.model("student");
    // var user = new StudentSchema({
    //     username: "student4",
    //     password: "1111",
    //     firstName: "Lucas",
    //     secondName: "Xie",
    //     status: "1",
    //     phone: "13412345678",
    //     mail: "111@qq.com",
    //     createTime: new Date(),
    //     validateTime: new Date(),
    //     lastLoginTime: new Date(),
    //     lastLoginIP: "127.0.0.1",
    //     articleLevel: ["1", "2"],
    //     // hash_password: "123"
    // })
    // mongoose.model("student").insertMany([user], (err, data) => {
    //     console.log(err, data);
    // });
});

var models_path = __dirname + '/../models/mapping'
fs.readdirSync(models_path).forEach(file => {
    require(models_path + '/' + file);
    var modelName = file.replace('Model.js', '');
    exports[modelName] = mongoose.model(modelName);
});