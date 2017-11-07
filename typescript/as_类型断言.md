类型断言
=======
类型断言（Type Assertion）可以用来绕过编译器的类型推断，手动指定一个值的类型（即程序员对编译器断言）。

#语法

- <类型>值

// 或

- 值 as 类型

// 在TSX语法 (React的JSX语法的TS版）中必须用后一种

**将一个联合类型的变量指定为一个更加具体的类型**

function getLength(something: string | number): number {
  <!-- 不断言会报错 -->
  if ((<string>something).length) {
    <!-- 不断言会报错 -->
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}

**类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的**

function toBoolean(something: string | number): boolean {
  <!-- 类型断言不是类型转换 -->
  return <boolean>something;
}