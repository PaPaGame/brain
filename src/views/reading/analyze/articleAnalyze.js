// 文章解析
function ArticleAnalyze() {
}

ArticleAnalyze.prototype.startBasicInfo = (originData) => {
    // 传进来的就是obj
    // console.log(originData);
    let result = {};
    // 解析标题
    result.title = originData.full_title;

    result.pages = [];
    // 解析 文章内容
    let pages = originData.pages;
    pages.forEach(ele => {
        result.pages.push(ele.id);
    })

    // 解析灯泡
    result.tais = [];
    let tais = originData.tai;
    tais.forEach(ele => {
        result.tais.push(ele.id);
    });

    return result;
}

ArticleAnalyze.prototype.startQuizs = (originData) => {
    let result = [];
    return result;
}

module.exports = ArticleAnalyze;