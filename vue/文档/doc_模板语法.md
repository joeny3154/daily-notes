# 插值

- 文本

<span>Message: {{ msg }}</span>

- 一次性插值

<span v-once>这个将不会改变: {{ msg }}</span>

- 原始html

<p>Using v-html directive: <span v-html="rawHtml"></span></p>

不能使用 v-html 来复合局部模板，因为 Vue 不是基于字符串的模板引擎。

# 特性

Mustache 语法不能作用在 HTML 特性上，遇到这种情况应该使用 `v-bind` 指令：

<div v-bind:id="dynamicId"></div>

# 指令

指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

- 参数

一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，v-bind 指令可以用于响应式地更新 HTML 属性：

<a v-bind:href="url">...</a>

<a v-on:click="doSomething">...</a>

# 修饰符
修饰符 (Modifiers) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。

eg: .prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()

<form v-on:submit.prevent="onSubmit">...</form>


# 缩写

- v-bind 缩写:

<!-- 完整语法 -->
<a v-bind:href="url">...</a>
<!-- 缩写 -->
<a :href="url">...</a>

- v-on 缩写:

<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>
<!-- 缩写 -->
<a @click="doSomething">...</a>

