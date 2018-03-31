import userService from "@/api/user";
import * as types from "../mutation-type";
import router from '@/router'

const state = {
    username: "",
    userId: "",
    token: '',
    role: "",
    school: "",
    userinfo: {
        username: "",
        userId: "",
        role: "",
        school: ""
    }
}
//BJTZ001

const mutations = {
    [types.USER_UPDATE_INFO](state, { data }) {
        state.username = data.username;
        state.userId = data._id;
        state.role = data.role;
        state.school = data.school;
        state.userinfo = {
            username: data.username,
            userId: data._id,
            role: data.role,
            school: data.school
        };

        console.log("获取用户信息成功", state);
    },
    [types.USER_UPDATE](state, { data }) {
        state.username = data.username;
        state.userId = data._id;
        state.school = data.school;
        state.phone = data.phone;
        state.mail = data.mail;
        state.lastLoginTime = data.lastLoginTime;
        state.role = data.role;
        state.status = data.status;
        state.userinfo = {
            username: data.username,
            userId: data._id,
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
        console.log("获取用户信息", commit, state, payload);
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
                console.log("登录成功");
                commit(types.USER_UPDATE, { data: res.userinfo });
                sessionStorage.setItem("loginStatus", true);
                sessionStorage.setItem("userinfo", res.userinfo);
                localStorage.setItem('brain_token', res.token);
                router.push({ path: '/' });
            } else {
                sessionStorage.setItem("loginStatus", false);
                sessionStorage.setItem("userinfo", null);
                router.app.$alert(res.message, '提示', { confirmButtonText: '知道了' }).catch(() => { });
            }
        });
    }
    // ,

    // doLogout({commit, state}, payload) {
    //     // router.push({ path: '/login' });
    //     // userService.logout(payload).then(res=> {

    //     // }).finally(()=>{
    //     //     sessionStorge.setItem("loginStatus", false);
    //     //     sessionStorge.setItem("userinfo", null);
    //     //     router.push({ path: '/login' });
    //     // });
    // }
}

export default {
    state,
    actions,
    mutations,
    getters
};