// 文章解析
function ArticleAnalyze() {
    console.log("实例化对象");
}

ArticleAnalyze.prototype.start = (originData) => {
    // 传进来的就是obj
    // console.log(originData);
    let result = {};
    // 解析标题
    result.title = originData.full_title;

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
}

module.exports = ArticleAnalyze;