import Vue from 'vue'
import App from './App'
import { createRouter } from './router'

Vue.config.productionTip = false

export function createApp () {
  const router = createRouter()
  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    render: h => h(App)
  })

  return { app, router }
}
