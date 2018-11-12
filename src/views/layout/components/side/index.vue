<template>
	<scroll-bar>
		<el-menu default-active="$route.path" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
			<side-bar-item :routes="permission_routers"></side-bar-item>
		</el-menu>
	</scroll-bar>
</template>

<script>
import {mapGetters} from 'vuex';
import ScrollBar from '@/components/ScrollBar';
import SideBarItem from './SideBarItem';
export default {
  components: {
    ScrollBar,
    SideBarItem
  },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  },
  mounted() {
  }
};
</script>