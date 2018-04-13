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
	let dataShadow = [];
	for (let i = 0; i < this.data.ydata.length; i++) {
	    dataShadow.push(this.data.yMax);
	}
	let option = {
	    backgroundColor:'#fff',
	    title:{
	    	 x:'center',
	    	text:'辖区各街道相关信息条数',
	    	top:'18',
	    	textStyle:{
	    		align:'center',
	    		color:'#666666',
	    		fontSize:'18',
	    		 
	    	}
	    },
	    tooltip : {
	         trigger: 'axis',
	       	 axisPointer : {            
	            type : 'shadow'  
	        },
	        
	        formatter :function(params){
	        	console.log(params)
	        	let html='';
	        	html+='<div style="">'
	        	+params[1].name+'<br>'+
	        	params[1].data
	        	+'条</div>'
 	        	return html
	        }
	    },
	     grid: { 
			      
	        left: '3%',
	        right:'3%',
	        bottom:'4%',
	        containLabel: true
		},
	    xAxis: {
	        data: this.data.dataAxis,
	         name:'',
	        nameTextStyle:{
	            color:'#666666'
	        },
	      
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
	        axisLabel: {
	                color: '#666'
	        },
	    },
	    yAxis: {
	        name:'(条)',
	         nameTextStyle:{
            color:'#666666',
            padding: [0,0, 0, -36]
	        },
	        offset:1,
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
	          splitLine: {
	                    lineStyle: {
	                        color: '#f6f6f6',
	                        type: "solid",
	                        
                    }
                }
	    },
	 
	    series: [
	        { // For shadow
	            type: 'bar',
	            barWidth:'20',
	            itemStyle: {
	                normal: {color: 'rgba(0,0,0,0.05)'}
	            },
	            barGap:'-100%',
	            barCategoryGap:'40%',
	            data: dataShadow,
	            animation: false
	        },
	        {
	            type: 'bar',
	            barWidth:'20',
	            itemStyle: {
	                normal: {
	                    color:(params)=>{
	                    var color;
	                     switch(params.dataIndex)
	                    {
	                    case 0:
	                      color = ['#ff7e00','#ff680b','#ff5216'];
	                      break;
	                    case 1:
	                      color = ['#ff7e00','#ff9600','#ffae00'];
	                      break;
	                    case 2:
	                      color = ['#ffa200','#ffbd00','#ffd800'];
	                      break;
	                    default:
	                      color = ['#009cff','#00c3ff','#00eaff'];
	                    }
	          
	                return new this.$echarts.graphic.LinearGradient(
	                    0, 0, 0, 1,
	                    [
	                        {offset: 0, color: color[0]},
	                        {offset: 0.5, color: color[1]},
	                        {offset: 1, color: color[2]}
	                    ]);
	                   },
	                },
	              
	            },
	            data: this.data.ydata
	        }
	    ]
};
 
 
       
  /*    this.myChart.on('click',(params) =>{
          this.$emit('handleCharts',params.name)
      })*/
      this.myChart.setOption(option);

    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
