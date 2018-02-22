<template>
    <div>
        <el-form :model="info" :rules="rules" label-position="left" label-width="85px">
            <el-form-item :label="$t('school.code')" prop="code">
                <el-input v-model="info.code" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('school.name')" prop="code">
                <el-input v-model="info.name" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('school.master')" prop="code">
                <el-input v-model="info.master" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('school.phone')" prop="phone">
                <el-input v-model="info.phone" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('school.status')">
                <el-radio-group v-model="info.status">
                    <el-radio label="1">开启</el-radio>
                    <el-radio label="0">关停</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('school.staff')">
                <el-input></el-input>
                <el-button icon="el-icon-search" type="primary"></el-button>
                <div>
                    <span>小坦克{{Math.random()}}</span>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="add"></el-button>
                </div>
                <ul>
                    <li v-for="staff in staffs">
                        {{staff.name}}
                    </li>
                </ul>
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
import { createData, updateData } from "@/api/school";
export default {
    name: "DetailPanel",
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
                code: [{ required: true, message: this.$t("school.requiredCode"), trigger: 'change' }]
            }
        }
    },
    methods: {
        add() {
            this.staffs.push({ id: Math.random(), name: "小坦克" + Math.random() });
        },
        btnUpdateHandler() {
            updateData(this.info);
        },
        btnCreateHandler() {
            createData(this.info);
        },
        close() {
            this.$emit("closeDialog");
        }
    }
}
</script>

<style>

</style>
