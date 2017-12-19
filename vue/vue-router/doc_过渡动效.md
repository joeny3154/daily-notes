
过渡动效
=====

<router-view> 是基本的动态组件，所以我们可以用 <transition> 组件给它添加一些过渡效果

# 给所有路由设置一样的过渡效果

<transition>
  <router-view></router-view>
</transition>

# 单个路由的过渡

每个路由组件有各自的过渡效果，可以在各路由组件内使用 <transition> 并设置不同的 name。


const Foo = {
  template: `
    <transition name="slide">
      <div class="foo">...</div>
    </transition>
  `
}

const Bar = {
  template: `
    <transition name="fade">
      <div class="bar">...</div>
    </transition>
  `
}

# 基于路由的动态过渡

还可以基于当前路由与目标路由的变化关系，动态设置过渡效果

<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}

查看完整例子请[移步这里](https://github.com/vuejs/vue-router/blob/next/examples/transitions/app.js)。