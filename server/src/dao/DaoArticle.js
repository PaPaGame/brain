var DaoBase = require("./DaoBase");
var ArticleModel = require("../models").article;
var util = require("util");

var article;

var ArticleDao = function (art) {
    article = art;
    DaoBase.call(this, article);
}

util.inherits(ArticleDao, DaoBase);

ArticleDao.prototype.getById = async id => {
    return await ArticleModel.findOne({ id: id });
};

ArticleDao.prototype.getByLevel = async level => {
    return await ArticleModel.find({ level: level });
}

ArticleDao.prototype.getLevelList = async () => {
    return await article.distinct("level").sort();
}

ArticleDao.prototype.getArticleList = async (query) => {
    let pageSize = query.pageSize;
    let pageId = query.currentPage;
    return await article.find({}).limit(pageSize).skip(pageSize * pageId);
}

module.exports = ArticleDao;