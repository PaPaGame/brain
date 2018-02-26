import groupService from "@/api/group";

const state = {
    groupData: {},
    groupList: [],
    groupCount: 0
}

const getters = {
    groupList: state => state.groupList,
    groupCount: state => state.groupList.length
}

const mutations = {
    ["UPDATE_GROUP_LIST"](state, { data }) {
        state.groupList.push(...data);
        state.groupCount = state.groupList.length;
    }
}

const actions = {
    getGroupList({ commit, state }, payload) {
        console.log("在module 里获取数据");
        groupService.fetchClass({}).then(res => {
            console.log("获取数据完毕", res);
            if (res.status == 200) {
                commit("UPDATE_GROUP_LIST", { data: res.classInfos });
            } else {

            }
        });
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}