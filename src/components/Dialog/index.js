export default {
    name: 'PgDialog',
    props: {
        title: String,
        isShow: Boolean,
        size: {
            type: String,
            default: 'large'
        }
    },
    data() {
        return {
            dialogVisible: false
        }
    },
    watch: {
        isShow() {
            this.dialogVisible = this.isShow;
            console.log("this.dialogVisible", this.dialogVisible);
        }
    },
    methods: {
        onClose() {
            this.dialogVisible = false;
            this.$emit('close')
            console.log("ccccccccccccccccclose");
        }
    }
}