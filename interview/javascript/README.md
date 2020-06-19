## 基础知识 - javascript 部分

### 单线程
单线程就是同时只能做一件事情 

### 异步
#### 1. javascript 为什么是单线程的？
##### 原因：避免 DOM 渲染冲突。

* 浏览器需要渲染 DOM
* JS 可以修改 DOM 结构
* JS 执行的时候，浏览器 DOM渲染会暂停
* 两段 JS 也不能同时执行 (都修改了 DOM 就冲突了)
* HTML5 中的 webworker 支持多线程，<span class="red">但是不能访问 DOM</span>

解决单线程执行效率慢的方案： **<span class="red">异步</span>**，但是异步自身也存在着一些问题。

* 问题一： 没有按照书写的顺序执行代码，可读性差
* 问题二： 容易陷入回调地狱

!> 单线程和异步的关系？   
单线程就是同时只能做一件事情，两段JS不能同时执行。


#### 2、什么是 event-loop？
* 事件轮询，JS 实现异步的具体解决方案
* 同步代码，直接执行
* 异步函数，先放在 <span class="red">异步队列</span> 中
* 待同步函数执行完毕，轮询执行异步队列中的函数

```js
  console.log(1)
  setTimeout(() => console.log(2))
  console.log(3)

  // event-loop 执行过程

主进程                                          |     异步队列
  console.log(1) // 立即执行                     |      () => console.log(2) // 立即放入
  console.log(3) // 立即执行                     |     
```
```js     
  setTimeout(() => console.log(1), 1000)
  setTimeout(() => console.log(2))
  console.log(3)

 // event-loop 执行过程

主进程                                         |     异步队列
  console.log(3) // 立即执行                   |      () => console.log(2) // 立即放入
                                              |      () => console.log(1) // 1000 ms 后放入(所以才在 1000ms 执行执行)
```
```js   
  $.ajax({
    url: "xxxxxx",
    success: () => console.log(1)
  })  
  setTimeout(() => console.log(2), 1000)
  setTimeout(() => console.log(3))
  console.log(4)

 // event-loop 执行过程

主进程                                         |     异步队列
  console.log(4) // 立即执行                   |      () => console.log(3) // 立即放入
                                              |      () => console.log(2) // 1000 ms 后放入(所以才在 1000ms 执行执行)
                                              |      () => console.log(1) // ajax 请求成功之后放入(无法判断请求时间的长短，看网络情况)
```

#### 3、JQuery 的 Deferred
* 无法改变 JS 异步 和 单线程的本质
* 只能从写法上杜绝 回调地狱
* 很好的体现了，<span class="red">开放封闭原则</span>(对扩展开放，对修改封闭)
