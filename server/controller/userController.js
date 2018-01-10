const User = require("../db/db.js").User;

const findUser = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({ "username": username }, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        })
    });
};

const Login = async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let doc = await findUser(username);
    if (!doc) {
        console.log(`user not found, username ${username}`);
        ctx.status = 200;
        ctx.body = { info: false }
    } else if (doc.password === password) {
        ctx.body = {
            success: true
        };

    } else {
        ctx.status = 200;
        ctx.body = {
            success: false
        };
    }

};

const Regist = async (ctx) => {

    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    var user = new User({ username, password });
    console.log();

    let doc = await findUser(username);
    if (doc) {
        ctx.status = 200;
        ctx.body = { success: false }
    } else {
        await new Promise((resolve, reject) => {
            user.save((err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        console.log('注册成功');
        ctx.status = 200;
        ctx.body = {
            success: true
        }
    }
};

module.exports = {
    Login,
    Regist
}