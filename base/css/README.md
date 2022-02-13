> 层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。

> 是为了解决 内容和样式分离的问题

**CSS 规则：选择器， 及一条或多条声明组成**


### CSS选择器
* !import规则（会覆盖CSS中任何其他的声明, 无论它处在声明列表中的哪里）
* 内联样式
* ID 选择器
* class 选择器
* 伪类选择器
* 属性选择器
* 伪元素选择器
* 标签(元素)选择器
* 通用选择器

##### CSS 优先规则：
内联样式 > id 选择器 > 类选择器 = 伪类选择器 = 属性选择器 > 标签选择器 = 伪元素选择器

内联样式 > 内部样式 > 外部样式 > 默认样式

### CSS 盒模型
[谈谈你对 CSS 盒模型的理解](interview/examination/box-model.md)

### BFC
> 边距重叠解决方案

#### BFC基本概念
Block Formatting Context，块级格式化上下文，一个独立的块级渲染区域，该区月有一套渲染规则来约束块级盒子的布局，并且与区域外部无关

#### BFC的原理
1. BFC 区域间的垂直边距不会发生重叠
2. BFC 区域不会与浮动元素的 float 重叠
3. 独立的容器，内外元素互不影响
4. 计算BFC高度，浮动元素也参与计算

#### 如何创建BFC
* float 不为 none
* position 不为 static 或 relative
* display 与 table 相关时
* overflow 为 auto、hidden 时

#### BFC 使用场景
* 解决垂直边距重叠
* 解决 float 重叠
* 清除浮动（父元素高度坍塌） - 使父元素变成BFC

可参考[此处](interview/examination/box-model.md#BFC)


### CSS 常见布局
##### 圣杯布局
##### 双飞翼布局
##### 移动端常见布局


### 定位


### 响应式

### 动画



### 实际应用
* [CSS3 + JS 实现音视频播放器播放按钮](full_stack/base/css/playBtn)


### 常见面试题
1. 谈谈对 HTML 语义化的理解？  

2. HTML5 新特性  

3. 盒模型的宽度如何计算？  

4. margin 纵向重叠问题   

5. margin 负值的问题  

6. float 布局的问题 以及 clearfix  

7. 重排 Reflow  
Reflow 会在文档中重新去计算元素的位置和几何形状  
 	触发 Reflow  
 	增加、删除、修改DOM节点时，会导致 Reflow 或 Repaint  
 	移动 DOM 位置，或者位移动画时 修改网页默认字体时  

8. 重绘 RePaint  
RePaint 只不过是屏幕上的重新绘制元素，但是不会影响布局  
 	如 背景颜色的的修改  

9. URL  
统一资源定位符（Uniform Resource Locators）   
**语法规则：scheme://host.domain:port/path/filename**

10. sticky 定位  
粘性定位，及 滚动吸顶(底、左、右)  
元素定位表现为在跨越特定阀值前为相对定位，之后为 固定定位  
特定的阀值是指 top、right、bottom、left 之一，即必须制定4个阀值之一才会生效，否则其行为与 相对定位相同  