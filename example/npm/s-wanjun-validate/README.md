
# API

- `validater`

  - isArray()

  - isObject()

  - isString()

  - isDate()

  - isRegExp()

  - isFunction()

  - isBoolean()

  - isNumber()

  - isNull()

  - isUndefined()

- `getMyNpmInfo`

# 示例

```
var { validater, getMyNpmInfo } = require('s-wanjun-validate')

<!-- validater -->
console.log('funtion=>', validater.isFunction(() => {})) // true

<!-- getMyNpmInfo -->
getMyNpmInfo().then(json => console.log('json=>', json))
```