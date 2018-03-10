// generator（生成器）
// generator（生成器）是ES6标准引入的新的数据类型。


// generator由function*定义（注意多出的*号），并且，除了return语句，还可以用yield返回多次。


// generator就是能够返回多次的“函数”？返回多次有啥用？


// 斐波那契数列   0 1 1 2 3 5 8 13 21 34  ...
// 普通函数 实现
function fib_f(max) {

    var arr = [0, 1],
        a = 0,
        b = 1,
        t;
    while (arr.length < max) {
        t = a +b;
        a = b;
        b =t;
        arr.push(t);
    }

    return arr;
}
console.log(fib_f(1));
console.log(fib_f(2));
console.log(fib_f(3));
console.log(fib_f(8));

//generator 实现
function fib_g(max) {

    var  a = 0,
        b = 1,
        n =1,
        t;
    while (n < max) {
      yield a;
        t = a +b;
        a = b;
        b =t;
      n++;
    }
    return a;
}
// 创建了一个generator 对象
var g = fib_g(5);

//



// 直接调用一个generator和调用函数不一样，fib(5)仅仅是创建了一个generator对象，还没有去执行它。

// 调用generator对象有两个方法：
// 一是不断地调用generator对象的next()方法：

// next()方法会执行generator的代码，然后，每次遇到yield x;就返回一个对象{value: x, done: true/false}，然后“暂停”。返回的value就是yield的返回值，done表示这个generator是否已经执行结束了。如果done为true，则value就是return的返回值。
//
// 当执行到done为true时，这个generator对象就已经全部执行完毕，不要再继续调用next()了。
//
// 第二个方法是直接用for ... of循环迭代generator对象，这种方式不需要我们自己判断done：

//generator的好处：

//1.因为generator可以在执行过程中多次返回，所以它看上去就像一个可以记住执行状态的函数，利用这一点，写一个generator就可以实现需要用面向对象才能实现的功能。

//用对象的属性来保存状态，相当繁琐:

//2.generator还有另一个巨大的好处，就是把异步回调代码变成“同步”代码。这个好处要等到后面学了AJAX以后才能体会到。
// 没有generator之前的黑暗时代，用AJAX时需要这么写代码：
// ajax('http://url-1', data1, function (err, result) {
//     if (err) {
//         return handle(err);
//     }
//     ajax('http://url-2', data2, function (err, result) {
//         if (err) {
//             return handle(err);
//         }
//         ajax('http://url-3', data3, function (err, result) {
//             if (err) {
//                 return handle(err);
//             }
//             return success(result);
//         });
//     });
// });

//   try {
//     r1 = yield ajax('http://url-1', data1);
//     r2 = yield ajax('http://url-2', data2);
//     r3 = yield ajax('http://url-3', data3);
//     success(r3);
// }
// catch (err) {
//     handle(err);
// }
