<template>
    <div class='progress-box'>
    	<div class='progress-scale'>
    		
    	</div>
        <div class='progress-track' ></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	data() {
		return {
			// taiprogress:0
		}
	},
	props:{
		totalCount:{ type: Number, default: 0 }
	},
	watch:{
		totalCount() {
			console.log(this.totalCount +'总题目数');
			console.log(this.taiprogress);
			debugger;
			for(let i =0 ; i < this.totalCount; i++) {
				let dom = document.createElement('span');
				document.getElementsByClassName('progress-scale')[0].appendChild(dom);

			}
		},
		taiprogress() {
			debugger;
			// console.log(this.taiprogress +'当前已答对题目数');
		}
	},
	methods: {
		// taiprogress() {
		// 	debugger;
		// 	console.log(this.taiprogress +'当前已答对题目数');
		// 	// document.getElementsByClassName('progress-track')[0].style.width = this.currentpage*10 +'%'

		// }
	},
    computed: {
        ...mapGetters({
            taiprogress: "taiprogress"
        })
    }
}
</script>

<style lang="scss">
	.progress-box {
		width: 100%;
		height: 30px;
		position: relative;
		border-radius: 30px;
		overflow: hidden;
		background: #fff;
		.progress-track {
			background: -webkit-gradient(linear, right 0, 0 0, from(#409eff), to(rgba(64,158,255,0.5)));
			position: absolute;
			top:0;
			left: 0;
			height: 100%;
			width: 80%;
			-webkit-transition:all .3s ease-in-out;
			-o-transition:all .3s ease-in-out;
			transition:all .3s ease-in-out;
		}
		.progress-scale {
			display: -webkit-flex;
			display: -moz-flex;
			display: flex;
			height: 100%;
			width: 100%;
			span {
				height: 100%;
				display: inline-block;
				-webkit-flex:1;
				-moz-flex:1;
				flex:1;
				border-right: 1px solid black;
			}
		}
	}
</style>