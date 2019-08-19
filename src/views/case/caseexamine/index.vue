<template>
  <div class="caseexamine">
    <!-- 弹窗表单 -->
    <g-dialog-form
      :visible="dialogFormVisible"
      :title="dialogTitle"
      :api="dialogFormApi"
      :form-items="formItems"
      :merge-form="mergeForm"
      @afterSubmit="dialogFormSubmit"
    >
      <template v-slot:slotCheckBox>
        <el-checkbox v-model="mergeForm.slotCheckBox">复选框选项</el-checkbox>
      </template>
    </g-dialog-form>
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
        <el-button type="primary" size="small" @click="dialogFormOpen">新增</el-button>
      </div>
      <!-- 表格 -->
      <div class="table" ref="tablewrap">
        <g-table :height="tableHeight" :data="tableData" :column="column">
          <!-- 带slot -->
          <template v-slot:caseno="{ scope }">
            <span @click="getData(scope.row)">{{ format(scope.row.caseno) }}</span>
          </template>
          <!-- 带slot -->
          <template v-slot:casename="{ scope }">
            <span @click="getData(scope.row)">{{ format(scope.row.casename) }}</span>
          </template>
          <!-- 其他操作 -->
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" class="visi" size="small">查看</el-button>
              <el-button type="text" class="visi" size="small">编辑</el-button>
              <el-button type="text" class="visi" size="small">删除</el-button>
            </template>
          </el-table-column>
        </g-table>
      </div>
      <!-- 分页 -->
      <g-pagination></g-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单额外数据（编辑数据）
      mergeForm: {
        slotCheckBox: "",
        name: 222
      },
      // 表单数据
      formItems: [
        {
          type: "input", // 表单种类
          itemAttrs: {
            // 标签数据（带验证信息）
            label: "姓名：",
            className: "input",
            rules: [{ required: true, message: "请输入姓名", trigger: "blur" }]
          },
          attrs: {
            // 表单数据
            model: "name",
            value: "",
            placeholder: "请输入姓名"
          },
          // 根据条件，返回一个被合并到当前attrs的属性
          getAttrs(Model) {
            return Model.age === "18" ? { disabled: true } : null;
          }
          // 根据条件判断表单控件是否被渲染
          // ifRender(Model) {
          //   return Model.aaa === 18;
          // }
        },
        {
          slot: "slotCheckBox",
          itemAttrs: {
            label: "插槽复选框："
          }
        }
      ],
      // 表格栏目
      column: [
        {
          slot: "caseno",
          attrs: { prop: "caseno", label: "案件编号" }
        },
        {
          slot: "casename",
          attrs: { prop: "casename", label: "案件名称" }
        },
        { attrs: { prop: "user", label: "申请人" } },
        { attrs: { prop: "address", label: "地区" } },
        { attrs: { prop: "date", label: "申请时间" } },
        { attrs: { prop: "status", label: "状态" } }
      ],
      // 表格数据
      tableData: [],
      //
      seachform: {
        caseno: "",
        casename: "",
        data: [],
        status: "0"
      }
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
    // 表格slot数据
    format(str) {
      return `带slot处理后的${str}`;
    },
    // 表格slot数据操作
    getData(obj) {
      console.log(obj);
    }
  }
};
</script>

<style lang="less" scoped>
.caseexamine {
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
      overflow: hidden;
    }
  }
}
</style>