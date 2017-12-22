import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const Home = {template: '<div><h2>Home Page</h2></div>'}
const Contact = {template: '<div><h2>Contact Page</h2></div>'}
const About = {template: '<div><h2>About Page</h2></div>'}

Vue.use(Router)

export default new Router({
  mode: 'history', // 注意这里也是为history模式
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})
