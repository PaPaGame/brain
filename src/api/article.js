import ajax from "@/utils/ajax";

const article = {
    fetchArticleLevelList: () => {
        return ajax({
            url: "/article/level",
            method: "post"
        });
    },
    fetchArticleList: (query) => {
        return ajax({
            url: "/article/list",
            method: "post",
            params: query
        });
    }
};
export default article;