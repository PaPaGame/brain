import ajax from "@/utils/ajax";

const user = {
    getUserInfo(data) {
        return ajax({
            url: "/user/info",
            method: "post",
            params: data
        });
    },
    login(data) {
        return ajax({
            url: "/user/login",
            method: "post",
            params: data
        })
    }
};

export default user;