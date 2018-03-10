//函数作为返回值
// 在外部函数内部又定义了函数，并且，内部函数可以引用外部函数的参数和局部变量，当l外部函数返回内部函数时，外部函数的相关参数和变量都保存在返回的函数中，这就形成了“闭包（Closure）；

function sum(arr) {
    return _sum = function() {
        return arr.reduce(function(x, y) {
            return x + y;
        });
    };
}
var f_sum = sum([1, 2, 3, 4, 5]);
console.log("f_sum:" + f_sum()); //15

/// 闭包
// 返回的函数在其定义内部引用了局部变量 ;当一个函数返回了一个函数后，其内部的局部变量还被新函数引用
function count() {
    var arr = [];
    for (let i = 1; i <= 3; i++) { //var 16 16 16 let  :1 4 9
        arr.push(function() {
            return i * i;
        })
    }
    return arr;
}
var results = count();
var f_1 = results[0];
var f_2 = results[1];
var f_3 = results[2];
console.log(f_1()); // 16
console.log(f_2()); // 16
console.log(f_3()); // 16

function _count() {
    var arr = [];
    for (var i = 1; i <= 3; i++) {
        arr.push((function(n) {
            return function() {
                return n * n;
            };
        })(i));
    }
    return arr;
}
var _results = _count();
console.log(_results);
var _f_1 = _results[0];
var _f_2 = _results[1];
var _f_3 = _results[2];
console.log(_f_1()); // 1
console.log(_f_2()); // 4
console.log(_f_3()); // 9


// 注意： 用了一个 “创建一个匿名函数并立刻执行”的语法：
// (function (x) {
//     return x * x;
// })(3); // 9

// 闭包功能
// 1.延迟执行 如上

// 2.封装私有变量
function create_couter(initNum){
  var x =initNum || 0;
  return {
    init:function(){
      x ++;
      return x;
    }
  }
}
var c1=create_couter();
console.log(c1.init());// 1
console.log(c1.init());// 2
console.log(c1.init());// 3
console.log(c1.init());// 4

var c2=create_couter(10);
console.log(c2.init());// 11
console.log(c2.init());// 12
console.log(c2.init());// 13
console.log(c2.init());// 14

//3.闭包还可以把多参数的函数变成单参数的函数 幂计算

function make_pow(x){
  return function(y){
    return Math.pow(x,y)
  }
}
var pow2 =make_pow(2);
var pow3 =make_pow(3);
console.log(pow2(5));//32
console.log(pow3(3));//27
