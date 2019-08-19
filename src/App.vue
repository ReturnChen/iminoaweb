<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRouterAlive: false
    };
  },
  created() {
    this.isRouterAlive = true;
    // this.$router.push({
    //   name: "login"
    // });
  }
};
</script>>

<style lang="less">
html,
body,
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.el-header {
  background-color: rgb(64, 158, 255);
  color: #333;
  line-height: 80px;
}

.el-main {
  background-color: #e9eef3;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
