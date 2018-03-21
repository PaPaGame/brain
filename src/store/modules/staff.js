import * as types from "../mutation-type";
import staffService from "@/api/staff";
const state = {
    staffList: []
}

const getters = {
    staffList: state => state.staffList
}

const mutations = {
    [types.STAFF_SCHOOL_LIST](state, { data }) {
        state.staffList = data;
    }
}

const actions = {
    getStaffList({ commit, state }, payload) {
        staffService.fetchStaffList(payload).then(res => {
            commit(types.STAFF_SCHOOL_LIST, { data: res.staffList });
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}