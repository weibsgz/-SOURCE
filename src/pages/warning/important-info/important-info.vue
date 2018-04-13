<template>
    <div class="important-info-wrap cont-wrapper-important">

      <div class="important_main">
       <!--导航栏-->
      <div class="div_bar">
        <div class="bar_title">首页</div>
        <div class="bar_title">></div>
        <div class="bar_title">警情备忘</div>
        <div class="bar_title">></div>
        <div class="bar_title bar_title_current">重要信息记录</div>
      </div>

      <!--搜索区域-->
      <div class="div_search">
            <div class="search_title">街道名称</div>
            <div style="display: inline-block">
              <el-select style="margin-right:30px;width:120px;height: 30px;" v-model="streetId">
                <el-option
                  v-for="item in streetList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>

            <div class="search_title">信息类别</div>
            <div style="display: inline-block;margin-right: 80px;">
              <el-select style="width:120px;" v-model="typeId">
                <el-option
                  v-for="item in msgTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>

            <div class="search_title">开始日期</div>

            <div style="display: inline-block;margin-right: 30px;">
              <el-date-picker class="p_date" size="mini" v-model="startDate" type="date" placeholder="选择日期" ></el-date-picker>
            </div>

            <div class="search_title">结束日期</div>
            <div style="display: inline-block;margin-right: 20px;">
              <el-date-picker class="p_date" size="mini" v-model="endDate" type="date" placeholder="选择日期" ></el-date-picker>
            </div>

            <div class="btn_op btn_export" style="display: inline-block;margin-left: 20px;" @click="search">查询</div>

      </div>

      <!--数据列表-->
      <div class="div_data">
        <div class="div_op">
          <div class="btn_op btn_add" @click="addData">添加</div>
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
               <th class="th_streetName">街道名称</th>
               <th class="th_address">地址</th>
               <th class="th_relatedTime">相关时间</th>
               <th class="th_content">事件内容</th>
               <th class="th_msgType">信息分类</th>
               <th class="th_importance">重要程度</th>
               <th class="th_recordingTime">记录时间</th>
               <th class="th_recordingUser">记录人</th>
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
                 <td>{{ item.streetName }}</td>
                 <td>{{ item.address }}</td>
                 <td>{{ item.relatedTime }}</td>
                 <td>{{ item.content }}</td>
                 <td>{{ item.msgType }}</td>
                 <td>{{ item.importance }}</td>
                 <td>{{ item.recordingTime }}</td>
                 <td>{{ item.recordingUser }}</td>
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

      <!--新增编辑框-->
      <shelterLayer v-show="isAddShow">
        <div class="div_win div_add" >
          <div>
            <div class="div_addrow">
               <div class="add_title">街道名称:</div>
               <div style="display: inline-block">
                 <el-select style="width:120px;" v-model="streetId">
                   <el-option
                     v-for="item in streetList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
                   </el-option>
                 </el-select>
               </div>
             </div>

            <div class="div_addrow">
              <div class="add_title">具体地址:</div>
              <div style="display: inline-block">
                <input class="input_txt" v-model="saveObj.address"/>
              </div>
            </div>

            <div class="div_addrow">
              <div class="add_title">相关事件:</div>
              <div style="display: inline-block">
                <input class="input_txt" v-model="saveObj.relatedTime"/>
              </div>
            </div>

            <div class="div_addrow">
              <div class="add_title">相关内容:</div>
              <div style="display: inline-block">
                <input class="input_txt" v-model="saveObj.content"/>
              </div>
            </div>

            <div class="div_addrow">
              <div class="add_title">信息分类:</div>
              <div style="display: inline-block">
                <el-select style="width:120px;" v-model="saveObj.msgType">
                  <el-option
                    v-for="item in msgTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="div_addrow">
              <div class="add_title">重要程度:</div>
              <div style="display: inline-block">
                <el-select style="width:120px;" v-model="saveObj.importance">
                  <el-option
                    v-for="item in importList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>

          </div>
          <div style="margin-top: 30px;margin-left: 35%;">
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

    name: 'important-info',
    data() {
      return {
        type: '',
        streetId: 0,
        typeId: 0,
        isAllSelect: false,
        startDate: '',
        endDate: '',
        isAddShow: false,
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
        importList: [
          {id: 0, name: '重要'},
          {id: 1, name: '一般'},
          {id: 2, name: '不重要'},
        ],
        dataList: [
          {
            id: 1,
            streetName: '凤阳路',
            address: '凤阳路90弄17号',
            relatedTime: '2018-02-01',
            content: '一层住宅改为仓库',
            msgType: '房屋租赁',
            importance: '重要',
            recordingTime: '2017-01-01',
            recordingUser: '刘警官',
            isSelect: false,
          },
          {
            id: 2,
            streetName: '江宁路',
            address: '江宁路990弄2号',
            relatedTime: '2018-02-08',
            content: '住宅一层商店改为饭店',
            msgType: '餐饮店铺',
            importance: '一般',
            recordingTime: '2017-01-01',
            recordingUser: '刘警官',
            isSelect: false,
          },
          {
            id: 2,
            streetName: '南苏州路',
            address: '南苏州路29号新世界商务楼16号',
            relatedTime: '2018-02-15',
            content: '有大量传销人员',
            msgType: '企业公司',
            importance: '不重要',
            recordingTime: '2017-01-01',
            recordingUser: '刘警官',
            isSelect: false,
          },
        ],
        saveObj: {
          streetName: '',
          address: '',
          relatedTime: '',
          content: '',
          msgType: '',
          importance: '',
          recordingTime: '',
          recordingUser: '',
        }
      }
    },
    mounted() {

    },
    methods: {
      handleSizeChange(val){

      },
      handleCurrentChange(val){

      },

      selectBar(index) {
        this.barSelectList = [false, false, false];
      },

      selectStreet(item, index) {
        this.streetList[index].isSelect = !this.streetList[index].isSelect;
      },

      ckall_change(val) {
        for (let item of this.dataList) {
          item.isSelect = val;
        }
      },

      addData() {
        this.isAddShow = true;
      },

      deleteData() {

      },
      exportData() {
        this.isExportShow = true;
      },
      saveData() {
        this.isAddShow = false;
      },
      cancelAdd() {
        this.isAddShow = false;
      },

      saveExport() {
        this.isExportShow = false;
      },
      cancelExport() {
        this.isExportShow = false;
      },
      search() {

      },
      openPath() {
         this.$refs.fileId.click();
      },
      clickfile(val) {
        console.log('文件路径', val);
      }
    },
    components: {shelterLayer}
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";
  /*SASS的常用变量 宏 已定义在assets/css/variable  mixin里*/

  .important-info-wrap
  {
    width: 100%;
    min-height: calc(100vh - 160px);
    background-color: #eff2f9;
    overflow: hidden;
  }

  .important_main
  {
    margin: 0 auto;
    width:1200px;
  }

  /*导航样式*/
  .div_bar
  {
    margin-top: 20px;
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
    margin-right: 10px;
  }


  .div_checkbox {
    background-color: #eff1f9;
    margin-top: 2px;
    width: 16px;
    height: 16px;
    border: 1px solid #c2c4cc;
    box-sizing: border-box;
    display: inline-block;
    margin-right: 12px;
    border-radius: 2px;
    cursor: pointer;
  }


  .div_selectitem {
    display: inline-block;
    /*border: 1px solid green;*/
    margin-right: 20px;
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
    width: 5%;
  }
  .th_order{ width: 5%;}
  .th_streetName{ width: 10%;}
  .th_address {
    word-wrap: break-word;
    width: 20%;
  }
  .th_relatedTime{ width: 10%;}
  .th_content{
    word-wrap: break-word;
    width: 20%;
  }
  .th_msgType{ width: 10%;}
  .th_importance{ width: 5%;}
  .th_recordingTime{ width: 10%;}
  .th_recordingUser{ width: 5%;}


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

  .btn_export
  {
    border: solid 1px #ffa826;
    color: #ffa826;
    box-shadow: 0px 0px 2px #ffa826;
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


  .btn_export:hover {
    background-color: #ffa826;
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

  .btn_cancel:hover {
    background-color: #c2c4cc;
    color: #ffffff;
  }

  .btn_selectpath:hover {
    background-color: #f27649;
    color: #ffffff;
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
     width: 600px;
     height: 430px;
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
    margin-right: 20px;
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

  .row_txt {

  }

  .ctrl_btn {
    width: 130px;
    height: 30px;
    background: #ffffff;
    border: solid 1px #ffa826;
    color: #ffa826;
    box-shadow: 0px 0px 4px #ffa826;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .ctrl_btn:hover
  {
    background-color: #ffa826;
    color: #ffffff;
  }


  .div_pager {
    width: 100%;
    height: 80px;
  }

  .btn_op_margin {
    margin-right: 16px;
  }

</style>

