import * as types from "../mutation-type";
import studentService from "@/api/student";

const state = {
    allStudent: [],
    allStudentCount: 0
}

const getters = {
    allStudent: state => state.allStudent,
    allStudentCount: state => state.allStudentCount
}

const mutations = {
    [types.STUDENT_ALL_LIST](state, { data }) {
        state.allStudent = data.students;
        state.allStudentCount = data.count;
    }
}

const actions = {
    getStudentList({ commit, state }, paylod) {
        studentService.getAllStudent(paylod).then(res => {
            if (res.status == 200) {
                commit(types.STUDENT_ALL_LIST, { data: res });
            } else {
                this.$message.error("获取学生列表失败");
            }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}