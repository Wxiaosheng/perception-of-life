> Babel 是一个 JavaScript 编译器。

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。  

### [基本概念](/full_stack/babel/concept)


### 常见包

1. [@babel/preset-env](/full_stack/babel/preset-env)

2. [常见的库](/full_stack/babel/babel_common_library)
> 包括 @babel/polyfill、@babel/runtime、@babel/plugin-transform-runtime、@babel/runtime-corejs2 等

3. [实现 polyfill 方案的比较](/full_stack/babel/compare_polyfill)






##### 比较
babel-polyfill与babel-runtime相比虽然有各种缺点，但在某些情况下仍然不能被babel-runtime替代， 例如，代码：[1, 2, 3].includes(3)，Object.assign({}, {key: 'value'})，Array，Object以及其他”实例”下es6的方法，babel-runtime是无法支持的， 因为babel-runtime只支持到static的方法。


