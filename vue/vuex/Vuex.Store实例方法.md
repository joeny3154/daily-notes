
Vuex.Store实例方法
=====

https://github.com/vuejs/vuex/blob/dev/docs/zh-cn/api.md

- `subscribe(handler: Function)`

注册监听 store 的 **`mutation`**。handler 会在每个 mutation 完成后调用，接收 mutation 和经过 mutation 后的状态作为参数：

store.subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
})

**通常用于插件。**

- `subscribeAction(handler: Function)`

订阅 store 的 action。handler 会在每个 action 分发的时候调用并接收 action 描述和当前的 store 的 state 这两个参数：

store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})

**该功能常用于插件。**
