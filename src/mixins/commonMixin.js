export const commonMixin = {
  data () {
    return {
      dialogFormVisible: false,
      dialogTitle: '新增',
      dialogFormApi: 'http://www.xxx.com/api'
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 打开dialog
    dialogFormOpen () {
      this.dialogFormVisible = true
    },
    // 关闭dialog
    dialogFormClose () {
      this.dialogFormVisible = false
    },
    dialogFormSubmit() {
      this.dialogFormVisible = false
    },
    // 普通消息提示
    normalMessage (str) {
      this.$message({
        showClose: true,
        message: str
      })
    },
    // 普通消息提示
    successMessage (str) {
      this.$message({
        showClose: true,
        message: str,
        type: 'success'
      })
    },
    // 警告消息提示
    warningMessage (str) {
      this.$message({
        showClose: true,
        message: str,
        type: 'warning'
      })
    },
    // 错误消息提示
    errMessage (str) {
      this.$message({
        showClose: true,
        message: str,
        type: 'error'
      })
    },
    // 表单验证
    checkForm (formName) {
      let check = false
      this.$refs[formName].validate(valid => {
        check = valid
      })
      return check
    }
  }
}
