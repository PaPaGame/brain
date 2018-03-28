<template>
    <div>
        <el-form :model="info" :rules="rules" label-position="left" label-width="85px">
            <el-form-item :label="$t('group.name')">
                <el-input v-model="info.name" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('group.school')">
                <el-input v-model="info.school" :disabled="userinfo.school!=''"></el-input>
            </el-form-item>
            <el-form-item :label="$t('group.staff')">
                <!-- <el-input ref="tiTeacherName" v-model="info.staff && info.staff.name || ''" clearable @keyup.enter.native="searchStaffByName"></el-input> -->
                <el-autocomplete :value="info.staff.name" :placeholder="$t('group.fuzzyStaffList')" :fetch-suggestions="querySearchStaffAsync" @select="staffSelectHandler" style="width: 100%;"></el-autocomplete>
                <span v-if="findTeacherNothing">{{$t("group.noResult")}}</span>
            </el-form-item>
            <el-form-item :label="$t('group.students')">
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
// import { createClass, updateClass } from "@/api/group";
import groupService from "@/api/group";
import studentService from "@/api/student";
// import { FetchTeacherByFuzzyName } from "@/api/staff";
import staffService from "@/api/staff";
import { deepClone } from "@/utils/index";
import { mapGetters } from 'vuex';
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
            queryModel: {},
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
            // this.info.staff = { id: "123456", name: "Kiven.zhou" }
            console.log(this.info);
            groupService.updateClass(this.info).then(res => {
                if (res.status = 200) {
                    this.$message.success(this.$t('group.updateSuccess'));
                } else {
                    this.$message.failed(this.$t('group.updateFailed'));
                }
                this.close();
                this.$emit("fetchClassInfo");
            });
        },
        btnCreateHandler() {
            groupService.createClass(this.info).then(res => {
                this.$emit("fetchClassInfo");
                this.close();
            });
        },
        close() {
            this.$emit("closeDialog");
        },
        searchStudentByName() {
            let name = this.$refs.tiStudentName.value

            studentService.fetchStudentByFuzzyName(name).then(res => {
                // 如果没有找到人 显示，否则呈现列表插入
                let result = res.infos;
                this.findStudentNothing = result.length === 0;
            });
        },
        async querySearchStaffAsync(queryStr, callback) {

            if (queryStr === "")
                return;

            try {
                let query = { "name": queryStr };
                let staffInfos = await staffService.fetchTeacherByFuzzyName(query);
                let staffList = staffInfos.staff;
                if (staffList instanceof Array) {
                    staffList.map(staff => {
                        staff.value = staff.name;
                        return staff;
                    })
                };

                this.findTeacherNothing = staffList.length === 0;
                callback(staffList);
            } catch (e) {

            }
        },
        staffSelectHandler(e) {
            this.info.staff = e;
            console.log(e);
        }
    },
    computed: {
        ...mapGetters({
            userinfo: "userinfo"
        })
    }
}
</script>

<style>

</style>
