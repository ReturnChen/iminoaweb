
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  assetsDir: "assets",
  productionSourceMap: true,
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
    // 使用@简化路径
    config.resolve.alias.set('@', resolve('src'))
  }
}
