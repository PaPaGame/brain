<template>
    <div class="clearfix">
        <el-form :model="info" :rules="rules" label-position="left" label-width="85px">
            <el-form-item :label="$t('student.username')" prop="code">
                <el-input v-model="dataModel.username" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('student.password')" prop="code">
                <el-input v-model="dataModel.password" type="password" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('student.schoolCode')" prop="code">
                <el-input v-model="dataModel.school" clearable :disabled="!canEditSchool"></el-input>
            </el-form-item>
            <el-form-item :label="$t('student.group')" prop="phone">
                <el-input v-model="dataModel.group" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('student.phone')" prop="phone">
                <el-input v-model="dataModel.phone" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('student.mail')" prop="phone">
                <el-input v-model="dataModel.mail" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('student.status')">
                <el-radio-group v-model="dataModel.status">
                    <el-radio :label="1">开启</el-radio>
                    <el-radio :label="0">封停</el-radio>
                </el-radio-group>
                <!-- <el-radio v-model="info.status"
                    label="0">备选项</el-radio>
                <el-radio v-model="info.status"
                    label="1">备选项</el-radio> -->
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="btnUpdateHandler" v-if="operate === 'edit'" type="primary">更新</el-button>
            <el-button @click="btnCreateHandler" v-if="operate === 'create'" type="primary">创建</el-button>
            <el-button @click="close">取消</el-button>
        </div>
    </div>
</template>

<script>
import studentService from "@/api/student";
import { mapActions, mapGetters } from "vuex";
export default {
    name: "DetailPanel",
    props: {
        info: {
            type: Object,
            default: () => { return {}; }
        },
        operate: {
            type: String,
            default: ""
        },
        userId: "",
        username: ""
    },
    data() {
        return {
            staffs: [],
            dataModel: {
                username: "",
                password: "",
                school: "",
                phone: "",
                mail: "",
                status: 1,
                group: ""
            },
            rules: {
                code: [{ required: true, message: this.$t("school.requiredCode"), trigger: 'change' }]
            }
        }
    },
    methods: {
        btnUpdateHandler() {
            // schoolService.updateData(this.info);
            this.$emit("closeDialog");
        },
        btnCreateHandler() {
            studentService.addStudent(this.dataModel).then(res => {
                if (res.status == 200) {
                    this.getStudentList(this.commParam);
                    this.$emit("fetchStudentList");
                    this.$message.success(this.$t('student.createSuccess'));
                } else {
                    this.$message.error(this.$t('student.createFailed'));
                }
                this.close();
            })
        },
        close() {
            this.$emit("closeDialog");
        },
        getKey(id) {
            studentService.getStudentById({ id: id }).then(res => {
                if (res.status == 200) {
                    let info = res.info;

                    this.dataModel.username = info.username;
                    this.dataModel.school = info.school;
                }
            })
        },
        ...mapActions(["getStudentList"])
    },
    computed: {
        canEditSchool() {
            console.log(this.$store.getters.userinfo.school);
            return this.$store.getters.userinfo.role != 1;
        },

        userSchool() {
            console.log(this.$store.getters.userinfo.school);
            return this.$store.getters.userinfo.school;
        },
        ...mapGetters({
            userinfo: "userinfo",
        })
    },
    watch: {
        info(val) {
            console.log("info" + val);
            this.getKey(val._id);
        },
        userId(val) {
            console.log("uid:" + val);
        }
    }
}
</script>

<style>

</style>
