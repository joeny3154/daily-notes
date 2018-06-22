

你也许对 Vue 的 template (模板) 已经很熟悉了，如果你是用了 webpack + vue-loader 之类的组合，它其实是被转换成了 render 函数。


``` html
<template>
  <div>{{ msg }}<div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello'
    }
  }
}
</script>
```

被 webpack + vue-loader 处理后是:

``` js
export default {
  data() {
    return {
      msg: 'hello'
    }
  },
  render() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', [_vm._v(_vm._s(_vm.msg)), _c('div')])
  }
}
```


在使用 JSX 的时候，类似 template，不过只会转换 render 函数中的 JSX 表达式。

``` js
export default {
  data() {
    return {
      msg: 'hello'
    }
  },
  render() {
    return <div>{this.msg}</div>
  }
}
```

``` js
export default {
  data() {
    return {
      msg: 'hello'
    };
  },
  render() {
    const h = arguments[0];

    return h(
      'div',
      null,
      [this.msg]
    );
  }
};
```