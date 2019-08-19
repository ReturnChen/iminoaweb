<template>
  <div class="g-table" ref="gTable">
    <el-table
      :data="data"
      :header-cell-style="$tableHeaderColor"
      stripe
      style="width: 100%"
      border
      size="small"
      :height="$attrs.height"
      @selection-change="tableHandleSelectionChange"
    >
      <el-table-column v-if="tableSelectAll" type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <template v-for="(item, index) in column">
        <!--不带slot-->
        <el-table-column
          v-if="isCommonTableColumn(item)"
          :key="index"
          v-bind="item.attrs || {}"
        ></el-table-column>
        <!-- 带slot -->
        <el-table-column v-else :key="index" v-bind="item.attrs || {}">
          <template v-slot="scope">
            <slot :name="item.slot" :scope="scope" />
          </template>
        </el-table-column>
      </template>
      <!-- 其他操作 -->
      <slot />
    </el-table>
  </div>
</template>

<script>
export default {
  name: "g-table",
  props: {
    data: {
      type: Array,
      required: true
    },
    tableSelectAll: {
      type: Boolean,
      default: false
    },
    column: {
      type: Array,
      required: true
    }
  },
  methods: {
    // 是否是一个常规的table-column(有以下标签就不是常规table-column)
    isCommonTableColumn(column) {
      const specialColumnList = ["slot"];
      return !specialColumnList.some(option => column[option]);
    }
  }
};
</script>

<style lang="less" scoped>
.g-table {
  height: 0;
}
</style>