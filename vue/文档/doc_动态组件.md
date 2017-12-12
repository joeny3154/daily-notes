

动态组件
====

可以让多个组件使用同一个挂载点，然后动态地在它们之间切换。要实现此效果，我们可以使用 Vue 保留的 <component> 元素，将多个组件动态地绑定到 <component> 元素的 is 属性上：

<component v-bind:is="currentView">
  <!-- 组件在 vm.currentview 变化时改变！ -->
</component>

var Home = {
  template: '<p>Welcome home!</p>'
}

var vm = new Vue({
  el: '#example',
  data: {
    currentView: 'home'
  },
  components: {
    home: Home,
    posts: Posts,
    archive: Archive
  }
})

# keep-alive


如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数：

<keep-alive>
  <component :is="currentView">
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>