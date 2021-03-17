### JS和CSS阻塞DOM加载的情况

1. HTML 文档解析完成触发 DOMContentLoaded 事件（解析到<\/html>表示解析完成）
2. 当所有的资源都加载完成之后会触发 window 的 load 事件

#### JS 阻塞 DOM 解析
> 加载一个很大的JS文件或者JS执行时间过长会导致页面白屏很长时间
 
```javascript
// bar.js
var count_bar = 0;
var start_bar = new Date();
for(var i=0;i<100000;i++){
  for(var j=0;j<10000;j++){
    count_bar++;
  }
}
var end_bar = new Date();
console.log(end_bar -  start_bar,'bar');

// foo.js
var count_foo = 0;
var start_foo = new Date();
for(var i=0;i<100000;i++){
  for(var j=0;j<10000;j++){
    count_foo++;
  }
}
var end_foo = new Date();
console.log(end_foo - start_foo,'foo');

// ress.js
var count_ress = 0;
var start_ress = new Date();
for(var i=0;i<100000;i++){
  for(var j=0;j<10000;j++){
    count_ress++;
  }
}
var end_ress = new Date();
console.log(end_ress - start_ress,'ress');
```
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="js/bar.js"></script>
    <script src="js/foo.js"></script>
    <script src="js/ress.js"></script>
  </head>
  <body>
    <div id="dd">div 1</div>
    <p>paragraph</p>
    <div>div 2</div>
    <img src="images/beauty.png" alt="" onload="console.log('image loaded')">
    <script>
      document.addEventListener("DOMContentLoaded",function(){
        console.log("dom content loaded");
      })
      window.onload = function(){
        console.log('resources loaded');
      }
    </script>
  </body>
</html>
```
1. 现代浏览器会并行加载 JS 文件 (按照书写顺序执行)
2. 加载和执行 JS 的时候，会阻塞DOM的解析
3. 也就是阻塞了 DOM 树的形成，只有等到 JS 执行完毕之后，浏览器才会继续解析

##### 如果 script 标签上增加 defer 属性
1. Script 标签的 defer 属性 会延迟脚本的执行，但是并不会延迟脚本的加载（浏览器遇到script就立即下载脚本）
2. 并且在HTML文档解析完成时执行脚本，且优先于DOMContentLoaded执行
3. 多个defer标签执行顺序按照书写顺序

##### 如果 script 标签上增加 async 属性
1. Script 标签的 async 属性，会延迟（异步）加载脚本
2. 在加载脚本时浏览器可以继续解析HTML标签
3. 异步脚本一定会在Load事件之前执行，但有可能在DOMContentLoaded之前或之后执行
4. 多个 async 的执行顺序不确定

!> 通常把 script 内容放在 body 最后，这样脚本文件不会阻止其他资源的下载

#### CSS 阻塞渲染
1. CSS文件的下载是并行的，不会阻塞HTML标签的解析
2. CSS 文件的下载会阻塞后面JS的执行，文件下载完成之后，才会执行后面的JS
3. CSS 文件的下载不会阻塞后面JS文件的下载，但是JS文件下载完成之后会被阻塞执

```html
<html>
  <head>
    <title>css阻塞</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
      console.log('before css');
      document.addEventListener("DOMContentLoaded", function () {
        console.log("content loaded");
        f();
      })
      function f() {
        console.log(document.querySelectorAll("h1"));
      }
    </script>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet">
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.css" rel="stylesheet">
    <link href="http://apps.bdimg.com/libs/bootstrap/2.3.2/css/bootstrap-responsive.css" rel="stylesheet">
    <script>
      console.log("after css");
    </script>
  </head>
  <body>
    <h1>这是红色的</h1>
    <h1>head</h1>
  </body>
</html>
```

上述代码中，有没有 `console.log(‘after css’)` 的区别很大

  * 有： CSS 文件下载时会阻塞后面 JS 代码执行，执行JS代码又会阻塞 HTML 标签解析，因此看上去是 CSS 文件下载阻塞了 HTML 标签的解析

  * 没有：CSS 文件的下载不会阻塞 HTML 标签的解析，HTML 解析完成触发 DOMContentLoaded 事件，此时在网络延迟的情况下会出现 CSS 下载未完成，无法生Layot布局树，即无法继续渲染流程，需要 CSS 文件下载完并且执行后才能渲染出页面


