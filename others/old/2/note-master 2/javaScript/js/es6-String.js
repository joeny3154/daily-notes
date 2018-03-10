'use strict'
var name = 'joeny';
var age = 27;
//多行字符串
var str_1 = `
  这是一个
  多行
  字符串
`;
//模板字符串
var str_2 =`这是一个模板${name}字符串${age}`;
// 使用 '' or "" 无效
var str_3 =`这是一个拼接${name}字符串${age}`;
console.log(str_1);
console.log(str_2);
console.log(str_3);
