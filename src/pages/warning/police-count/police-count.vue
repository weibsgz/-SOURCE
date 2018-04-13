<template>
    <div class="police-count-wrap">

      <div class="count_main">
         <!--导航栏-->
        <div class="div_bar">
          <div class="bar_title">首页</div>
          <div class="bar_title">></div>
          <div class="bar_title">警情备忘</div>
          <div class="bar_title">></div>
          <div class="bar_title bar_title_current">民警核查工作统计</div>
        </div>

        <!--搜索区域-->
        <div class="div_search">
            <div class="search_title">开始日期</div>
            <div style="display: inline-block;margin-right: 40px;">
              <el-date-picker class="p_date" size="mini" v-model="startDate" type="date" placeholder="选择日期" ></el-date-picker>
            </div>

            <div class="search_title">结束日期</div>
            <div style="display: inline-block;">
              <el-date-picker class="p_date" size="mini" v-model="endDate" type="date" placeholder="选择日期" ></el-date-picker>
            </div>

            <div class="btn_op btn_export" style="float: right;margin-right: 40px;" @click="search">统计</div>

        </div>

        <!--数据列表-->
        <div class="div_data">
          <div class="data_title">
                核查数量及核查结果统计
          </div>

          <div class="div_table">
            <table border="0" cellspacing="0" cellpadding="0" width="100%">
              <tr class="tr_th">
                <th class="th_order">序号</th>
                <th class="th_address">街道名称</th>
                <th class="th_planCount">计划核查数</th>
                <th class="th_realCount">实际核查数</th>
                <th class="th_seriousProblem">存在严重问题</th>
                <th class="th_generalProblem">一般问题</th>
                <th class="th_noProblem">没问题</th>
              </tr>
              <tbody class='tbody'>
              <tr v-show="dataList.length==0">
                <td colspan="10">没有找到相关的数据</td>
              </tr>
              <tr v-show="dataList.length>0" class="tr_data" v-for="(item,index) in dataList">
                <td>{{index+1}}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.planCount }}</td>
                <td>{{ item.realCount }}</td>
                <td>{{ item.seriousProblem }}</td>
                <td>{{ item.generalProblem }}</td>
                <td>{{ item.noProblem }}</td>
              </tr>
              <tr v-show="dataList.length!=0">
                <td>合计</td>
                <td></td>
                <td class="td_count">{{planCount}}</td>
                <td class="td_count">{{realCount}}</td>
                <td class="td_count">{{seriousProblem}}</td>
                <td class="td_count">{{generalProblem}}</td>
                <td class="td_count">{{noProblem}}</td>
              </tr>
              </tbody>

            </table>

          </div>

          <div class="div_pager"></div>
        </div>


      </div>

    </div>

</template>

