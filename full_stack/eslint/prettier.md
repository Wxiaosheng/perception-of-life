#### Prettier
我们可以借助 Eslint 来提高我们编码的质量，但是却无法保证统一代码风格，因此我们可以选择使用 Prettier 在保存和提交代码的时候，将代码修改成统一的风格。

它不会代替 Eslint，所以需要和 Eslint 搭配使用。

#### 安装
首先 你的项目中已经使用了 ESLint，有 eslintrc.js 配置文件  

```bash
  yarn add -D prettier eslint-plugin-prettier eslint-config-prettier
```

##### eslint-plugin-prettier 
eslint-plugin-prettier 插件会调用 prettier 对你的代码风格进行检查，其原理是先使用 prettier 对你的代码进行格式化，然后与格式化之前的代码进行对比，如果过出现了不一致，这个地方就会被 prettier 进行标记。  

##### eslint-config-prettier
通过使用 eslint-config-prettier 配置，能够关闭一些不必要的或者是与 prettier 冲突的lint选项。这样我们就不会看到一些error同时出现两次。使用的时候需要确保，这个配置在 extends 的最后一项。

#### 配置 
1. 需要在 rules 中添加，`"prettier/prettier": "error"`，表示被 prettier 标记的地方抛出错误信息。

2. 需要在 extends中添加，`"plugin:prettier/recommended"`，这个配置要在 extends 的最后一项

```javascript
  // .eslintrc.js
  {
    "extends": [
      // ...
      "plugin:prettier/recommended"
    ],
    "rules": {
      // ...
      "prettier/prettier": "error"
    }
  }
```

#### 保存文件或提交文件时自动修复
借助 ESLint 的 autofix 功能，在保存代码的时候，自动将抛出 error 的地方进行 fix  

因为我们项目是在 webpack 中引入 eslint-loader 来启动 eslint 的，所以我们只要稍微修改 webpack 的配置，就能在启动 webpack-dev-server 的时候，每次保存代码同时自动对代码进行格式化  

```javascript
  {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    enforce: 'pre',
    use: [
      {
        options: {
  + + + + fix: true,
          cache: false,
          formatter: require.resolve('react-dev-utils/eslintFormatter'),
          eslintPath: require.resolve('eslint'),
          resolvePluginsRelativeTo: __dirname,
        },
        loader: require.resolve('eslint-loader'),
      },
    ],
    include: paths.appSrc,
  },
```
!> 注意，如果你的eslint是直接通过cli方式启动的，那么只需要在后面加上fix即可，如：eslint --fix