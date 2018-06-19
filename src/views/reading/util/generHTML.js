function GenerHtml() {

}

GenerHtml.prototype.generContainer = (layout) => {
    var div = document.createElement("div");
    var rate = 1;
    //如果为大屏则乘以1.3的系数
    if(document.body.clientHeight > 800) {
        rate =1.2
    }
    div.style.color = "#000000";
    div.style.top = layout.top*rate + "px";
    let left = layout.left;
    if (layout.left > 300) {
        left *= 1.45;
    } else {
        left += 60;
    }
    div.style.left = left*rate + "px";
    div.style.width = layout.width*rate + "px";
    div.style.height = layout.height*rate + "px";
    div.style.position = "absolute";
    return div;
}
// 848*475
GenerHtml.prototype.generSentences = (words, fontStyle, wordAudios, audioIndex) => {
    var content = "";
    var div = document.createElement("div");
    div.setAttribute("_idx", audioIndex);
    div.style.fontStyle.bold = fontStyle.bold;
    div.style.fontStyle.fontcolor = "#" + fontStyle.front_color;
    div.style.fontStyle.italic = fontStyle.italic;
    div.style.fontFamily = fontStyle.name;
    div.style.fontSize = fontStyle.size + "px";
    // div.style.fontsize = fontStyle.size + "px";
    div.style.fontStyle.underline = fontStyle.underline == "true";
    words.forEach(word => {
        if (word.indexOf("~!tai") >= 0) {
            // content += '<img _tai=' + word.split('_')[1] + ' src=' + 'http://csdnimg.cn/jifen/images/xunzhang/xunzhang/chizhiyiheng.png' + ' style="width:15px;height:15px;cursor:pointer">';
            content += `<i class="iconfont icon-tai" _tai='${word.split('_')[1]}' style='cursor:pointer'></i>`
        } else {
            content += '<a _audio=' + wordAudios[word] + '>' + word + "</a> ";
        }
    })
    // content += "</div>";
    div.innerHTML = content + ".";
    return div;
}

GenerHtml.prototype.generImages = (dirName, images) => {
    var img = document.createElement("img");
    // SL1I41333.jpg
    TODO: //解决路径问题
    img.src = `${process.env.PUBLIC_PATH}/${dirName}/images/${images}`
    img.style.cssText = "width:100%; height:100%";
    return img;
}
module.exports = GenerHtml;