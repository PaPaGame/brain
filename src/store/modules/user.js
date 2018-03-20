import userService from "@/api/user";
import * as types from "../mutation-type";
import router from '@/router'

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
    },
    [types.USER_UPDATE](state, { data }) {
        state.username = data.username;
        state.userId = data._id;
        user.school = data.school;
        user.phone = data.phone;
        user.mail = data.mail;
        user.lastLoginTime = data.lastLoginTime;
        user.role = data.role;
        user.status = data.status;
        // user.uid =
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
    },

    doLogin({ commit, state }, payload) {
        userService.login(payload).then(res => {
            if (res.status === 200) {
                commit(types.USER_UPDATE, { data: res.userInfo });
                // router.push({ path: '/' });
                // resolve();
            } else {
                router.app.$alert(res.message, '提示', { confirmButtonText: '知道了' }).catch(() => { });
            }
        });
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};