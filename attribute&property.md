

HTML attribute 与 DOM property 的对比
=====================

要想理解 Angular 绑定如何工作，重点是搞清 HTML attribute 和 DOM property 之间的区别。

attribute 是由 HTML 定义的。property 是由 DOM (Document Object Model) 定义的。

- 少量 HTML attribute 和 property 之间有着 1:1 的映射，如id。
- 有些 HTML attribute 没有对应的 property，如colspan。
- 有些 DOM property 没有对应的 attribute，如textContent。
- 大量 HTML attribute看起来映射到了property…… 但却不像我们想的那样！

最后一类尤其让人困惑…… 除非我们能理解这个普遍原则：

attribute 初始化 DOM property，然后它们的任务就完成了。property 的值可以改变；attribute 的值不能改变。
例如，当浏览器渲染`<input type="text" value="Bob">`时，它将创建相应 `DOM` 节点， 其`value property` 被初始化为 “Bob”。
当用户在输入框中输入 “Sally” 时，DOM 元素的`value property` 变成了 “Sally”。 但是这个 HTML value attribute 保持不变。如果我们读取 input 元素的 `attribute`，就会发现确实没变： `input.getAttribute('value') // 返回 "Bob"`。

**`HTML attribute value`指定了初始值；`DOM value property` 是当前值。**

`disabled attribute` 是另一个古怪的例子。按钮的`disabled property` 是`false`，因为默认情况下按钮是可用的。 当我们添加`disabled attribute `时，只要它出现了按钮的`disabled property `就初始化为`true`，于是按钮就被禁用了。

添加或删除`disabled attribute`会禁用或启用这个按钮。但 `attribute` 的值无关紧要，这就是我们为什么没法通过 `<button disabled="false">`仍被禁用`</button>`这种写法来启用按钮。
设置按钮的`disabled property`（如，通过 Angular 绑定）可以禁用或启用这个按钮。 这就是 `property` 的价值。
就算名字相同，`HTML attribute` 和 `DOM property` 也不是同一样东西。
