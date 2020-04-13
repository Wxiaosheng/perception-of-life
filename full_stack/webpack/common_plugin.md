#### 常见plugin

##### html-webpack-plugin
作用就是生成 html 文件，非 webpack 内置插件，需要安装  

将 webpack中 entry 配置的相关入口 chunk 和 `extract-text-webpack-plugin` 抽取的css样式，插入到该插件提供的 template 或者 templateContent 配置项指定的内容基础上生成一个html文件，具体插入方式是将样式 link 插入到 head 元素中，script 插入到 head 或者 body中。

```javascript
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
    // ...
    plugins: [
      new HtmlWebpackPlugin()
    ]
    // ...
  }
```

不配置任何选项的 html-webpack-plugin 插件，他会默认将 webpack 中的 entry 配置所有入口 thunk 和 extract-text-webpack-plugin 抽取的css样式都插入到文件指定的位置。

```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Webpack App</title>
    <link href="index-af150e90583a89775c77.css" rel="stylesheet"></head>
    <body>
    <script type="text/javascript" src="common-26a14e7d42a7c7bbc4c2.js"></script>
    <script type="text/javascript" src="index-af150e90583a89775c77.js"></script></body>
  </html>
```
```javascript
  // 参数配置
  new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'),
    filename: 'index.html', // 输出文件的文件名称，默认为index.html，还可以为输出文件指定目录位置
    hash: false,
    inject: true, // 默认值，script标签位于html文件的 body 底部
    compile: true,
    favicon: false, // 给你生成的html文件生成一个 favicon, 值是一个路径
    minify: false, // 使用minify会对生成的html文件进行压缩，默认是false
    cache: true, // 默认是true的，表示内容变化的时候生成一个新的文件
    showErrors: true, // 当webpack报错的时候，会把错误信息包裹再一个pre中，默认是true
    chunks: 'all', // chunks主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
    excludeChunks: [], // 排除掉一些js
    title: 'Webpack App', // 生成的html文档的标题。
    xhtml: false // 一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件
  })
```



##### clean-webpack-plugin
⾃动清理构建⽬录，默认会删除 output 指定的输出目录

```javascript
  module.exports = {
    // ...
    plugins: [
      new CleanWebpackPlugin()
    ]
    // ...
  }
```