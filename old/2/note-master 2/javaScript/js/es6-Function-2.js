'use strict';
// Function 方法：

// 方法：在对象中绑定函数，成为这个对象的方法

var xiaoming_1 = {
    name : '小明',
    birth: 1990,
    age: function() {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};

console.log(xiaoming_1.age());

console.log("====================this =====================");
//方法和普通函数的区别？
//没啥区别，但是它在内部使用了一个this关键字
//在方法内部（不是普通函数）,this它使用指向当前对象


//函数内部如果调用了this，那么this 指向谁呢？   视情况而定：
//如果以对象的方法形式调用，比如xiaoming.age()，该函数的this指向被调用的对象
//如果单独调用函数，比如getAge()，此时，该函数的this指向全局对象，也就是window。严格模式下 是 undefined
console.log("====================this 坑=====================");
//坑

var xiaoming_2 = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};

var fn = xiaoming_2.age;
//console.log(fn()); //非严格模式： NaN  //严格模式下：TypeError: Cannot read property 'birth' of undefined


//重构后
'use strict';

var xiaoming_3 = {
    name: '小明',
    birth: 1990,
    age: function () {
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - this.birth;
        }
        return getAgeFromBirth();
    }
};

//xiaoming_3.age();//TypeError: Cannot read property 'birth' of undefined
//原因是 ： this只在age方法的函数内指向当前对象小明；在函数内部定义的函数，this又指向undefined；（在非strict模式下，它重新指向全局对象window！）

// 解决：
var xiaoming_4 = {
  name: '小明',
  birth:1990,
  age:function(){
    var that = this;
    function getAge(){
      var y = new Date().getFullYear();
      return y - that.birth; // 用that而不是this
    }
    return getAge();
  }
}
var age_4=xiaoming_4.age();//
console.log("age_4: "+age_4) ;//26
//用var that = this;，你就可以放心地在方法内部定义其他函数，而不是把所有语句都堆到一个方法中。


// 控制 this 指向

//apply
console.log("======================apply====================");

function getAge_5() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming_5 = {
    name: '小明',
    birth: 1990,
    age: getAge_5
};

console.log(xiaoming_5.age()); // 26
console.log(getAge_5.apply(xiaoming_5, [])); // 26, this指向xiaoming, 参数为空

console.log("======================apply & call====================");
//区别：
// apply()把参数打包成Array再传入；
// call()把参数按顺序传入。

var m_1= Math.max.apply(null, [3, 5, 4]); // 5
var m_2=Math.max.call(null, 3, 5, 4); // 5
var m_3=Math.max(3, 5, 6,7); // 7 ???????????????????????????????????????
console.log(m_1);
console.log(m_2);
console.log(m_3);

// 对普通函数调用，我们通常把this绑定为null。


// 练习
var count = 0;
var oldParseInt = parseInt;
parseInt=function(){
  count++;
  return oldParseInt.apply(null,arguments);
}
parseInt("10");
parseInt("11");
parseInt("12");
console.log("count: "+count);//3
