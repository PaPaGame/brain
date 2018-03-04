import userService from "@/api/user";
import * as types from "../mutation-type";

const state = {
    username: "",
    userId: "",
    token: '',
    role: "",
    school: "",
    userinfo: {}
}

const mutations = {
    [types.USER_UPDATE_INFO](state, { data }) {
        state.username = data.username;
        state.userId = data._id;
        state.role = data.role;
        state.school = data.school;
        state.userinfo = {
            username: state.username,
            userId: state.userId,
            role: state.role,
            school: state.school
        };

        console.log("获取用户信息成功", state);
    }
}

const getters = {
    userinfo: state => state.userinfo,
}

const actions = {
    getUserInfo({ commit, state }, payload) {
        userService.getUserInfo(payload).then(res => {
            if (res.status === 200) {
                commit(types.USER_UPDATE_INFO, { data: res.userinfo });
            } else {

            }
        })
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};