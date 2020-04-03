> Babel 是一个 JavaScript 编译器。

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。  

babel 总共分为三个阶段：**解析**，**转换**，**生成**。  

下面列出的是 Babel 能为你做的事情：
* 语法转换
* 通过 Polyfill 方式在目标环境中添加缺失的特性
* 源码转换 (codemods)
* 更多!

### 快速开始
首先需要安装 @babel/core 与 @babel/cli 两个包  
```bash
  // 如果需要命令行使用，则需要安装 babel-cli
  npm i @babel/core @babel/cli -D
```

其次在 package.json 文件的 scripts 中配置 babel 执行命令
```javascript
  // ...
    "scripts": {
      "babel": "babel ./src --out-dir output"
    }
  // ...
```

最后只用编写代码，运行 **npm run babel** 即可查看经过 babel 转译后的代码了。

### Plugins

插件是一些小的JavaScript程序，指导Babel如何对代码执行转换。  
Babel 构建在插件之上。使用现有的或者自己编写的插件可以组成一个转换管道。通过使用或创建一个 preset 即可轻松使用一组插件。[more](https://www.babeljs.cn/docs/plugins)  


### Presets

我们不需要一个接一个地添加我们想要的所有插件，我们可以使用一个"preset"，它只是一组预先确定的插件。 


#### preset-env

env 的核心目的是通过配置得知目标环境的特点，然后只做必要的转换。    

在没有任何配置的情况下，env 等价于 latest，也等价于 es2015 + es2016 + es2017 三个相加(不包含 stage-x 中的插件)，这个预设将包括所有支持现代JavaScript的插件（ES2015、ES2016等）。  


### 执行顺序
很简单的几条原则：  
* plugin 会运行在 preset 之前。  
* plugin 会从前到后顺序执行。  
* preset 的顺序则 刚好相反(从后向前)。  


### 如何给 plugin 和 preset 设置参数
通常情况下，plugin 和 preset 只要列出字符串格式的名字即可。但如果某个 preset 或者 plugin 需要一些配置项(或者说参数)，就需要把自己先变成数组。  
第一个元素依然是字符串，表示自己的名字；第二个元素是一个对象，即配置对象。  

#### targets
用来配置需要支持的的环境，不仅支持浏览器，还支持 node。如果没有配置 targets 选项，就会读取项目 package.json 中的 browserslist 配置项。

#### module
指定 babel 以特定的模块化格式来输出代码，它的取值可以是 amd, umd, systemjs, commonjs 和 false。  
如果选择 false 就不进行模块化处理。  

```json
"presets": [
  // 带了配置项，自己变成数组
  [
    // 第一个元素依然是名字
    "env",
    // 第二个元素是对象，列出配置项
    {
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      },
      "module": false
    }
  ],

  // 不带配置项，直接列出名字
  "stage-2"
]
```

#### useBuiltIns
"usage" | "entry" | false，默认值是 false  
* **false** : 此时不对 polyfill 做操作。如果手动引入 @babel/polyfill，则无视配置的浏览器兼容，引入所有的 polyfill。
* **entry** : 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill。  
```JavaScript
  // 使用 entry 时，需要指定 corejs 的版本
  "useBuiltIns": "entry",
  "corejs": 2,

  // 需要手动在入口文件处导入 @babel/polyfill，会自动根据 browserslist 的配置替换成浏览器不兼容的所有 polyfill
  import '@babel/polyfill'

  // 如果 core-js 的版本指定为3时，则需要将 @babel/polyfill 改成

  import 'core-js/stable'
  import 'regenerator-runtime/runtime'
```
* **usage** : 不需要在文件顶部手动安装和引入@babel/polyfill，会根据代码中的使用进行按需添加。


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


如果是用 babel7 来转译，需要安装 @babel/core、@babel/preset-env 和 @babel/plugin-transform-runtime，而不是 babel-core、babel-preset-env 和 babel-plugin-transform-runtime，它们是用于 babel6 的。