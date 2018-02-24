<template>
    <div>
        <el-form :model="info" :rules="rules" label-position="left" label-width="85px">
            <el-form-item :label="$t('group.name')" prop="code">
                <el-input v-model="info.name" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('group.school')" prop="code">
                <el-input v-model="info.school" disabled></el-input>
            </el-form-item>
            <el-form-item :label="$t('group.teacher')" prop="code">
                <el-input v-model="info.teacher" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('group.students')" prop="phone">
                <el-input v-model="info.students" clearable></el-input>
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
        }
    }
}
</script>

<style>

</style>
