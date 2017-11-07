
tsconfig.json 配置
============

https://github.com/hstarorg/HstarDoc/blob/master/%E5%89%8D%E7%AB%AF%E7%9B%B8%E5%85%B3/TypeScript%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6tsconfig%E7%AE%80%E6%9E%90.md

```
{
  "compilerOptions": {
    "module": "commonjs", 
    "noImplicitAny": true,
    "removeComments": true, 
    "preserveConstEnums": true, 
    "outFile": "../../built/local/tsc.js", 
    "sourceMap": true 
     }, 
    "files": [ 
      "core.ts",
      "sys.ts", 
      "types.ts", 
      "scanner.ts", 
      "parser.ts", 
      "utilities.ts", 
      "binder.ts", 
      "checker.ts",
      "emitter.ts",
      "program.ts", 
      "commandLineParser.ts",
      "tsc.ts", 
      "diagnosticInformationMap.generated.ts"
    ]
}

{
  "compilerOptions": { 
  "module": "commonjs", 
  "noImplicitAny": true, 
  "removeComments": true, 
  "preserveConstEnums": true, 
  "outFile": "../../built/local/tsc.js", 
  "sourceMap": true 
  }, 
  "include": [ "src/**/*" ], 
  "exclude": [ "node_modules", "**/*.spec.ts" ]
}

```

如果一个目录下存在一个tsconfig.json文件，那么它意味着这个目录是TypeScript项目的根目录。 tsconfig.json文件中指定了用来编译这个项目的根文件和编译选项。 一个项目可以通过以下方式之一来编译：

[使用tsconfig.json](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html)

# "compilerOptions" 

这个属性如果就只是用它的默认属性的话可以被省略。

- `target` default: 'ES3'

  指定ECMAScript 的版本， 可设置'es3'(default), 'es5', 'es6'

- `sourceMap` 是否开启sourceMap, default: false

- `module` 指定module 的版本

default: target === 'ES6' ? 'ES6' : 'commonjs'

可设置 'none', 'commonjs', 'amd', 'system', 'umd', 'ES6', or 'es2015'

只有 ‘amd' 和 'system’ 可以和 outFile 属性一起用
当target 属性是 ES5或者更低版本的时候，'ES6'和'es2015' 这两个值可能不能生效，

- `experimentalDecorators` 支持ES7的decorators, default: false 

- `moduleResolution`
  module === 'amd' | 'system' | 'ES6' ? 'classic' : 'node'

# @types，typeRoots和types

- @types
默认所有可见的"@types"包会在编译过程中被包含进来。 `node_modules/@types`文件夹下以及它们子文件夹下的所有包都是可见的； 

也就是说，`./node_modules/@types/`，`../node_modules/@types/`和`../../node_modules/@types/`等等。

- typeRoots

如果指定了`typeRoots`，只有`typeRoots`下面的包才会被包含进来。 比如：

```
{
   "compilerOptions": {
       "typeRoots" : ["./typings"]
   }
}
```
这个配置文件会包含所有./typings下面的包，而不包含./node_modules/@types里面的包。

- types： 指定"types": []来禁用自动引入@types包。

如果指定了types，只有被列出来的包才会被包含进来。 比如

{
   "compilerOptions": {
        "types" : ["node", "lodash", "express"]
   }
}

这个tsconfig.json文件将仅会包含 ./node_modules/@types/node，./node_modules/@types/lodash和./node_modules/@types/express。/@types/。 node_modules/@types/*里面的其它包不会被引入进来。