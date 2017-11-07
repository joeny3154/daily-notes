
枚举（Enum）
=======

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。


enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

- 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true

### 枚举项有两种类型：常数项（constant member）和计算所得项（computed member)

<!-- "blue".length 就是一个计算所得项 -->
enum Color {Red, Green, Blue = "blue".length};

### 常数枚举

const enum Directions {
  Up,
  Down,
  Left,
  Right
}

常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
<!-- 编译结果是： -->
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];


### 外部枚举

declare enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

declare 定义的类型只会用于编译时的检查，编译结果中会被删除。

<!-- 上例的编译结果是： -->
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

**同时使用 declare 和 const 也是可以的：**

declare const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
编译结果：

var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];