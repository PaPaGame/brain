<template>
  <div class="classList">
    <el-autocomplete popper-class="my-autocomplete" v-model="state3" :fetch-suggestions="querySearch" :placeholder="$t('student.inputGroupName')" :trigger-on-focus="false" @select="handleSelect">
      <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick">
      </i>
      <template slot-scope="props">
        <div class="name">{{ props.item.name }}({{props.item.student.length}})</div>
      </template>
    </el-autocomplete>
    <span>{{$t('student.inputTips')}}</span>
    <ul class="classBox">
      <template v-for="group in groups">
        <li class="group" :key="group.name">
          <label class="groupName" v-text="group.name" @click="groupItemClickHandler(group)"></label>
          <label v-text="(group.student.length)"></label>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'classList',
  data() {
    return {
      state3: '',
      state2: ''
    };
  },
  methods: {
    groupItemClickHandler(itemInfo) {
      this.$emit('classSelected', itemInfo._id);
    },
    querySearch(queryString, cb) {
      var groups = this.groups;
      var result = queryString ? groups.filter(this.createFilter(queryString)) : groups;

      cb(result);

      // var groups = this.groups;
      // var results = queryString ? groups.filter(this.createFilter(queryString)) : groups;
      // cb(results);
    },
    createFilter(queryString) {
      return group => {
        let result = group.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
        // console.log(result);
        return result;
      };
    },
    handleSelect(item) {
      console.log(item);
      this.$emit('classSelected', item._id);
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    ...mapActions(['getGroupList'])
  },
  created() {
  },
  computed: {
    ...mapGetters({groups: 'groupList'})
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}

.group {
  label {
    font-size: 14px;
  }
}
</style>
