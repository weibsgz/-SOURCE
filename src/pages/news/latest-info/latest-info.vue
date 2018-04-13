<template>
    <div class="latest-info-wrap">

      <div class="div_bar">
        <div class="bar_title">首页</div>
      <div class="bar_title">></div>
      <div class="bar_title">最新信息</div>
      <div class="bar_title">></div>
      <div class="bar_title bar_title_current">最新信息统计</div>
      </div>

      <div class="li-top clearfix">
        <div class="li-top-l">
          统计维度
          <el-select v-model="seljdmc" placeholder="请选择" class="ml5">
            <el-option
              v-for="item in optjdmc"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="li-top-r">
          开始日期
          <el-date-picker class="p_date ml5 mr15" size="mini" v-model="value1" type="date" placeholder="选择日期" ></el-date-picker>
          结束日期
          <el-date-picker class="p_date ml5" size="mini" v-model="value2" type="date" placeholder="选择日期" ></el-date-picker>
          <div class="btn_op btn_export" @click="search">查询</div>
        </div>
      </div>

      <div class="li-cont0" v-if="chartChange == 1">
        <div class="li-cont0-t">
          <div class="mftable">
            <ul class="tbtitle">
              <li>
                <span class="tbtitle1">序号</span>
                <span class="tbtitle2">{{dataList1.title}}</span>
                <span class="tbtitle3">新信息条数</span>
              </li>
              <li>
                <span class="tbtitle1">序号</span>
                <span class="tbtitle2">{{dataList1.title}}</span>
                <span class="tbtitle3">新信息条数</span>
              </li>
              <li>
                <span class="tbtitle1">序号</span>
                <span class="tbtitle2">{{dataList1.title}}</span>
                <span class="tbtitle3">新信息条数</span>
              </li>
              <li>
                <span class="tbtitle1">序号</span>
                <span class="tbtitle2">{{dataList1.title}}</span>
                <span class="tbtitle3">新信息条数</span>
              </li>
            </ul>
            <div class="tbcoont">
              <dl v-for="(item,index) in dataList1.list">
                <dt>{{index + 1}}</dt>
                <dd>{{item.name}}</dd>
                <dd>{{item.num}}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="li-cont0-b">
          <streetInfo :data='streetData'></streetInfo>
        </div>
      </div>

      <div class="li-cont" v-if="chartChange == 2">
        <div class="li-cont-l">
          <table>
            <tr>
              <th>序号</th>
              <th>{{dataList2.title}}</th>
              <th>新信息条数</th>
            </tr>
            <tr v-for="(item,index) in dataList2.list">
              <td class="linum">{{index + 1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.num}}</td>
            </tr>
            <tr>
              <td class="linum">总数</td>
              <td></td>
              <td>{{dataList2.allNum}}</td>
            </tr>
          </table>
        </div>

        <div class="li-cont-r">
          <msgNum :data='msgData'></msgNum>
        </div>
      </div>

    </div>

</template>

