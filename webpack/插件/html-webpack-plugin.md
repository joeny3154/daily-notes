简化了HTML文件的创建，以便为您的webpack包提供服务。这对于在文件名中包含每次会随着变异会发生变化的哈希的webpack bundle尤其有用。 您可以让插件为您生成一个HTML文件，使用lodash模板提供您自己的模板，或使用您自己的loader

# 安装

npm install --save-dev html-webpack-plugin

# 配置

new HtmlWebpackPlugin({
  title: 'My App',
  filename: 'assets/admin.html'
})
