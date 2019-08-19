<template>
  <div class="g-header">
    <span class="logo">TransRuns 热点网管平台</span>
    <!-- <span class="menufolder" @click="foldmenu">
      <i :class="menucollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </span> -->
    <div class="menu">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar class="avatar" shape="square" size="medium" :src="squareUrl"></el-avatar>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span>修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided></el-dropdown-item>
          <el-dropdown-item>
            <span @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <ul class="header-operations">
        <li class="flexpart">设备总数：212</li>
        <li class="flexpart">在线设备：10</li>
        <li class="flexpart">离线设备：76</li>
        <li class="flexpart">设备故障：0</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "g-header",
  data() {
    return {
      activeIndex: "1",
      username: "",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
    };
  },
  created() {
    let user = this.$store.state.user.user;
    if (user.name) {
      this.username = user.name;
    }
  },
  methods: {
    // 菜单折叠
    // foldmenu() {
    //   this.$store.commit("common/changemenucollapse_Mutations");
    // },
    logout() {
      this.$confirm("退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 清空各种数据
          // this.$localstore.set("wzyadmin_login", false);
          // this.$localstore.set("wzyadmin_user", {});
          // this.$store.commit("user/user_Mutations", {});
          // this.$store.commit("common/login_Mutations", false);
          // this.$localstore.set("wzyadmin_username", "");
          // this.$localstore.set("wzyadmin_password", "");
          this.$router.push({ name: "login" });
        })
        .catch(() => {
          //
        });
    }
  },
  // computed: {
  //   menucollapse() {
  //     return this.$store.state.common.menucollapse;
  //   }
  // }
};
</script>

<style lang="less">
.g-header {
  background: #4484FF;
  height: 60px;
  width: 100%;
  line-height: 60px;
  display: flex;
  color: #fff;
  .logo {
    width: 280px;
    height: 60px;
    line-height: 60px;
    display: block;
    color: #fff;
    font-size: 24px;
    font-weight: bolder;
    margin-left: 20px;
  }
  .menufolder {
    height: 60px;
    width: 60px;
    display: block;
    margin-left: 16px;
    cursor: pointer;
    color: #fff;
    font-size: 24px;
  }
  .menu {
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
    ul.header-operations {
      width: 500px;
      margin: 0;
      padding: 0;
      padding-right: 30px;
      height: 60px;
      display: flex;
      list-style: none;
      text-align: center;
      li.home {
        width: 80px;
        color: #fff;
        padding: 0 10px;
        cursor: pointer;
      }
      li.flexpart {
        flex: 1;
        color: #fff;
        padding: 0 10px;
        cursor: pointer;
      }
    }
    .el-dropdown {
      width: 80px;
      height: 60px;
      .el-dropdown-link {
        position: relative;
        cursor: pointer;
        // border-radius: 4px;
        .avatar {
          position: absolute;
          top: 12px;
        }
        .el-icon-arrow-down {
          position: absolute;
          left: 40px;
          top: 23px;
          color: #fff;
        }
      }
    }
  }
}
</style>