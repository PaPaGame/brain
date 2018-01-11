var mongoose = require("mongoose");
var fs = require("fs");

//"mongodb://solszl:sol870627@ds245277.mlab.com:45277/readmap"
mongoose.connect("mongodb://solszl:sol870627@ds245277.mlab.com:45277/readmap");

var db = mongoose.Connection();

db.on("error", () => {
    console.log("db connect failed");
});

db.on("open", () => {
    console.log("db connect success");
});

var models_path = __dirname + '/../models/mapping'
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
    var modelName = file.replace('Model.js', '');
    exports[modelName] = mongoose.model(modelName);
});