

on(events,[selector],[data],fn)

events:一个或多个用空格分隔的事件类型和可选的命名空间，如"click"或"keydown.myPlugin" 。
selector:一个选择器字符串用于过滤器的触发事件的选择器元素的后代。如果选择器为null或省略，当它到达选定的元素，事件总是触发。
data:当一个事件被触发时要传递event.data给事件处理函数。
fn:该事件被触发时执行的函数。 false 值也可以做一个函数的简写，返回false。

# 给未来元素绑定事件

```
<!-- 无效 -->
$('#list li').on('click', function() {
  console.log($(this).attr('class'))
})

<!-- 有效 -->
$('#list').on('click', 'li', function() {
  console.log($(this).attr('class'))
})

<!-- 未来生成li -->
setTimeout(function() {
  $('#list').append(
    $(
      `
        <li class="i-1">1</li>
        <li class="i-2">2</li>
        <li class="i-3">3</li>
      `
    )
  )
}, 1000)
```

