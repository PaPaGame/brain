import * as types from '../mutation-type';
import staffService from '@/api/staff';
const state = {
  staffList: [],
  staffCount: 0
};

const getters = {
  staffList: state => state.staffList,
  staffCount: state => state.staffCount
};

const mutations = {
  [types.STAFF_SCHOOL_LIST](state, {data}) {
    state.staffList = data;
  },
  [types.STAFF_TOTAL_COUNT](state, {data}) {
    state.staffCount = data;
  }
};

const actions = {
  getStaffList({commit, state}, payload) {

    staffService.getTotalStaffCount().then(res => {
      if (res.status === 200) {
        commit(types.STAFF_TOTAL_COUNT, {data: res.count});
      }
    });

    // 分页获取老师列表
    staffService.fetchStaffList(payload).then(res => {
      commit(types.STAFF_SCHOOL_LIST, {data: res.staffList});
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};