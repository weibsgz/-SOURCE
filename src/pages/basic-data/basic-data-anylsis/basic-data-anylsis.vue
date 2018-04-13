<template>
  <div class="home-wrap">
    <div class="div_bar">
      <div class="bar_title">首页</div>
      <div class="bar_title">></div>
      <div class="bar_title">基础数据</div>
      <div class="bar_title">></div>
      <div class="bar_title bar_title_current">辖区基础数据分析</div>
    </div>
    <div class="content">
      <div class="div_table">
      <table border="0" cellspacing="0" cellpadding="0" width="100%">
        <tr>
          <th class="width5">序号</th>
          <th class="width9">城市</th>
          <th class="width9">区县</th>
          <th class="width9">方向</th>
          <th class="width9">顺序</th>
          <th class="width9">街道</th>
          <th class="width10">门牌号范围</th>
          <th class="width10">房屋租赁户数</th>
          <th class="width10">餐饮店铺</th>
          <th class="width10">企业公司</th>
          <th class="width10">大型活动场所</th>
        </tr>
        <tbody class='tbody'>
        <tr  v-for="(val, index) in tableData" :key="index">
          <td>{{index+1}}</td>
          <td>{{val.a}}</td>
          <td>{{val.b}}</td>
          <td>{{val.c}}</td>
          <td>{{val.d}}</td>
          <td>{{val.e}}</td>
          <td>{{val.f}}</td>
          <td>{{val.g}}</td>
          <td>{{val.h}}</td>
          <td>{{val.i}}</td>
          <td>{{val.j}}</td>
         </tr>
        <tr>
          <td colspan="7" style="text-align: left; padding-left: 15px;">合计</td>
          <td class="weight">189</td>
          <td class="weight">189</td>
          <td class="weight">205</td>
          <td class="weight">35</td>
        </tr>
        </tbody>
      </table>

      </div>
      <div style="margin-right:20px;"><el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination></div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'home',
    data(){
      return {
        tableData: [
          {
            a: '上海市',
            b: '静安区',
            c: '横向路',
            d: '从上到下',
            e: '南苏州路',
            f: '800-1500',
            g: '13',
            h: '5',
            i: '20',
            j: '1',
          },
          {
            a: '上海市',
            b: '静安区',
            c: '横向路',
            d: '从上到下',
            e: '康定东路',
            f: '001-100',
            g: '15',
            h: '8',
            i: '28',
            j: '2',
          },
          {
            a: '上海市',
            b: '静安区',
            c: '横向路',
            d: '从上到下',
            e: '顺德路',
            f: '800-1500',
            g: '17',
            h: '0',
            i: '10',
            j: '1',
          },
          {
            a: '上海市',
            b: '静安区',
            c: '横向路',
            d: '从上到下',
            e: '武定路',
            f: '001-100',
            g: '20',
            h: '12',
            i: '8',
            j: '3',
          },
          {
            a: '上海市',
            b: '静安区',
            c: '横向路',
            d: '从上到下',
            e: '新闸路',
            f: '800-1500',
            g: '28',
            h: '3',
            i: '5',
            j: '2',
          },
          {
            a: '上海市',
            b: '静安区',
            c: '横向路',
            d: '从上到下',
            e: '山海关路',
            f: '001-100',
            g: '10',
            h: '22',
            i: '8',
            j: '1',
          },
          {
            a: '上海市',
            b: '静安区',
            c: '横向路',
            d: '从上到下',
            e: '北京西路',
            f: '800-1500',
            g: '8',
            h: '1',
            i: '0',
            j: '2',
          },
          {
            a: '上海市',
            b: '静安区',
            c: '横向路',
            d: '从上到下',
            e: '奉贤路',
            f: '001-100',
            g: '5',
            h: '22',
            i: '13',
            j: '2',
          },
          {
            a: '上海市',
            b: '静安区',
            c: '横向路',
            d: '从上到下',
            e: '凤阳路',
            f: '800-1500',
            g: '18',
            h: '5',
            i: '15',
            j: '3',
          },

          {
            a: '上海市',
            b: '静安区',
            c: '横向路',
            d: '从上到下',
            e: '南京西路',
            f: '001-100',
            g: '0',
            h: '13',
            i: '17',
            j: '4',
          },

          {
            a: '上海市',
            b: '静安区',
            c: '纵向路',
            d: '自东向西',
            e: '江宁路',
            f: '800-1500',
            g: '12',
            h: '15',
            i: '20',
            j: '5',
          },
          {
            a: '上海市',
            b: '静安区',
            c: '纵向路',
            d: '自东向西',
            e: '昌化路',
            f: '001-100',
            g: '13',
            h: '17',
            i: '28',
            j: '2',
          },
          {
            a: '上海市',
            b: '静安区',
            c: '纵向路',
            d: '自东向西',
            e: '泰兴路',
            f: '800-1500',
            g: '22',
            h: '20',
            i: '10',
            j: '3',
          },
          {
            a: '上海市',
            b: '静安区',
            c: '纵向路',
            d: '自东向西',
            e: '石门二路',
            f: '001-100',
            g: '1',
            h: '28',
            i: '8',
            j: '2',
          },

          {
            a: '上海市',
            b: '静安区',
            c: '纵向路',
            d: '自东向西',
            e: '大田路',
            f: '800-1500',
            g: '22',
            h: '10',
            i: '12',
            j: '1',
          },
          {
            a: '上海市',
            b: '静安区',
            c: '纵向路',
            d: '自东向西',
            e: '成都北路',
            f: '001-100',
            g: '5',
            h: '8',
            i: '3',
            j: '1',
          }
        ],
        page:{
          currentPage: 1,  //初始化第几页
          pageSizes:[6, 6],  //每页多少条选项
          pageSize:20,  //初始化每页多少条
          total:12   //共多少条
        }
      }
    },
    methods:{
      handleCheckAllChange(val) {
        this.addressList = val ? addressArray: [];
        this.isIndeterminate = val;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleCheckAllChanges(val) {
        this.typeList = val ? typeArray: [];
        this.isIndeterminate1 = false;
      },
      handleCheckedCitiesChanges(value) {
        let checkedCounts = value.length;
        this.checkAll1 = checkedCounts === this.citiess.length;
        this.isIndeterminate1 = checkedCounts > 0 && checkedCounts < this.citiess.length;
      },
      AreaOpen() {
        this.isAreaOpen=!this.isAreaOpen;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    components:{
    }
  }
</script>

<style lang="scss" scoped>
  .home-wrap {
    width: 1200px;
    margin: 0px auto;
    background-color: #eff2f9;
    .div_bar {
      padding-left: 10px;
      padding-top: 20px;
      padding-bottom: 20px;
    }
    .bar_title {
      font-size: 12px;
      color: #666666;
      display: inline-block;
    }
    .bar_title_current
    {
      color: #009aff;
    }
    .content {
      width: 1200px;
      padding-top: 21px;
      padding-bottom: 21px;
      margin-bottom: 20px;
      background-color: #ffffff;
      box-shadow: 0px 0px 9px 1px rgba(8, 147, 253, 0.1);
      border-radius: 5px;
      text-align: right;
      .div_table
      {
        width: 96%;
        border: 1px solid #e9e6e6;
        border-radius: 5px;
        overflow: hidden;
        box-sizing: border-box;
        margin-left: 20px;
        table-layout:fixed;
      }
      .width5 {
        width: 5%;
      }
      .width10 {
        width: 10%;
      }
      .width9 {
        width: 9%;
      }
      .weight
      {
        font-weight: 800;
      }
      .el-pagination
      {
        margin-top: 15px;
      }
    }
  }
</style>

