// var MyPromise = require('./wjPromise.js')
var MyPromise = require('./core.js')

var a = 1
var promise = new MyPromise((resolve) => {
    // resolve('...')
      
})

promise.then(function (value) {
  a = 2
})
console.log(a)
// test()
// .then(function (value) {
//   console.log('test0 then', value)
// })