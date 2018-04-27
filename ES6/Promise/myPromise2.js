
var LAST_ERROR = null
var IS_ERROR = {}

function getThen (obj) {
  try {
    return obj.then
  } catch (e) {
    LAST_ERROR = e
    return IS_ERROR
  }
}