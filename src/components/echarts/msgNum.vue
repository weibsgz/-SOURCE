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
		let 

option = {
    backgroundColor:'#fff',
       tooltip : {
        show: true,
        formatter:function(params){
            var html='';
            return html += '<p style="font-size:30px;font-weight:bold;margin-bottom:10px;text-align:center;width:65px;color:'+
            params.color+
            ';">'+
            parseInt(params.percent)+
            '<span style="font-size: 14px;color: #bbbbbb;">（%）</span></p><p style="font-size:12px;text-align:center;color:#575757;">'+
            '<span style="color:#898989;font-size:14px;display:inline-block;text-align:center;">'+
            params.name+
            '</span>'+
            '</p>'
       },       
		position:['44%','44%'],
        backgroundColor:'none',
        textStyle:{
             fontSize:15,
             color:'#666'
         }
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
    legend: {
        x: 'center',
        bottom:15,
        data:this.data.legendData
    },
  
	color:this.data.colors,
    series: [
        	{
            z: 0,
            name: '',
            type: 'pie',
             center: ['50%', '50%'],
            radius: [74, 75],
            hoverAnimation:false,
        	label:{
    		    normal:{
    		        position:'center',
    		        show: false
    		    }
    		},
            labelLine: {
                normal: {
                    show: false
    
                }
            },
            data: [{
                value: 0,
                itemStyle: {
                    normal: {
                        color: '#dbdbdc' 
                    }
                },
                tooltip:{show:false}
            }]
        },
        {
            name:'',
            type:'pie',
            radius: ['90', '120'],
			center: ['50%', '50%'],
            data:this.data.data,
             itemStyle: {
                  normal: {
                    borderColor: '#fff',
                    borderWidth: 2
                },
				emphasis: {
					/*shadowBlur: 20,
					shadowOffsetX: 0,*/
				}
			},
            label: {
				normal: {
					position: 'outside',
					show: false,
					formatter: "{b}",
					textStyle: {
						fontSize: 16
					}
				}
			},
            labelLine: {
				normal: {
				   length:20,
				   length2:6,
				}
			}
        }
    ]
};
 
       
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
