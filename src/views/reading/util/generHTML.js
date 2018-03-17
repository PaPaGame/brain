function GenerHtml() {

}

GenerHtml.prototype.generContainer = (layout) => {
    var div = document.createElement("div");
    div.style.color = "#000000";
    div.style.top = layout.top + "px";
    div.style.left = layout.left + "px";
    div.style.width = layout.width + "px";
    div.style.height = layout.height + "px";
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
    // div.style.fontStyle. = fontStyle.name;
    div.style.fontsize = fontStyle.size + "px";
    div.style.fontStyle.underline = fontStyle.underline == "true";
    words.forEach(word => {
        content += '<a _audio=' + wordAudios[word] + '>' + word + "</a> ";
    })
    // content += "</div>";
    div.innerHTML = content + ".";
    return div;
}

GenerHtml.prototype.generImages = (images) => {
    var img = document.createElement("img");
    // SL1I41333.jpg
    TODO: //解决路径问题
    // img.src = process.env.PUBLIC_URL + "/" + images;
    img.src = "https://goss2.vcg.com/creative/vcg/800/version23/VCG21gic11339855.jpg";
    img.style.cssText = "width:100%; height:100%";
    return img;
}
module.exports = GenerHtml;