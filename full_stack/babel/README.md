> Babel 是一个 JavaScript 编译器。

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。下面列出的是 Babel 能为你做的事情：
* 语法转换
* 通过 Polyfill 方式在目标环境中添加缺失的特性
* 源码转换 (codemods)
* 更多!

### Plugins

插件是一些小的JavaScript程序，指导Babel如何对代码执行转换。  
Babel 构建在插件之上。使用现有的或者自己编写的插件可以组成一个转换管道。通过使用或创建一个 preset 即可轻松使用一组插件。[more](https://www.babeljs.cn/docs/plugins)  
利用 astexplorer.net 可以立即创建一个插件，或者使用 generator-babel-plugin 生成一个插件模板。

### Presets

我们不需要一个接一个地添加我们想要的所有插件，我们可以使用一个"preset"，它只是一组预先确定的插件。  

#### preset-env

在没有任何配置的情况下，这个预设将包括所有支持现代JavaScript的插件（ES2015、ES2016等）。

#### Polyfill
Babel默认只转换新的JavaScript语法，而不转换新的API。 例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，则需要为当前环境提供一个polyfill。

```javascript
// 使用方法非常简单，只用在主入口引用

import '@babel/polyfill'

// 完全没有任何需要配置的地方
```

未完 待续 https://zhuanlan.zhihu.com/p/97884144

##### babel-polyfill
目前最常用的是配合babel一起使用的 babel-polyfill，它会 **加载整个polyfill**，针对编译的代码中新的API进行处理，并在代码中插入一些帮助函数。

在 babel 7.4.0 版本之后，


##### babel-runtime
babel-polyfill解决了Babel不转换新API的问题，但是直接在代码中插入帮助函数，会导致污染了全局环境，并且不同的代码文件中包含重复的代码，导致编译后的代码体积变大。

Babel为了解决这个问题，提供了单独的包babel-runtime用以提供编译模块的工具函数， 启用插件babel-plugin-transform-runtime后，Babel就会使用babel-runtime下的工具函数。

##### 比较
babel-polyfill与babel-runtime相比虽然有各种缺点，但在某些情况下仍然不能被babel-runtime替代， 例如，代码：[1, 2, 3].includes(3)，Object.assign({}, {key: 'value'})，Array，Object以及其他”实例”下es6的方法，babel-runtime是无法支持的， 因为babel-runtime只支持到static的方法。
