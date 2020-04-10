#### 热更新
在开发中，我们经常在修改源代码之后需要重新刷新浏览器，才能看见修改后的效果。这样既浪费了时间，也会使得开发体验很不好。  

那么有没有一种方法在我们开发过程中，在修改源代码后，自动更新页面上的内容显示最终的效果呢？

答案是有的，那就是 **热更新**。

热更新(HRM)，即 **Hot Module Replacement**，作用是能在修改源代码之后，webpack 会将代码重新打包，并将改动的模块发送到浏览器端，浏览器会用新的模块替换旧的模块，实现局部页面更新而非整体刷新页面。

这里有一篇比较不错的 [热跟新原理解析](https://segmentfault.com/a/1190000020310371) 的文章值得一看。


##### 使用
1. 在 webpack 的配置文件中引入 webpack 库 
2. 在 plugins 中使用 webpack.HotModuleReplacementPlugin 插件
3. 要开启 devServer，并且设置 hot 的值为 true


##### 简单分析原理
1. webpack 需要监听文件的变化，这就需要开启监听模式，即，使用 watch  
        webpack 开启监听模式的方法  
        方法一：启动 webpack 命令时，加上 --watch 参数  
        方法二：在配置文件中，设置 watch: true
  ```javascript
    export.module = {
      // 默认 false，也就是不开启
      watch: true,
      // 只有开启监听模式时，watchOptions才有意义
      watchOptions: {
        // 默认为空，不监听的文件或者文件夹，支持正则匹配
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行，默认300ms
        aggregateTimeout: 300
        // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
        poll: 1000
      }
    }
  ```
2. 开启 webpack-dev-server 
  ```javascript
    // 配置启动脚本
    "script": {
      "dev": "webpack-dev-server --open"
    }
  ```

!> WDS 不刷新浏览器  
WDS 不输出文件，而是放在内存中  
使用 HotModuleReplacementPlugin 插件





