

#### @babel/perset-env

[@babel/perset-env](https://www.babeljs.cn/docs/babel-preset-env) 是一个智能预置，允许您使用最新的JavaScript，而无需管理目标环境需要哪些语法转换（以及可选的浏览器polyfill）。  

**原理** 是通过配置得知目标环境的特点，然后只做必要的转换。    

    在没有任何配置的情况下，env 等价于 latest，也等价于 es2015 + es2016 + es2017 三个相加(不包含 stage-x 中的插件)，这个预设将包括所有支持现代JavaScript的插件（ES2015、ES2016等）。 


#### 参数

##### targets
targets，用来配置需要支持的的环境，不仅支持浏览器，还支持 node。如果没有配置 targets 选项，就会读取项目中的 browserslist 配置项。

##### modules
启用将ES6模块语法转换为其他模块类型，将此设置为false不会转换模块。  
如果要使用 webpack 中的一些新特性，比如 tree shaking 和 sideEffects，就需要设置为 false，对 ES6 的模块文件不做转化，因为这些特性只对 ES6 的模块有效。

##### useBuiltIns
"usage" | "entry" | false，默认值是 false。  

!> 注意，通常 useBuiltIns 的使用是配合 core-js 一起使用的，如果不指定 core-js，默认为 2.x

```javascript
  // 转译前的代码

  let array = [1, 2, 3, 4, 5, 6]
  array.includes(item => item > 2)

  new Promise()

  async function a(){
    console.log(1)
  }

```

* **false** 

> 此时不对 polyfill 做操作。如果手动引入 @babel/polyfill，则无视配置的浏览器兼容，引入所有的 polyfill。

!> 不推荐这种方式，因为这会导致代码体积很大。

```javascript
  // 例如使用如下的 babel 配置
  {
    "presets": [
      [
        "@babel/env",
        {
          "useBuiltIns": "false"
        }
      ]
    ]
  }

  // 转译后的代码
  "use strict";

  // require("@babel/polyfill"); // 如果入口文件首页引入了 @babel/polyfill，则转译后的代码会多这一句

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var array = [1, 2, 3, 4, 5, 6];
  array.includes(function (item) {
    return item > 2;
  });
  new Promise();

  function a() {
    return _a.apply(this, arguments);
  }

  function _a() {
    _a = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(1);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _a.apply(this, arguments);
  }

```

* **entry** 

> 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill。  
```JavaScript
  // 使用 entry 时，需要指定 corejs 的版本
  "useBuiltIns": "entry",
  "corejs": 2,

```

需要手动在入口文件处导入 @babel/polyfill，会自动根据 browserslist 的配置替换成浏览器不兼容的所有 polyfill

!> 能够覆盖到'hello'.includes('h')这种句法，足够安全且代码体积不是特别大，推荐这么用

!> 经测试发现，不需要安装 @babel/polyfill，因为转译后的文件，引入的都是 core-js 和 regenerator-runtime/runtime
```javascript
  import '@babel/polyfill' 

  // 如果 core-js 的版本指定为3时，则需要将 @babel/polyfill 改成

  import 'core-js/stable'
  import 'regenerator-runtime/runtime'
```

实例：
```javascript
  // 例如使用如下的 babel 配置
  {
    "presets": [
      [
        "@babel/env",
        {
          "useBuiltIns": "entry",
          "corejs": 2
        }
      ]
    ]
  }

  // 转译后的代码 (首页入口未引入 @babel/polyfill)
  "use strict";

  // 首页入口引入 @babel/polyfill 时，会多出很多下面的这种 require 👇

  // require("core-js/modules/es6.array.copy-within");
  // ...
  // require("core-js/modules/web.dom.iterable");
  // require("regenerator-runtime/runtime");

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var array = [1, 2, 3, 4, 5, 6];
  array.includes(function (item) {
    return item > 2;
  });
  new Promise();

  function a() {
    return _a.apply(this, arguments);
  }

  function _a() {
    _a = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(1);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _a.apply(this, arguments);
  }

```

* **usage**   

> 不需要手动安装 @babel/polyfill，也不用在文件顶部引入 @babel/polyfill，会根据代码中的使用进行按需添加。 

!> 注意，检测不到'hello'.includes('h')这种句法，对这类原型链上的句法问题不会做转译，如果使用这种方式，书写代码需注意。

```javascript
  // 转译后的代码

  "use strict";
  require("regenerator-runtime/runtime");
  require("core-js/modules/es6.promise");
  // ......
  require("core-js/modules/es6.object.to-string");
  require("core-js/modules/es7.array.includes");

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var array = [1, 2, 3, 4, 5, 6];
  array.includes(function (item) {
    return item > 2;
  });
  new Promise();

  function a() {
    return _a.apply(this, arguments);
  }

  function _a() {
    _a = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(1);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _a.apply(this, arguments);
  }
```

终于弄清楚，**@babel/preset-env** 与 **@babel/polyfill** 之间的关系了。  

使用 **@babel/preset-env** 包的 **useBuiltIns** 的参数解决 polyfill 问题时，需要注意以下几点：

!> 需要配置 **corejs** 参数，默认为 2；如果设置为 3 时，手动导入 @babel/polyfill 必须换成 corejs/stable 和 regenerator-runtime/runtime

!> useBuiltIns：false 时，手动在入口处引入 **@babel/polyfill**，则需要安装 **@babel/polyfill** 否则打出来的包没有 require 那些转译的 plugins，但 webpack/babel 打包时并不会在命令行提示和报错， entry 和 usage 都不需要安装 **@babel/polyfill**

!> 当前的这些测试是基于 "@babel/core": "^7.9.0"、 "@babel/preset-env": "^7.9.0" 、"webpack": "^4.42.1" 测试的

