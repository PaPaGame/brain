export default {
  name: 'eduDialog',
  props: {
    title: String,
    isShow: Boolean
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  watch: {
    isShow() {
      this.dialogVisible = this.isShow;
    }
  },
  methods: {
    onClose() {
      this.dialogVisible = false;
      this.$emit('close');
    }
  }
};