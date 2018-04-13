<template>
    <div class="check-list-wrap">
      <div class="check_main">
        <!--导航栏-->
      <div class="div_bar">
        <div class="bar_title">首页</div>
        <div class="bar_title">></div>
        <div class="bar_title">警情备忘</div>
        <div class="bar_title">></div>
        <div class="bar_title bar_title_current">实地核查列表</div>
      </div>

        <!--搜索区域-->
        <div class="div_search">
            <div class="search_title">街道名称</div>
            <div style="display: inline-block">
              <el-select style="width:110px;" v-model="streetId">
                <el-option
                  v-for="item in streetList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="search_title">信息类别</div>
            <div style="display: inline-block">
              <el-select style="width:110px;" v-model="typeId">
                <el-option
                  v-for="item in msgTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>

            <div class="search_title">核查结果</div>
            <div style="display: inline-block">
              <el-select style="width:120px;" v-model="checkResult">
                <el-option
                  v-for="item in resultList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>

            <div class="search_title">开始日期</div>

            <div style="display: inline-block;">
              <el-date-picker class="p_date" size="mini" v-model="startDate" type="date" placeholder="选择日期" ></el-date-picker>
            </div>


            <div class="search_title">结束日期</div>
            <div style="display: inline-block;">
              <el-date-picker class="p_date" size="mini" v-model="endDate" type="date" placeholder="选择日期" ></el-date-picker>
            </div>
            <div class="btn_op btn_export" style="display: inline-block;margin-left: 20px;width: 70px;" @click="search">查询</div>

        </div>

        <!--数据区域-->
        <div class="div_data">
          <div class="div_op">
            <!--<div class="btn_op btn_add" @click="addData">添加</div>-->
            <div class="btn_op btn_delete" @click="deleteData">删除</div>
            <div class="btn_op btn_export" @click="exportData">导出</div>
          </div>

          <div class="div_table">
            <table border="0" cellspacing="0" cellpadding="0" width="100%">
              <tr class="tr_th">
                <th class="th_ck">
                  <span class="label-block">
                    <el-checkbox v-model="isAllSelect" @change="ckall_change">&nbsp;</el-checkbox>
                   </span>
                </th>
                <th class="th_order">序号</th>
                <th class="th_address">地址</th>
                <th class="th_company">单位</th>
                <th class="th_phone">联系电话</th>
                <th class="th_contact">联系人</th>
                <th class="th_remark">事件备注</th>
                <th class="th_netaddress">采集来源地址</th>
                <th class="th_net">采集来源网站</th>
                <th class="th_collecttime">采集日期</th>
                <th class="th_msgtype">信息分类</th>
                <th class="th_checkresult">核查结果</th>
                <th class="th_checktime">核查时间</th>
              </tr>
              <tbody class='tbody'>
              <tr v-show="dataList.length==0">
                <td colspan="10">没有找到相关的数据</td>
              </tr>
              <tr v-show="dataList.length>0" class="tr_data" v-for="(item,index) in dataList">
                <td>
                   <span class="label-block">
                    <el-checkbox  v-model="item.isSelect" :label="item.id">&nbsp;</el-checkbox>
                   </span>
                </td>
                <td>{{index+1}}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.company }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.contact }}</td>
                <td>
                   <div v-if="item.remark=='新开业'" style="color:#3da714">{{ item.remark }}</div>
                   <div v-if="item.remark=='最新招聘'" style="color:#ea8f18">{{ item.remark }}</div>
                </td>
                <td>
                  <a class="div_href" target="_blank" href="https://www.baidu.com">{{ item.netaddress }}</a>
                </td>
                <td>{{ item.net }}</td>
                <td>{{ item.collecttime }}</td>
                <td>
                  <div style="color:#ffa626;font-size: 18px;font-weight:bolder;">{{ item.msgtype }}</div>
                </td>
                <td>
                  <div v-if="item.checkresult=='未核查'" style="cursor: pointer;" @click="editData">{{ item.checkresult }}</div>
                  <div v-if="item.checkresult=='有严重问题'" style="color: #f27649;cursor: pointer;" @click="editData">{{ item.checkresult }}</div>
                  <div v-if="item.checkresult=='有一般问题'" style="color: #ffa826;cursor: pointer;" @click="editData">{{ item.checkresult }}</div>
                </td>
                <td>{{ item.checktime }}</td>
              </tr>
              </tbody>

            </table>

          </div>

          <div class="div_pager">
            <div style="float: right;margin-top: 20px;margin-right: 20px;"><el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination></div>

          </div>
        </div>

        <!--编辑框-->
        <shelterLayer v-show="isEditShow">
          <div class="div_win div_add" >
            <div>
               <div class="div_addrow">
                <div class="add_title">核查日期:</div>
                <div style="display: inline-block">
                  <el-date-picker class="p_date" size="mini" v-model="saveObj.checktime" type="date" placeholder="选择日期" ></el-date-picker>
                </div>
               </div>
              <div class="div_addrow">
                <div class="add_title">核查结果:</div>
                <div style="display: inline-block">
                  <el-select style="width: 135px;"  v-model="typeId">
                    <el-option
                      v-for="item in resultList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="div_addrow">
                <div  style="font-size: 16px;float: left;margin-right: 25px;">详细描述:</div>
                <div style="display: inline-block">
                  <textarea class="txtarea"></textarea>
                </div>
              </div>
            </div>

            <div style="margin-top: 20px;margin-left: 35%;">
              <div class="btn_op btn_add" style="display: inline-block;" @click="saveData">确定</div>
              <div class="btn_op btn_cancel" style="display: inline-block;" @click="cancelAdd">取消</div>
            </div>

          </div>

        </shelterLayer>

        <!--导出编辑框-->
        <shelterLayer v-show="isExportShow">
          <div class="div_win div_export" >
            <div class="div_addrow" style="margin-bottom: 30px;">
              <div class="add_title">导出文件至:</div>
              <div style="display: inline-block">
                <input class="input_txt" style="height: 28px;margin-right: 15px;" v-model="saveObj.address"/>
              </div>
              <input ref="fileId" type="file" @click="clickfile" v-show="false"/>
              <div class="btn_op btn_selectpath" style="display: inline-block;" @click="openPath">选择存储位置</div>
            </div>
            <div style="margin-left: 35%;">
              <div class="btn_op btn_add" style="display: inline-block;" @click="saveExport">确定</div>
              <div class="btn_op btn_cancel" style="display: inline-block;" @click="cancelExport">取消</div>
            </div>
          </div>
        </shelterLayer>

      </div>
    </div>

