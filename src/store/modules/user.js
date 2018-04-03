import userService from "@/api/user";
import * as types from "../mutation-type";
import router from '@/router'

let localUserInfo = localStorage.getItem("brain_userinfo");

let localUserObj = {};
if (localUserInfo) {
    localUserObj = JSON.parse(localUserInfo);
    localUserObj.userinfo = JSON.parse(localUserInfo);
}
const state = Object.assign({
    username: "",
    id: "",
    token: '',
    role: "",
    school: "",
    userinfo: {
        username: "",
        id: "",
        role: "",
        school: ""
    }
}, localUserObj);
//BJTZ001

const mutations = {
    [types.USER_UPDATE_INFO](state, { data }) {
        state.username = data.username;
        state.id = data._id;
        state.role = data.role;
        state.school = data.school;
        state.userinfo = {
            username: data.username,
            id: data._id,
            role: data.role,
            school: data.school
        };

        console.log("获取用户信息成功", state);
    },
    [types.USER_UPDATE](state, { data }) {
        state.username = data.username;
        state.id = data._id;
        state.school = data.school;
        state.phone = data.phone;
        state.mail = data.mail;
        state.lastLoginTime = data.lastLoginTime;
        state.role = data.role;
        state.status = data.status;
        state.userinfo = {
            username: data.username,
            id: data._id,
            role: data.role,
            school: data.school
        };
        // user.uid =
    }
}

const getters = {
    userinfo: state => state.userinfo,
    school: state => state.school
}

const actions = {
    getUserInfo({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            userService.getUserInfo(payload).then(res => {
                if (res.status === 200) {
                    commit(types.USER_UPDATE_INFO, { data: res.userinfo });
                    resolve();
                } else {
                    reject();
                }
            })
        })
    },

    doLogin({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            userService.login(payload).then(res => {
                if (res.status === 200) {
                    console.log("登录成功");
                    commit(types.USER_UPDATE_INFO, { data: res.userinfo });
                    localStorage.setItem('brain_token', res.token);
                    localStorage.setItem("brain_userinfo", JSON.stringify(res.userinfo));
                    // this.$store.dispatch("GenerateRoutes", res.userinfo);
                    resolve(res.userinfo);

                } else {
                    localStorage.setItem('brain_token', "");
                    localStorage.setItem("brain_userinfo", "");
                    router.app.$alert(res.message, '提示', { confirmButtonText: '知道了' }).catch(() => { });
                    reject();
                }
            });
        })

    },

    doLogout({ commit, state }, payload) {
        router.push({ path: '/login' });
        userService.logout(payload).then(res => {

        }).finally(() => {
            localStorage.setItem("brain_token", "");
            localStorage.setItem("brain_userinfo", "");
            commit(types.USER_UPDATE, { data: {} });
            router.push({ path: '/login' });
        });
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};