'use strict';
// 箭头函数

// var x => x* x;
// 箭头函数相当于匿名函数，并且简化了函数定义;但有所区别
//
//
//
// 箭头函数有两种格式，
// 一种像上面的，只包含一个表达式，连{ ... }和return都省略掉了。
// 还有一种可以包含多条语句，这时候就不能省略{ ... }和return

// 如果参数不是一个，就需要用()括起来
// 一个参数
var f_1 = x => x * 2;
console.log(f_1(3)); //6

//两个参数
var f_2 = (x, y) => x + y;
console.log(f_2(3, 4)); //7

//无参数
var f_0 = () => 222;
console.log(f_0()); //222

// 可变参数
var f_rest = (x, y, ...rest) => {
    let sum = x + y;
    rest.forEach(function(ele, index, arr) {
        sum += ele;
    })
    return sum;
};
console.log(f_rest(1, 2, 3, 4, 5)); //15

//返回 一个对象
// SyntaxError 因为对象{}和函数体的{ ... }有语法冲突
//x=>{foo:x};
//应改为 ：
var f_o = x => ({
    foo: x
});
console.log(f_o(5).foo); //5


// this
//
//箭头函数和匿名函数有个明显的区别：箭头函数内部的this是词法作用域，由上下文确定
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        // hack写法
        var that = this;
        var fn = function () {
          return new Date().getFullYear() - that.birth; // this指向window或undefined
        };
        return fn();
    }
};
console.log(obj.getAge());//26

//箭头函数完全修复了this的指向，this总是指向词法作用域，也就是外层调用者obj：
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
console.log(obj.getAge()); // 26

//由于this在箭头函数中已经按照词法作用域绑定了，所以，用call()或者apply()调用箭头函数时，无法对this进行绑定，即传入的第一个参数被忽略：
var obj = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        var fn = (y) => y - this.birth; // this.birth仍是1990
        return fn.call({birth:2000}, year);
    }
};
console.log(obj.getAge(2015)); // 25
