/**
 *  创建一个DAO 基类操作
 * 
 * @param {any} Model 
 */
function DaoBase(Model) {
    this.model = Model;
}

/** 创建*/
DaoBase.prototype.create = (doc, callback) => {

};

/** 根据id查找*/
DaoBase.prototype.getById = (id, callback) => {

};

/** 数量*/
DaoBase.prototype.countByQuery = (query, callback) => {

};

/** 查找内容，不一定是全部的集合*/
DaoBase.prototype.getByQuery = (query, fileds, opt, callback) => {

};

DaoBase.prototype.getAll = (callback) => {

};

/** 删除*/
DaoBase.prototype.delete = (query, callback) => {

}

/** 更新*/
DaoBase.prototype.update = (conditions, update, options, callback) => {

}

module.exports = DaoBase;