<template>
    <div>
        <div>
            <ul>
                <template v-for="(courseInfo,index) in courses">
                    <course-card :courseInfo="courseInfo"></course-card>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
import CourseCard from "@/components/courseCard";
import CourseService from "@/api/course";
import { mapGetters } from 'vuex';
export default {
    components: {
        CourseCard
    },
    beforeMount() {
        let query = {};
        query.uid = this.userinfo.id;
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
    },
    computed: {
        ...mapGetters(["userinfo"])
    }
}
</script>

<style>

</style>
