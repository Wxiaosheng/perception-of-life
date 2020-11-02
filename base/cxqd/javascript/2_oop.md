### JavaScript对象，是面向对象还是基于对象？
JavaScript 标准对基于对象的定义，**语言和宿主的基础设施由对象提供，并且 JavaScript 程序即是一系列互相通讯的对象集合**，这里的意思并不是表达弱化的面向对象的定义，反而是表达对象对于语言的重要性  

#### 对象
##### 什么是对象？ 
Object（对象）在英文中，是一切事物的总称，这和面向对象编程的抽象思维有互通之处    

从人类的认知角度来说，对象应该是下列事物之一：
1. 一个可以触摸或者可以看见的东西
2. 人的智力可以理解的东西
3. 可以指导思考或行动（进行想象或施加动作）的东西

##### JavaScript 对象的特征 (如何设计对象模型)
> JavaScript对象的具体设计：具有高度动态性的属性集合

对象有如下几个特征：
* 对象具有唯一标识性：即是两个完全相同的对象，也并非同一个对象
* 对象具有状态：同一对象能出在不同的状态下
* 对象具有行为：即对象的状态，可能因为它的行为产生变迁

**对象具有唯一标识性**，一般而言，各种语言的对象唯一标识性都是用内存地址来体现的， 对象具有唯一标识的内存地址，所以具有唯一的标识  
对象的第二个和第三个特征 **状态和行为**，在 JavaScript 中，将状态和行为统一抽象为 **属性**，考虑到 JavaScript 中将函数设计成一种特殊对象，所以 JavaScript 中的行为和状态都能用属性来抽象  

**总结一句话来看，在 JavaScript 中，对象的状态和行为其实都被抽象为了属性**  
在实现了对象基本特征的基础上，JavaScript 中对象独有的特色是：**对象具有高度的动态性，这是因为 JavaScript 赋予了使用者在运行时为对象添改状态和行为的能力**

#### JavaScript 对象的两类属性
##### 数据属性
数据属性具有四个特征：
* value，就是属性的值
* writable，决定属性能否被赋值
* enumerable，决定for...in能否枚举该属性
* configurable，决定该属性能否被删除或者改变特征值

我们通常用于定义属性的代码会产生数据属性，其中的 writable、enumerable、configurable 都默认为 true，我们可以使用内置函数 `Object.getOwnPropertyDescripter` 来查看  

如果我们要想改变属性的特征，或者定义访问器属性，我们可以使用 `Object.defineProperty`

```javascript
  const o = { a: 1 }

  Object.defineProperty(o, "b", {value: 2, writable: false, enumerable: false, configurable: true})

  Object.getOwnPropertyDescriptor(o,"a")     // {value: 1, writable: true, enumerable: true, configurable: true}    
  Object.getOwnPropertyDescriptor(o,"b")     // {value: 2, writable: false, enumerable: false, configurable: true}

  o.b = 3 // 不会报错，但是赋值会失败
  console.log(o.b)  // 2
```

##### 访问器属性
访问器（getter/setter）属性也有四个特征：
* getter：函数 或 undefined，在取属性值时被调用
* setter：函数 或 undefined，在设置属性值时被调用
* enumerable：决定for...in能否枚举该属性
* configurable：决定该属性能否被删除或者改变特征值

在创建对象时，也可以使用 get 和 set 关键字来创建访问器属性  
访问器属性跟数据属性不同，每次访问属性都会执行 getter 或者 setter 函数

实际上 JavaScript 对象的运行时是一个**属性的集合**，属性以字符串或者 Symbol 为 key，以数据属性特征值或者访问器属性特征值为 value，即 `"a"`是 key，`{writable:true,value:1,configurable:true,enumerable:true}` 是 value

JavaScript 语言标准也已经明确说明，**JavaScript 是一门面向对象的语言**，标准想表达的意思可能正是因为 JavaScript 的高度动态性的对象系统

