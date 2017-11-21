

reduce
======
reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。

# 语法

arr.reduce(callback[, initialValue])

- callback(accumulator, currentValue, currentIndex, array)
执行数组中每个值的函数，包含四个参数：

  accumulator
  累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或`initialValue`（如下所示）。

  currentValue
  数组中正在处理的元素。

  currentIndex
  数组中正在处理的当前元素的索引。 如果提供了initialValue，则索引号为0，否则为索引为1。

  array
  调用reduce的数组

- initialValue
[可选] 用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

- 返回值

函数累计处理的结果



