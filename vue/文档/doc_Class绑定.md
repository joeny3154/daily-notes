


绑定 HTML Class
=====

# 对象语法

<div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

绑定的数据对象不必内联定义在模板里

<div v-bind:class="classObject"></div>

data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}

# 数组语法

<div v-bind:class="[activeClass, errorClass]"></div>

eg: 使用三元表达式
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

eg: 在数组语法中也可以使用对象语法

<div v-bind:class="[{ active: isActive }, errorClass]"></div>

# 用在组件上

Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})

<my-component class="active"></my-component>
<my-component v-bind:class="{ active: isActive }"></my-component>

渲染为：
<p class="foo bar active">Hi</p>