</template>

<script type="text/javascript">
  import shelterLayer from '../../../components/shelter/shelterLayer.vue'

  export default {
    name: 'check-list',
    data() {
      return {
        type: '',
        streetId: 0,
        typeId: 0,
        checkResult: 0,
        isAllSelect: false,
        startDate: '',
        endDate: '',
        isEditShow: false,
        isExportShow: false,
        filePath: '',
        barSelectList: [true, false, false],
        currentPage: 1,
        pageSize: 10,
        pageSizes: [6, 6],
        total: 3,
        streetList: [
          {id: 0, name: '全部', isSelect: false},
          {id: 1, name: '南苏州路', isSelect: false},
          {id: 2, name: '康定东路', isSelect: false},
          {id: 3, name: '顺德路', isSelect: false},
          {id: 4, name: '武定路', isSelect: false},
          {id: 5, name: '新闸路', isSelect: false},
          {id: 6, name: '山海关路', isSelect: false},
          {id: 7, name: '北京西路', isSelect: false},
          {id: 8, name: '奉贤路', isSelect: false},
          {id: 9, name: '凤阳路', isSelect: false},
          {id: 10, name: '南京西路', isSelect: false},
          {id: 11, name: '江宁路', isSelect: false},
          {id: 12, name: '昌化路', isSelect: false},
          {id: 13, name: '泰兴路', isSelect: false},
          {id: 14, name: '西门二路', isSelect: false},
          {id: 15, name: '太田路', isSelect: false},
          {id: 16, name: '成都北路', isSelect: false},
        ],
        msgTypeList: [
          {id: 0, name: '全部'},
          {id: 1, name: '房屋租赁'},
          {id: 2, name: '餐饮店铺'},
          {id: 3, name: '企业公司'},
          {id: 4, name: '大型活动'}
        ],
        resultList: [
          {id: 0, name: '全部'},
          {id: 1, name: '未核查'},
          {id: 2, name: '有严重问题'},
          {id: 3, name: '有一般问题'},
          {id: 4, name: '没问题'},
        ],
        dataList: [
          {
            id: 1,
            address: '上海静安区南苏州路1445号',
            company: '康博酒店',
            phone: '电话 021-66890 0510',
            contact: '-',
            remark: '新开业',
            netaddress: '点击链接至源网址',
            net: '携程旅行网',
            collecttime: '2018-01-02',
            msgtype: '企业公司',
            checkresult: '未核查',
            checktime: '2018-01-02',
            isSelect: false,
          },
          {
            id: 2,
            address: '上海静安区南苏州路99号张园A栋',
            company: 'Logans 酒吧',
            phone: '电话 021-66890 0510',
            contact: '-',
            remark: '新开业',
            netaddress: '点击链接至源网址',
            net: '58同城上海站',
            collecttime: '2018-01-02',
            msgtype: '企业公司',
            checkresult: '有严重问题',
            checktime: '2018-01-02',
            isSelect: false,
          },
          {
            id: 3,
            address: '上海静安区南苏州路29号新世界商务楼',
            company: '上海新贝青少儿教育中心',
            phone: '电话 021-66890 0510',
            contact: '余经理',
            remark: '最新招聘',
            netaddress: '点击链接至源网址',
            net: '51job.com',
            collecttime: '2018-01-02',
            msgtype: '企业公司',
            checkresult: '有一般问题',
            checktime: '2018-01-02',
            isSelect: false,
          },
        ],
        saveObj: {
          checktime: '',
          checkresult: '',
          detail: '',
        }
      }
    },
    methods: {
      handleSizeChange(val){

      },
      handleCurrentChange(val){

      },
      search() {

      },

      ckall_change(val) {
        for (let item of this.dataList) {
          item.isSelect = val;
        }
      },

      deleteData() {

      },
      editData() {
        this.isEditShow = true;
      },
      exportData() {
        this.isExportShow = true;
      },
      saveExport() {
        this.isExportShow = false;
      },
      cancelExport() {
        this.isExportShow = false;
      },
      openPath() {
        this.$refs.fileId.click();
      },
      clickfile(val) {
        console.log('文件路径', val);
      },
      saveData() {
        this.isEditShow = false;
      },
      cancelAdd() {
        this.isEditShow = false;
      },
    },
    components: {shelterLayer},
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";
  /*SASS的常用变量 宏 已定义在assets/css/variable  mixin里*/

  .check-list-wrap {
    width: 100%;
    min-height: calc(100vh - 160px);
    background-color: #eff2f9;
    overflow: hidden;
  }

   .check_main {

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
    margin-right: 5px;
  }


  .div_op
  {
    margin-left: 20px;
    margin-top: 30px;
    margin-bottom: 15px;
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
    margin-right: 16px;
  }

  .btn_add
  {
    border: solid 1px #0893fd;
    color: #0893fd;
    box-shadow: 0px 0px 2px #0893fd;
  }

  .btn_add:hover {
    background-color: #0893fd;
    color: #ffffff;
  }

  .btn_delete
  {
    border: solid 1px #f27649;
    color: #f27649;
    box-shadow: 0px 0px 2px #f27649;
  }

  .btn_delete:hover {
    background-color: #f27649;
    color: #ffffff;
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

  .btn_cancel{
    border: solid 1px #c2c4cc;
    color: #c2c4cc;
    box-shadow: 0px 0px 2px #c2c4cc;
  }

  .btn_selectpath
  {
    width: 120px;
    height: 27px;
    border: solid 1px #ffa826;
    color: #ffa826;
    box-shadow: 0px 0px 2px #ffa826;
  }

  .btn_cancel:hover {
    background-color: #c2c4cc;
    color: #ffffff;
  }

  .btn_selectpath:hover {
    background-color: #f27649;
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

  .th_ck{
    width: 2%;
  }
  .th_order{ width: 2%;}
  .th_address{ width: 10%;}
  .th_company{ width: 5%;}
  .th_phone{ width: 5%;}
  .th_contact{ width: 3%;}
  .th_remark{ width: 5%;}
  .th_netaddress{ width: 5%;}
  .th_net{ width: 5%;}
  .th_collecttime{ width: 5%;}
  .th_msgtype{ width: 5%;}
  .th_checkresult{ width: 5%;}
  .th_checktime{ width: 5%;}

  .div_href {
    color: #008aff;
    text-decoration: underline;
  }

  .div_pager {
    width: 100%;
    height: 80px;
  }

  .div_win
  {
    background: #ffffff;
    position: fixed;
    z-index: 10;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #ffffff;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0px 0px 3px #ffffff;
  }

  .div_add {
    width: 500px;
    height: 330px;
  }

  .div_export {
    width: 700px;
    height: 150px;
  }

  .div_addrow
  {
    margin-left: 30px;
    margin-top: 25px;
  }

  .add_title
  {
    font-size: 16px;
    margin-right: 15px;
    display: inline-block;
  }

  .input_txt
  {
    height: 30px;
    width: 350px;
    padding: 0 10px;
    /*color: #fff;*/
    outline: none;
    border-radius: 6px;
    border: 1px solid #c2c4cc;
    background: #ffffff;
    box-shadow: 0px 0px 2px #c2c4cc;
  }

  .txtarea
  {
    height: 100px;
    width: 300px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #c2c4cc;
    background: #ffffff;
    box-shadow: 0px 0px 2px #c2c4cc;
  }

</style>


