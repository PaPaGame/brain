<template>
    <div>
        <el-form :model="info"
            :rules="rules"
            label-position="left"
            label-width="85px">
            <el-form-item :label="$t('student.username')"
                prop="code">
                <el-input v-model="info.username"
                    clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('student.password')"
                prop="code">
                <el-input v-model="info.password"
                    type="password"
                    clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('student.schoolCode')"
                prop="code">
                <el-input v-model="info.schoolCode"
                    clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('student.phone')"
                prop="phone">
                <el-input v-model="info.phone"
                    clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('student.mail')"
                prop="phone">
                <el-input v-model="info.mail"
                    clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('student.status')">
                <el-radio-group v-model="info.status">
                    <el-radio label="1">开启</el-radio>
                    <el-radio label="0">关停</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="btnUpdateHandler"
                v-if="operate === 'edit'"
                type="primary">更新</el-button>
            <el-button @click="btnCreateHandler"
                v-if="operate === 'create'"
                type="primary">创建</el-button>
            <el-button @click="close">取消</el-button>
        </div>
    </div>
</template>

<script>
import studentService from "@/api/student";
export default {
    name: "DetailPanel",
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
            staffs: [],
            rules: {
                code: [{ required: true, message: this.$t("school.requiredCode"), trigger: 'change' }]
            }
        }
    },
    methods: {
        add() {
        },
        btnUpdateHandler() {
            // schoolService.updateData(this.info);
        },
        btnCreateHandler() {
            // schoolService.createData(this.info);
        },
        close() {
            this.$emit("closeDialog");
        }
    }
}
</script>

<style>

</style>
