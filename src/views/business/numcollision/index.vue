<template>
  <div class="businessnumcollision">
    <div class="content">
      <!-- 搜索 -->
      <div class="search">
        <el-form :inline="true" :model="seachform" size="mini">
          <el-form-item>
            <el-input v-model="seachform.caseno" placeholder="案件编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="seachform.casename" placeholder="案件名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="seachform.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select v-model="seachform.status">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button type="primary" plain>重置</el-button>
            <el-button type="primary" plain>导出excel</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格 -->
      <div class="tablewrap">
        <div class="leftwrap">
          <div class="titleBlue">碰撞结果</div>
          <!-- 表格 -->
          <div class="lefttable" ref="lefttable">
            <el-table
              :data="tableData1"
              :header-cell-style="$tableHeaderColor"
              stripe
              style="width: 100%"
              border
              size="small"
              :height="tableHeight1"
            >
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="caseno" label="IMSI"></el-table-column>
              <el-table-column prop="casename" label="归属地"></el-table-column>
              <el-table-column prop="user" label="运营商"></el-table-column>
              <el-table-column prop="address" label="是否VIP"></el-table-column>
              <el-table-column prop="date" label="站点数"></el-table-column>
              <el-table-column prop="status" label="侦码次数"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="paginationStyle">
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
        </div>
        <div class="rightwrap">
          <div class="titleBlue">碰撞IMSI：详情</div>
          <!-- 表格 -->
          <div class="righttable" ref="righttable">
            <el-table
              :data="tableData2"
              :header-cell-style="$tableHeaderColor"
              stripe
              style="width: 100%"
              border
              size="small"
              :height="tableHeight2"
            >
              <el-table-column prop="name" label="站点名称"></el-table-column>
              <el-table-column prop="caseno" label="时间"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="paginationStyle">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seachform: {
        caseno: "",
        casename: "",
        data: [],
        status: "0"
      },
      tableData1: [],
      tableHeight1: null,
      tableData2: [],
      tableHeight2: null
    };
  },
  mounted() {
    if (this.$refs.lefttable) {
      let tableHeight = this.$refs.lefttable.clientHeight;
      this.tableHeight1 = tableHeight;
    }
    if (this.$refs.righttable) {
      let tableHeight = this.$refs.righttable.clientHeight;
      this.tableHeight2 = tableHeight;
    }
  }
};
</script>

<style lang="less" scoped>
.businessnumcollision {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 16px;
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .search {
      background: #f2f2f2;
      padding: 16px;
      padding-bottom: 0;
    }
    .tablewrap {
      margin-top: 16px;
      flex: 1;
      display: flex;
      .leftwrap {
        width: 60%;
        display: flex;
        flex-direction: column;
        .lefttable {
          flex: 1;
        }
      }
      .rightwrap {
        margin-left: 16px;
        flex: 1;
        display: flex;
        flex-direction: column;
        .righttable {
          flex: 1;
        }
      }
    }
  }
}
</style>