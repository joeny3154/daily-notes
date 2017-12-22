
不能在 Vue 模板中的 HTML 属性上使用双花括号语法(mustache)，而应该使用 v-bind 指令：

<div v-bind:id="dynamicId"></div>