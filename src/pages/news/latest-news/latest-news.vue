<template>
  <div class="latest-news-wrap">
    <div class="div_bar">
      <div class="bar_title">首页</div>
      <div class="bar_title">></div>
      <div class="bar_title">最新信息</div>
      <div class="bar_title">></div>
      <div class="bar_title bar_title_current">最新信息</div>
    </div>
    <div class="header">
      <div class="adreesrow">
        <div :class="this.isAreaOpen==true?'adreesrow_area_open':'adreesrow_area_fold'">
          <div class="area_left">街道名称</div>
          <div class="area_op">
            <div class="area_op_left">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </div>
            <div class="area_op_center">
              <el-checkbox-group v-model="addressList" @change="handleCheckedCitiesChange">
                <el-checkbox  v-for="city in cities" :label="city" :key="city" >{{city}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="area_op_right">
              <i  :class="this.isAreaOpen==true?'el-icon-minus':'el-icon-plus'" style="color:#0092ff;cursor: pointer" @click="AreaOpen">更多</i>
            </div>
          </div>
        </div>
      </div>
      <div class="infotyperow">
        <div class="infotyperow_area">
          <div class="area_left">信息分类</div>
          <div class="area_op">
            <div class="area_op_left">
              <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChanges">全选</el-checkbox>
            </div>
            <div class="area_op_center">
              <el-checkbox-group v-model="typeList" @change="handleCheckedCitiesChanges">
                <el-checkbox  v-for="city in citiess" :label="city" :key="city" >{{city}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <div class="infotyperow">
        <div class="daterow_area">
          <div class="area_left">日期范围</div>
          <div class="area_op">
            <div class="area_op_center">
              <span style="padding-left: 20px;padding-right: 10px;">开始日期</span>
              <el-date-picker
                v-model="startdate"
                type="date"
                class="p_date"
                size="mini"
                placeholder="选择日期">
              </el-date-picker>
              <span style="padding-left: 100px;padding-right: 10px;">结束日期</span>
              <el-date-picker
                v-model="enddate"
                type="date"
                class="p_date"
                size="mini"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="area_op_right">
              <el-button class="srechbutton" >查询</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="div_op">
        <div class="btn_op check_btn" @click="checkData">核查</div>
      </div>
      <div class="div_table">
      <table border="0" cellspacing="0" cellpadding="0">
          <tr class="tr_th">
            <th class="width5">
                 <span class="label-block">
                    <el-checkbox v-model="isAllSelect" @change="ckall_change">&nbsp;</el-checkbox>
                   </span>
            </th>
            <th class="width5">序号</th>
            <th class="width15">地址</th>
            <th class="width10">单位</th>
            <th class="width10">联系电话</th>
            <th class="width10">联系人</th>
            <th class="width15">采集来源地址</th>
            <th class="width10">采集来源网站</th>
            <th class="width10">最早采集日期</th>
            <th class="width10">信息分类</th>
          </tr>
        <tbody class='tbody'>
          <tr  v-for="(val, index) in tableData" :key="index">
            <td>
                  <span class="label-block">
                    <el-checkbox  v-model="val.check" :label="val.id">&nbsp;</el-checkbox>
                   </span>
              </td>
            <td>{{index+1}}</td>
            <td>{{val.address}}</td>
            <td>{{val.dept}}</td>
            <td>{{val.Telephone}}</td>
            <td>{{val.Contacts}}</td>
            <td> <a href="#" target="_blank" style="color: #008aff;word-break:break-all;width: 190px;">{{val.Collectionadress}}</a></td>
            <td>{{val.Contactswebsite}}</td>
            <td>{{val.createdate}}</td>
            <td><span style="color: #ffa626; font-weight: 800; cursor: pointer">{{val.whowtype=="1"?'房屋出租':'企业公司'}}</span></td>
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
        <el-dialog
      :show-close="showClose"
      :visible.sync="sucessDialogVisible"
      width="240px">
      <h3 style="font-size: 16px; text-align: center">成功加入核查列表</h3>
  <span slot="footer" class="dialog-footer">
    <div class="btn_op check_btn" @click="sucessDialogVisible = false">确 定</div>
  </span>
    </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
  const addressArray =['南苏州路', '康定东路', '顺德路', '武定路', '新闸路', '山海关路', '北京西路', '奉贤路', '凤阳路', '南京西路', '江宁路', '昌化路', '泰兴路', '石门二路', '大田路', '成都北路'];
  const typeArray = ['房屋租赁', '餐饮店铺', '企业公司', '大型活动'];
  export default {
    name: 'home',
    data(){
      return {
        isAllSelect: false,
        sucessDialogVisible: false,
        showClose: false,
        startdate:'',
        enddate:'',
        addressList:[],
        typeList:[],
        checkAll: false,
        checkAll1: false,
        isIndeterminate: false,
        isIndeterminate1: false,
        cities: addressArray,
        citiess: typeArray,
        isAreaOpen:false,
        checked:false,
        tableData: [
          {
            id: 1,
            check: false,
            address: '上海 静安区 南苏州路1455',
            dept: '康铂酒店(上海自然博物馆店)',
            Telephone: '电话021-61766988 传真021-61766989',
            Contacts: '张三',
            Collectionadress: 'http://hotels.ctrip.com/1578931.html?isFull=F#ctm_ref=hod_sr_lst_dl_n_1_1',
            Contactswebsite: '携程旅行网',
            createdate: '2017-09-12',
            whowtype: '1',
          },
          {
            id: 2,
            check: false,
            address: '上海 静安区 新闸路831号30,31',
            dept: '上海孚华服务式公寓',
            Telephone: '电话021-32500588',
            Contacts: '李广',
            Collectionadress: 'http://hotels.ctrip.com/hotel/5860529.html?isFull=F#ctm_ref=hod_sr_lst_dl_n_1_6',
            Contactswebsite: '携程旅行网',
            createdate: '2017-09-12',
            whowtype: '1',
          },
          {
            id: 3,
            check: false,
            address: '上海静安区新闸路888弄76号101室',
            dept: '上海南京西路-人民广场-新天地-3房普通公寓(石门二路店)',
            Telephone: '电话400-606-1230 ',
            Contacts: '沈腾',
            Collectionadress: 'http://hotels.ctrip.com/hotel/13966835.html?isFull=F#ctm_ref=hod_sr_lst_dl_n_1_7',
            Contactswebsite: '携程旅行网',
            createdate: '2017-09-12',
            whowtype: '1',
          },
          {
            id: 4,
            check: false,
            address: '上海市静安区',
            dept: '爱建证券上海石门二路营业部',
            Telephone: '电话021-61766988 传真021-61766989',
            Contacts: '柳如是',
            Collectionadress: 'http://jobs.51job.com/all/co3889897.html',
            Contactswebsite: '51job.com',
            createdate: '2017-09-12',
            whowtype: '0',
          },
          {
            id: 5,
            check: false,
            address: '上海市静安区石门二路219号',
            dept: '上海市东方世纪消费品发展促进中心',
            Telephone: '电话021-61766988 传真021-61766989',
            Contacts: '张亮',
            Collectionadress: 'http://jobs.51job.com/all/co3382976.html',
            Contactswebsite: '51job.com',
            createdate: '2017-09-12',
            whowtype: '0',
          },
          {
            id:6,
            check: false,
            address: '静安区新闸路831号3',
            dept: '上海乔丽尔医疗美容门诊部有限公司',
            Telephone: '',
            Contacts: '',
            Collectionadress: 'http://jobs.51job.com/all/co4768505.html',
            Contactswebsite: '51job.com',
            createdate: '2017-09-12',
            whowtype: '0',
          },
        ],
        page:{
          currentPage: 1,  //初始化第几页
          pageSizes:[6, 6],  //每页多少条选项
          pageSize:20,  //初始化每页多少条
          total:12   //共多少条
        }
      }
    },
    mounted() {

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
      },
      ckall_change(val) {
        for (let item of this.tableData) {
          item.check = val;
        }
      },
      checkData() {
        this.sucessDialogVisible = true
      }
    },
    components:{
    }
  }
</script>

<style lang="scss" scoped>
  .srechbutton{
    padding-top: 6px;
    width: 80px;
    height: 30px;
    background-color: #ffffff;
    box-shadow: 0px 5px 9px 1px
    rgba(255, 158, 0, 0.15);
    border-radius: 5px;
    color: #ffa826;
    border: solid 1px #ffa826;
  }
  .srechbutton:hover{
    background-color: #ffa826;
    color: #ffffff;
  }
  .latest-news-wrap {
    width: 1200px;
    margin: 0px auto;
    background-color: #eff2f9;
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
    .header {
      overflow:hidden;
      height: 100%;
      background-color: #ffffff;
      box-shadow: 0px 0px 9px 1px
      rgba(8, 147, 253, 0.1);
      border-radius: 5px;
      .adreesrow {
        line-height: 62px;
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        border-bottom: solid 1px #eeeeee;
        .adreesrow_area_open
        {
          max-height: 186px;
          overflow: hidden;
          transition: max-height 1.5s;
          /*height: 80px;*/
        }
        .adreesrow_area_fold
        {
          max-height: 62px;
          overflow: hidden;
          transition: max-height 1s;
        }
        .area_left
        {
          width:120px;
          height:100%;
          float: left;
          text-align: center;
        }
        .area_op {
          height:100%;
          overflow:hidden;
          .area_op_left
          {
            float:left;
            width:100px;
            cursor: pointer;
          }
          .area_op_center
          {
            float: left;
            width:900px;
          }
          .area_right
          {
            float:left;
            width:80px;
            cursor: pointer;
          }
        }
      }
      .infotyperow{
        line-height: 62px;
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        border-bottom: solid 1px #eeeeee;
        .infotyperow_area{
          height: 62px;
        }
        .area_left {
          width:120px;
          height:100%;
          float: left;
          text-align: center;
        }
        .area_op {
          height:100%;
          overflow:hidden;
          .area_op_left
          {
            float:left;
            width:100px;
            cursor: pointer;
          }
          .area_op_center
          {
            float: left;
            width:900px;
          }
          .area_right
          {
            float:left;
            width:80px;
            cursor: pointer;
          }
        }
      }
      .daterow_area{
        line-height: 62px;
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        border-bottom: solid 1px #eeeeee;
        .daterow_area{
          height: 62px;
        }
        .area_left {
          width:120px;
          height:100%;
          float: left;
          text-align: center;
        }
        .area_op {
          height:100%;
          overflow:hidden;
          .area_op_center
          {
            float: left;
            width:980px;
          }
          .area_right
          {
            float:left;
            width:80px;
            cursor: pointer;
          }
        }
      }
      .el-checkbox{
        margin-left:  0px;
        margin-right:  30px;
      }
    }
    .content {
      width: 1200px;
      margin-top: 30px;
      padding-top: 21px;
      padding-bottom: 20px;
      background-color: #ffffff;
      box-shadow: 0px 0px 9px 1px rgba(8, 147, 253, 0.1);
      border-radius: 5px;
      text-align: right;
      .div_op {
        margin-top: 10px;
        margin-left: 20px;
        margin-bottom: 15px;
        overflow: hidden;
      }
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
      .width15 {
        width: 15%;
      }
      .el-pagination
      {
        margin-top: 15px;
      }
    }

  }

  .btn_op {
  float: left;
  width: 80px;
  height: 26px;
  border-radius: 4px;

  text-align: center;
  line-height: 26px;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
}

.check_btn {
  border: solid 1px #0893fd;
  color: #0893fd;
  box-shadow: 0px 5px 9px 1px rgba(8, 147, 253, 0.15);
}
.check_btn:hover {
  background: #0893fd;
  color: #ffffff;
}
</style>
<style>
.latest-news-wrap .el-dialog {
  border-radius: 10px;
}
.latest-news-wrap .el-dialog__footer {
  text-align: center;
}
.latest-news-wrap .dialog-footer {
  display: inline-block;
  margin: auto;
}
</style>
