var MyPromise = require('./wjPromise.js')

function p1 () {
  return new MyPromise(function (resolve, reject) {
    setTimeout(function () {
      resolve('p1')
    }, 1000)
  })
}

function test () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(100)
    }, 1000)
  })
}



test()
  .then(function (value) {
    console.log('value1', value)
    return p1()
  })
  .then()
  .then(function (value) {
    console.log('value2', value)
    throw new Error('error')
  })
  .catch(function (err) {
    console.log('err', err)
  })