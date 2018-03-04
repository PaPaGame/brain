import userService from "@/api/user";
import * as types from "../mutation-type";
const user = {

    state: {
        username: "",
        userId: "",
        token: '',
        role: "",
        school: "",
    },

    mutations: {
        [types.USER_UPDATE_INFO](state, { data }) {
            console.log(data);
            state.username = data.username;
            state.userId = data._id;
            state.role = data.role;
            state.school = data.school;
        }
    },

    actions: {
        getUserInfo({ commit, state }, payload) {
            userService.getUserInfo(payload).then(res => {
                if (res.status === 200) {
                    console.log("获取用户信息成功");
                    commit(types.USER_UPDATE_INFO, { data: res.userinfo });
                } else {

                }
            })
        }
    }
}

export default user;