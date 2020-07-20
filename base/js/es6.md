### ES6
ES6是 ECMA 为J avaScript 制定的第6个标准版本，标准委员会最终决定，标准在每年6月正式发布并作为当年的正式版本。

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
function (a) { return a\*3 } 可以简写为： a => a*3  

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

#### Set
* 定义：类似于数组的数据结构，成员值都是唯一且没有重复的值
* 声明：const set = new Set(arr)
* 入参：具有Iterator接口的数据结构
* 属性
  * constructor：构造函数，返回Set
  * size：返回实例成员总数
* 方法
  * add()：添加值，返回实例
  * delete()：删除值，返回布尔
  * has()：检查值，返回布尔
  * clear()：清除所有成员
  * keys()：返回以属性值为遍历器的对象
  * values()：返回以属性值为遍历器的对象
  * entries()：返回以属性值和属性值为遍历器的对象
  * forEach()：使用回调函数遍历每个成员
* 应用场景
  * 去重字符串：[...new Set(str)].join("")
  * 去重数组：[...new Set(arr)]或Array.from(new Set(arr))
* 集合数组
  * 声明：const a = new Set(arr1)、const b = new Set(arr2)
  * 并集：new Set([...a, ...b])
  * 交集：new Set([...a].filter(v => b.has(v)))
  * 差集：new Set([...a].filter(v => !b.has(v)))
* 重点难点
  * 遍历顺序：插入顺序
  * 没有键只有值，可认为键和值两值相等
  * 添加多个NaN时，只会存在一个NaN
  * 添加相同的对象时，会认为是不同的对象
  * 添加值时不会发生类型转换(5 !== "5")
  * keys()和values()的行为完全一致，entries()返回的遍历器同时包括键和值且两值相等

#### Map
* 定义：类似于对象的数据结构，成员键是任何类型的值
* 声明：const set = new Map(arr)
* 入参：具有Iterator接口且每个成员都是一个双元素数组的数据结构
* 属性
  * constructor：构造函数，返回Map
  * size：返回实例成员总数
* 方法
  * get()：返回键值对
  * set()：添加键值对，返回实例
  * delete()：删除键值对，返回布尔
  * has()：检查键值对，返回布尔
  * clear()：清除所有成员
  * keys()：返回以键为遍历器的对象
  * values()：返回以值为遍历器的对象
  * entries()：返回以键和值为遍历器的对象
  * forEach()：使用回调函数遍历每个成员
* 重点难点
  * 遍历顺序：插入顺序
  * 对同一个键多次赋值，后面的值将覆盖前面的值
  * 对同一个对象的引用，被视为一个键
  * 对同样值的两个实例，被视为两个键
  * 键跟内存地址绑定，只要内存地址不一样就视为两个键
  * 添加多个以NaN作为键时，只会存在一个以NaN作为键的值
  * Object结构提供字符串—值的对应，Map结构提供值—值的对应

#### Map 与 Object 的区别
  * 一个Object 的键只能是字符串或者 Symbols，但一个Map 的键可以是任意值
  * Map中的键值是有序的（FIFO 原则），而添加到对象中的键则不是
  * Map的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算
  * Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突

#### Class
* 定义：对一类具有共同特征的事物的抽象(构造函数语法糖)
* 原理：类本身指向构造函数，所有方法定义在prototype上，可看作构造函数的另一种写法(Class === Class.prototype.constructor)
* 方法和关键字
  * constructor()：构造函数，new命令生成实例时自动调用
  * extends：继承父类
  * super：新建父类的this
  * static：定义静态属性方法
  * get：取值函数，拦截属性的取值行为
  * set：存值函数，拦截属性的存值行为
* 属性
  * __proto__: 当前对象的原型，指向的是构造函数的原型对象
  * __proto__.__proto__: 
  * prototype.__proto__: 这就是原型链，当前对象的原型的原型，即构造函数的原型的对象的原型

!> 注意：对构造函数而言，原型链是 prototype.__proto__; 对实例对象而言，原型链是 __proto__.__proto__;

* 静态属性：不会被实例继承，只能通过类来调用
* 静态方法：使用static定义方法，该方法不会被实例继承，只能通过类来调用(方法中的this指向类，而不是实例)
* 继承
  * 实质
    * ES5: 先创造子类实例的this，再将父类属性方法添加到this上(Parent.apply(this))
    * ES6: 先将父类实例的属性方法加到this上(调用 super)，再用子类构造函数修改 this

#### 面向对象
ES5实现继承的方式可以参考 [这里](/base/js/inherit)  
定义： class / constructor  
继承： extends / super  


#### Ajax 2.0
与早期的 ajax 的区别：  
1、Ajax里不需要设置请求头，它内部已经自动设置了  
2、使用 FormData 对象进行数据传递(可以控制提交数据、上传二进制文件)   
3、cors跨域  


#### 拖拽上传
拖拽上传需要监听以下几个事件：   

1、**ondragenter** - 拖着东西进入  
2、**ondragleave** - 拖着东西离开  
3、**ondragover**  - 悬停  (必须阻止，否则 ondrop 无法触发)  
4、**ondrog**      - 松手  (必须阻止，否则 浏览器默认会打开该文件)  

注意：监听事件使用 **addEventListener** 的方式监听，不要使用 ondrog 的方式监听，因为后者可能存在监听事件被覆盖的问题。
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