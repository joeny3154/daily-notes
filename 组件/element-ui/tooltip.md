

思路




`beforeCreate` 添加一个`this.popperVM`属性，保存了一个文档之外渲染的实例，实例data中node保存的是tooltip实例, popperVM的render方法直接渲染tooltip实例(node),由于初始为`''`, 后续ElTooltip组件中的render会更改node，渲染定义的tooltip内容。

``` js
beforeCreate() {
  if (this.$isServer) return;

  this.popperVM = new Vue({
    data: { node: '' },
    render(h) {
      return this.node;
    }
  })
  .$mount();
  // 使用 vm.$mount() 手动地挂载一个未挂载的实例。
  // 如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生DOM API把它插入文档中
  // eg: 在文档之外渲染并且随后挂载：
  // var component = new MyComponent().$mount(); document.getElementById('app').appendChild(component.$el)
  this.debounceClose = debounce(200, () => this.handleClosePopper());
},
render(h) {
    if (this.popperVM) {
      // 更改node，触发popperVM的render方法
      this.popperVM.node = (
        <transition
          name={ this.transition }
          onAfterLeave={ this.doDestroy }>
          <div
            onMouseleave={ () => { this.setExpectedState(false); this.debounceClose(); } }
            onMouseenter= { () => { this.setExpectedState(true); } }
            ref="popper"
            role="tooltip"
            id={this.tooltipId}
            aria-hidden={ (this.disabled || !this.showPopper) ? 'true' : 'false' }
            v-show={!this.disabled && this.showPopper}
            class={
              ['el-tooltip__popper', 'is-' + this.effect, this.popperClass]
            }>
            { this.$slots.content || this.content }
          </div>
        </transition>);
    }
  // ...
},
```

`render` 方法返回参考元素：

``` js
render(h) {
  if (this.popperVM) {
    this.popperVM.node = (
      //...
    )
  }
  // 返回参考元素
  if (!this.$slots.default || !this.$slots.default.length) return this.$slots.default;
  const vnode = getFirstComponentChild(this.$slots.default);
  if (!vnode) return vnode;
  const data = vnode.data = vnode.data || {};
  data.staticClass = this.concatClass(data.staticClass, 'el-tooltip');

  return vnode;
},
```

tooltip容器添加了一个`id=tooltipId`, 同时参考元素添加了一个describedby属性，`this.$el.setAttribute('aria-describedby', this.tooltipId);`

``` html
<el-tooltip placement="top">
  <div slot="content">多行信息<br/>第二行信息</div>
  <el-button>Top center</el-button>
</el-tooltip>
```

``` js
export function getFirstComponentChild(children) {
  return children && children.filter(c => c && c.tag)[0];
};

// 获取参考元素，这里就是<el-button>
if (!this.$slots.default || !this.$slots.default.length) return this.$slots.default;
const vnode = getFirstComponentChild(this.$slots.default);
if (!vnode) return vnode;
const data = vnode.data = vnode.data || {};
// data.staticClass
data.staticClass = this.concatClass(data.staticClass, 'el-tooltip');
```

