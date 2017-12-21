var getMyNpmInfo = require('./getMyNpmInfo.js')

var validater  = {}

validater = (function () {
  'use strict'

  var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ')

  function type () {
    return Object.prototype.toString.call(this).slice(8, -1)
  }

  for (var i = 0; i < types.length; i ++) {
    validater['is' + types[i]] = (function (self) {
          return function (elem) {
            return type.call(elem) === self
          }
      })(types[i])
  }

  return validater
})()


module.exports = {
  validater,
  getMyNpmInfo
}