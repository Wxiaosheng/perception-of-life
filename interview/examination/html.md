### HTML

#### 是什么？发展历史？
超文本标记语言（HyperText Markup Language），简称 HTML，是一种用于创建网页的标记语言。  

第一版 HTML 发布时间是 1991年，随后迭代了多个版本，而 XHTML1.0 是在 2000年发布的，知道现在 HTML5。  

#### 与 XHTML 的区别
* 其基础语言不同  
  HTML 基于 SGML，XHTML 基于 XML
* 语法严格程度不同  
  XHTML 语法比较严格（存在 DTD 定义规则），如 标签必须闭合，属性值必须加引号，HTML要求比较松散
* 可混合应用不同  
  XHTML 可与混合各种XML应用，HTML 不能混合其他应用
* 大小写敏感度不同  
  XHTML 对大小写敏感，HTML 对大小写不敏感


#### DOCTYPE
Document Type，即文档类型，用来指定当前页面所使用的的（X）HTML的版本  
声明位于文档中的最前面的位置，处于 标签之前。 声明不是一个 HTML 标签，它是用来告知浏览器使用哪种版本规范来渲染文档  
当 DOCTYPE 不存在或者形式不正确时，会导致 HTML 文档以**混杂模式**模式呈现  

##### 标准模式 与 混杂模式
标准模式 以浏览器支持的最高标准运行；混合模式中 页面是一种比较宽松的向后兼容的方式显示

##### 为什么HTML5只用写 <!DOCTYPE HTML> ?
HTML5不基于SGML（Standard Generalized Markup Language 标准通用标记语言），因此不需要对DTD（DTD 文档类型定义）进行引用，但是需要DOCTYPE来规范浏览器行为  

##### 谈谈对 HTML 语义化的理解
根据所要表达的内容的含义，选择合适的标签，以便于开发者阅读和写出更优雅的代码，同时更利于爬虫和机器解析

##### 常见分类元素
行内元素： a span img input select  
块级元素： div ul ol li dl dt dd h1 p   
空元素：  br hr link meta  

##### 为什么使用语义化
* 为了在没有css的情况下，页面也能呈现出很好的内容结构和代码结构
* 支持更多的设备
* 有利于 SEO
* 便于团队的开发和维护

##### 常见的语义化
* 更具文档上下文结构，合理的选择最适合表达当前的语义标签
* 为了提升用户体验，如：title，alt用于解释名词或解释图片信息，lable标签的活用
* 尽可能少的使用无意义的标签，div / span
* 使用表格，标题要用caption，表头用thead，主体部分用tbody包围，尾部要tfoot包围，表头和一般单元格要区分开，表头用th，单元格用td


#### HTML5
##### 什么是HTML5
简单地说，HTML5就是一系列用来制定现代富Web内容的相关技术的总称  
HTML5 ≈ HTML5核心规范 + CSS 3 + JavaScript， 其中HTML5和CSS主要负责界面，JavaScript负责逻辑处理

目的：减少互联网富应用（RIA )对Flash、Silverlight、Java Applet等的依赖，并且提供更多能有效增强网络应用的API

##### 有哪些新标准？
* 视频 / 音频
* Canvas
* 地图 API
* 拖拽 API
* Web 存储
* Web Workers
  * web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能（JS多线程工作解决方案）
  * Web Worker的基本原理就是在当前javascript的主线程中，使用Worker类加载一个javascript文件来开辟一个新的线程，起到互不阻塞执行的效果，并且提供主线程和新线程之间数据交换的接口：postMessage，onmessage
  * 优势：异步执行复杂计算，不影响页面的展示
* 表单增强功能
  * 新的 Input 类型（email、url、number、search、color）


##### HTML5新增了哪些语义标签
* header 头部
* nav 导航栏
* section 区块（有语义化的div）
*  main 主要区域
* artical 主要内容
* aside 侧边栏
* footer 底部


##### label 的作用是什么？是怎么用的？
label 标签用来定义表单控件的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。  

常用属性
* **for**: 表示label标签要绑定的HTML元素。你点击这个标签是，所绑定的元素自动获取焦点
* **accesskey**: 表示访问label标签所绑定的元素的热键，当您按下热键，所绑定的元素将获取焦点



##### 页面可见性（Page Visibility）API
就是对于用户来说，页面是显示还是隐藏, 所谓显示的页面，就是我们正在看的页面；隐藏的页面，就是我们没有看的页面，例如 后台运行时，页面就是不可见的

监听 `visibilitychange` 事件，访问 `document.hidden`，如果为 `true`，则表示页面可见，如果为 `false`，则表示隐藏

```javascript
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {//  页面展示

  } else { // 页面隐藏

  }

  /* 
    * 表示页面所处的状态
    * visible : 页面内容至少部分可见。
    * hidden : 页面内容对用户不可见。
    * prerender : 网页内容被预渲染并且用户不可见。
    * unloaded : 如果文档被卸载，将返回这个值
  */
  console.log(document.visibilityState)
})

```

##### 元素的 alt 和 title 有什么异同？
图片加载出错时， alt 会做为图片的代替文字出现，title 是元素的解释文字



