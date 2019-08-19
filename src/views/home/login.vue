<template>
  <div class="loginpage">
    <div class="loginformwrap">
      <div class="loginlogo">
        热点网管平台
      </div>
      <div class="loginform">
        <el-form ref="loginform" :model="loginform" :rules="rules">
          <el-form-item prop="account">
            <el-input v-model="loginform.account" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginform.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div class="buttonwrap">
            <el-form-item>
              <el-button type="primary" @click="onSubmit('loginform')">登录</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
//
export default {
  data() {
    return {
      loginform: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    onSubmit(formName) {
      if (!this.checkForm(formName)) return;
      //
      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<style lang="less">
.loginpage {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: url("../../assets/images/loginbg.jpg") center center no-repeat;
  .el-button--primary {
    width: 100%;
  }
  background-size: cover;
  .loginformwrap {
    position: absolute;
    top: 50%;
    left: 70%;
    margin: -160px 0 0 -160px;
    width: 320px;
    height: 328px;
    padding: 24px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
    background: #fff;
    .loginlogo {
      height: 68px;
      margin-bottom: 24px;
      text-align: center;
      color: #409EFF;
      line-height: 68px;
      font-size: 32px;
      font-weight: bolder;
    }
    .forgetpasswrap {
      text-align: right;
      margin: 10px 0;
      text-decoration: underline;
      .forgetpass {
        cursor: pointer;
      }
    }
    .buttonwrap {
      margin-top: 13px;
    }
  }
}
</style>
