
package.json
=========


eg: 

```
"scripts": {
  "dev": "node build/dev-server.js",
  "build": "node build/build.js",
  "unit": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run",
  "e2e": "node test/e2e/runner.js",
  "test": "npm run unit && npm run e2e",
  "lint": "eslint --ext .js,.vue src test/unit/specs test/e2e/specs"
 }
```

# 设置环境

`test`, `production`, `development`

```
"build": "cross-env NODE_ENV=production node build/build.js development",
"pre": "cross-env NODE_ENV=production node build/build.js preview",
"product": "cross-env NODE_ENV=production node build/build.js production",
"dev": "cross-env NODE_ENV=development node build/dev-server.js",
"start": "cross-env NODE_ENV=development node build/dev-server.js"
```
# 环境判断

```
process.env.NODE_ENV === 'production'
```