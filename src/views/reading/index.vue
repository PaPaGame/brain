<template>
    <div>
        <span>
            <h3>Here is Reading Page</h3>
        </span>
        <div>
            <ul>
                <template v-for="(course,index) in courses">
                    <course-card :courseInfo="{course}"></course-card>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
import CourseCard from "@/components/courseCard";
import CourseService from "@/api/course";
export default {
    components: {
        CourseCard
    },
    beforeMount() {
        console.log("beforeMount");
        let query = {};
        query.uid = "5a86acd9838e715b6f7c7099";
        CourseService.fetchAllCourse(query).then(res => {
            console.log(res);
            if (res.status != 200) {
                this.$message.error("获取课程列表失败");
                return;
            }

            this.rebuildData(res.courses);
        });
    },
    data() {
        return {
            courses: []
        };
    },
    methods: {
        rebuildData(origin) {
            this.courses = origin;
        }
    }
}
</script>

<style>

</style>
