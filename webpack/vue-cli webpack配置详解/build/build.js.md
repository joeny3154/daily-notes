编译入口

``` js
'use strict'
require('./check-versions')()
// 设置当前环境为生产环境
process.env.NODE_ENV = 'production'
// loading...进度条
const ora = require('ora')
// 删除文件 'rm -rf'
const rm = require('rimraf')
const path = require('path')
// stdout颜色设置
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...') // 正在编译...
spinner.start()
// 清空文件夹
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 删除完成回调函数内执行编译
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    // 编译完成，输出编译文件
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    // error
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    // 完成
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})

```