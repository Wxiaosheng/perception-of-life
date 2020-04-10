
#### 核心概念
* 入口(entry)
* 输出(output)
* loader
* 插件(plugins)

#### 入口(entry)
入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。其实就是⽤来指定 webpack 的打包⼊⼝。

##### 用法
1. 单⼊⼝：entry 是⼀个字符串
2. 多⼊⼝：entry 是⼀个对象

#### 输出(output)
output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。

##### 用法
1. 单⼊⼝配置时的写法
    ``` javascript
      module.exports = {
        entry: './path/to/my/entry/file.js',
        output: {
          filename: 'bundle.js',
          path: __dirname + '/dist'
        }
      }
    ```
2. 多⼊⼝配置
  [name] 是占位符，用来代指entry中入口(entry)的 key 
    ```javascript
      module.exports = {
        entry: {
          app: './src/app.js',
          search: './src/search.js'
        },
        output: {
          filename: '[name].js',  // 使用 [name] 占位符确保名称的唯一
          path: __dirname + '/dist'
        }
      };
    ```

#### loader
webpack 开箱即用只支持 JS 和 JSON 两种文件类型，通过 Loaders 去支持其它文件类型并且把它们转化成有效的模块，并且可以添加到依赖图中。  

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

!> loader 本身是一个函数，接受源文件作为参数，返回转换的结果。

##### 使用
在更高层面，在 webpack 的配置中 loader 有两个目标：
1. test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件
2. use 属性，表示进行转换时，应该使用哪个 loader

```javascript
  module.exports = {
    output: {
      filename: 'bundle.js'
    },
    module: {
      rules: [
        { test: /\.txt$/, use: 'raw-loader' }
      ]
    }
  }
```

#### 插件(plugins)
loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。  

插件的范围包括，从打包优化和压缩，一直到资源管理和环境变量注⼊。插件接口功能极其强大，可以用来处理各种各样的任务。  

##### 使用
想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。
```javascript
  const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装

  module.exports = {
    output: {
      filename: 'bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({template: './src/index.html'})
    ]
  }
```

#### 提供(mode)
⽤来指定当前的构建环境是：production、development 还是 none 

|选项|描述
|-|-|
|none|不开启任何优化|
|development|会将 process.env.NODE_ENV 的值设为 development。<br/>启用 **NamedChunksPlugin** 和 **NamedModulesPlugin**。|
|production|会将 process.env.NODE_ENV 的值设为 production。 <br/>启用 **FlagDependencyUsagePlugin**，**FlagIncludedChunksPlugin**，**ModuleConcatenationPlugin**，<br/>**NoEmitOnErrorsPlugin**，**OccurrenceOrderPlugin**，**SideEffectsFlagPlugin** 和 **UglifyJsPlugin**。|

