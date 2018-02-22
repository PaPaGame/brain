var mongoose = require("mongoose");
var fs = require("fs");

//"mongodb://solszl:sol870627@ds245277.mlab.com:45277/readmap"
// mongoose.connect("mongodb://solszl:sol870627@ds245277.mlab.com:45277/readmap");

// var db = mongoose.connection;

// db.on("error", () => {
//     console.log("db connect failed");
// });

// db.on("open", () => {
//     console.log("db connect success");

//     // mongoose.model("article").insertMany(data, (err, data) => {
//     //     if (err)
//     //         console.log(err);

//     //     console.log("insert ok");
//     // });
// });

export function connectDatabase(uri) {
    return new Promise((resolve, reject) => {
        mongoose.connection
            .on("error", error => {
                console.log("[DB] connect error, " + error);
                reject(error);
            })
            .on("close", () => console.log("DataBase connection closed."))
            .on("open", () => {
                console.log("[DB] connect success,", new Date());
                // mongoose.model("school").aggrega
                resolve(mongoose.connection)
            });

        mongoose.connect(uri, { useMongoClient: true });
    });
};


var models_path = __dirname + '/../models/mapping'
// 因为是启动服务器的时候一次性执行，所以采用同步方式读取
fs.readdirSync(models_path).forEach(file => {
    require(models_path + '/' + file);
    var modelName = file.replace('Model.js', '');
    exports[modelName] = mongoose.model(modelName);
});