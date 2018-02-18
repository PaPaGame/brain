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

const Get = async (ctx) => {
    let id = ctx.params["id"];
    // find all
    if (!!!id) {
        console.log("查找所有文章");
    } else {
        console.log(`查找编号为${id}的文章`);
    }
}

module.exports = {
    Create,
    Update,
    Delete,
    Get
};