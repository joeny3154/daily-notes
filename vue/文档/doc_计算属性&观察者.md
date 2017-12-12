

计算属性和观察者
=====


# 计算属性(computed)

```
<p>Computed reversed message: "{{ reversedMessage }}"</p>

computed: {
  // 计算属性的 getter
  reversedMessage: function () {
    // `this` 指向 vm 实例
    return this.message.split('').reverse().join('')
  }
}
```

- 计算属性(computed) vs 方法(methods)

计算属性有缓存（立即返回之前的计算结果）,只有在它的相关依赖发生改变时才会重新求值，方法每次需要重新执行函数

**如果你不希望有缓存，请用方法来替代。**

方法的写法：

methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
<p>Reversed message: "{{ reversedMessage() }}"</p>

两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的依赖进行缓存的**。
计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，**而不必再次执行函数**。

eg: 计算属性将不再更新，因为 Date.now() 不是响应式依赖(没有相关的依赖，不存在相关依赖发生改变时的重新求值)
computed: {
  now: function () {
    return Date.now()
  }
}


- 计算属性(computed) vs 侦听属性(watch)

通常更好的做法是使用计算属性而不是命令式的 watch 回调

大部分时候使用计算属性（computed）；当需要在数据变化时执行**异步或开销较大的操作**时，使用侦听属性（watch）

eg:

```
<input v-model="question">

watch: {
  // 如果 `question` 发生改变，这个函数就会运行
  question: function (newQuestion) {
    this.answer = 'Waiting for you to stop typing...'
    this.getAnswer()
  }
},
methods: {
  // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
  // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
  // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
  // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
  // 请参考：https://lodash.com/docs#debounce
  getAnswer: _.debounce(
    function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    },
    // 这是我们为判定用户停止输入等待的毫秒数
    500
  )
}
```

在这个示例中，使用 watch 选项允许我们执行*异步操作* (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。