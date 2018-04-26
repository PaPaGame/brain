<template>
    <edu-dialog :isShow="dialogVisible" @close="close" :title="wordSpell" class='dialog-panel dialog-panel-explain'>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane :label="$t('reading.eglossary')" name="first" class='tabs'>
                <div class='def'>
                    <i class="iconfont icon-laba"></i>{{word.definition}}
                </div>
                <div v-if="word.image">
                    <img :src="imageUrl" />
                </div>
                <div>
                    {{word.context}}
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('reading.ediduknow')" name="second" v-if="word.fact" class='tabs'>
                <div>
                    {{word.fact}}
                </div>
            </el-tab-pane>
        </el-tabs>
        <audio ref="glossaryAudio" autoplay @ended="playend"></audio>
    </edu-dialog>
</template>

<script>
import eduDialog from "@/components/Dialog/dialog";
import { mapGetters } from 'vuex';
export default {
    components: {
        eduDialog
    },
    data() {
        return {
            activeName2: 'first',
            dialogVisible: false
        };
    },
    props: {
        isShow: { type: Boolean, default: false },
        word: { type: Object, default: {} }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        playend() {
        },
        close() {
            // this.word = {};
            this.activeName2 = "first";
            this.dialogVisible = false;
            this.$emit("close");
        }
    },
    watch: {
        isShow() {
            this.dialogVisible = this.isShow;
        }
    },
    computed: {
        wordSpell() {
            console.log(this.word);
            if (this.word["syllables"]) {
                return this.word.syllables.replace(".", "-").replace("^", "");
            }

            return "";
        },
        imageUrl() {
            return `${process.env.PUBLIC_PATH}/${this.dirName}/images/${this.word.image}`;
        },
        ...mapGetters({
            dirName: "dirName"
        })
    }
}
</script>

<style>
@import "./dialog.scss";
</style>
