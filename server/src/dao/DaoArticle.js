var DaoBase = require("./DaoBase");
var ArticleModel = require("../models").article;
var util = require("util");

var article;

var ArticleDao = function(article) {
    this.article = article;
    DaoBase.call(this, this.article);
}

util.inherits(ArticleDao, DaoBase);

ArticleDao.prototype.getById = async id => {
    return await ArticleModel.findOne({ id: id });
};

ArticleDao.prototype.getByLevel = async level => {
    return await ArticleModel.find({ level: level });
}

module.exports = ArticleDao;