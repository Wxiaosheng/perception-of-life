### 常见loader

#### 解析 ES6
使用 **babel-loader**，其实就是在 webpack 中使用 babel，对 ES6 的新语法和新API做转换

!> babel 的配置可能在 .babelrc 文件中，也有可能在 package.json 中  
一般情况下，需要使用 @babel/preset-env

```javascript
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
```

#### 解析 CSS
使用 **css-loader**，加载 css 文件，并且转换成 commonjs 对象  
使用 **style-loader**， 将样式通过 style 标签插入 head 中  

```javascript
  // 注意，loader 在使用时需要注意顺序，执行顺序是从右往左执行
  // 例如，css-loader 将 css 文件解析成webpack可处理的模块，然后 style-loader 将这些模块通过 style 标签插入到 head 中
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
```

##### 解析 less 和 sass
**less-loader** 将 less 文件解析成 webpack 可处理的模块
```javascript
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
```
 
#### 解析图片
1. **file-loader** 用于处理文件
2. **url-loader** 用于处理图片和字体，并且设置较小的资源自动转成 base64

```javascript
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 'file-loader'
      }
    ]
  }

  // 使用 url-loader
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240
          }
        }]
      }
    ]
  }
```

!> 给 loader 传递参数，通过 options 即可指定参数
