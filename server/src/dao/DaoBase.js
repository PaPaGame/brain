/**
 *  创建一个DAO 基类操作
 * 
 * @param {any} Model 
 */
function DaoBase(Model) {
    this.model = Model;
}

/** 创建*/
DaoBase.prototype.create = async function(doc) {
    return await this.model.create(doc);
};

/** 根据id查找*/
DaoBase.prototype.getById = async function(id) {
    return await this.model.findOne({ _id: id });
};

/** 数量*/
DaoBase.prototype.countByQuery = async function(query) {
    return await this.model.find(query);
};

/** 查找内容，不一定是全部的集合*/
DaoBase.prototype.getByQuery = async function(query, fileds, opt) {
    return await this.model.find(query, fileds, opt);
};

DaoBase.prototype.getAll = async function() {
    return await this.model.find({}, null, { sort: { "createdAt": -1 } });
};

/** 删除*/
DaoBase.prototype.delete = async function(query) {
    return await this.model.remove(query);
}

/** 更新*/
DaoBase.prototype.update = async function(conditions, update, options) {
    return await this.model.update(conditions, update, options);
}

module.exports = DaoBase;