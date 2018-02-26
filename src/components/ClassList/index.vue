<template>
    <div>
        <el-autocomplete :placeholder="$t('student.inputGroupName')"
            :trigger-on-focus="false"
            @select="selectHandler"
            class="inline-input"></el-autocomplete>
        <span>{{$t('student.inputTips')}}</span>
        <GeminiScrollbar class="my-scroll-bar">
            <ul>
                <li v-for="group in groups"
                    style="margin-top:10px;">{{group.name}} ({{group.student.length}})</li>
            </ul>
        </GeminiScrollbar>
    </div>
</template>

<script>
import Vue from "vue";
import GeminiScrollbar from "vue-gemini-scrollbar";
import { mapGetters, mapActions } from "vuex";
Vue.use(GeminiScrollbar);
export default {
    name: 'classList',
    data() {
        return {
            items: [{ id: "all", name: "ALL" },
            { id: "哈哈哈", name: "SAT0900-FFW-R3-MIRANDA" },
            { id: "咪咪咪", name: "SAT1620-FFW-LT-SELINA" },
            { id: "哈哈哈", name: "WED1800-RA-E1-" },
            { id: "哈哈哈", name: "SAT1620-FFW-R1-KRISTING" },
            { id: "哈哈哈", name: "SAT0900-FFW-R3-MIRANDA" }]
        }
    },
    methods: {
        selectHandler(item) {
            console.log(item);
        },
        ...mapActions(["getGroupList"])
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
.my-scroll-bar {
  height: 100vh;
  width: 350px;
  top: 0;
  bottom: 0;
  left: 0;
}
</style>
