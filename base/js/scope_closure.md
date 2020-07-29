### 作用域和闭包
#### 什么是作用域
简单来说，作用域 是指程序中定义变量的区域，它决定了当前执行代码对变量的访问权限(读、写)

JavaScript 中，大部分情况下，只有三种作用域：
* 全局作用域： 全局作用域作为程序的最外层作用域，一直存在
* 函数作用域： 只有函数被定义时才会创建，包含在父级函数作用域/全局作用域内
* 块级作用域： 通过 `{}` 定义，变量的声明必须使用 let/const 块级作用域才会生效，使用 var 声明时不会生效，因为存在变量声明提前

!> 注意，代码在执行时只能访问自己所在的作用域和外层作用域，不能访问内层作用域

```javascript
  // 全局作用域
  const a = 1;
  function func(){
    // 函数作用域
    const b = 2;
    console.log(b) // 2
  }
  console.log(a) // 1
  console.log(b) // Uncaught ReferenceError: b is not defined
```

#### 作用域链
当程序中使用当前作用域不存在的变量时，不一定会报错，因为有可能外层作用域中存在该变量，例如
```javascript
  const a = 1;
  function func(){
    const b = 2

    // 当前函数作用域中并无 a 变量，但是外层作用域中存在，可以输出正确的值
    console.log(a)
  }
```
类似这在当前作用域中访问变量时，先查找本地作用域，如果找到了直接返回，如果没找到则去父级作用域中查找，一直找到全局作用域为止，我们把这种作用域的嵌套机制称为 作用域链。

#### 词法作用域
**词法作用域** (`Lexical Scopes`) 是 JavaScript 中使用的作用域类型，也被称为 **静态作用域**，下面来看一个例子
```javascript
  const a = 1
  function func1 () {
    console.log(a)
  }
  function func2 () {
    const a = 2;
    console.log(a)

    func1()
  }

  func2() // ???
```
当调用 `func2` 时，首先输出当前作用域中 a 的值 2，然后执行 `func1` 输出 a 时，是访问 func2 作用域中的值还是直接访问全局作用域的值？  

要回答这个问题，就要看 JavaScript 作用域类型 **词法作用域**，即 **函数被定义的时候，它的作用域就已经被确定了，和拿到哪里(某个作用域)执行无关**，因此词法作用域也被称为 静态作用域

#### 创建作用域
1. 定义函数，创建函数作用域 (推荐)
```javascript
  function func () {
    // 创建了一个函数作用域
  }
```

2. 使用 `let/const` 创建块级作用域 (推荐)
```javascript
  for (let i=0; i<5; i++) {
    console.log(i)
  }

  console.log(i) // Uncaught ReferenceError: i is not defined
```

3. 使用 with 关键字 
```javascript
  // 使用with关键字的目的是为了简化多次编写访问同一对象的工作
  with(window.location){
    const qs = search.substring(1);
    const hostName = hostname;
    const url = href;
  }
```

#### 作用域的应用场景
1. 模块化 (最常见的应用场景之一)
由于 JavaScript 并不原生支持模块化，因此带来很多问题，例如 全局作用域污染、变量命名冲突，代码结构臃肿复用性不高等，**在正式的模块化方案出台之前，开发者为了解决这类问题，想到了使用函数作用域来创建模块的方案**
```javascript
  function module1 () {
    const a = 1;
    console.log(a);
  }
  function module2 () {
    const a = 2;
    console.log(a);
  }
  module1(); // 1
  module2(); // 2
```
使用上述的方式，在 `module1` 和 `module2` 中同时使用 a 变量，并不会发生冲突，而且在外部也无法访问函数作用域内部的 a 变量，因此巧妙地解决了 **全局作用域污染** 和 **变量名冲突** 的问题  
但是也存在着缺点，那就是 `module1` 和 `module2` 本身已经对全局作用域产生了污染   

```javascript
  // module1.js
  (function () {
    const a = 1;
    console.log(a);
  })()

  // module2.js
  (function () {
    const a = 2;
    console.log(a);
  })()
```
将函数声明改写成 **立即调用函数表达式**（Immediately Invoked Function Expression 简写 IIFE），也被称为 **匿名函数自执行**，封装性更好，代码也更简洁，解决了模块名污染全局作用域的问题，然后我们对它再次进行强化
```javascript
(function(global){
  if (global) {
    // is browser
  } else {
    // is nodejs
  }
})(window)
```
通过传递参数的方式，能够识别外部环境
```javascript

```
最后，这是 UMD 模块化的代码

#### 闭包
**能访问其他函数内部变量的函数**， 被称为 **闭包**，不是很好理解，来看下面的一个例子：
```javascript
  function func1 () {
    const a = 1;
    function func2 () {
      console.log(a)
    }

    return func2
  }

  const f = func1()
  f() // 1
```
简单来说，闭包就是 **在函数内部定义另一个函数访问当前函数中的变量，并且返回新定义的函数，在当前函数外部调用**  

上述代码能输出 1 的原因是，func2 函数定义的时候，其作用域就已经确定(此法作用域)，因此可以直接访问外层作用域中的变量

#### 闭包的应用场景
1. 单例模式
2. 模拟私有属性
3. 柯里化

### 闭包的问题
可能导致 **内存泄漏**


