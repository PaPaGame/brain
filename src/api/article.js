import ajax from "@/utils/ajax";

const article = {
    fetchArticleLevelList: () => {
        return ajax({
            url: "/article/level",
            method: "post"
        });
    }
};
export default article;