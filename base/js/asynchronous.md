### 单线程 和 异步
#### 线程 和 进程
线程是操作系统中能进行运算调度的最小单位。它被包含在进程中，是进程中实际运作的单位。一个进程可以并发多个线程，每条线程并发执行不同任务  
[更多请参阅阮一峰老师的文章](http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html)

#### 为什么JavaScript是单线程
这就要从 JavaScript 的作用说起了。JavaScript 的作用主要是与用户交互 和 操作 DOM   
如果 JavaScript 不是单线程的，那么就存在一种情况，多个线程同时修改同一个DOM时，会发生冲突，为了杜绝这种问题的出现，JavaScript 只能是单线程的

!> 单线程其实可以看成是DOM操作冲突的解决方案

#### 什么是异步
异步是相对于同步来说的，当 JavaScript 执行时遇见例如请求数据时，如果是同步的，则后续的代码必须等待请求的数据完成之后才会执行，单线程的 JavaScript 也就是说同一时间只能干一件事，其他的任务都处于挂起状态，显然这样的效果并不是我们想要的  
为了解决这个问题，JavaScript 使用异步的方式，即当请求数据时，不去等待数据响应的过程，立即执行后续的代码，等到数据响应之后才去执行相应的操作  

!> 异步其实可以看成 JavaScript 单线程的解决方案

#### 何时使用异步
* 定时任务： setTimeout、setInverval等
* 网络请求： ajax请求、动态 img 加载
* 事件绑定

#### 浏览器的内核机制
浏览器的内核是多线程的，一个浏览器一般至少实现三个常驻线程：
1. **JS 引擎**： 是基于事件驱动单线程执行的，JS引擎一直等待着任务队列中任务的到来，然后加以处理，浏览器无论什么时候都只有一个JS线程在运行JS程序  
2. **GUI 渲染引擎**： 负责渲染浏览器界面，当界面需要重排、重绘或由于某种操作引发回流时,该线程就会执行。但需要注意 GUI渲染线程与JS引擎是互斥的，当JS引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行
3. **事件触发线程**： 当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待JS引擎的处理。这些事件可来自JavaScript引擎当前执行的代码块如setTimeOut、也可来自浏览器内核的其他线程如鼠标点击、AJAX异步请求等，但由于JS的单线程关系所有这些事件都得排队等待JS引擎处理

未完待续。。。


#### Event Loop
> Event Loop 指的是计算机系统的一种运行机制，JavaScript 就是使用这种机制，来解决单线程运行带来的一些问题

浏览器的 Event Loop 是在 [HTML5的规范](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops) 中明确定义的  

##### 宏任务 和 微任务
* 宏任务： `macro task`，一些异步任务的回调回一次进入 `macro task queue`，等待后续被调用，这些任务包含：
  * setTimeout
  * setInverval
  * I/O
  * requestAnimationFrame (浏览器独有)
  * UI rendering (浏览器独有)
  * setImmediate (Node独有)
* 微任务： `micro task`，另一些异步任务的回调回依次进入 `mirco task queue`，等待后续被调用，这些异步任务包括：
  * Promise.then
  * Object.observe
  * MutationObserver (这个不知道是啥)
  * process.nextTick (Node 独有)

##### 具体执行过程
1. JavaScript 执行时，全局有一个全局执行上下文，它是一个栈，除非页面关闭或者退出程序，才会结束
2. JavaScript 开始从入口处执行时，碰到异步语句时会将其放入 任务队列(宏任务和微任务)中；
3. 当代码执行完毕后，全局调用栈为空栈，此时 优先取出微任务队列中首任务，压入全局调用栈中执行；
4. 如果执行完后，再次取出微任务队列中的剩余任务，如果没有则取出宏任务队列中的首任务，压入全局调用栈中执行；
5. 重复3 - 4，如果宏任务中也没有任务了则线程挂起

