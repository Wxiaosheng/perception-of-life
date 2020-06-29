### 谈谈你对 CSS 盒模型的理解

#### 思路解析
!> 注意，面试是层层递进的，简单的说会根据你的回答，继续深挖
1. 怎么去谈，按照什么思路来讲；  
  是什么？有哪几种？有什么区别？

2. 可能追问哪些问题，如果可能，如何引导；

#### 答案
##### 基本概念  
  所有的 HTML 元素都可以看做盒子，盒模型是 CSS 构建的基础，由内到外包括 content、padding、border 和 margin 四个部分；

##### 分类  
  **标准盒模型** 和 **IE 盒模型**，如下图所示xw
![content box](/interview/images/content-box.png)
通过 CSS 设置的 width 只是表示 content 的大小，当新增 padding、border 和 margin 时，元素整体大小会发生变化；

![botder box](/interview/images/border-box.png)
通过 CSS 设置的 width 表示的是 content、padding 和 border 的大小，当修改 padding、border 和 margin 时，元素整体大小不会发生变化；

##### 区别
通过 CSS 设置的 width 表示控制的内容不同，标准合模型的 width 只是表示 content 的大小；IE 盒模型的 width 表示的是 content、padding 和 border 三者共同的大小。

##### 如何设置两种模型？
* **box-sizing: content-box;** 默认情况下，CSS 元素的盒模型为 标准盒模型；

* **box-sizing: border-box;** 设置 IE 盒模型；

```html
<section>
  <style>
    .content {
      width: 500px;
      height: 100px;
      padding: 20px;
      background: #34a2adad;
    }
    .border {
      box-sizing: border-box;
      width: 500px;
      height: 100px;
      padding: 20px;
      background: #a4a2adad;
    }
  </style>
  <div class="content">标准盒模型</div>
  <div class="border">IE 盒模型</div>
</section>

<!-- 对比结果如下图 -->
```
![content demo](/interview/images/compare-model.jpg)

##### 如何获取盒模型对应的宽高
* dom.style.width/height  
  只能获取到设置了行内样式(包含width)元素的宽高

* dom.currentStyle.width/height  
  只有 IE 支持

* window.getComputedStyle(dom).width/height  
  兼容最好，注意，这里获取到的只是width的值，并不一定是元素整体的大小

* dom.getBoundingClientRect().width/height  
  用于获取元素相对与浏览器视口的位置，已经是w3c标准，兼容性比较好，但是 IE8 及以下还是不支持
 

##### clientWidth、offsetWidth 和 scrollWidth 的区别
> 如何获取元素在页面上占据的大小 (注意 元素总大小不一定等于 width)   
scrollbar： 垂直的滚动条宽度（假设有，没有便为0）

**clientWidth = content + padding**  
**offsetWidth = content + padding + border + scrollbar**  
**scrollWidth = content + padding + border + scrollbar + 滚动进入不可见的内容** 


##### 根据盒模型解释边距重叠问题
当父元素中，子元素的高度为100px，上边距为10px，那么 父元素的高度为多少？(100或110)
```html
<section>
  <style>
    .parent {
      background: #f00;
      overflow: hidden;
    }
    .parent .children {
      margin-top: 10px;
      height: 100px;
      background: yellow;
    }
  </style>
  <div class="parent">
    <div class="children">子元素</div>
  </div>
</section>
```
当 parent 不设置`overflow: hidden;`时，高度为 100px，如果设置了则为 110px，这又是为什么呢？

#### BFC
##### BFC 的基本概念
BFC，全称为 Block Formatting Context，块级格式化上下文。一个独立的块级渲染区域，该区域有一套渲染规则来约束块级盒子的布局，且与外部区域无关。

##### 原理/特性/渲染规则
* 处于同一个 BFC 中的元素互相影响，可能会发生 margin collapse（边距坍塌/边距重叠）  
  父子元素、兄弟元素 和 空元素(上下边距会合并) 会发生
* BFC 在页面上是一个独立的容器，内外元素互不影响
* 计算 BFC 高度时，包括所有元素，如浮动
* BFC 的区域不会与浮动元素重叠

##### 如何构建 BFC
* float 属性不为 none
* position 为 absolute 或 fixed
* display 为 inline-block、table-cell、table-caption、flex、inline-flex
* overflow 不为 visible

##### 兄弟元素上下margin重叠
```html
<section>
  <style>
    .parent {
      background: #f00;
      overflow: hidden;
    }
    .parent .children {
      margin: 20px 0 5px;
      height: 100px;
      background: yellow;
    }
  </style>
  <div class="parent">
    <div class="children">兄弟1</div>
    <div class="children">兄弟2</div>
    <div class="children">兄弟3</div>
  </div>
</section>

解决方案，需要去除边距重叠的地方，选取一个兄弟元素，使用一层父元素包裹起来，设置父元素为 BFC 即可解决

<div style="overflow: hidden;">
  <div class="children">兄弟2</div>
</div>
```

##### 元素浮动重叠问题
```html
<section class="layout">
  <style>
    .layout {
      background: red;
    }
    .left {
      width: 100px;
      height: 100px;
      background: pink;
      float: left;
    }
    .right {
      height: 110px;
      background: #ccc;
    }
  </style>
  <div class="left"></div>
  <div class="right"></div>
</section>

左侧浮动的盒子会重叠在页面的主体上方，如果想实现左右两侧不重叠，则直接将右侧设置为 BFC 即可
```

##### 清除浮动带来的影响(浮动导致页面脱离文档流，外层元素高度为0)
```html
<section>
  <style>
    .parent {
      background-color: #f00;
    }
    .flaot {
      float: left;
      font-size: 30px;
      background-color: yellow;
    }
  </style>
  <div class="parent">
    <div class="flaot">浮动块</div>
  </div>
</section>

解决办法，设置浮动块的直接父元素为 BFC，让浮动的元素参与父元素高度的计算
```
