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
  * `__proto__`: 当前对象的原型，指向的是构造函数的原型对象
  * prototype: 构造函数的原型对象

!> 注意：对构造函数而言，原型链是 prototype.`__proto__`; 对实例对象而言，原型链是 `__proto__`.`__proto__`;

* 静态属性：不会被实例继承，只能通过类来调用
* 静态方法：使用static定义方法，该方法不会被实例继承，只能通过类来调用(方法中的this指向类，而不是实例)
* 继承
  * 实质
    * ES5: 先创造子类实例的this，再将父类属性方法添加到this上(Parent.apply(this))
    * ES6: 先将父类实例的属性方法加到this上(调用 super)，再用子类构造函数修改 this
  * super
    * 作为函数调用：只能在构造函数中调用super()，内部this指向继承的当前子类(super()调用后才可在构造函数中使用this)  
    * 作为对象调用：在普通方法中指向父类的原型对象，在静态方法中指向父类
  * 显示定义：使用constructor() { super(); }定义继承父类，没有书写则显示定义
  * 子类继承父类
    * 子类使用父类的属性方法时，必须在构造函数中调用super()，否则得不到父类的this
    * 父类静态属性方法可被子类继承
    * 子类继承父类后，可从super上调用父类静态属性方法
* 其他
  * 在实例上调用方法，实质是调用原型上的方法
  * Object.assign() 可方便地一次向类添加多个方法(Object.assign(Class.prototype, {...}))
  * 类内部所有定义的**方法**是不可枚举的
  * 取值函数和存值函数设置在属性的 `Descriptor` 对象上（这是什么意思？）
  * 类不存在变量提升
  * 使用 super 时，必须显式的指定是做为函数还是做为对象
  * extends 不可以继承类，还可继承原生的构造函数


#### Module
> 模块化

##### 概念
* 命令
  * export 规定模块对外接口
    * 默认导出： `export default Parent`（导出时可指定模块任意名称，无需知晓内部真实名称）
    * 单独导出： `export const name = "value"`
    * 按需导出： `export { name, age }` （推荐）
    * 改名导出： `export { name as newName }`
  * import 导入模块内部功能
    * 默认导入： `import Person from 'person'`
    * 整体导入： `import * as Person from 'person'`
    * 按需导入： `import { name, age } from 'person'`
    * 改名导入： `import { name as newName } from 'person'`
    * 自执行导入： `import 'person'`
    * 复合导入： `import Person, { name } from 'person'`
  * 复合模式： export 命令和 import 命令结合在一起写成一行，变量实质没有被导入当前模块，相当于对外转发接口，导致当前模块无法直接使用其导入量
    * 默认导入导出： `export { default } from 'person'`
    * 整体导入导出： `export * from 'person'`
    * 按需导入导出： `export { name, age } from 'person'`
    * 改名导入导出： `export { name as newName } from 'person'`
    * 具名默认导入导出： `export { name as default } from 'person'`
    * 默认改具名导入导出： `export { default as name } from 'person'`
  * 继承： **默认导出** 和 **改名导出** 结合使用可是模块具备继承性
  * 设计思想： 尽量得静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量
  * 严格模式： ES6模块自动采用严格模式(不管头部是否添加 `use strict`)

##### 模块化方案
CommonJS： 用于服务器(动态化依赖)
AMD： 用于浏览器(动态化依赖)
CMD： 用于浏览器(动态化依赖)
UMD： 用于浏览器和服务器(动态化依赖)
ESM： 用于浏览器和服务器(静态化依赖)

##### 加载方式
* 运行时加载
  * 定义： 整体加载模块生成一个对象，再从对象上获取需要的属性和方法进行加载(全部加载)
  * 影响： 只有运行时才能得到这个对象，导致无法再编译时做静态优化
* 编译时加载
  * 定义： 直接从模块中获取需要的属性和方法进行加载(按需加载)
  * 影响： 在编译时就完成模块加载，效率比其他方案高，但无法引用模块本身(本身不是对象)，可扩展JS高级语法(宏和类型校验)
* 传统加载： 通过 script 标签进行同步或异步加载脚本
  * 同步加载： `<script src=""></script>`
  * Defer异步加载： `<script src="" defer></script>` (顺序加载，渲染完再执行)
  * async异步加载： `<script src="" async></script>` (乱序加载，渲染完再执行)
  * 模块化加载： `<script type="module"></script>` (默认是 Defer 异步加载)


#### Iterator
* 定义： 为各种不同的数据结构提供统一的访问机制
* 原理： 创建一个指针指向首个成员，按照次序使用 next 指向下一个成员，直接到结束位置(数据结构只要部署 Iterator接口 就可以完成遍历操作)
* 作用
  * 为各种数据结构提供一个统一的简便的访问接口
  * 是的数据结构成员能够按照某种次序排列
  * ES6创造新的遍历命令 `for-of`，Iterator 接口主要供 `for-of` 消费
* 形式： `for-of` (自动去寻找 Iterator 接口)
* 数据结构
  * 集合： Array、Object、Set、Map
  * 原生具备接口的数据结构： String、Array、Set、Map、TypeArray、Arguments、NodeList
* 部署： 默认部署在 Symbol.iterator （具备此属性被认为 可遍历的 iterator）
* 遍历器对象
  * next： 下一步操作，返回 `{ done, value }` （必须部署）
  * return： `for-of` 提前退出调用，返回 `{ done: true }`
  * throw： 不使用，配合 `Generator` 使用

