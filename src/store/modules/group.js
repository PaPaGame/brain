import groupService from "@/api/group";
import * as types from "../mutation-type";

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
    [types.GROUP_UPDATE_LIST](state, { data }) {
        state.groupList.push(...data);
        state.groupCount = state.groupList.length;
    }
}

const actions = {
    getGroupList({ commit, state }, payload) {
        groupService.fetchClass({}).then(res => {
            console.log("获取数据完毕", res);
            if (res.status == 200) {
                commit(types.GROUP_UPDATE_LIST, { data: res.classInfos });
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