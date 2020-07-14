### CSS 实现居中

#### 水平居中
水平居中是我们在开发的过程中，遇见的非常非常常见的布局，下面👇 我就简单来说一说常见的方法

1. margin: auto
2. text-align
3. flex
4. position 定位

##### margin: auto
最简单实现 水平居中 的方式，目标元素必须要有宽度才可以，注意，此方法只对 **块级元素(block)有效**
```html
<style>
  .box { background: #ddd; }
  .target { width: 200px; height: 100px; background: red; margin: auto; }
</style>

<div class="box">
  <div class="target"></div>
</div>
```

##### text-align
可以实现块级元素内部的行内元素水平居中，注意，此方法只对 **行内元素(inline)、行内块(inline-block)、行内表(inline-table)、inline-flex 元素** 水平居中都有效  
<span class="red">当有多个行内元素相邻时，也能生效</span>
```html
<style>
  .box { text-align: center; background: #ddd; }
  .target { display: inline-block; width: 50px; height: 50px; background: red; }
</style>

<div class="box">
  <span class="target"></span>
</div>
```

##### flex
利用弹性布局flex，通过 `justify-content` 设置弹性盒子元素在主轴(默认横轴)方向上的对齐方式
```html
<style>
  .box { display: flex; justify-content: center; background: #ddd; }
  .target { width: 50px; height: 50px; background: red; }
</style>

<div class="box">
  <span class="target"></span>
</div>
```

##### position 定位
看下方代码，可以很清晰的看出，首先父元素要加一行 `position: relative`，其次必须知道目标元素的宽度，如果不知道就必须使用 js 动态的去计算
```html
<style>
  .box { position: relative; }
  .target { position: absolute; left: 50%; margin-left: -1/2宽度 }
</style>

<div class="box">
  <div class="target"></div>
</div
```

#### 垂直居中
水平居中是我们在开发的过程中，遇见的非常非常常见的布局，下面👇 我就简单来说一说常见的方法

1. line-height
2. vertical-align
3. flex
4. table-cell
5. position 定位


##### line-height
此方法一般而言，是是用于文本垂直居中的，对行内元素，块级元素无效
```html
<style>
  .box { height: 100px; line-height: 100px; background: #ddd; }
  .target { width: 30px; height: 30px; background: red; }
</style>

<div class="box">
  <div class="target"></div>
</div
```
##### flex
利用弹性布局flex，通过 `align-items` 设置弹性盒子元素在纵轴方向上的对齐方式
```html
<style>
  .box { display: flex; height: 100px; align-items: center; background: #ddd; }
  .target { width: 50px; height: 50px; background: red; }
</style>

<div class="box">
  <span class="target"></span>
</div>
```

##### vertical-align
`vertical-align` 该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐  
1. 需要配合伪元素一起使用（注意，要居中的目标元素必须是 `inline-block`，且伪元素的高度必须为 `100%`）
2. 配合 `display: table-cell` 一起使用，主要是要设置父元素的 `vertical-align`和`table-cell`

```html
<style>
  .box { height: 100px; background: #ddd; }
  .box::after { content: ""; display: inline-block; vertical-align: middle; height: 100%; }
  .target { display: inline-block; width: 50px; height: 50px; background: red; vertical-align: middle; }
</style>

<style>
  .box { height: 100px; background: #ddd; display: table-cell; vertical-align: middle; }
  .target { display: inline-block; width: 50px; height: 50px; background: red; }
</style>

<div class="box">
  <span class="target"></span>
</div>
```

##### table-cell
见 `vertical-align` 

##### position 定位
看下方代码，可以很清晰的看出，首先父元素要加一行 `position: relative`，其次必须知道目标元素的高度，如果不知道就必须使用 js 动态的去计算
```html
<style>
  .box { position: relative; }
  .target { position: absolute; top: 50%; margin-top: -1/2宽度 }
</style>

<div class="box">
  <div class="target"></div>
</div
```