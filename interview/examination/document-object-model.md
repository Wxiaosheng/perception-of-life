### DOM事件

#### 基本概念
DOM，即 文档对象模型（document object model）

#### DOM 事件的级别
标准级别|语法|描述
---|---|---
DOM0 | dom.onclick = function(){ } | 监听事件通过 `onclick` 的形式
DOM2 | dom.addEventListener('click', function(){ }, false) | 新增 `addEventListener` 的方式监听事件
DOM3 | dom.addEventListener('keyup', function(){ }, false) | 新增 键盘⌨️、鼠标🖱等事件类型

!> 注意，不是DOM1这个标准，而是该标准中没有关于DOM事件的内容

#### DOM 事件模型
DOM 事件模型，其实指的就是 `冒泡` 与 `捕获`，如下图所示。
![capture-bubble](/interview/images/capture-bubble.png)

#### DOM 事件流
当用户点击页面某一元素时，如果该元素有监听点击事件，那么该事件会从`window`开始到目标元素，再从目标元素回到`window`的过程，被称为DOM事件流。  

通常，DOM 事件流分为三个阶段：
1. 捕获阶段
2. 目标阶段
3. 冒泡阶段

```html
<div id="button">click me</div>
<script>
  const btn = document.getElementById("button")

  window.addEventListener('click', function () { console.log('window capture') }, true)
  window.addEventListener('click', function () { console.log('window bubble') }, false)
  document.documentElement.addEventListener('click', function () { console.log('html capture') }, true)
  document.documentElement.addEventListener('click', function () { console.log('html bubble') }, false)
  document.body.addEventListener('click', function () { console.log('body capture') }, true)
  document.body.addEventListener('click', function () { console.log('body bubble') }, false)
  btn.addEventListener('click', function () { console.log('target capture') }, true)
  btn.addEventListener('click', function () { console.log('target bubble') }, false)

  // 控制台输出结果为：
  // window capture
  // html capture
  // body capture
  // target capture
  // target bubble
  // body bubble
  // html bubble
  // window bubble
</script>
```

#### Event 对象的常见应用
1. 阻止默认事件  
  event.preventDefault()
2. 阻止冒泡  
  event.stopPropagation()
3. 阻止当前元素其他同类型监听函数的执行  
  如果有多个相同类型事件的事件监听函数绑定到同一个元素，当该类型的事件触发时，它们会按照被添加的顺序执行。如果其中某个监听函数执行了 `event.stopImmediatePropagation()` 方法，则当前元素剩下的监听函数将不会被执行。
4. event.currentTarget  
  事件代理时的代理事件的父元素
5. event.target  
  目标元素

#### 自定义事件
使用 Event 构造函数，可以实现自定义事件
```JavaScript
const myEvent = new Event('myEvent')

dom.addEventListener('myEvent', fucntion(){}, false)

dom.dispatchEvent(myEvent)
```

!> 注意，使用 CustomEvent 接口，创建带有自定义数据的事件