
Dropdown
=====



``` jsx
render(h) {
  let { hide, splitButton, type, dropdownSize } = this;
  let triggerElm = this.$slots.default
  return (
    <div class="el-dropdown" v-clickoutside={hide}>
      {triggerElm}
      {this.$slots.dropdown}
    </div>
  );
}
```

`v-clickoutside="handleClose"`: 点击元素外面才会触发的事件

`<div class="el-dropdown" v-clickoutside={hide}>`指令绑定一个`hide`方法，执行方法会设置`visible=false`，以此来实现下拉菜单的显示情况

``` js
hide() {
  if (this.triggerElm.disabled) return;
  this.removeTabindex();
  this.resetTabindex(this.triggerElm);
  clearTimeout(this.timeout);
  this.timeout = setTimeout(() => {
    this.visible = false;
  }, this.trigger === 'click' ? 0 : this.hideTimeout);
},
```

`vnode.context`

`nodeList`收集绑定指令的元素，并且元素上添加了事件处理函数`documentHandler`, 
`documentHandler`的主要逻辑就是：判断是否点击事件在元素外，如果是，将执行指令上绑定的`hide`方法。
然后在`document`上绑定两个事件，每个`mouseup`事件都会执行nodeList上的所有保存的元素上的`documentHandler`。

``` js
!Vue.prototype.$isServer && on(document, 'mousedown', e => (startClick = e));

!Vue.prototype.$isServer && on(document, 'mouseup', e => {
  nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
});
```

``` js
function createDocumentHandler(el, binding, vnode) {
  return function(mouseup = {}, mousedown = {}) {
    if (!vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      // `node.contains( otherNode )`返回一个布尔值，表示传入的节点是否为该节点的后代节点
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      (vnode.context.popperElm &&
      (vnode.context.popperElm.contains(mouseup.target) ||
      vnode.context.popperElm.contains(mousedown.target)))) return;

    if (binding.expression &&
      el[ctx].methodName &&
      vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]();
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn();
    }
  };
}
```

Dropdown,


DropdownMenu,



DropdownItem,

