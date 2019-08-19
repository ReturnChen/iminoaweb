<template>
  <div class="g-nocontent-tabs">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="items in tabData"
        :key="items.label"
        :label="items.label"
        :name="items.label"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "g-nocontent-tabs",
  props: {
    tabData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      activeName: this.tabData[0].label
    };
  },
  methods: {
    handleClick(tab, event) {
      this.$emit("tabChange", tab.label);
    }
  }
};
</script>

<style lang="less">
.g-nocontent-tabs {
  .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
  }
  .el-tabs--top .el-tabs__item.is-top:last-child {
    padding-right: 20px;
  }
  .el-tabs__nav-wrap::after {
    background-color: #4484FF;
  }
  .el-tabs__item.is-active {
    background: #4484FF;
    color: #fff;
  }
  .el-tabs__header {
    margin: 0;
  }
  .el-tabs__content {
    display: none;
  }
}
</style>