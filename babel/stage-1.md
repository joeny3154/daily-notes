### stage-1

除了包含stage-2和stage-3，还包含了下面4个插件

- transform-class-constructor-call
这个模块已经废弃，不再使用了

- transform-class-properties
下面是一个有四个类属性的类，将被转换。

```
class Bork {
    //属性初始化器语法 Property initializer syntax
    instanceProperty = "bork";
    boundFunction = () => {
      return this.instanceProperty;
    }

    //静态类属性 Static class properties
    static staticProperty = "babelIsCool";
    static staticFunction = function() {
      return Bork.staticProperty;
    }
  }

  let myBork = new Bork;

  //属性初始化器不在原型上：Property initializers are not on the prototype.
  console.log(myBork.__proto__.boundFunction); // > undefined

  //绑定函数绑定到类实例。 Bound functions are bound to the class instance.
  console.log(myBork.boundFunction.call(undefined)); // > "bork"

  //类上存在静态函数 Static function exists on the class.
  console.log(Bork.staticFunction()); // > "babelIsCool"
```

- transform-decorators

使用autobind装饰器

**Class decorator**

@isTestable(true)
class MyClass { }

function isTestable(value) {
   return function decorator(target) {
      target.isTestable = value;
   }
}

**Class function decorator**

class C {
  @enumerable(false)
  method() { }
}

function enumerable(value) {
  return function (target, key, descriptor) {
     descriptor.enumerable = value;
     return descriptor;
  }
}

- transform-export-extensions

export * as ns from 'mod'
export v from 'mod'

