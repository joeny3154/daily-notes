
### 配置externals的缺陷

https://segmentfault.com/a/1190000006087638



如上打包dll包完毕之后，会生成vendor-manifest.json和vendor.dll.js文件。vendor.dll.js就是我们的dll包。vendor-manifest.json是库文件的node_modle路径和webpack打包id的映射，内容如下：


### 编译Dll文件
如何编译Dll文件？
编译Dll文件的代码实际上跟编译业务代码是一样的，记得利用--config指定上述专供Dll使用的webpack配置文件就好了：

$ webpack --progress --colors --config ./webpack-dll.config.js


$ NODE_ENV=development webpack --config  webpack.dll.lib.js --progress
 $ NODE_ENV=production webpack --config  webpack.dll.lib.js --progress


 ### 配置webpack

- DllReferencePlugin

[教你如何玩转webpack.DllPlugin](https://github.com/superpig/blog/issues/6)


const isDebug = (process.env.NODE_ENV === 'development');
const libPath = isDebug ? '../dll/lib/manifest.json' : 
'../dll/dist/lib/manifest.json';


module.export = {
  plugins: [
     new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(libPath),
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(ChartsPath),
      })
  ]
}

- 




### add-asset-html-webpack-plugin

https://github.com/superpig/blog/issues/6

https://github.com/SimenB/add-asset-html-webpack-plugin/blob/master/README.md

如果你的项目是单页面应用，那么问题就已经全部解决了。但是，我之前说过，我们项目存在多个入口，我们只希望在vue.html入口引用vendor.dll.js，但是AddAssetHtmlPlugin不支持指定入口文件，默认会在所有的入口文件中引用vendor.dll.js，也就插入引用vendor.dll.js的script标签。这显然不是我们想要的，因为其他入口不需要的这个dll包。


### html-webpack-include-assets-plugin

https://github.com/superpig/blog/issues/6

```
module.export = {
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/vendor-manifest.json'),
        }),
        new CopyWebpackPlugin([{ 
            context: __dirname,
            from: './build/vendor.dll.js', 
            to: 'js/' 
        }]),
        new HtmlWebpackPlugin({
            filename: './angular/index',
            template: './angular/main.ejs',
            chunks: ['common', 'index'],
            inject: true
        }),
        ...
        // 多个入口
        new HtmlWebpackPlugin({
            filename: './vue/index',
            template: './vue/main.ejs',
            chunks: ['common', 'vue'],
            inject: true
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['js/vendor.dll.js'],
            files: ['vue.html'],
            append: false,
            hash: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/common.[chunkhash].js',
            minChunks: 2
        })
    ]
}
```


这里多用一个CopyWebpackPlugin插件，将vendor.dll.js文件拷贝到build目录。注意使用HtmlWebpackIncludeAssetsPlugin时，需要将append参数设置为false，保证vendor.dll.js在业务代码之前插入。
