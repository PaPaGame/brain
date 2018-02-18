import jwt from "koa-jwt";
import ArticleDao from "../dao/DaoArticle";

var ArticleModel = require("../models").article;

var articleDao = new ArticleDao(ArticleModel);

module.exports = {

};