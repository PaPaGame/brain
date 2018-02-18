var DaoBase = require("./DaoBase");
var ArticleModel = require("../models").article;
var util = require("util");

var article;

var ArticleDao = function (article) {
    this.article = article;
    DaoBase.call(this, this.article);
}

util.inherits(ArticleDao, DaoBase);

module.exports = ArticleDao;