<template>
    <div class='progress-box'>
    	<div class='progress-scale'>
    		
    	</div>
        <div class='progress-track ' :class="{'el-icon-star-on':star}"></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	data() {
		return {
			progress:0,
			star:true
		}
	},
	props:{
		totalCount:{ type: Number, default: 0 },
		taiprogress:{ type: Number, default: 0 },
		quizCount:{ type: Number, default: 0 },
		quizprogress:{ type: Number, default: 0 }
	},
	watch:{
		totalCount() {
			console.log(this.totalCount +'总灯泡数');
			// console.log(this.taiprogress);
			// console.log(this.progress)
			for(let i =0 ; i < this.totalCount; i++) {
				let dom = document.createElement('span');
				document.getElementsByClassName('progress-scale')[0].appendChild(dom);

			}
		},
		taiprogress(idx) {
			console.log(this.taiprogress + '当前点击灯泡数');
			document.getElementsByClassName('progress-track')[0].style.width = (this.taiprogress/this.totalCount)*100 +'%';
			// console.log(this.taiprogress/this.totalCount);
			this.progress = this.taiprogress/this.totalCount;
			if(this.progress >= 1 ) {
				this.star = false;
			}
			// console.log(this.taiprogress +'当前已答对题目数');
		},
		quizCount() {
			console.log(this.quizCount +'总题目数');
			for(let i =0 ; i < this.quizCount; i++) {
				let dom = document.createElement('span');
				document.getElementsByClassName('progress-scale')[1].appendChild(dom);
			}
		},
		quizprogress() {
			console.log(this.quizprogress + '当前答题数目');
			document.getElementsByClassName('progress-track')[1].style.width = (this.quizprogress/this.quizCount)*100 +'%';
			// console.log(this.quizprogress/this.quizCount);
			this.progress = this.quizprogress/this.quizCount;
			if(this.progress >= 1) {
				this.star = false;
			}
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
        // ...mapGetters({
        //     taiprogress: "taiprogress",
        //     tais:'tais'
        // })
    }
}
</script>

<style lang="scss">
	.progress-box {
		width: 300px;
		height: 20px;
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
			width: 0%;
			-webkit-transition:all .3s ease-in-out;
			-o-transition:all .3s ease-in-out;
			transition:all .3s ease-in-out;
			text-align: right;
			&.el-icon-star-on:before {
				position: absolute;
				top: 0;
				right: -10px;
				font-size:20px;
				content: "\E637";
				color: #e6a23c;
			}
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
				position: relative;
				&:before {
					content:'';
					width: 20px;
					height: 20px;
					position: absolute;
					border:1px solid #3a8ee6;
					top:0;
					right: -20px;
					-webkit-transform:rotate(45deg);
					-o-transform:rotate(45deg);
					transform:rotate(45deg);
					border-left: none;
					border-bottom: none;
					border-radius: 5px;
				}
			}
		}
	}
</style>