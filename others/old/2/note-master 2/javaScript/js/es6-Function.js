'use strict';
// arguments 指向当前函数的调用者传入的所有参数

//arguments类似Array但它不是一个Array

function foo(x) {
    console.log(x); // 10
    for (var i=0; i<arguments.length; i++) {
        console.log(arguments[i]); // 10, 20, 30
    }
}
foo(10, 20, 30);


// 利用arguments，你可以获得调用者传入的所有参数。也就是说，即使函数不定义任何参数，还是可以拿到参数的值：
console.log("================abs=====================")
function abs(){
  if(arguments.length === 0){
    return 0;
  }
  var x = arguments[0];
  return x>= 0 ? x : -x;
}

console.log(abs()); // 0
console.log(abs(10)); // 10
console.log(abs(-9)); // 9

console.log("================arguments常见作用：可选参数=====================")
//foo2(a[,b],c) //b为可选参数
function foo2(a,b,c){
  if(arguments.length === 2){
    c = b;
    b = null;
  }
}
// 要把中间的参数b变为“可选”参数，就只能通过arguments判断，然后重新调整参数并赋值。

console.log("================rest参数:获取额外参数=====================")
// rest参数
//ES6标准引入了rest参数，多余的参数以数组形式交给变量rest
function sum(...r) {
 var sum = 0;
 r.forEach(function(e,i,a){
  sum += e;
 })
 return sum;
}

console.log("================ 作用域  let=====================")

//局部作用域
 // let const

 function fun_var(){
   var sum = 0;
   for(var i = 0; i<3;i++){
     sum += i;
   }
   console.log(i);//3
 }
fun_var();

function fun_let(){
  var sum = 0;
  for(let i = 0; i<3;i++){
    sum += i;
  }
//  console.log(i);// ReferenceError: i is not defined
}
fun_let();

if(true){
  let a_let = 1;
}
// console.log("a_let : "+a_let) //ReferenceError: a_let is not defined

console.log("================ 作用域 const=====================")

// `const`与`let`都具有块级作用域**
if(true){
  const a_const = 1;
//  a_const = 2;//TypeError 不可以更改
  console.log(a_const); //1
}
console.log(a_const); //ReferenceError  a_const is not defined
