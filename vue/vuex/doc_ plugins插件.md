插件
====

Vuex 的 store 接受 plugins 选项，这个选项暴露出每次 mutation 的钩子。Vuex 插件就是一个函数，它接收 store 作为唯一参数：

```
const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
  })
}
```

**使用：**

```
const store = new Vuex.Store({
  // ...
  plugins: [myPlugin]
})
```


# 在插件内提交 Mutation

在插件中**不允许直接修改状态**——类似于组件，只能通过提交 `mutation` 来触发变化。

通过提交 mutation，插件可以用来同步**数据源**到 store。

例如，同步 websocket 数据源到 store（下面是个大概例子，实际上 createPlugin 方法可以有更多选项来完成复杂任务）：

```
export default function createWebSocketPlugin(socket) {
  return store => {
    socket.on('data', data => {
      store.commit('receiveData', data)
    })

    socket.subscribe((mutation, state) => {
      if(mutation.type === 'UPDATE_DATA') {
        socket.emit('update', mutation.payload)
      }
    })
  }
}
```

*使用：*

```
const plugin = createWebSocketPlugin(socket)

const store = new Vuex.Store({
  state,
  mutations,
  plugins: [plugin]
})
```


