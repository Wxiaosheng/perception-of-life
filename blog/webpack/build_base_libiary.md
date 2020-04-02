### webpack 打包组件和基础库

在日常的开发过程中，我们经常会使用到别人开发的组件和基础库，那么今天就来简单的说说，个人如何使用 webpack 打包一个组件或者基础库发布到 npm 上供别人使用。

主要有以下几个步骤：  
[1、开发组件库](#ddl1)  

[2、使用 webpack 打包，支持 AMD/CJS/ESM 模块引入](#ddl2)  

[3、发布到 npm ](#ddl3)  


<h4 id="bbl1">开发组件库</h4>
现在我们以实现 **大整数加法** 的基础库为例

```javascript
  // 项目目录结构

  ├── dist
    ├── bigNumberAddition.js      // 打包输出的基础库，未压缩适合开发环境
    ├── bigNumberAddition.min.js  // 打包输出的基础库，已压缩适合生产环境
  ├── src
    ├── index.js     // 基础库代码入口
  ├── package.json
  ├── webpack.config.js
```

具体实现的逻辑，请参照[文件源码](https://github.com/Wxiaosheng/big-number-addition)


<h4 id="bbl2">使用 webpack 打包，支持 AMD/CJS/ESM 模块引入</h4>
这里的打包有些特殊，因为同时打出了两个包，一个未压缩适合开发环境，和一个已压缩适合生产环境的两个文件  

具体实现方式：  
1. 使用不同名称定义 entry，但是入口的文件都相同  
2. 设置 mode 为 none，这样默认 webpack 不会压缩文件  
3. 使用 terser-webpack-plugin 插件匹配 min 的文件进行压缩

```node
  module.exports = {
    entry: {
      'bigNumberAddition': './src/index.js',
      'bigNumberAddition.min': './src/index.js'
    },
    output: {
      filename: '[name].js',
      // ...
    },
    mode: 'none',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          include: /\.min\.js/
        })
      ]
    }
  }

```

<h4 id="ddl3">发布到 npm</h4>

##### 设置 pageage.json
1. main：指定包的入口文件

2. name：指定包名  
  发布之前都要去NPM 官网上搜索一遍，确认想要使用的包名，是否已经被占用。  
  包名支持 [@scope]/[package name] 的形式，[@scope] 类似于命名空间的作用，NPM 默认允许你使用自己注册的用户名，或者在自己的账户下申请的 organizations。  
  典型的例子，如 Babel，插件原先使用的是 babel-plugin-xxx 的格式命名，后来因为许多个人发布的包和官方的包命名格式一样，导致难以区分，现在 babel 官方所有的包都更换成了 @babel/xxx 的格式。  

3. version：包的版本  
  格式 数字.数字.数字，每一次发布，版本都必须要更新，只能往上增加。  
  keywords：关键词  
  希望别人通过哪些关键词搜索到你的包，可以在这里添加。

4. files：指定哪些文件夹、文件将被发布  
  如果你的项目目录下包含了一些隐私文件，不希望被发布出去，一定要注意配置此项，仅包含可以被发布的文件夹、文件。  
  可以在包的根目录下新建文件 .npmignore，指定哪些文件不被发布，书写格式与 .gitignore 文件一致。  

5. license：协议
  推荐阅读了解几种开源的协议：七种开源许可证  SPDX License List

6. 添加发布脚本
```
  "script": {
    ...
    "prepublish": "webpack",
    "release": "npm publish . --access=public",
    ...
  }
```


##### 添加 .npmignore 文件
.npmignore 文件是用来告诉 npm 需要发布上线的代码

**注意**：  
1. .gitignore 设置忽略哪些文件  
  .gitignore 设置的忽略文件，在 git 代码管理和 npm publish 都会被忽略。

2. .npmignore 设置忽略哪些文件  
  .npmignore 优先级更高，如果同时使用了 .npmignore 和 .gitignore，只有 .npmignore 会生效。

3. package.json 文件的 files 字段  
直接在 package.json 文件中配置 files，指定发布哪些文件、目录，优先级高于 .npmignore 和 .gitignore。


##### 登录/注册 npm
1. 使用 nrm 管理 npm 源
```
  sudo npm i nrm -g

  // 常用命令

  nrm ls
  nrm use [目标源]
```

2. 登录 npm 账号
将自己注册好的 npm 账号在本地登录  
```
  npm adduser / npm login

  // 查看当前登录用户
  npm who am i

  // 通常只有一个人可以发布，也可以添加多人，相关命令如下：
  npm owner ls <package name>             # 查看
  npm owner add <user> <package name>     # 添加
  npm owner rm <user> <package name>      # 删除

  // 发布
  npm publish . --access=public
  // 或者使用 配置的脚本发布
  npm run release
```

#### 不同的项目结构对比
```
  // 无 src（源码的目录）

  ├── dist
  ├── index.js
  ├── package.json
  ├── webpack.config.js
  ├── README.md
```
与当前的目录结构对比(页面顶部)，无 src（源码的目录）结构中根目录下的 index.js 文件即是 pageage.json 的入口文件，也是 webpack 的入口文件。  

当前的目录结构中，根目录下的 index.js 文件仅仅是 pageage.json 的入口文件，而 webpack 的入口文件则是 src/index.js，分离开来，并且在根目录下的 index.js 文件中，设置了 module.exports 。  

这导致有一些差异：  
1. 无 src（源码的目录）结构中根目录下的 index.js 文件 使用的是 export default xxx 的方法，因此 webpack 的 output 配置项项中可以不配置 **libraryExport: 'default'**；  

2. 前的目录结构中，根目录下的 index.js 文件则使用的是 module.exports，所以必须要配置 **libraryExport: 'default'**；