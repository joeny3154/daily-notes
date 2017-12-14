


Vuex 自带一个日志插件用于一般的调试:

eg:
```
import createLogger from 'vuex/dist/logger'

const store = new Vuex.Store({
  plugins: [createLogger()]
})
```

# `createLogger` 函数有几个配置项：

```
const logger = createLogger({
  collapsed: false, // 自动展开记录的 mutation
  filter (mutation, stateBefore, stateAfter) {
    // 若 mutation 需要被记录，就让它返回 true 即可
    // 顺便，`mutation` 是个 { type, payload } 对象
    return mutation.type !== "aBlacklistedMutation"
  },
  transformer (state) {
    // 在开始记录之前转换状态
    // 例如，只返回指定的子树
    return state.subTree
  },
  mutationTransformer (mutation) {
    // mutation 按照 { type, payload } 格式记录
    // 我们可以按任意方式格式化
    return mutation.type
  },
  logger: console, // 自定义 console 实现，默认为 `console`
})
```

日志插件还可以直接通过 <script> 标签引入，它会提供全局方法 createVuexLogger。

要注意，logger 插件会生成状态快照，所以仅在开发环境使用。