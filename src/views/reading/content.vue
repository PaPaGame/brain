<template>
    <section>
        <el-row class="title-wapper">
            <el-col :span="2"
                :offset="20"
                class="back"
                @click.native="goBack">
                <i class="el-icon-d-arrow-left"></i>返回</el-col>
        </el-row>
        <span>{{contentModel}}</span>
    </section>
</template>

<script>
export default {
    data() {
        return {
            contentModel: this.$route.params.info
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    },
    watch: {
        contentModel(val) {
            this.contentModel = val;
        },
        '$route'(to, from) {
            // console.log(this.$route.params);
            this.contentModel = this.$route.params.info;
        }
    }
}
</script>

<style lang="scss" scoped>
.back {
  cursor: pointer;
}
</style>
