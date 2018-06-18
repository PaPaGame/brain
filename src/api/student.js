import ajax from "@/utils/ajax";

const student = {
    fetchStudentByFuzzyName(query) {
        return ajax({
            url: "/student/fuzzy",
            method: "post",
            params: query
        });
    },

    fetchStudents() {
        return ajax({
            url: "/student",
            method: "get"
        });
    },

    addStudent(user) {
        return ajax({
            url: "/student/add",
            method: "post",
            params: user
        });
    },

    getStudentById(id) {
        return ajax({
            url: "/student/id",
            method: "post",
            params: id
        })
    },

    getAllStudent(query) {
        return ajax({
            url: "/student/all",
            method: "post",
            params: query
        });
    },

    removeStudent(query) {
        return ajax({
            url: "/student/remove",
            method: "post",
            params: query
        })
    },

    updateStudent(query) {
        return ajax({
            url: "/student/update",
            method: "post",
            params: query
        })
    },

    getStudentByClassId(query) {
        return ajax({
            url: "/student/getbyclassid",
            method: "post",
            params: query
        })
    },

    // 获取学生课程状态
    getStudentCourseData(query) {
        return ajax({
            url: "/student/getCourseData",
            method: "post",
            params: query
        });
    }
};


export default student;