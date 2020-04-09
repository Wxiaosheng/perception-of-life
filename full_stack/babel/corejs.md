#### corejs

babel 中默认使用的都是 core-js@2，但在 babel 7.4.0 版本之后，corejs 更新至了 core-js@3

!> @babel/polyfill 无法提供 core-js@2 向 core-js@3 过渡，因此被废弃，所以现在有新的方案去替代 @babel/polyfill

!> @babel/preset-env 也因 core-js@3 的原因，需要配置 corejs 参数，否则webpack运行时会报 warning

##### 安装
@babel/polyfill 不必再安装，转而需要依靠 core-js 和 regenerator-runtime

```bash
  yarn add babel-loader@8 @babel/core @babel/preset-env -D
  yarn add core-js regenerator-runtime
```

##### .babelrc 配置
```javascript
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "modules": false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
          "useBuiltIns": "entry", // browserslist环境不支持的所有垫片都导入
          // https://babeljs.io/docs/en/babel-preset-env#usebuiltins
          // https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md
          "corejs": {
            "version": 3, // 使用core-js@3
            "proposals": true,
          }
        }
      ]
    ],
    "plugins": []
  }
```

##### 使用
js 代码里取代原先的 import '@babel/polyfill'，要做如下修改

```javascript
  import 'core-js/stable'
  import 'regenerator-runtime/runtime'

```


##### @babel/plugin-transform-runtime，也随着core-js@3有更新

```javascript
  // 安装依赖
  yarn add babel-loader@8 @babel/core @babel/preset-env @babel/plugin-transform-runtime -D
  yarn add @babel/runtime-corejs3

  // 配置 .babelrc 
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "modules": false,
        }
      ]
    ],
    "plugins": [
      [
        "@babel/plugin-transform-runtime",
        {
          "corejs": {
            "version": 3,
            "proposals": true
          },
          "useESModules": true
        }
      ]
    ]
  }
```
