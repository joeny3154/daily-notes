列表渲染
======

- 数组

在 v-for 块中，我们拥有对父作用域属性的完全访问权限。

 <li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>

- 对象

在遍历对象时，是按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下是一致的。

<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }}: {{ value }}
</div>

# key

列表渲染是默认使用“就地复用”策略，这种策略是高效的。

如果依赖子**组件状态**或**临时 DOM 状态** (例如：表单输入值) 的列表渲染输出，这不适用使默认的模式

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。

eg:
```
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```
建议尽可能在使用 v-for 时提供 key，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。


> 2.2.0+ 的版本里，当在**组件中**使用 v-for 时，key 现在是必须的