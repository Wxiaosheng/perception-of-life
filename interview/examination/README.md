## 基础知识 - 大纲

### HTML
* 是什么？发展历史？
* 与 XHTML 的区别
* doctype
* 什么是HTML语义化
* HTML5有哪些新标准？更新的标准是什么？
* img 标签的特殊应用(数据统计，为什么不用 ajax)

### CSS
* 是什么？
* 盒模型(BFC)
  * 如何清除浮动？
* 常见移动端布局方式
* 动画
* 选择器(权重)
* style 与 import 哪个权重更高
* sass/less
  * 常见语法、相对css的增强功能
* em、rem、vh等
* vertical-align
* 纯 css 实现实心、带边框、空心三角
* 纯 css 实现 播放/暂停按钮
* 盒子相对父盒子居中的几种办法
* 一个div，怎么用css实现半圆和圆形
* display:none与visibility:hidden的区别
* div包裹 img，底部会出现空白


### JavaScript
* 基础知识
* 三座大山
  * 作用域和作用域链(闭包)
  * 原型和原型链
    * new 关键字发什么什么？(实例化的本质)
    * class 和 普通构造函数的区别
    * 面向对象编程，常见实现继承的方式
    * 链式编程
    * typeof instanceof
* 异步和单线程
  * fetch
  * Promise
    * 是什么？为了解决什么问题而诞生的？
    * 如何使用？原理是什么？
    * 手写 Promise
  * async await / generator
    * 是什么？怎么使用？
    * 原理是什么？
  * DOM事件
    * 事件流/标准
* this 指向问题
* call、apply、bind
  * 原理是什么？各自有什么区别？
  * 手写 函数
* 函数式编程
  * 概念是什么？如何应用？函数柯里化
* fn.length、callee、caller
* js异步延迟加载的实现方式
* js 堆和栈
* 深拷贝、浅拷贝
* 节流、防抖
* js 的垃圾回收机制

#### 常见面试题
1. add(2,5) =>7，add(2)(5)=>7
2. 字符串’aaaacdd’=>{a:4,c:1,d:2}
3. 按照0.5决定向上还是向下取整
4. padLeftZero，以及es6新增的这个api用法
5. 数组洗牌(有序变无序
6. Math.floor的另类写法)
7. 0,1,2三个数字的无限循环(例如播放模式共三种，可以循环切换)
8. 如何用setTimeout模拟setInterval，另外，为什么要这么做？
9. js各种编码与解码的区别
10. hasOwnProperty . Object.getOwnPropertyDescriptor()
11. Object.defineProperty Object.defineProperties （新标准 proxy）
12. 千位加逗号


### 正则表达式
* 原理、常见用法


### 浏览器的工作原理
* 如何解析 HTML的？
* 如何执行 CSS 的？
* 如何执行 JS 的？
* 如何加载文件的？
* 什么是渲染、重排？
* 浏览器(HTTP)的并发请求数
* 前后端数据交互
  * cookie，原生js如何操作cookie
  * session、token
  * oath 授权登录

### webpack
* 是什么？ 用来解决什么问题的？怎么发展的？
* 如何使用？ 
* 原理是什么？
* 手写 webpack

### babel
* 是什么？用来解决什么问题的？怎么发展的？
* 如何使用？
* 原理是什么?(抽象语法树)

### HTTP
* 概念，版本之间的区别？(1.0、1.1、https、2.0)
* 特点
* 常见状态码即含义
* keep alive
* 输入URL到呈现内容到底经历了什么？
* TCP/IP  三次握手，四次挥手
* 缓存（强缓存 / 协商缓存）
* HTTP 安全头配置
* HTTPS 原理、过程、好处、相关概念
* HTTPS 抓包
* websocket 与HTTP 比较

### web 安全
* xss、csrf


### 常见设计模式

### 其他
#### CSS 放在头部的原因 / script 放在尾部的原因

#### load 与 DOMContentLoaded 的区别 (FP、FCP、FMP)

#### 百万级运算怎么提高性能

#### requestIdleCallback 与 requestAnimationFrame

#### 跨域的常见解决方案

### [1、谈谈你对 CSS 盒模型的理解](/interview/examination/box-model)

### [2、DOM事件](/interview/examination/document-object-model)

### [3、HTTP相关](/interview/examination/http)