<script type="text/javascript">
  import streetInfo from 'components/echarts/streetInfo.vue'
  import msgNum from 'components/echarts/msgNum.vue'
  export default {
     name: 'latest-info',
    data() {
      return {
        chartChange:1,
        dataList:{},
        dataList1:{
          title:'按街道统计',
          list:[
            {name:'南苏州路',num:'6'},{name:'康定东路',num:'3'},{name:'顺德路',num:'4'},{name:'武定路',num:'6'},{name:'新闸路',num:'8'},{name:'山海关路',num:'1'},{name:'北京西路',num:'8'},{name:'奉贤路',num:'0'},{name:'凤阳路',num:'10'},{name:'南京西路',num:'9'},{name:'江宁路',num:'5'},{name:'昌化路',num:'3'},{name:'泰兴路',num:'2'},{name:'石门二路',num:'9'},{name:'大田路',num:'1'},{name:'成都北路',num:'1'}
          ]
        },
        dataList2:{
          title:'信息类别',
          allNum:'110',
          list:[
            {
              name:'房屋租赁',
              num:'50'
            },
            {
              name:'企业公司',
              num:'30'
            },
            {
              name:'餐饮店铺',
              num:'20'
            },
            {
              name:'大型活动',
              num:'10'
            }
          ]
        },
        optjdmc: [{
          value: '按街道统计',
          label: '按街道统计'
        }, {
          value: '按信息类别统计',
          label: '按信息类别统计'
        }],
        seljdmc:'按街道统计',
        value1:'',
        value2:'',
        streetData: {
          dataAxis:['南苏州路','康定东路','顺德路','武定路','新闸路','山海关路','北京西路','奉贤路','凤阳路','南京西路','江宁路','昌化路','泰兴路','石门二路','大田路','成都北路'],
          ydata:[6, 3, 4, 6, 8, 1, 8, 0, 10, 9, 5, 3, 2, 9, 1, 1],
          yMax:10
        },
        msgData: {
          title:'各类信息条数所占比例',
          legendData:['房屋租赁','餐饮店铺','企业公司','大型活动'],
          data: [{value:50, name:'房屋租赁'},
            {value:30, name:'企业公司'},
            {value:20, name:'餐饮店铺'},
            {value:10, name:'大型活动'}
          ],
          colors:['#2ea9ff','#5ad2ff','#ffbe41','#ff762c']
        }
      }
    },
    created:function(){
      //this.dataList = this.dataList1;
    },
    methods: {
      search() {
        if(this.seljdmc == '按街道统计'){
          this.chartChange = 1;
          //this.dataList = this.dataList1;
        }else if(this.seljdmc == '按信息类别统计'){
          this.chartChange = 2;
          //this.dataList = this.dataList2;
        }
        console.log(this.chartChange)
      }
    },
    components:{
      streetInfo,
      msgNum
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";
  /*SASS的常用变量 宏 已定义在assets/css/variable  mixin里*/
  .ml5{margin-left:5px;}
  .mr15{margin-right:15px;}
  .latest-info-wrap{
    width: 1200px;
    margin: 0 auto;
    min-height:calc(100vh - 160px);
    .div_bar{
      padding-left: 10px;
      padding-top: 20px;
      padding-bottom: 20px;
    }
    .bar_title{
      font-size: 12px;
      color: #666666;
      display: inline-block;
    }
    .bar_title_current{
      color: #009aff;
    }
    .li-top{
      background:#fff;padding:20px;border-radius:4px;box-shadow:0 0 10px rgba(8,147,253,.1);
      .li-top-l{float:left;}
      .li-top-r{
        float:right;
      }
    }
    .li-cont{
      margin-top:20px;background:#fff;padding:30px;border-radius:4px;box-shadow:0 0 10px rgba(8,147,253,.1);overflow:hidden;
      .li-cont-l{
        float:left;padding-left:65px;
        table{
          width:290px;border-radius:6px;overflow:hidden;border:1px solid #ebebeb;background:#ebebeb;
          th{padding:0 5px;}
          td{
            padding:0 5px;
            &.linum{
               background:#f5f5f5;
               border-right:1px solid #ebebeb !important;
             }
          }
        }
      }
      .li-cont-r{
        float:right;width:560px;height:350px;background:#ccc;margin-right:130px;
      }
    }
    .li-cont0{
      .li-cont0-t{
        margin-top:20px;background:#fff;padding:20px;border-radius:4px;box-shadow:0 0 10px rgba(8,147,253,.1);overflow:hidden;
        .mftable{
          border:1px solid #ebebeb;border-radius:6px;overflow:hidden;line-height:36px;
          .tbtitle{
            overflow:hidden;
            li{
              background:#889eb9;color:#fff;font-size:14px;text-align:center;float:left;width:25%;height:36px;overflow:hidden;
              .tbtitle1{width:18%;float:left;}
              .tbtitle2{width:41%;float:left;}
              .tbtitle3{width:41%;float:left;}
            }
          }
        }
        .tbcoont{
          overflow:hidden;
          dl{
            float:left;width:25%;height:41px;line-height:40px;border-top:1px solid #ebebeb;border-right:1px solid #ebebeb;box-sizing:border-box;
            &:nth-child(4n){border-right:none;}
            dt{float:left;width:18%;text-align:center;background:#f5f5f5;border-right:1px solid #ebebeb;box-sizing:border-box;}
            dd{float:left;width:41%;text-align:center;}
            &:nth-child(n+5):nth-child(-n+8),&:nth-child(n+13):nth-child(-n+16),&:nth-child(n+21):nth-child(-n+24),&:nth-child(n+29):nth-child(-n+32){background:#fafafa;}
            &:nth-child(n+5):nth-child(-n+8):hover,&:nth-child(n+13):nth-child(-n+16):hover,&:nth-child(n+21):nth-child(-n+24):hover,&:nth-child(n+29):nth-child(-n+32):hover,&:hover{background:#ebebeb;}
          }
        }
      }
      .li-cont0-b{
        margin-top:20px;background:#fff;padding:20px;border-radius:4px;box-shadow:0 0 10px rgba(8,147,253,.1);overflow:hidden;height:360px;
      }
    }
  }
  .btn_op {
    width: 80px;
    height: 26px;
    border-radius: 4px;
    text-align: center;
    line-height: 26px;
    font-size: 14px;
    cursor: pointer;
    display: inline-block;
  }
  .btn_export
  {
    border: solid 1px #ffa826;
    color: #ffa826;
    box-shadow: 0px 0px 2px #ffa826;
    margin-left:20px;
  }
  .btn_export:hover {
    background-color: #ffa826;
    color: #ffffff;
  }



</style>

