<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'page',
    data(){
      return {
          page:{
            currentPage: 1,  //初始化第几页
            pageSizes:[10, 20],  //每页多少条选项
            pageSize:20,  //初始化每页多少条
            total:100   //共多少条
          }

      }
    },
    methods:{
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
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";

</style>



