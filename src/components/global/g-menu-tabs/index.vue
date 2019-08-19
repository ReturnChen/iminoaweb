<template>
  <el-scrollbar class="g-menu-tabs">
    <el-tag
      v-for="(item, index) in tagsData"
      :key="index"
      size="medium"
      :effect="item.effect"
      :closable="item.closable"
      @close="handleClose(index)"
      @click="gotoPage(item)"
    >{{ item.label }}</el-tag>
  </el-scrollbar>
</template>

<script>
import _ from "lodash";
import * as utils from "../../../utils/utils";

export default {
  name: "g-menu-tabs",
  methods: {
    handleClose(i) {
      this.$store.commit("common/tagsData_splice_Mutations", i);
    },
    gotoPage(obj) {
      let fullPath = this.$route.fullPath;
      // 重定向
      if (obj.path === fullPath) {
        this.$router.replace({
          path: "/redirect" + fullPath
        });
      } else {
        // 直接跳转
        this.$router.push({
          path: obj.path
        });
      }
    }
  },
  created() {
    let route = this.$route.path;
    let obj = {};
    obj.label = utils.findBreadcrumb(route);
    obj.path = route;
    obj.effect = "plain";
    obj.closable = true;
    this.$store.commit("common/tagsData_Mutations", obj);
  },
  computed: {
    tagsData() {
      // 深拷贝
      let tempTagData = _.cloneDeep(this.$store.state.common.tagsData);
      let route = this.$route.path;
      //
      for (let i = 0; i < tempTagData.length; i++) {
        if (tempTagData[i].path === route) {
          tempTagData[i].closable = false;
          tempTagData[i].effect = "dark";
        } else {
          if (tempTagData[i].label === "首页") {
            tempTagData[i].closable = false;
          } else {
            tempTagData[i].closable = true;
          }
          tempTagData[i].effect = "plain";
        }
      }
      return tempTagData;
    }
  },
  watch: {
    $route(to, from) {
      if (to.name) {
        let obj = {};
        obj.label = utils.findBreadcrumb(to.path);
        obj.path = to.path;
        obj.effect = "plain";
        obj.closable = true;
        this.$store.commit("common/tagsData_Mutations", obj);
      }
    }
  }
};
</script>

<style lang="less">
.g-menu-tabs {
  padding: 6px 16px;
  border-bottom: 1px solid #d2d2d2;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  box-sizing: content-box;
  .el-scrollbar__bar {
    bottom: 0px;
  }
  .el-scrollbar__wrap {
    height: 28px;
  }
  .el-tag {
    margin-right: 4px;
    cursor: pointer;
  }
}
</style>