<script type="text/javascript">

  export default {
    name: 'police-count',
    data() {
      return {
        startDate: '',
        endDate: '',
        planCount: 0,
        realCount: 0,
        seriousProblem: 0,
        generalProblem: 0,
        noProblem: 0,
        dataList: [
          {
            id: 1,
            address: '南苏州路',
            planCount: 6,
            realCount: 6,
            seriousProblem: 1,
            generalProblem: 4,
            noProblem: 1
          },
          {
            id: 2,
            address: '康定东路',
            planCount: 3,
            realCount: 3,
            seriousProblem: 0,
            generalProblem: 3,
            noProblem: 2
          },
          {
            id: 4,
            address: '顺德路',
            planCount: 4,
            realCount: 4,
            seriousProblem: 1,
            generalProblem: 5,
            noProblem: 0
          },
          {
            id: 5,
            address: '武定路',
            planCount: 6,
            realCount: 6,
            seriousProblem: 1,
            generalProblem: 5,
            noProblem: 0
          },
          {
            id: 6,
            address: '新闸路',
            planCount: 8,
            realCount: 8,
            seriousProblem: 2,
            generalProblem: 0,
            noProblem: 1
          },
          {
            id: 7,
            address: '山海关路',
            planCount: 1,
            realCount: 1,
            seriousProblem: 0,
            generalProblem: 1,
            noProblem: 1
          },
          {
            id: 8,
            address: '北京西路',
            planCount: 8,
            realCount: 8,
            seriousProblem: 2,
            generalProblem: 0,
            noProblem: 5
          },
          {
            id: 9,
            address: '奉贤路',
            planCount: 0,
            realCount: 0,
            seriousProblem: 0,
            generalProblem: 2,
            noProblem: 0
          },
          {
            id: 10,
            address: '凤阳路',
            planCount: 10,
            realCount: 10,
            seriousProblem: 2,
            generalProblem: 3,
            noProblem: 1
          },
          {
            id: 11,
            address: '南京西路',
            planCount: 9,
            realCount: 9,
            seriousProblem: 2,
            generalProblem: 2,
            noProblem: 6
          },
          {
            id: 12,
            address: '江宁路',
            planCount: 5,
            realCount: 5,
            seriousProblem: 2,
            generalProblem: 1,
            noProblem: 1
          },
          {
            id: 13,
            address: '昌化路',
            planCount: 3,
            realCount: 3,
            seriousProblem: 1,
            generalProblem: 1,
            noProblem: 4
          },
          {
            id: 14,
            address: '泰兴路',
            planCount: 2,
            realCount: 2,
            seriousProblem: 1,
            generalProblem: 1,
            noProblem: 1
          },
          {
            id: 15,
            address: '石门二路',
            planCount: 9,
            realCount: 9,
            seriousProblem: 4,
            generalProblem: 1,
            noProblem: 1
          },
          {
            id: 16,
            address: '大田路',
            planCount: 1,
            realCount: 1,
            seriousProblem: 0,
            generalProblem: 1,
            noProblem: 1
          },
          {
            id: 17,
            address: '成都北路',
            planCount: 6,
            realCount: 6,
            seriousProblem: 0,
            generalProblem: 1,
            noProblem: 1
          },
        ],
      }
    },
    methods: {
      search() {

      },
      countRow() {
        for (let item of this.dataList) {
          this.planCount += item.planCount;
          this.realCount += item.realCount;
          this.seriousProblem += item.seriousProblem;
          this.generalProblem += item.generalProblem;
          this.noProblem += item.noProblem;
        }
      },
    },
    mounted() {
      this.countRow();
    },
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";
  /*SASS的常用变量 宏 已定义在assets/css/variable  mixin里*/

  .police-count-wrap
  {
    width: 100%;
    min-height: calc(100vh - 160px);
    background-color: #eff2f9;
    overflow: hidden;
  }

  .count_main {
    width: 1200px;
    margin: 0 auto;
  }

  .div_bar
  {
    margin-top: 20px;
  }

  .bar_title
  {
    font-size: 12px;
    color: #666666;
    display: inline-block;
  }

  .bar_title_current
  {
    color: #63aefc;
    text-decoration: underline;
  }

  .div_search {
    margin-top: 30px;
    width: 1200px;
    background-color: #ffffff;
    border: 1px solid #ffffff;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0px 0px 9px 1px rgba(8, 147, 253, 0.1);
    padding-top: 20px;
    padding-bottom: 20px;
  }


  .search_title {
    font-size: 16px;
    display: inline-block;
    margin-left: 20px;
    margin-right: 15px;
  }

  .div_op
  {
    margin-left: 20px;
    margin-top: 40px;
    margin-bottom: 20px;
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
  }
  .btn_export:hover {
    background-color: #ffa826;
    color: #ffffff;
  }

  .div_data {
    width: 100%;
    height: 100%;
    border: 1px solid #ffffff;
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 1px rgba(8, 147, 253, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
    margin-top: 20px;
  }

  .data_title {
    font-size: 18px;
    font-weight: bolder;
    /*margin: 0 auto;*/
    /*margin: 40px 50%;*/
    margin-left: 42%;
    margin-top: 30px;
    margin-bottom: 20px;
  }


  .div_table
  {
    width: 97%;
    border: 1px solid #e9e6e6;
    border-radius: 5px;
    overflow: hidden;
    box-sizing: border-box;
    margin-left: 20px;
    table-layout:fixed;
  }


  .div_pager {
    width: 100%;
    height: 80px;
  }

  .td_count {
    font-weight: bolder;
  }

</style>


