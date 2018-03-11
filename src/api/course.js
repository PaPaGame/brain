import ajax from "@/utils/ajax";

const course = {
    fetchAllCourse(query) {
        return ajax({
            url: "/course/get",
            method: "post",
            data: query
        });
    }
};

export default course;