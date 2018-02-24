<template>
    <div>
        <el-form :model="info" :rules="rules" label-position="left" label-width="85px">
            <el-form-item :label="$t('group.name')" prop="code">
                <el-input v-model="info.name" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('group.school')">
                <el-input v-model="info.school" disabled></el-input>
            </el-form-item>
            <el-form-item :label="$t('group.staff')" prop="code">
                <el-input ref="tiTeacherName" v-model="info.teacher" clearable @keyup.enter.native="searchStaffByName"></el-input>
                <span v-if="findTeacherNothing">{{$t("group.noResult")}}</span>
            </el-form-item>
            <el-form-item :label="$t('group.students')" prop="phone">
                <el-input ref="tiStudentName" v-model="info.students" clearable @keyup.enter.native="searchStudentByName"></el-input>
                <span v-if="findStudentNothing">{{$t("group.noResult")}}</span>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="btnUpdateHandler" type="primary" v-if="operate === 'edit'">{{$t("group.update")}}</el-button>
            <el-button @click="btnCreateHandler" type="primary" v-if="operate === 'create'">{{$t("group.add")}}</el-button>
            <el-button @click="close">{{$t("group.cancel")}}</el-button>
        </div>
    </div>
</template>

<script>
import { createClass, updateClass } from "@/api/group";
import { FetchStudentByFuzzyName } from "@/api/student";
import { FetchTeacherByFuzzyName } from "@/api/staff";
import { deepClone } from "@/utils/index";
export default {
    name: "ClassDetailPanel",
    props: {
        info: {
            type: Object,
            default: null
        },
        operate: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            findStudentNothing: false,
            findTeacherNothing: false,
            staffs: [],
            rules: {
                code: [{ required: true, message: this.$t("group.requiredCode1"), trigger: 'change' }]
            }
        }
    },
    methods: {
        add() {
            this.staffs.push({ id: Math.random(), name: "小坦克" + Math.random() });
        },
        btnUpdateHandler() {
            updateClass(this.info).then(res => {
                this.close();
                this.$emit("fetchClassInfo");
            });
        },
        btnCreateHandler() {
            createClass(this.info).then(res => {
                this.$emit("fetchClassInfo");
                this.close();
            });
        },
        close() {
            this.$emit("closeDialog");
        },
        searchStudentByName() {
            let name = this.$refs.tiStudentName.value

            FetchStudentByFuzzyName(name).then(res => {
                // 如果没有找到人 显示，否则呈现列表插入
                let result = res.infos;
                this.findStudentNothing = result.length === 0;
            });
        },
        searchStaffByName() {
            let name = this.$refs.tiTeacherName.value;
            FetchTeacherByFuzzyName(name).then(res => {
                let result = res.infos;
                this.findTeacherNothing = result.length === 0;
                if (result.length) {
                    let staff = result[0];
                    this.info.staff = { id: staff._id, name: staff.name };
                }
            });
        }
    }
}
</script>

<style>

</style>
