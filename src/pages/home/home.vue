<template>
  <div class="home-wrap">
<!--  	<button @click="change">点击</button>
  	<Div class="draw-box">
  			<div style="width: 500px; height: 400px; text-align: center;">
  				<h1>辖区各街道相关信息条数</h1>
 					<streetInfo :data='streetData'></streetInfo>
	 			</div>
	      <div style="width: 500px; height: 500px;text-align: center;">
	      				<h1>各类信息条数所占比例</h1>
	 					<msgNum :data='msgData'></msgNum>
	 			</div>
  	</Div>
  	<div style="width: 1000px; height: 400px; margin: 0px auto;text-align: center;"">
  		<h1>近一周各类信息推送数量变化图</h1>
  		<weekMsg :data='weekData'></weekMsg>
  	</div>-->
    <div class="div_bar">
      <div class="bar_title bar_title_current">首页</div>
    </div>

 		<div class="streetInfo">
 				<streetInfo :data='streetData'></streetInfo>
 		</div>
 		<div class="bottom-box">
 			    <div class='msgNumBox'>
 			    	<msgNum :data='msgData'></msgNum>
 			    </div>
 			    <div class='weekBox'>
 			    	<weekMsg :data='weekData'></weekMsg>
 			    </div>
 		</div>

  </div>


</template>

<script type="text/javascript">
  import streetInfo from 'components/echarts/streetInfo.vue'
  import msgNum from 'components/echarts/msgNum.vue'
  import weekMsg from 'components/echarts/weekMsg.vue'
  export default {
    name: 'home',
    data(){
      return {
			streetData: {
         dataAxis:['成都北路','大田路','石门二路','泰兴路','昌化路','江宁路','南京西路','凤阳路','奉贤路','北京西路','山海关路','新闸路','武定路','顺德路','康定东路','南苏州路'],
         ydata:[220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334],
         yMax:500
        },
        msgData: {
        	title:'各类信息条数所占比例',
        	legendData:['房屋租赁','餐饮店铺','企业公司','大型活动'],
          data: [{value:335, name:'房屋租赁'},
		            {value:679, name:'餐饮店铺'},
		            {value:1548, name:'企业公司'},
		            {value:50, name:'大型活动'}
		        ],
        	colors:['#2ea9ff','#5ad2ff','#ffbe41','#ff762c']
        },

        weekData: {
        	title:'近一周各类信息推送数量变化图',
          sData: [
				        {
				            name:'大型活动',
				            type:'line',
				 					  symbolSize: 8,
				            data:[120, 132, 101, 134, 90, 230, 210]
				        },
				        {
				            name:'企业公司',
				            type:'line',
				    			  symbolSize: 8,
				            data:[220, 182, 191, 234, 290, 330, 310]
				        },
				        {
				            name:'餐饮店铺',
				            type:'line',
				        		symbolSize: 8,
				            data:[150, 232, 201, 154, 190, 330, 410]
				        },
				        {
				            name:'房屋租赁',
				            type:'line',
				    				symbolSize: 8,
				            data:[320, 332, 301, 334, 390, 330, 320]
				        },
				        {
				            name:'其他数据',
				            type:'line',
				    				symbolSize: 8,
				            data:[820, 932, 901, 934, 1290, 1330, 1320]
				        }
				    ],
				  	legendData:['房屋租赁','餐饮店铺','企业公司','大型活动'],
				  	colors:['#2ea9ff','#5ad2ff','#ffbe41','#ff762c'],
        		xData:['周一（1.18）','周二（1.19）','周三（1.20）','周四（1.21）','周五（1.22）','周六（1.23）','周日（1.24）']
        },

      }
    },
    methods:{
    	change(){
    		this.streetData= {
          xdata: ['成都北路1','大田路1','石门二路1','泰兴路1','昌化路1','江宁路1'],
        	ydata:[800, 2200, 1300, 1200, 1900, 502]
        }
    	}
    },
    components:{
			streetInfo,
			msgNum,
			weekMsg
    }
   }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";
  body{
  	overflow:visible !important
  }
	.home-wrap{
		width: 1200px;

		margin: 0 auto;
		padding-bottom: 20px;

    .div_bar
    {
      padding-left: 10px;
      padding-top: 20px;
      padding-bottom: 20px;
    }
    .bar_title
    {
      font-size: 12px;
      color: #666666;
      display: inline-block;
    }
    .bar_title_current
    {
      color: #009aff;
    }
		h1{
			font-size: 20px;
		}
		.draw-box{
			display: flex;
		justify-content: space-around;
		}

		.streetInfo{
			width: 1200px;
			height: 410px;
			background-color: #ffffff;
			box-shadow: 0px 0px 9px 1px
				rgba(8, 147, 253, 0.1);
			border-radius: 5px;
		}
		.bottom-box{
			margin-top:20px;
			display: flex;
			justify-content: space-between;
			div{
				width: 590px;
				height: 410px;
				background-color: #ffffff;
				box-shadow: 0px 0px 9px 1px
					rgba(8, 147, 253, 0.1);
				border-radius: 5px;
			}
		}
	}


</style>



