'use strict';
//ES6标准引入了新的iterable类型

// Array、Map和Set都属于iterable类型。object不是；不能用for ... of 循环


// for ... of循环和for ... in循环有何区别？
//for ... in循环它遍历的实际上是对象的属性名称;Array 也是一个对象，它的每个元素的索引被视为一个属性；
//当我们手动给Array 对象添加额外的属性后；`for  ... in`
var arr = ['A', 'B', 'C'];
arr.name= "rose";
//  for ... in 问题：数组不应该存在Number 类型之外的索引
for (let x in arr){
  console.log(x);// 0 1 2  name
}
console.log("length:"+arr.length); // 3
// for ... of 解决了这个问题
for (let x of arr){
  console.log(x);// 0 1 2
}
console.log("length:"+arr.length); // 3

var obj ={"A":1,"B":2,"C":3};
obj.name= "rose";
for ( let x in obj){
  console.log(x);// A B C  name
}
console.log("length:"+obj.length); //undefined

// 更合适的方法  iterable内置的forEach方法
var a = new Array("a","b","c");
a.forEach(function(ele,index,arr){
  console.log("index: "+index + "ele:"+ ele) ;
})
