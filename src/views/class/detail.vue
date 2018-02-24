<template>
    <div>
        <el-form :model="info" :rules="rules" label-position="left" label-width="85px">
            <el-form-item :label="$t('group.name')" prop="code">
                <el-input v-model="info.name" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('group.school')">
                <el-input v-model="info.school" disabled></el-input>
            </el-form-item>
            <el-form-item :label="$t('group.teacher')" prop="code">
                <el-input v-model="info.teacher" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('group.students')" prop="phone">
                <el-input ref="tiStudentName" v-model="info.students" clearable @keyup.enter.native="searchStudentByName"></el-input>
                <span v-if="findNothing">查无此人</span>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="btnUpdateHandler">更新</el-button>
            <el-button @click="btnCreateHandler">创建</el-button>
            <el-button @click="close">取消</el-button>
        </div>
    </div>
</template>

<script>
import { createClass, updateClass } from "@/api/group";
import { FetchInfoByFuzzyName } from "@/api/student"
export default {
    name: "ClassDetailPanel",
    props: {
        info: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            findNothing: false,
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
            updateClass(this.info);
        },
        btnCreateHandler() {
            console.log(this.info);
            createClass(this.info);
        },
        close() {
            this.$emit("closeDialog");
        },
        searchStudentByName() {
            let name = this.$refs.tiStudentName.value

            FetchInfoByFuzzyName(name).then(res => {
                // 如果没有找到人 显示，否则呈现列表插入
                let result = res.infos;
                this.findNothing = result.length === 0
            });
        }
    }
}
</script>

<style>

</style>
