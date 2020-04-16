### 概念
> 可组装的 JavaScript 和 JSX 检查工具

**代码检查** 是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的编码风格。对大多数编程语言来说都会有代码检查，一般来说编译程序会内置检查工具。  

ESLint 的核心是通过对代码解析得到的抽象语法树(Abstract Syntax Tree)进行模式匹配，找出不符合规则约定的模式。  

ESLint 可以让程序员在编码的过程中发现问题而不是在执行的过程中。  

ESLint 的目标是提供一个插件化的 javascript 代码检测工具。

ESLint 的初衷是为了让程序员 **可以创建自己的检测规则**。ESLint 的所有规则都被设计成可插入的。  

ESLint 使用 Node.js 编写，这样既可以有一个快速的运行环境的同时也便于安装。  
  

### ESLint 哲学(Philosophy)
所有都是可拔插的
  * 内置规则和自定义规则共用一套规则 API
  * 内置的格式化方法和自定义的格式化方法共用一套格式化 API
  * 额外的规则和格式化方法能够在运行时指定
  * 规则和对应的格式化方法并不强制捆绑使用


每条规则
  * 各自独立
  * 可以开启或关闭（没有什么可以被认为“太重要所以不能关闭”）
  * 可以将结果设置成警告或者错误

另外
  * ESLint 并不推荐任何编码风格，规则是自由的
  * 所有内置规则都是泛化的

项目
  * 通过丰富文档减少沟通成本
  * 尽可能的简单透明
  * 相信测试的重要性


### 规则
ESLint 通过规则(rules)来描述具体的检查行为，每条规则代表一项代码格式规范。 所有的规则默认都是禁用的。 

ESLint 是插件化的，每条规则都是一个插件。

```javascript
  {
    // "semi": 2,
    "semi": [2, 'always', {"omitLastInOneLineBlock": true}],
  }

  // "semi" 是这条规则的名称，该规则制定是否应该用分号代替自动插入分号(ASI)，换句话即为是否应该在行尾使用分号
  // "semi" 对应的值可以是一个值 或者 一个数组
    // 如果为值，在该值为这条规则的错误级别，其他选项为默认
    // 如果为数组，第一项为该规则的 错误级别(level)，数组的其他项为该规则 配置选项(options)
```

[具体的规则请参见官网给出的文档](https://eslint.bootcss.com/docs/rules/)


### 配置文件
执行 `./node_modules/.bin/eslint --init` 可以看到项目的根目录生成了一个 .eslintrc.js 文件

Eslint 支持多种格式的配置文件，优先级如下：  
1、 .eslintrc.js  
2、 .eslintrc.yaml  
3、 .eslintrc.yml  
4、 .eslintrc.json  
5、 .eslintrc  
6、 package.json      

我们使用官方推荐的 .eslintrc.js 格式就好。

```javascript
  module.exports = {
    // 为我们提供运行环境，一个环境定义了一组预定义的全局变量
    "env": {
      "browser": true,
      "es6": true
    },
    // 一个配置文件可以被基础配置中的已启用的规则继承。
    "extends": [
      "airbnb"
    ],
    // 自定义全局变量
    "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly",
      "_": true,
      "$": true,
    },
    // ESLint 默认使用Espree作为其解析器，你可以在配置文件中指定一个不同的解析器
    // "parser": "@typescript-eslint/parser",
    // 配置解析器支持的语法
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    // ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。
    // 在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀。
    "plugins": [
      "react",
      // "@typescript-eslint"
    ],
    // ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一：
    // "off" 或 0 - 关闭规则
    // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    "rules": {
      semi: 0,
      'no-unused-vars': [
        1,
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_|^err|^ev' // _xxx, err, error, ev, event
        }
      ],
      'no-useless-escape': 2,
    }
  };
```


### 命令行
#### 安装
```
  npm i -g eslint
```

#### 使用
```
  eslint [options] [file|dir|glob]

  // 例
  eslint file1.js file2.js
  eslint lib/**
```

#### Options
> 命令行工具有几个选项，你可以通过运行 eslint -h 查看所有选项。

```
  eslint [options] file.js [file.js] [dir]

  基本配置：
    --no-eslintrc               禁用 .eslintrc.* 和 package.json 文件中的配置
    -c, --config path::String   使用此配置，重写 .eslintrc.* 配置选项（如果存在）
    --env [String]              指定环境，该选项只能启用环境，不能禁用在其它配置文件中设置的环境。要指定多个环境的话，使用逗号分隔它们，或多次使用这个选项
    --ext [String]              可以指定在指定目录中搜索JavaScript文件时，ESLint将使用哪些文件扩展名。默认扩展名为.js
    --global [String]           任何指定的全局变量默认是只读的，在变量名字后加上 :true 后会使它变为可写。要指定多个变量，使用逗号分隔它们，或多次使用这个选项
  
  指定规则和插件：
    --rulesdir                  该选项允许指定另一个加载规则文件的目录
    --plugin                    用于指定一个要加载的插件。可以省略插件名的前缀 eslint-plugin-
    --rule                      该选项指定要使用的规则，这些规则将会与配制文件中指定的规则合并，定义多个规则时使用逗号分隔它们，或多次使用这个选项

  解决问题选项：
    --fix                       该选项指示 ESLint 试图修复尽可能多的问题。修复只针对实际文件本身，而且剩下的未修复的问题才会输出
    --fix-dry-run               该选项与 --fix 有相同的效果，唯一一点不同是，修复不会保存到文件系统中
    --fix-type                  该选项允许你在使用 --fix 或 --fix-dry-run 时指定要应用的修复的类型。修复的三种类型是problem、suggestion、layout

  使用标准输入选项
    --stdin                     该选项告诉 ESLint 从 STDIN 而不是从文件中读取和检测源码
    --stdin-filename            该选项允许你指定一个文件名去处理 STDIN。当你处理从 STDIN 来的文件和有规则依赖于这个文件名时，这会很有用

  处理警告选项
    --quiet                     该选项允许你禁止报告警告。如果开启这个选项，ESLint 只会报告错误
    --max-warnings              该选项允许你指定一个警告的阈值，当你的项目中有太多违反规则的警告时，这个阈值被用来强制 ESLint 以错误状态退出

  其他
    --init                      该选项将会配置初始化向导。它被用来帮助新用户快速地创建 .eslintrc 文件，用户通过回答一些问题，选择一个流行的风格指南，或检查你的源文件，自动生成一个合适的配置
    --debug                     该选项将调试信息输出到控制台
    -h, --help                  该选项会输出帮助菜单，显示所有可用的选项。当有这个选项时，忽略其他所有选项
    -v, --version               该选项在控制台输出当前 ESlint 的版本。当有这个标记时，忽略其他所有标记
    --print-config               该选项输出传递的文件使用的配置。当有这个标记时，不进行检测，只有配置相关的选项才是有效的
```
