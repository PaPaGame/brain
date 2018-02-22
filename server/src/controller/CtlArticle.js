import jwt from "koa-jwt";
import ArticleDao from "../dao/DaoArticle";

var ArticleModel = require("../models").article;

var articleDao = new ArticleDao(ArticleModel);

const Create = async (ctx) => {

}

const Update = async (ctx) => {

}

const Delete = async (ctx) => {

}

const GetByID = async (ctx) => {
    let id = ctx.params["id"];
    console.log(ctx.params["id"]);
    // find all
    if (!!!id) {
        console.log("查找所有文章");
        ctx.body = await articleDao.getAll((err, data) => {
            console.log(data);
        });
    } else {
        console.log(`查找编号为${id}的文章`);
        ctx.body = await articleDao.getById(id, (err, data) => {
            console.log(data);
        });
    }
}

const GetByLevel = async (ctx) => {
    let level = ctx.params["level"];
    if (!!level) {
        articleDao.getByLevel(level, (err, data) => {
            if (err)
                console.log(err);

            console.log(data);
        });
    }
}

module.exports = {
    Create,
    Update,
    Delete,
    GetByID,
    GetByLevel
};