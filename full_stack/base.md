## 基础知识

### CSS 部分
&emsp;&emsp;[CSS](full_stack/css/)

### ES6
#### 变量/赋值
var  
&emsp;&emsp;旧版本 JavaScript 存在 变量可以重复定义，任何情况下都可以修改，且不存在块级作用域  

let, const  
&emsp;&emsp;let   不可以重复定义变量，变量，存在块级作用域  
&emsp;&emsp;const 不可以重复定义变量，常量，存在块级作用域  


解构赋值  
&emsp;&emsp;let { a, b } = { a: 'a', b: 2}  

#### 箭头函数
&emsp;&emsp;简化了匿名函数的书写，改变了 this指向  
&emsp;&emsp;&emsp;&emsp;当且仅当函数的参数只有一个时，可以省略参数的小括号  
&emsp;&emsp;&emsp;&emsp;当且仅当函数的主体只有一句return语句时，可以省略函数主体的大括号  
&emsp;&emsp;&emsp;&emsp;function (a) { return a*3 } 可以简写为： a => a*3  
    
#### 数组/json
&emsp;&emsp;新增5种方法

    map:        映射
    filter:     过滤
    forEach:    循环
    reduce:     汇总
    form:       转数组


&emsp;&emsp;json  
&emsp;&emsp;&emsp;&emsp;1、对象的属性与值相同时，可以简写  
&emsp;&emsp;&emsp;&emsp;2、对象中定义函数时，function 关键字可以不写  
  

#### 字符串
&emsp;&emsp;字符串模板 ``， 植入变量，任意折行    
&emsp;&emsp;startsWith：判断字符串是否是以指定的字符串开头  
&emsp;&emsp;endsWith：判断字符串是否是以指定的字符串结尾   


#### 面向对象
&emsp;&emsp;ES5实现继承的方式可以参考 [这里](/full_stack/继承)  
&emsp;&emsp;定义： class / constructor  
&emsp;&emsp;继承： extends / super  


#### Ajax 2.0
&emsp;&emsp;与早期的 ajax 的区别：  
&emsp;&emsp;&emsp;&emsp;1、Ajax里不需要设置请求头，它内部已经自动设置了  
&emsp;&emsp;&emsp;&emsp;2、使用 FormData 对象进行数据传递(可以控制提交数据、上传二进制文件)   
&emsp;&emsp;&emsp;&emsp;3、cors跨域  


#### 拖拽上传
&emsp;&emsp;拖拽上传需要监听以下几个事件：   

&emsp;&emsp;&emsp;&emsp;1、**ondragenter** - 拖着东西进入  
&emsp;&emsp;&emsp;&emsp;2、**ondragleave** - 拖着东西离开  
&emsp;&emsp;&emsp;&emsp;3、**ondragover**  - 悬停  (必须阻止，否则 ondrop 无法触发)  
&emsp;&emsp;&emsp;&emsp;4、**ondrog**      - 松手  (必须阻止，否则 浏览器默认会打开该文件)  

&emsp;&emsp;注意：监听事件使用 **addEventListener** 的方式监听，不要使用 ondrog 的方式监听，因为后者可能存在监听事件被覆盖的问题。
```javascript
// 假设页面有一快上传文件的区域
const box = document.getElementById('box')

box.addEventListener('dragenter', () => {
  // 拖着东西进入 
}, false)

box.addEventListener('dragleave', () => {
  // 拖着东西离开  
}, false)

box.addEventListener('dragover', (event) => {
  // 当拖着文件悬停时，会被连续触发，需要做 节流 处理

  // 必须阻止，否则 ondrop 无法触发
  event.preventDefault()
}, false)

box.addEventListener('drop', (event) => {
  // 拖拽进来的文件通过 event.dataTransfer.files 能获取到(注意控制台无法查看这些数据)
  // 由于这个字段是一个 likeArray 的结构，因此支持批量上传多个文件
  const file = event.dataTransfer.files[0]

  // 拿到拖拽的文件之后，可以进行相关操作
  
  // 必须阻止，否则 浏览器默认会打开该文件
  event.preventDefault()
}, false)


```



<p align="right"> 2019年10月15日 </p>
