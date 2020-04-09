#### 实现 polyfill 方案的比较

如果需要实现对 ES6 语法和新 API 的转译，有以下两种方法：  
1. 方法一 **@babel/preset-env + @babel/polyfill**

2. 方法二 **@babel/preset-env + @babel/plugin-transform-runtime + @babel/runtime-corejs2**


##### 对比
那么这两种方法都有何种优劣呢？
1. 方法一 可以转译语法、新 API，但存在污染全局问题

2. 方法二 可按需导入，转译语法、新 API，且避免全局污染，但是检测不到'hello'.includes('h')这种句法


##### 使用
1. 自己的项目中(如网站)，则可以使用 **@babel/preset-env + @babel/polyfill**
  * 根据useBuiltIns参数确定如何使用@babel/polyfill，具体参数设置 [请参照这里](/full_stack/babel/preset-env.md?id=usebuiltins)
  * 安装依赖
    ```
      yarn add babel-loader@8 @babel/core @babel/preset-env -D
      yarn add @babel/polyfill
    ```
  * .babelrc配置文件
    ```javascript
      {
        "presets": [
          [
            "@babel/preset-env",
            {
              "modules": false, // 推荐
              "useBuiltIns": "entry", // 推荐
              "corejs": 2
            }
          ]
        ],
        "plugins": []
      }
    ```

2. 开发第三方类库，则可以使用 @babel/preset-env + @babel/plugin-transform-runtime + @babel/corejs2
  * 安装依赖
    ```
      yarn add babel-loader@8 @babel/core @babel/preset-env @babel/plugin-transform-runtime -D
      yarn add @babel/runtime-corejs2
    ```
  * .babelrc配置文件
    ```javascript
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
              "corejs": 2 // 推荐
            }
          ]
        ]
      }
    ```
  
