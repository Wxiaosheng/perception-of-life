### 清除浮动的几种方案

清除浮动，通常是指由于子元素浮动后脱离文档流，使父元素的高度无法被撑开或为0的问题。

##### 浮动带来的问题(为什么要清除浮动)
* 背景无法显示
* 边框无法被撑开
* margin、padding 设置的值不能正确显示

```html
<section>
  <style>
    .parent {
      color: #fff;
      font-size: 30px;
      border: 1px solid #f00;
    }
    .children {
      float: left;
      width: 300px;
      height: 200px;
      background: #00f;
      margin: 0 10px;
    }
  </style>
  <div class="parent">
    <div class="children">children1</div>
    <div class="children">children2</div>
  </div>
</section>

浮动带来的问题，如下图所示
```
![float problem](/blog/images/float-problem.jpg)

#### 解决方案
##### 1、给父元素设置高度
能解决问题，但是缺点很多，不能自适应浮动元素的高度，不推荐使用

##### 2、让父元素也浮动
这样的解决方案也不好，虽然父元素的高度能够自适应，但是会导致祖先元素的高度发生问题，不推荐使用

##### 3、clear: both
`clear: both` 的本质是闭合浮动， 就是让父盒子闭合出口和入口，不让子盒子出来。  
1. 在父元素的末尾(或者最后一个浮动元素后)添加一个空标签，设置其样式为 `clear: both`， 不推荐使用；  
2. 使用after伪元素清除浮动，推荐使用，如下所示；  
```html
<section>
<style>
  .parent {
    color: #fff;
    font-size: 30px;
    border: 1px solid #f00;
  }
  .children {
    float: left;
    width: 300px;
    height: 200px;
    background: #00f;
    margin: 0 10px;
  }
  .clearfix::after {
    content: '';
    clear: both;
    display: block;
    height: 0;
    visibility: hidden;
  }
</style>
<div class="parent clearfix">
  <div class="children">children1</div>
  <div class="children">children2</div>
</div>
```

##### 4、创建 BFC
> 关于 BFC 的内容可以看[这里](/interview/examination/)  

让父元素变成 BFC即可，BFC 元素的高度计算时，会将浮动元素计算在内，但是 **可能造成不会自动换行** 和 **无法显示要溢出的元素**。
