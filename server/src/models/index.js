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

    // mongoose.model("article").insertMany(data, (err, data) => {
    //     if (err)
    //         console.log(err);

    //     console.log("insert ok");
    // });
});

var models_path = __dirname + '/../models/mapping'
fs.readdirSync(models_path).forEach(file => {
    require(models_path + '/' + file);
    var modelName = file.replace('Model.js', '');
    exports[modelName] = mongoose.model(modelName);
});