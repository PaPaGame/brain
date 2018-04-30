<template>
    <div>
        <el-form :model="queryModel" :rules="rules" label-position="left" label-width="85px">
            <el-form-item :label="$t('school.code')" prop="code">
                <el-input v-model="queryModel.code" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('school.name')" prop="code">
                <el-input v-model="queryModel.name" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('school.master')" prop="code">
                <!-- <el-input v-model="info.master" clearable></el-input> -->
                <el-autocomplete class="searchBar" v-model="queryModel.masterName" :placeholder="$t('school.fuzzyMasterList')" :fetch-suggestions="querySearchMasterAsync" @select="masterSelectHandler"></el-autocomplete>
                <span v-if="findMasterNothing">{{$t("school.noResult")}}</span>
            </el-form-item>
            <el-form-item :label="$t('school.phone')" prop="phone">
                <el-input v-model="queryModel.phone" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('school.status')">
                <el-radio-group v-model="queryModel.status">
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
import schoolService from "@/api/school";
import staffService from "@/api/staff";
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
            findMasterNothing: false,
            rules: {
                code: [{ required: true, message: this.$t("school.requiredCode"), trigger: 'change' }]
            },
            queryModel: {
                masterId: "",
                staffId: []
            }
        }
    },
    watch: {
        info(val) {
            this.queryModel = val;
        }
    },
    methods: {
        add() {
            this.staffs.push({ id: Math.random() });
        },
        btnUpdateHandler() {
            schoolService.updateData(this.queryModel);
        },
        btnCreateHandler() {
            this.queryModel.staffId = this.staffs;
            schoolService.createData(this.queryModel);
        },
        masterSelectHandler(e) {
            console.log("选择auto", e._id, e.name);
            this.queryModel.masterId = e._id;
            this.queryModel.masterName = e.name;
        },
        async querySearchMasterAsync(queryStr, callback) {
            if (queryStr === "") {
                callback([]);
                return;
            }

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
                this.findMasterNothing = staffList.length === 0;
                callback(staffList);
            } catch (e) {

            }
        },
        close() {
            this.$emit("closeDialog");
        }
    }
}
</script>

<style lang="scss" scoped>
.searchBar {
  width: 100%;
}
</style>
