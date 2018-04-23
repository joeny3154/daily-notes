
Mutation
====

https://github.com/vuejs/vuex/blob/dev/docs/zh-cn/mutations.md

Mutation 必须是同步函数

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 `state` 作为第一个参数：

eg: 提交载荷（Payload）

``` js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

**提交 `Mutation`**

载荷方式 or 对象方式:

`store.commit('increment', payload)` or `store.commit({type: 'increment', payload})`

组件内提交：

`this.$store.commit('increment', payload)` or `this.$store.commit({type: 'increment', payload})`

**`mapMutations` 辅助函数**

使用`mapMutations` 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）:

eg:
```
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

# 使用常量替代 Mutation 事件类型

eg:

``` js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'

// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```