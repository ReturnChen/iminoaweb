<template>
  <div class="g-pagination">
    <el-pagination
      class="pagination"
      @size-change="tableHandleSizeChange"
      @current-change="tableHandleCurrentChange"
      :current-page="tablePage.currentPage"
      :page-sizes="tablePage.pageSizes"
      :page-size="tablePage.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tablePageTotal"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "g-pagination"
};
</script>

<style lang="less" scoped>
.g-pagination {
  height: 40px;
  padding-bottom: 16px;
  .pagination {
    border: 1px solid #ebebeb;
    border-top: none;
    height: 40px;
    text-align: right;
    background: #fff;
    padding: 7px 12px;
    box-sizing: border-box;
    .el-pagination__total {
      float: left;
    }
    .el-pagination__total,
    .el-input__inner,
    .el-pagination__jump {
      color: #28292d;
    }
    .el-pager li.active {
      color: #39c84a;
    }
  }
}
</style>