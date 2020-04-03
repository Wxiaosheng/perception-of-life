> Babel 是一个 JavaScript 编译器。

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。  

### [基本概念](/full_stack/babel/concept)


### 常见包

1. [@babel/preset-env](/full_stack/babel/preset-env)

2. [@babel/polyfill](/full_stack/babel/polyfill)


!> 如果是用 babel7 来转译，需要安装 @babel/core、@babel/preset-env 和 @babel/plugin-transform-runtime，而不是 babel-core、babel-preset-env 和 babel-plugin-transform-runtime，它们是用于 babel6 的。



未完 待续 https://zhuanlan.zhihu.com/p/97884144

##### babel-polyfill
目前最常用的是配合babel一起使用的 babel-polyfill，它会 **加载整个polyfill**，针对编译的代码中新的API进行处理，并在代码中插入一些帮助函数。

在 babel 7.4.0 版本之后，


##### babel-runtime
babel-polyfill解决了Babel不转换新API的问题，但是直接在代码中插入帮助函数，会导致污染了全局环境，并且不同的代码文件中包含重复的代码，导致编译后的代码体积变大。

Babel为了解决这个问题，提供了单独的包babel-runtime用以提供编译模块的工具函数， 启用插件babel-plugin-transform-runtime后，Babel就会使用babel-runtime下的工具函数。

##### 比较
babel-polyfill与babel-runtime相比虽然有各种缺点，但在某些情况下仍然不能被babel-runtime替代， 例如，代码：[1, 2, 3].includes(3)，Object.assign({}, {key: 'value'})，Array，Object以及其他”实例”下es6的方法，babel-runtime是无法支持的， 因为babel-runtime只支持到static的方法。


