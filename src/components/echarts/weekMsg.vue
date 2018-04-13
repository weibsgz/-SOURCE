<template>
    <div class="chart-wrapper" ref="chart" style="height:100%;width:100%">

    </div>
</template>

<script>
 
  export default {
  name: 'streetInfo-line',
  props: {
     data: {
        type: Object,
        default: () => {}
     },
  },
  data() {
    return {}
  },
  watch: {
      data: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
  },
  mounted() {
    this.$nextTick(()=>{
      this.myChart = this.$echarts.init(this.$refs.chart);
      this.initChart()
    })
  },
  methods: {
   initChart() {
		let option = option = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:this.data.legendData,            
      	x: 'center',
        top	:55,
      
    },
       grid: { 
			      
	        left: '3%',
	        right:'3%',
	        bottom:'4%',
	        top:'23%',
	        containLabel: true
		},
 	 title:{
	    	 x:'center',
	    	text:this.data.title,
	    	top:'18',
	    	textStyle:{
	    		align:'center',
	    		color:'#666666',
	    		fontSize:'18',
	    		 
	    	}
	    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        data:this.data.xData,
        axisTick: {
	            show: false
	        },
	         axisLine: {
	            show: true,
	            lineStyle:{
	                color:'#4cd3ff',
	                width:2
	            }
	        },  
         axisLabel:{
         	color:'666',
            interval: 0,//标签设置为全部显示
            formatter:function(params){
                var tempStr = params.substring(0,2) + "\n" + params.substring(2,8);
			    //将最终的字符串返回
			    return tempStr
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLine: {
	            show: true,
	            lineStyle:{
	                color:'#dcdcdc'
	            }
	        },
	        axisTick: {
	            show: true,
	            inside:true,
	            length:'8',
	            lineStyle:{
	                color:'#dcdcdc',
	               
	            }
	        },
	        axisLabel: {
	        	color: '#666'	            
	        },
    },
    color:this.data.colors,
    series: this.data.sData
}
       
  /*    this.myChart.on('click',(params) =>{
          this.$emit('handleCharts',params.name)
      })*/
      this.myChart.setOption(option,true);

    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
