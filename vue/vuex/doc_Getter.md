
Getter
=====

可以认为是 store 的计算属性

`Getter` 有第两个参数, `state`, `getters`（其他 getter）

const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: (state, getters) => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  }
})

**可以通过让 getter 返回一个函数，来实现给 getter 传参。**

```
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

# mapGetters 辅助函数


import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
      // ...
    ])
  }
}