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

  // style-loader 可以接受参数
  {
    loader: 'style-loader',
    options: {
      insertAt: 'top', // 样式插入到 head 标签中
      singleton: true  // 将所有的 style 标签合并成一个
    }
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


##### postcss-loader
postcss 本身是一个功能比较单一的工具，它提供了一种方式用 JavaScript 代码来处理 CSS。它负责把 CSS 代码解析成抽象语法树结构（Abstract Syntax Tree，AST），再交由插件来进行处理。  

postcss 的主要功能只有两个：
1. 把 CSS 解析成 JavaScript 可以操作的 抽象语法树结构（Abstract Syntax Tree，AST）
2. 调用插件来处理 AST 并得到结果

!> PostCSS 一般不单独使用，而是与已有的构建工具进行集成。  
PostCSS 与主流的构建工具，如 Webpack、Grunt 和 Gulp 都可以进行集成，完成集成之后，选择满足功能需求的 PostCSS 插件并进行配置。

```javascript
  // 使用 autoprefixer 自动处理 css 前缀问题
  module.exports = {
    // ...
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({
                    browsers: ["last 2 version", ">1%", "iOS 7"]
                  })
                ]
              }
            }
          ]
        }
      ]
    }
    // ...
  }
```

##### px2rem-loader
移动端自适应布局，通常我们会选择使用 rem 的方案。

W3C 对 rem 的定义： font-size of the root element 

rem 与 px 的对比：**rem 是相对单位，px 是绝对单位**

使用 px2rem-loader 可以将开发好的 px，在打包时自动转成 rem

!> 但是需要和 ⼿淘的 lib-flexible 库 (⻚⾯渲染时计算根元素的 font-size 值) 搭配使用，不能单独使用

```javascript
  module.exports = {
    // ...
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader',
            {
              loader: 'px2rem-loader',
              options: {
                remUnit: 75, // 1rem = 75px(多少像素)
                remPrecision: 8 // 小数点保留几位
              }
            }
          ]
        }
      ]
    }
    // ... 
  }
```
