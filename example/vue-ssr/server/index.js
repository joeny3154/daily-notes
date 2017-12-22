const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, file)

// 生成服务端渲染函数
const renderer = createBundleRenderer(require('../dist/vue-ssr-server-bundle.json'), {
  // 推荐
  runInNewContext: false,
  // 模板html文件
  template: fs.readFileSync(resolve('../index.html'), 'utf-8'),
  // client manifest
  clientManifest: require('../dist/vue-ssr-client-manifest.json')
})

const renderToString = context => {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => err ? reject(err) : resolve(html))
  })
}

app.use(require('koa-static')(resolve('../dist')))

// response
app.use(async (context, next) => {
  // ctx.body = 'Hello Koa'
  try {
    const _context = {
      title: '服务端渲染测试',
      url: context.url
    }
    context.body = await renderToString(_context)
    // 设置请求头
    ctx.set('Content-Type', 'text/html')
    ctx.set('Server', 'Koa2 server side render')
  } catch (e) {
    // 如果没找到，放过请求，继续运行后面的中间件
    next()
  }
})

const host = 3001
app.listen(host)
  .on('listening', () => console.log(`服务已启动: http://localhost:${host}`))
  .on('error', err => console.log(err))