# JS 基础知识点
### 原始数据类型
> 原始数据类型有哪几种？ null 是对象吗？

`string`，`number`，`boolean`，`null`，`undefined`，`sysmbol` 共六种

### 引用数据类型
> 与原始数据类型的区别？函数的参数是对象可能会发生什么问题？  
存储位置不同，引用数据类型存在堆内存中，变量存储的只是指向该对象的引用  

### typeof vs instanceof
> `typeof` 是否能正确判断类型？  
`instanceof` 能正确判断对象的原理是什么？

`typeof` 能判断除了 `null` 之外的其他原始数据类型  
`instanceof` 可以用来判断引用数据类型，内部机制是通过原型链实现的(原始数据类型也能通过 `instanceof` 判断，但是需要定义 `Symbol.hasInstance`)

### 类型转换
> 对象转原始类型（`Symbol.toPrimitive` 是一个内置的 Symbol 值，它作为对象的函数值属性存在，当一个对象转换为原始值时，会调用此函数）

在 JavaScript 中类型转换只有三种情况，分别是
* 转为 布尔值  
  除了 `0`, `-0`, `NaN`, `null`, `undefined`, `false`, `""` 为 `false`，其他的全为 `true`  
* 转为 数字
* 转为 字符串
```js
  // 1 + {} 与 {} + 1 的结果不同
  1 + {} // "1[object Object]"
  {} + 1 // 1
```

#### 四则运算符
未完待续。。。


### this
> 如何正确判断 this?   
箭头函数的 this 是什么？

![this判断情况](interview/images/this.png)

### == vs ===
> == 与 === 的区别？  
[] == ![] 的结果？

== 转换规则(注意运算符的优先级)：
1. 判断类型是否相同
2. null == undefined  => true
3. string == number  =>  string 转 number，回到第1步重新判断
4. boolean == any => boolean 转 number，回到第1步重新判断
5. object == string or number or boolean等， => object 转基本数据类型，回到第1步重新判断

=== 判断规则：
1. 是否同一数据类型
2. 数据类型相同，比较值


### 闭包(Closure)
#### 什么是闭包？  
是指一个函数中，定义了另一个函数，同时将新定义的函数返回，并且新定义的函数内部访问了外层函数中的变量

#### 闭包的有什么优缺点？
优点：
  * 模仿私有属性
  * 模仿块级作用域
缺点：
  * 内存泄漏问题
  * this 指向问题 (闭包一般是在全局作用域下直接执行的，this 通常指向 window)

#### 闭包的主要应用是什么？
1. 在函数外部，能访问函数内部的变量
2. 使变量的值始终保存在内存中


### 深浅拷贝
> 深浅拷贝其实主要是针对引用类型数据来说的
#### 什么是浅拷贝？ 如何实现？
浅拷贝是指，在变量的赋值中，仅将引用类型变量的地址拷贝了一份，并没将堆内存中实际的对象的属性逐一拷贝  
浅拷贝的实现：
  1. 直接使用赋值符号即可，
  2. 可以使用 `Object.assign`(只会拷贝对象所有的属性值到新对象中，如果属性值是引用数据，则只拷贝地址)  
  3. 还能使用 `...` 扩展运算符



#### 什么是深拷贝？ 如何实现？
深拷贝是指，在变量的赋值中，将将堆内存中实际的对象的属性逐一拷贝生成新的对象，并赋值的是新的对象的地址    
深拷贝的实现：
1. `JSON.parse(JSON.stringify(object))` 
  存在局限性，忽略 `undefined`、`Symbol`、`function`，而且也不能解决循环引用的对象
2. 
```js
  // 深拷贝的实现其实是非常难的，要考虑很多边界值，比如 原型链如何处理，DOM如何处理等等
  // 深拷贝的实现，主要是通过递归的方式，逐层查找引用数据类型的对象

  function deepCopy(object){
    if (typeof object !== "object" || object === null) { return object }

    if (Array.isArray(object)) { return [...object] }

    const newObject = {}

    // for in 会将原型链自定义属性遍历出来
    Reflect.ownKeys(object).forEach(key => {
      if (typeof object[key] === "object") { 
        newObject[key] = deepCopy(object[key]) 
      } else {
        newObject[key] = object[key]
      }
    })
    
    return newObject
  }
```

