<template>
    <div class="dashboard-admin-container">
        <div class="clearfix">
            <span class="display_name">{{name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "admin"
        }
    }
}
</script>

<style lang="scss" scoped>
.dashboard-admin-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 100px 60px 0px;
}
</style>

