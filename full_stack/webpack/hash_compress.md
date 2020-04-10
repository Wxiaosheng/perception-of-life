#### 文件指纹
是指 打包后输出的⽂件名中的一串 hash 值  

##### 分类
1. **Hash**  
        和整个项⽬的构建相关，只要项⽬⽂件有修改，整个项⽬构建的 hash 值就会更改
2. **Chunkhash**   
        和 webpack 打包的 chunk 有关，不同的 entry 会⽣成不同的 chunkhash 值  
        设置 output 的 filename，使⽤ [chunkhash]
3. **Contenthash**  
        根据⽂件内容来定义 hash ，⽂件内容不变，则 contenthash 不变
        设置 MiniCssExtractPlugin 的 filename，使⽤ [contenthash]

  ```javascript
    module.exports = {
      // ...
      output: {
        filename: '[name][chunkhash:8].js',
        path: __dirname + '/dist'
      }
      // ...
      plugins: [
        new MiniCssExtractPlugin({
          filename: '[name][contenthash:8].css'
        })
      ]
    }
  ```


#### 文件压缩
##### HTML 压缩
修改 html-webpack-plugin，设置压缩参数 

```javascript
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/index.html'),
    filename: 'index.html',
    chunks: ['index'],
    inject: true,
    minify: {
      html5: true,
      collapseWhitespace: true,
      preserveLineBreaks: false,
      minifyCSS: true,
      minifyJS: true,
      removeComments: false
    }
  })
```

##### CSS 压缩
使⽤ optimize-css-assets-webpack-plugin  
 
同时使⽤ cssnano

```javascript
  module.exports = {
    // ...
    plugins: [
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano')
      })
    ]
    // ...
  }
```

##### JS 压缩
内置了 uglifyjs-webpack-plugin 

最简单的就是 设置 mode: production
