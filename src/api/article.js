import ajax from "@/utils/ajax";

const article = {
    fetchArticleLevelList: () => {
        return ajax({
            url: "/article/level",
            methods: "get"
        });
    }
};
export default article;