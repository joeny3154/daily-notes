'use strict';

// 高阶函数 ：一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

//map

function pow(x){
  return x*x;
}
var arr_1=[1,2,3,4,5,6,7,8,9];
var _arr_1 = arr_1.map(pow);//平方
_arr_1.forEach(function(ele,index,arr){
  console.log(index+ " : "+ ele);
})

//Array.prototype.map() : https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map
var _arr_1 = arr_1.map(String);//转字符串
_arr_1.forEach(function(ele,index,arr){
  console.log(index+ " : "+ ele);
})

// reduce
//这个函数必须接收两个参数，reduce()把结果继续和序列的下一个元素做累积计算，
//[x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)

// 数组求和用reduce 实现
console.log("===================reduce===================")
var arr_reduce = [1,2,3,4,5,6,7,8,9];
var sum_reduce = arr_reduce.reduce(function(x,y){
  return x+y;
})
console.log(sum_reduce);//45

'use strict';

var arr_p = ['1', '2', '3'];
var r_p;
console.log('[' + r[0] + ', ' + r[1] + ', ' + r[2] + ']');
r_p = arr_p.map(parseInt);// 0 NaN  NaN

//原因
//[].map(function(ele,index,arr){...})

//???????????????????????????/不确定
// parseInt('0', 0); // 0, 按十进制转换
//
// parseInt('1', 1); // NaN, 没有一进制
//
// parseInt('2', 2); // NaN, 按二进制转换不允许出现2
