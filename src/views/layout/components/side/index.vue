<template>
	<scroll-bar>
		<!-- menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder<br/>menu:placeholder -->
		<h5>菜单</h5>
		<el-menu default-active="$route.path" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
			<!-- <el-submenu index="1">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>导航一</span>
				</template>
				<el-menu-item-group>
					<template slot="title">分组一</template>
					<el-menu-item index="1-1">选项1</el-menu-item>
					<el-menu-item index="1-2">选项2</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="分组2">
					<el-menu-item index="1-3">选项3</el-menu-item>
				</el-menu-item-group>
				<el-submenu index="1-4">
					<template slot="title">选项4</template>
					<el-menu-item index="1-4-1">选项1</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-menu-item index="2">
				<i class="el-icon-menu"></i>
				<span slot="title">导航二</span>
			</el-menu-item>
			<el-menu-item index="3">
				<i class="el-icon-setting"></i>
				<span slot="title">导航三</span>
			</el-menu-item> -->
			<side-bar-item :routers="this.$store.getters.permission_routers"></side-bar-item>
		</el-menu>
	</scroll-bar>
</template>

<script>
import { mapGetters } from "vuex";
import ScrollBar from "@/components/ScrollBar";
import SideBarItem from "./SideBarItem";
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
		console.log(this.$store.getters.permission_routers);

	}
};
</script>

<style>

</style>