下面来看一个例子：
```javascript
console.log(1);
setTimeout(() => { // macro 1
  console.log(2);
  Promise.resolve().then(() => { // micro 4
    console.log(3)
  });
});
new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => { // micro 1
  console.log(data);
  Promise.resolve().then(() => { // micro 2
    console.log(6)
  }).then(() => { // micro 3
    console.log(7)
    setTimeout(() => { // macro 3
      console.log(8)
    }, 0);
  });
})
setTimeout(() => { // macro 2
  console.log(9);
})
console.log(10);

// 执行结果为，1、4、10、5、6、7、2、3、9、8
```
* 主进程执行时：
  * 首先会输出 1
  * 然后会将 `macro 1` 函数放进 宏任务队列中
  * `new Promise` 的参数是同步的，立即执行输出4，并且改变Promise状态，将 then 回调 `micro 1` 放入微任务队列中
  * 然后将最后一个 `setTimeout` 的回调函数 `macro 2` 放进 宏任务队列中
  * 最后输出 10
* Event Loop：
  * 先取出微任务队列中首任务 `micro 1` 放入全局执行环境栈中执行，因此输出 5，又会将新的 `micro 2` 加入 微任务队列中
  * `micro 1` 执行完毕后会取出 `micro 2` 放入全局执行环境栈中执行，输出 6，又会将新的 `micro 3` 加入 微任务队列中
  * `micro 2` 执行完毕后会取出 `micro 3` 放入全局执行环境栈中执行，输出 7，又会将新的 `macro 3` 加入 宏任务队列中
  * 此时微任务队列为空，则取出 `macro 1` 放入全局执行环境栈中执行，输出 2，又会将新的 `micro 4` 加入 微任务队列中
  * 取出 `micro 4` 放入全局执行环境栈中执行，输出 3
  * 取出 `macro 2` 放入全局执行环境栈中执行，输出 9
  * 取出 `macro 3` 放入全局执行环境栈中执行，输出 8

再来看一个有趣的 Promise 的执行：
```javascript
  Promise.resolve().then(
    () => console.log(1) // micro 1
  ).then(
    () => console.log(2) // micro 3
  ).then(
    () => console.log(3) // micro 5
  )
  Promise.resolve().then(
    () => console.log(4) // micro 2
  ).then(
    () => console.log(5) // micro 4
  ).then(
    () => console.log(6) // micro 6
  )
  // 执行结果： 1、4、2、5、3、6
```
* 主进程执行时：
  * 执行第一个 Promise 将 `micro 1` 压入微任务队列中，然后并不会执行该 Promise 的第二个 then
  * 执行第二个 Promise 将 `micro 2` 压入微任务队列中，然后并不会执行该 Promise 的第二个 then
  * 主进程执行完毕，出栈
* Event Loop:
  * 将微任务中的 `micro 1` 取出放入全局执行栈中执行，输出 1，并且将该函数返回的 Promise 的 then 回调 `micro 3` 压入微任务队列中
  * 将微任务中的 `micro 2` 取出放入全局执行栈中执行，输出 4，并且将该函数返回的 Promise 的 then 回调 `micro 4` 压入微任务队列中
  * 将微任务中的 `micro 3` 取出放入全局执行栈中执行，输出 3，并且将该函数返回的 Promise 的 then 回调 `micro 5` 压入微任务队列中
  * 将微任务中的 `micro 4` 取出放入全局执行栈中执行，输出 5，并且将该函数返回的 Promise 的 then 回调 `micro 6` 压入微任务队列中
  * 将微任务中的 `micro 5` 取出放入全局执行栈中执行，输出 3
  * 将微任务中的 `micro 6` 取出放入全局执行栈中执行，输出 6

!> then 方法写起来看上去像是同一条语句，但是**第二个 then 回调是前一个 then 回调返回的新的 Promise 对象状态改变后才执行**，因此前一个 then回调 不执行，就不会生成新的 Promise 对象，则第二个 then回调 不会进微任务队列中










   