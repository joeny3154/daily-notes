'use strict'

var m = new Map();
var s = new Set();

console.log("支持 Map Set !")
    //Map : {} 对象的key 只能是 String类型，Map的key可以是其他数据类型
    // map 初始化
    // 方法1：传入一个数组
var m_1 = new Map([
    ["one", 1],
    [2, "two"]
]);
//方法2 ： 初始化一个空Map对象 通过set方法添加
// var m_1 = new Map ();
m_1.set('3', 3);
m_1.set('4', 4);
m_1.delete("4");
console.log(m_1.has('one')); // true
console.log(m_1.has('4')); // false
console.log("one:" + m_1.get("one")); //one:1
console.log("2:" + m_1.get(2)); //  ;2:two


// Set 初始化
// 初始化
var s_1 = new Set([1, "2", 3]);
//var s_1 = new Set();
s_1.add(4); // {1, "2", 3,4}
s_1.add("5"); // {1, "2", 3,4,"5"}
s_1.delete("5"); // {1, "2", 3,"4"}
s_1.has("5"); // false
s_1.add({a:1,b:2})
//Set.prototype.clear() //清除所有

//没有get 方法 ：不需要

// Set 迭代 s_1 {1, "2", 3,"4"}
console.log(s_1.size); //4
//iterable 类可以用for ...of 方法进行循环
for (let item of s_1) console.log(item); //1 2 3 4 {a:1,b:2}
//转对象 Set保存的值即可以是值，有可以是键
for (let item of s_1.keys()) console.log(item); //1 2 3 4 {a:1,b:2}
for (let item of s_1.values()) console.log(item); //1 2 3 4 {a:1,b:2}

//转数组
var arr = Array.from(s_1);
for(let item of arr) console.log(item); //1 2 3 4 {a:1,b:2}

//Set 去重；取代hash去重法
