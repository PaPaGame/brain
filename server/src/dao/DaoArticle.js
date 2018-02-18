var DaoBase = require("./DaoBase");
var ArticleModel = require("../models").article;
var util = require("util");

var article;

var ArticleDao = function (article) {
    this.article = article;
    DaoBase.call(this, this.article);
}

util.inherits(ArticleDao, DaoBase);

ArticleDao.prototype.getById = (id, callback) => {
    ArticleModel.findOne({ id: id }, (err, data) => {
        if (err)
            callback(err, null);
        callback(null, data);
    });
};

ArticleDao.prototype.getByLevel = (level, callback) => {
    ArticleModel.find({ level: level }, (err, data) => {
        if (err)
            callback(err, null);
        callback(null, data);
    });
}

module.exports = ArticleDao;