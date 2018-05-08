<template>
    <div>
        <div>
            <span class='desc'>{{$t("reading.desc2")}}</span>
        </div>
        <div class='tool-box'>
            <div class='btn-group btn-box'>
                <el-button type="primary"  @click="start">{{$t('reading.readtome')}}</el-button>
                <el-button type="warning" @click="pause">{{$t('reading.pause')}}</el-button>
                <!-- <span class='switch'>
                    <el-switch v-model="switchVal"></el-switch> {{$t('reading.glossary')}}
                </span> -->
            </div>
            <edu-progress :totalCount="tais.length" :taiprogress='taiprogress'>progressbar</edu-progress>
        </div>
    </div>
</template>

<script>
// import eduProgress from "../dialog/progress";
import eduProgress from "@/components/progress";  
import { mapActions, mapGetters } from 'vuex';
import EventBus from "@/utils/eventBus";
export default {
    components: {
        eduProgress
    },
    data(){
        return {
            switchVal:false,
            taiprogress:0
        }
    },
    props:{
        
    },
    mounted(){
        EventBus.$on("taiprogress",idx=>{
            this.taiprogress = idx;
        })
    },
    methods: {
        start() {
            this.$emit("startReading");
        },
        pause() {
            this.$emit("stopReading");
        }
    },
    computed: {
        ...mapGetters({
            tais: "tais"
            // taiprogress: "taiprogress"

        })
    }
}
</script>

<style lang="scss">
@import "./step.scss";
</style>
