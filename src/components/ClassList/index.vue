<template>
    <div class="classList">
        <el-autocomplete :placeholder="$t('student.inputGroupName')"
            :trigger-on-focus="false"
            @select="selectHandler"
            class="inline-input"
            :fetch-suggestions="querySearch"></el-autocomplete>
        <span>{{$t('student.inputTips')}}</span>
        <ul class="classBox">
            <template v-for="group in groups">
                <li class="group">
                    <label class="groupName"
                        v-text="group.name"
                        @click="groupItemClickHandler(group)"></label>
                    <label v-text="(group.student.length)"></label>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
    name: 'classList',
    data() {
        return {
        }
    },
    methods: {
        selectHandler(item) {
            console.log(item);
        },
        groupItemClickHandler(itemInfo) {
            this.$emit("groupListClick", itemInfo);
        },
        querySearch(queryString, cb) {
            let result = [];
            result = queryString ? this.groups.filter(this.createFilter(queryString)) : result;
            cb(result);
        },
        createFilter(queryString) {
            return group => {
                return (group.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
            }
        },
        ...mapActions(["getGroupList"])
    },
    created() {
        this.getGroupList();
    },
    computed: mapGetters({ groups: "groupList" })
    // beforeMount() {
    //     // console.log("get data");
    //     fetchClass({}).then(res => {
    //         console.log(res);
    //         this.groups = [];
    //         let classInfos = res.classInfos;
    //         if (classInfos.length <= 0)
    //             return;
    //         let total = 0;
    //         classInfos.forEach(info => {
    //             let count = info.student.length
    //             total += count;
    //             this.groups.push({ id: info._id, name: info.name, count: count });
    //         });

    //         this.groups.unshift({ id: "{}", name: "ALL", count: total });
    //     });
    // }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
