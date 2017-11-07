stage-3包含了下面2个插件：

- transform-async-to-generator

这个插件用来支持es7中的async和await，代码如下：

const sleep = (timeout)=>{
    return new Promise( (resolve, reject)=>{
        setTimeout(resolve, timeout)
    })
}

(async ()=>{
    console.time("async");
    await sleep(3000);
    console.timeEnd("async");
})()

- transform-exponentiation-operator

这个插件可以支持 ** 操作符进行幂操作，代码如下：

let squared = 2 ** 2;
// same as: 2 * 2

let cubed = 2 ** 3;
// same as: 2 * 2 * 2