<template>
  <div class="caseAddcase">
    <!-- 审核弹窗 -->
    <el-dialog class="formdialog" title="新增" :visible.sync="dialogVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="small">
        <el-form-item label="案件编号：" prop="caseno">
          <el-input v-model="ruleForm.caseno"></el-input>
        </el-form-item>
        <el-form-item label="案件名称：" prop="casename">
          <el-input v-model="ruleForm.casename"></el-input>
        </el-form-item>
        <el-form-item label="案件信息：">
          <el-input v-model="ruleForm.caseinfo"></el-input>
        </el-form-item>
        <el-form-item label="申请人：">
          <el-input v-model="ruleForm.user1"></el-input>
        </el-form-item>
        <el-form-item label="负责人：">
          <el-input v-model="ruleForm.user2"></el-input>
        </el-form-item>
        <el-form-item label="警员：">
          <el-input v-model="ruleForm.user3"></el-input>
        </el-form-item>
        <div style="text-align:center">
          <el-button type="primary" @click="formSubmit('ruleForm')">确认</el-button>
          <el-button @click="dialogVisible = false">关闭</el-button>
        </div>
      </el-form>
    </el-dialog>
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
          </el-form-item>
        </el-form>
      </div>
      <!-- 按钮 -->
      <div class="buttongroup">
        <el-button type="primary" size="small" @click="dialogVisible = true">新增</el-button>
      </div>
      <!-- 表格 -->
      <div class="table" ref="tablewrap">
        <el-table
          :data="tableData"
          :header-cell-style="$tableHeaderColor"
          stripe
          style="width: 100%; height: 0;"
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
      ruleForm: {
        caseno: "",
        casename: "",
        caseinfo: "",
        user1: "",
        user2: "",
        user3: ""
      },
      rules: {
        caseno: [
          { required: true, message: "请输入案件编号", trigger: "blur" }
        ],
        casename: [
          { required: true, message: "请输入案件名称", trigger: "blur" }
        ]
      },
      tableData: [],
      dialogVisible: false
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      for (let i = 0; i < 20; i++) {
        let obj = {};
        (obj.caseno = `0000000${i + 1}`),
          (obj.casename = "偷窃"),
          (obj.user = "admin"),
          (obj.address = "江苏省南京市建邺区"),
          (obj.date = "2019-08-12"),
          (obj.status = "审批中");
        this.tableData.push(obj);
      }
    },
    seachSubmit() {
      //
    },
    formSubmit(formName) {
      if (!this.checkForm(formName)) return;
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.caseAddcase {
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
    .buttongroup {
      margin-top: 16px;
    }
    .table {
      margin-top: 16px;
      flex: 1;
    }
  }
}
</style>