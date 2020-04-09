
#### @babel/polyfill
本质上@babel/polyfill包含了  regenerator 和 core-js 两个库。  

这个库将会模拟一个完全的 ES2015+ 的环境。  

!> babel只会转换E6语法，而不会转换新的api，让新的api生效的方法是使用传统的polyfill，为此需要引入这个模块。

!> 因为 polyfill 是在源代码之前运行，安装的时候必须用 --save 保证引用到生产环境而不是开发环境，当然，弄错了，自己手动在package.json中修改也是可以的

polyfill 用起来很方便，但是你应该和 @babel/preset-env 以及 useBuiltIns option 一起用。这样在使用的时候就不会包含那些我们一般不会用到的polyfill 了。如果不这样做的话，我们还是建议你手动引入你需要的每个 polyfill。

!> 注意，只要是通过 @babel/polyfill 的方式来转译 API，都会存在全局污染的问题

可参照 [这里](/full_stack/babel/preset-env.md?id=usebuiltins)



#### @babel/runtime
@babel/runtime 包含两个文件夹：helpers（定义了一些处理新的语法关键字的帮助函数）、regenerator（仅仅是引用regenerator-runtime这个npm包）  

@babel/polyfill 解决了 Babel 不转换新 API 的问题，但是直接在代码中出入了帮助函数，**会导致全局污染**，并且不同的代码文件中**包含重复的代码**，导致编译后的代码体积变大。

Babel为了解决这个问题，提供了单独的包 @babel/runtime 用以提供编译模块的工具函数， 启用插件 @babel/plugin-transform-runtime 后，Babel就会使用 @babel/runtime 下的工具函数。



#### @babel/plugin-transform-runtime 
@babel/preset-env + @babel/plugin-transform-runtime 搭配使用，可以完成基本语法转译 + 新 API 的按需加载，这是配置 Babel 转码   (polyfill) 的另一种方式

```javascript
  // 另一种 polyfill

  // .babelrc
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "modules": false
        }
      ]
    ],
    "plugins": [
      [
        "@babel/plugin-transform-runtime",
        {
          "corejs": 2 // 推荐
        }
      ]
    ]
  }
```

##### 使用方法
1. 如果配置参数 corejs 未设置或为 false，需安装依赖 @babel/runtime（这部分代码会被抽离并打包到应用 js 里，所以可以安装在 dependencies 里），仅对 es6 语法转译，而不对新 API 转译。  

2. 如果配置参数 corejs 设置为 2，需安装依赖@babel/runtime-corejs2（同上，推荐安装在 dependencies 里），对语法、新 API 都转译。
> 推荐使用corejs:2，但是，检测不到'hello'.includes('h')这种句法，所以存在一定隐患，书写代码时需注意。

!> 如果是用 babel7 来转译，需要安装 @babel/core、@babel/preset-env 和 @babel/plugin-transform-runtime  
如果是用 babel6 来转译，需要安装 babel-core、babel-preset-env 和 babel-plugin-transform-runtime  


#### @babel/runtime-corejs2
@babel/runtime-corejs2包含三个文件夹：  

**core-js**（引用core-js这个npm包）  
**helpers**（定义了一些处理新的语法关键字的帮助函数）  
**regenerator**（仅仅是引用regenerator-runtime这个npm包）   


!> 因此可以发现，@babel/runtime-corejs2 ≈ @babel/runtime + @babel/polyfill  
 
#### 这些库之间的联系
1. @babel/runtime 只能处理语法关键字，而 @babel/runtime-corejs2 还能处理新的全局变量（例如，Promise）、新的原生方法（例如，String.padStart ）；  

2. 使用了@babel/runtime-corejs2，就无需再使用@babel/runtime了  