## 基础知识
### ES6
#### 变量/赋值
var 
    
    旧版本 JavaScript 存在 变量可以重复定义，任何情况下都可以修改，且不存在块级作用域

let, const

      let   不可以重复定义变量，变量，存在块级作用域
      const 不可以重复定义变量，常量，存在块级作用域

解构赋值

    let { a, b } = { a: 'a', b: 2}

#### 箭头函数
  简化了匿名函数的书写，改变了 this指向

      当且仅当函数的参数只有一个时，可以省略参数的小括号
      当且仅当函数的主体只有一句return语句时，可以省略函数主体的大括号
      function (a) { return a*3 } 可以简写为： a => a*3
    
#### 数组/json
  新增5种方法

    map:        映射
    filter:     过滤
    forEach:    循环
    reduce:     汇总
    form:       转数组


  json

      1、对象的属性与值相同时，可以简写
      2、对象中定义函数时，function 关键字可以不写
  

#### 字符串
  字符串模板 ``， 植入变量，任意折行  
  startsWith：判断字符串是否是以指定的字符串开头  
  endsWith：判断字符串是否是以指定的字符串结尾  


#### 面向对象
  ES5实现继承的方式可以参考 [这里](/fore/full_stack/继承)  
  定义： class / constructor  
  继承： extends / super  


<p align="right"> 2019年10月15日 </p>
