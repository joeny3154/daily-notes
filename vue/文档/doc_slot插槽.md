
使用 slot 分发内容(Content Distribution with Slots)
===

eg:

父组件：

<app-layout>
  <h1 slot="header">这里可能是一个页面标题</h1>
  <p>主要内容的一个段落。</p>
  <p>另一个主要段落。</p>
  <p slot="footer">这里是一些联系信息</p>
</app-layout>

子组件

<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

渲染结果：

<div class="container">
  <header>
    <h1>这里可能是一个页面标题</h1>
  </header>
  <main>
    <p>主要内容的一个段落。</p>
    <p>另一个主要段落。</p>
  </main>
  <footer>
    <p>这里是一些联系信息</p>
  </footer>
</div>

# 具名 Slot

<slot> 元素有一个特殊的 name 属性，可以用于深度定制如何分发内容。可以给多个 slot 分配不同的名字。一个具有名称的 slot，会匹配内容片段中有对应 slot 属性的元素。
还是可以有一个没有名称的 slot 作为默认 slot，这个插口用于将那些未匹配到的内容全部接收进来。如果没有默认的 slot，这些未匹配到的内容将直接丢弃。


# 作用域插槽

在父级中，具有特殊特性 slot-scope 的 <template> 元素必须存在，表示它是作用域插槽的模板。slot-scope 的值将被用作一个临时变量名，此变量接收从子组件传递过来的 prop 对象：

`Parent.vue`

```
<div class="parent">
  <child>
    <template scope="props">
      <span>hello from parent</span>
      <span>{{ props.text }}</span>
    </template>
  </child>
</div>
```

在子组件中，只需将数据传递到插槽，就像你将 props 传递给组件一样：

`Child.vue`

```
<div class="child">
  <slot text="hello from child"></slot>
</div>
```

渲染结果：

```
<div class="parent">
  <div class="child">
    <span>hello from parent</span>
    <span>hello from child</span>
  </div>
</div>
```

允许组件自定义应该如何渲染列表每一项


> 在 2.5.0+，slot-scope 能被用在任意元素或组件中而不再局限于 <template>

作用域插槽更典型的用例是在列表组件中，允许使用者自定义如何渲染列表的每一项：

父组件：

<my-awesome-list :items="items">
  <!-- 作用域插槽也可以是具名的 -->
  <li
    slot="item"
    slot-scope="props"
    class="my-fancy-item">
    {{ props.text }}
  </li>
</my-awesome-list>

子组件：列表组件的模板

<ul>
  <slot name="item"
    v-for="item in items"
    :text="item.text">
    <!-- 这里写入备用内容 -->
  </slot>
</ul>