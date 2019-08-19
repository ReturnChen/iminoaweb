<template>
  <div class="equipanalysealarmreport">
    <div class="content">
      <!-- 搜索 -->
      <div class="search">
        <el-form :inline="true" :model="seachform" size="mini">
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
            <el-button type="primary">查询</el-button>
            <el-button type="primary" plain>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div :class="classObj">
        <div class="leftwrap">
          <template v-if="!menufold">
            <div class="titleBlue">
              周报
              <i class="el-icon-d-arrow-left" @click="togglemenufold"></i>
            </div>
          </template>
          <template v-else>
            <i class="el-icon-d-arrow-right" @click="togglemenufold"></i>
          </template>
          <el-tree :data="treedata" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="rightwrap">
          <div class="titleBlue">周报：2019-01-01--2019-01-08</div>
          <div class="table" ref="tablewrap">
            <el-table
              :data="tableData"
              :header-cell-style="$tableHeaderColor"
              stripe
              style="width: 100%"
              border
              size="small"
              :height="tableHeight"
            >
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="caseno" label="案件编号"></el-table-column>
              <el-table-column prop="casename" label="案件名称"></el-table-column>
              <el-table-column prop="user" label="申请人"></el-table-column>
              <el-table-column prop="address" label="地区"></el-table-column>
              <el-table-column prop="date" label="申请时间"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button type="text" class="visi" size="small">查看</el-button>
                  <el-button type="text" class="visi" size="small">编辑</el-button>
                  <el-button type="text" class="visi" size="small">删除</el-button>
                </template>
              </el-table-column>
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
      menufold: false,
      seachform: {
        caseno: "",
        casename: "",
        data: [],
        status: "0"
      },
      treedata: [
        {
          label: "周报：2019-01-01--2019-01-08",
           children: [{
              label: '三级 1-1-1'
            }]
        },
        {
          label: "周报：2019-01-09--2019-01-16"
        },
        {
          label: "周报：2019-01-17--2019-01-24"
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      tableData: []
    };
  },
  methods: {
    // 折叠菜单
    togglemenufold() {
      this.menufold = !this.menufold;
    },
    // 点击左侧数据
    handleNodeClick(data) {
      console.log(data);
    }
  },
  computed: {
    classObj() {
      return {
        tablewraphide: this.menufold,
        tablewrapopen: !this.menufold
      };
    }
  }
};
</script>

<style lang="less">
.equipanalysealarmreport {
  .el-tree-node__expand-icon.is-leaf {
    display: none;
  }
  .el-tree-node:focus > .el-tree-node__content {
    background-color: #ecf3ff;
  }
  .el-tree-node__content:hover {
    background-color: #ecf3ff;
  }
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
    .tablewrapopen {
      margin-top: 16px;
      flex: 1;
      display: flex;
      position: relative;
      .leftwrap {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 16px;
        width: 260-16-16px;
        overflow-x: hidden;
        overflow-y: scroll;
        border: 1px solid #ebebeb;
        padding: 0 16px 16px 16px;
        box-sizing: content-box;
        i {
          color: #4484ff;
          cursor: pointer;
          float: right;
          margin-top: 12px;
        }
      }
      .rightwrap {
        flex: 1;
        padding-left: 16+260px;
        transition: padding 0.28s;
        display: flex;
        flex-direction: column;
        .table {
          flex: 1;
        }
      }
    }
    .tablewraphide {
      margin-top: 16px;
      flex: 1;
      display: flex;
      position: relative;
      .leftwrap {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 16px;
        width: 48px;
        overflow-x: hidden;
        overflow-y: scroll;
        border: 1px solid #ebebeb;
        .el-tree {
          visibility: hidden;
        }
        i {
          color: #4484ff;
          cursor: pointer;
          float: left;
          margin-top: 12px;
          margin-left: 18px;
        }
      }
      .rightwrap {
        flex: 1;
        padding-left: 16+48px;
        transition: padding 0.28s;
      }
    }
  }
}
</style>