##### for-of 循环
* 定义： 调用 `Iterator` 接口产生遍历对象(`for-of` 内部调用数据结构的 `Symbol.iterator()`)
* 遍历字符串： `for-in` 获取索引，`for-of` 获取值
* 遍历数组： `for-in` 获取索引，`for-of` 获取值
* 遍历对象： `for-in` 获取键，`for-of` 获取需自行部署
* 遍历Set： `for-of` 获取值 ( `for(const v of set)` )
* 遍历Map： `for-of` 获取**键值对**( `for(const [k, v] of map)` )
* 遍历类数组： 包含length的对象、Arguments对象、NodeList对象(无Iterator接口的类数组可用Array.from()转换)
* 计算生成数据结构：Array、Set、Map
  * keys()： 返回遍历器对象，遍历所有的键
  * values()： 返回遍历器对象，遍历所有的值
  * entries()： 返回遍历器对象，遍历所有的键值对
* 与 for-in 的区别
  * 语法都很简洁，但没有 `for-in` 的那些缺点
  * 不同于 forEach，它可与 break、continue 和 return 配合使用
  * 提供遍历所有数据结构的统一操作接口

##### 应用场景
* 改写具有 `Iterator` 接口的数据结构的 `Symbol.iterator`
* 解构赋值： 对 Set 进行结构
* 扩展运算符： 将部署 `Iterator` 接口的数据结构转为数组
* yield*： yield* 后跟一个可遍历的数据结构，会调用器遍历器接口
* 接受数组做为参数的函数： `for-of、Array.from()、new Set()、new WeakSet()、new Map()、new WeakMap()、Promise.all()、Promise.race()`


#### Promise
* 定义： 包含异步操作结果的对象
* 状态
  * 进行中： pending
  * 已成功： resolved
  * 已失败： rejected
* 特点
  * 对象的状态不受外界影响
  * 一旦对象的状态改变就不会在变，任何时候都可得到这个结果
* 声明： `new Promise((resolve, reject) => { ... })`
  * resolve： 将状态从 pending => resolved，在异步操作成功之后调用，并且将异步操作的结果作为参数传递出去
  * reject：  将状态从 pending => rejected，在异步操作失败之后调用，并且将异步操作的错误作为参数传递出去
* 方法
  * then()： 分别制定 resolved 和 rejected 状态时的回调函数
    * 第一参数： 状态变为 resolved 时调用
    * 第二参数： 状态变为 rejected 时调用
  * catch()： 指定发生错误时调用(可选)
  * `Promise.all()`： 将多个Promise实例包装成一个新实例，返回全部实例状态变更后的结果数组(所有的实例都变更后返回)
    * 入参： 具有 Iterator 接口的数据结构
    * 成功： 只有全部实例状态变成 resolved，最终状态才变成 resolved
    * 失败： 只要有一个状态变成 rejected，最终状态就会变成 rejected
  * `Promise.race()`： 将多个实例包装成一个新实例，返回全部实例状态优先变更后的结果(先变更的先返回)
    * 入参： 具有 Iterator 接口的数据结构
    * 成功失败： 哪个实例先改变状态会返回哪个实例的状态
  * `Promise.resolve()`： 将对象转为 Promise 对象 (等价于 `new Promise(resolve => resolve()`)
    * Promise实例： 原封不动地返回入参
    * Thenable对象： 将此对象转为 Promise对象并返回 (**Thenable对象为包含 then() 的对象，执行 then()相当于指向此对象的then()**)
    * 不具备then()的对象：将此对象转为 Promise对象并返回，状态为 resolved
    * 不带参数： 返回Promise对象，状态为 resolved
  * `Promise.reject()`： 将对象转为状态为 rejected 的 Promise 对象(等价于 `new Promise((resolve, reject) => reject())`)

##### 应用场景
* 加载图片
* ajax 转 Promise

##### 注意
* 只有异步操作的结果可决定当前状态是哪一种，其他操作都无法改变这个状态
* 状态改变只有两种可能： `pending => resolved`、`pending => rejected`
* 一旦建立 Promise 对象就会立即执行，中途无法取消
* 不设置回调函数，内部报错不会反映到外部
* 当处于 pending 时，无法得知目前处于哪一阶段
* 实例状态变为 resolved 或 rejected 时，会触发 then() 绑定的回调函数
* then()返回新实例，其后可再调用另一个 then()
* then()运行中的错误会被 catch() 捕获
* reject() 的作用等通抛出错误
* 实例状态已经 resolved 后，再抛出错误是无效的，不会被捕获，等于没有抛出
* 实例错误具有冒泡属性，会一直向后传递知道被捕获为止，错误总会被下一个catch捕获
* 不要在 then() 定义 rejected 状态的回调函数(`不是使用第二个参数`)
* 建议使用catch()捕获错误，不要使用then()第二个参数捕获
* 没有使用catch()捕获错误，实例抛错不会传递到外层代码，即不会有任何反应
* 作为参数的实例定义了catch()，一旦被rejected并不会触发Promise.all()的catch()
* Promise.reject()的参数会原封不动地作为rejected的理由，变成后续方法的参数


#### Generator
* 定义： 封装多个内部状态的异步编程解决方案
* 使用： 调用 Generator 函数(该函数不执行) 返回指向内部状态的指针对象(不是运行结果)
* 声明： function* func() {}
* 方法


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