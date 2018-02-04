<template>
    <div class="dashboard-editor-container">
        <div class="clearfix">
            <span class="display_name">{{name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "editor"
        }
    }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 100px 60px 0px;
}
</style>

