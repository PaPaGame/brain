/**
 *  创建一个DAO 基类操作
 * 
 * @param {any} Model 
 */
function DaoBase(Model) {
    this.model = Model;
}

/** 创建*/
DaoBase.prototype.create = async function (doc, callback) {
    return await this.model.create(doc, (err, data) => {
        if (err)
            callback(err, null);

        callback(null, data);
    });
};

/** 根据id查找*/
DaoBase.prototype.getById = async function (id, callback) {
    return await this.model.findOne({ _id: id }, (err, data) => {
        if (err)
            callback(err, null);

        callback(null, data);
    })
};

/** 数量*/
DaoBase.prototype.countByQuery = async function (query, callback) {
    return await this.model.find(query, (err, data) => {
        if (err)
            callback(err, null);
        callback(null, data);
    });
};

/** 查找内容，不一定是全部的集合*/
DaoBase.prototype.getByQuery = async function (query, fileds, opt, callback) {
    return await this.model.find(query, fileds, opt, (err, data) => {
        if (err)
            callback(err, null);
        callback(null, data);
    });
};

DaoBase.prototype.getAll = async function (callback) {
    return await this.model.find({}, null, { sort: { "createdAt": -1 } }, (err, data) => {
        if (err)
            callback(err, null);

        callback(null, data);
    });
};

/** 删除*/
DaoBase.prototype.delete = async function (query, callback) {
    return await this.model.remove(query, err => {
        if (err)
            callback(err);
        callback(null);
    });
}

/** 更新*/
DaoBase.prototype.update = async function (conditions, update, options, callback) {
    return await this.model.update(conditions, update, options, err => {
        if (err)
            callback(err);
        callback(null);
    });
}

module.exports = DaoBase;