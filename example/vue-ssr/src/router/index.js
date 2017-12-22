import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

const Contact = {template: '<div><h2>Contact Page</h2></div>'}

Vue.use(Router)

// 为了避免产生单例的影响，暴露出createRouter 每次返回一个新的 router 实例
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/count',
        name: 'Count',
        // 异步组件
        component: () => import('@/components/Count')
      },
      {
        path: '/contact',
        name: 'Contact',
        // 异步组件
        component: Contact
      }
    ]
  })
}
