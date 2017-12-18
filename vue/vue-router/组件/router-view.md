


# 顶层出口 & 嵌套出口

`<router-view>` 是最顶层的出口，渲染最高级路由匹配到的组件。同样地，一个被渲染组件同样可以包含自己的嵌套 `<router-view>`

eg: 最顶层的出口
```
<div id="app">
  <router-view></router-view>
</div>
```

eg: 嵌套出口
```
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```

嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置

**注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。**