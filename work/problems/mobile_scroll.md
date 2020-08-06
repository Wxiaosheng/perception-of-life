### 移动端滚动事件
我们平时在开发移动端项目的时候，难免会碰到一些页面滚动相关的需求，通常会寻找许多第三方的库去解决问题，例如 `antd mobile` 等成套解决方案  
但是，当我们需要实现一个例如滑动吸顶这样的需求的时候，其实并不好找第三库，或者第三库并不成熟无法满足当前的业务需求，这是我们就需要我们了解这效果实现的底层原理了

### 预备知识
#### 获取元素距离窗口或父元素的高度
##### clientTop
表示上边框border的厚度
##### offsetTop
返回当前元素顶部相对于 HTMLElement.offsetParent 节点的顶部距离的像素值
* 一个元素的 offsetParent 的判断条件（满足其中一条即可）
  * 具有 position 属性(除了 static)的最近父元素
  * 最近的 table，table cell 父元素
  * 根节点元素
  * 设置了动画 transform 的最近元素
![offsetTop](/work/images/offsetTop.jpg)  

##### scrollTop
代表在有滚动条时，元素顶部被遮住部分的高度
![](/work/images/scrollTop.jpg)

##### pageYoffset
返回视窗滚动过的距离，不兼容IE9以下


### 实现方式
#### 方法一：sticky
sticky 目前还处于提案阶段，并未被广大的浏览器普遍支持，具体情况请看下图
![support sticky](/work/images/support_sticky.jpg)

```html
<style>
ul,li,p {
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  height: 100px;
  background: #fafafa;
  margin-bottom: 10px;
}
.box {
  position: relative;
}
.title {
  height: 100px;
  background: red;
  position: sticky;
  top: 0;
}
</style>
<header>page header</header>
<div>
  <div class="title">标题</div>
  <ul>
    <li>1</li>
    <!-- ...省略... -->
  </ul>
</div>
```
!> 使用 sticky 有两点需要注意  
1、吸顶元素的父元素要 使用定位  
2、吸顶元素在指定 sticky 后，还必须指定 top

#### 方法二：scrollTop、offsetTop、pageYoffset
请参照个人开发 `@tianzun/react-mobile-sticky` 组件

#### 方法三：obj.getBoundingClientRect(兼容性最好的方式)
使用 `obj.getBoundingClientRect` 方法，获取目标元素距离视窗的高度，宽度，距离等值 来实现
```html
<div id="box">
  <p>some txt</p>
  <p>some txt</p>
  <p>some txt</p>
  <div id="target">标题</div>
  <div id="none" style="display: none;">标题</div>
  <ul>
    <li>1</li>
    <!-- ...省略... -->
  </ul>
</div>
<script>
  const box = document.getElementById("box")
  const tar = document.getElementById("target")
  const none = document.getElementById("none")

  const targetTop = tar.getBoundingClientRect().top;

  let isChange = false;
  let oldClass = ""

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > targetTop) {
      if (!isChange) {
        oldClass = tar.className
        isChange = true
        tar.className += " sticky"
        none.style.display = "block";
      }
    } else {
      tar.className = oldClass
      isChange = false
      none.style.display = "none";
    }
  })
</script>
```