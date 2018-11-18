var DaoBase = require('./DaoBase');
var ArticleModel = require('../models').article;
var util = require('util');

var article;

function ArticleDao(art) {
  article = art;
  DaoBase.call(this, article);
}

util.inherits(ArticleDao, DaoBase);

ArticleDao.prototype.getById = async id => {
  return await ArticleModel.findOne({id: id});
};

ArticleDao.prototype.getByLevel = async level => {
  return await ArticleModel.find({level: level});
};

ArticleDao.prototype.getByLevels = async levels => {
  return await ArticleModel.find({'level': {$in: levels}});
};

ArticleDao.prototype.getLevelList = async () => {
  return await article.distinct('level').sort();
};

ArticleDao.prototype.getArticleList = async (query) => {
  let pageSize = parseInt(query.pageSize);
  let pageId = parseInt(query.currentPage);
  return await article.find({}).limit(pageSize).skip(pageSize * pageId);
};

module.exports = ArticleDao;