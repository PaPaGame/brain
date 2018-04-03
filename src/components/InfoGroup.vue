<template>
    <el-row class="info-group" :gutter="40">
        <template v-for="(value, index) in infoColumns">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="info-container">
                    <div class="icon-wrapper" :class="'icon-'+index">

                        <svg-icon :icon-class="value.icon" class-name="info-icon" />
                    </div>
                    <div class="info-desc">
                        <div class="info-title">{{value.title}}</div>
                        <div class="info-value">{{value.count}}</div>
                    </div>
                </div>
            </el-col>
        </template>
    </el-row>
</template>

<script>
export default {
    name: "InfoGroup",
    props: {
        infoColumns: Array
    }
}
</script>

<style lang="scss" scoped>
.info-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .info-container {
    height: 108px;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    &:hover {
      .icon-wrapper {
        color: #fff;
      }
      .icon-0 {
        background: #40c9c6;
      }

      .icon-1 {
        background: #36a3f7;
      }

      .icon-2 {
        background: #f4516c;
      }

      .icon-3 {
        background: #34bfa3;
      }
    }
    .icon-0 {
      color: #40c9c6;
    }

    .icon-1 {
      color: #36a3f7;
    }

    .icon-2 {
      color: #f4516c;
    }

    .icon-3 {
      color: #34bfa3;
    }
  }
  .icon-wrapper {
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }
  .info-icon {
    float: left;
    font-size: 48px;
  }
  .info-desc {
    float: right;
    font-weight: bold;
    margin: 26px;
    margin-left: 0px;
    .info-title {
      font-size: 16px;
      margin-bottom: 16px;
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
    }
    .info-value {
      font-size: 20px;
    }
  }
}
</style>
