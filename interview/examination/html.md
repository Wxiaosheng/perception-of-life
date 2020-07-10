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
声明位于文档中的最前面的位置，处于 标签之前。 声明不是一个 HTML 标签，它是用来告知 Web 浏览器页面使用了哪种 HTML 版本  

DTD（Document Type Definition 文档类型定义）的作用是定义XML文档的合法构建模块


#### 谈谈对 HTML 语义化的理解
根据所要表达的内容的含义，选择合适的标签，以便于开发者阅读和写出更优雅的代码，同时更利于爬虫和机器解析

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
