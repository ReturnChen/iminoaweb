<template>
  <div class="g-page">
    <div class="header">
      <g-header></g-header>
    </div>
    <div class="contentwrap" :class="classObj">
      <!-- 左侧菜单 -->
      <div class="aside">
        <g-aside></g-aside>
      </div>
      <!-- 右侧 -->
      <div class="content">
        <!-- tabs菜单 -->
        <div class="tabs">
          <g-menu-tabs></g-menu-tabs>
        </div>
        <!-- 面包屑 -->
        <div class="breadcrumb">
          <g-breadcrumb></g-breadcrumb>
        </div>
        <!-- 路由内容 -->
        <div class="main">
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "g-page",
  computed: {
    menucollapse() {
      return this.$store.state.common.menucollapse;
    },
    classObj() {
      return {
        hideSidebar: this.$store.state.common.menucollapse,
        openSidebar: !this.$store.state.common.menucollapse
      };
    }
  }
};
</script>

<style scoped lang="less">
.g-page {
  min-width: 1366px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    height: 60px;
  }
  .contentwrap {
    flex: 1;
    min-width: 1366px;
    display: flex;
    height: 100%;
    position: relative;
    .aside {
      max-width: 260px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      border-right: solid 1px #e6e6e6;
      background: #fff;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
  .openSidebar {
    .content {
      min-width: 1366-260px;
      padding-left: 260px;
      flex: 1;
      display: flex;
      flex-direction: column;
      transition: padding 0.28s;
      .tabs {
        height: 41px;
      }
      .breadcrumb {
        height: 50px;
      }
      .main {
        flex: 1;
        background-color: #fff;
      }
    }
  }
  .hideSidebar {
    .content {
      min-width: 1366-260px;
      padding-left: 64px;
      flex: 1;
      display: flex;
      flex-direction: column;
      transition: padding 0.28s;
      .tabs {
        height: 41px;
      }
      .breadcrumb {
        height: 50px;
      }
      .main {
        flex: 1;
        background-color: #fff;
      }
    }
  }
}
</style>
