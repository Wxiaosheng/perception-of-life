
### 基本概念
babel 总共分为三个阶段：**解析**，**转换**，**生成**。  

下面列出的是 Babel 能为你做的事情：
* 语法转换
* 通过 Polyfill 方式在目标环境中添加缺失的特性
* 源码转换 (codemods)
* 更多!

#### 快速开始
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

##### Plugins

插件是一些小的JavaScript程序，指导Babel如何对代码执行转换。  
Babel 构建在插件之上。使用现有的或者自己编写的插件可以组成一个转换管道。通过使用或创建一个 preset 即可轻松使用一组插件。[more](https://www.babeljs.cn/docs/plugins)  


##### Presets

我们不需要一个接一个地添加我们想要的所有插件，我们可以使用一个"preset"，它只是一组预先确定的插件。 

##### 执行顺序
很简单的几条原则：  
* plugin 会运行在 preset 之前。  
* plugin 会从前到后顺序执行。  
* preset 的顺序则 刚好相反(从后向前)。  


##### 如何给 plugin 和 preset 设置参数
通常情况下，plugin 和 preset 只要列出字符串格式的名字即可。但如果某个 preset 或者 plugin 需要一些配置项(或者说参数)，就需要把自己先变成数组。  
第一个元素依然是字符串，表示自己的名字；第二个元素是一个对象，即配置对象。  

###### targets
用来配置需要支持的的环境，不仅支持浏览器，还支持 node。如果没有配置 targets 选项，就会读取项目 package.json 中的 browserslist 配置项。

###### module
启用将ES6模块语法转换为其他模块类型，将此设置为false不会转换模块。

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


#### Polyfill
Babel默认只转换新的JavaScript语法，而不转换新的API。 例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，则需要为当前环境提供一个polyfill。

单独使用时，一般不这么用，有更好的方法，具体请参照[这里](/full_stack/babel/polyfill)。
```javascript
// 使用方法非常简单，只用在主入口引用 

import '@babel/polyfill'

// 完全没有任何需要配置的地方
```