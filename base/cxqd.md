# 重学前端
### 要达到的三个目标
1. 摸索出适合自己的前端学习方法
2. 建立起前端技术的知识架构
3. 理解前端核心技术背后的核心思想

### 两个前端的学习方法
#### 方法一：建立知识架构
> 什么是知识架构?  
可以把它理解为知识的“目录”或者索引，它能够帮助我们把零散的知识组织起来，也能够帮助我们发现一些知识上的盲区  

#### 方法二： 追本溯源


## 前端知识架构图
![前端知识架构](/base/images/frontmap.png)

## HTML
HTML 并不简单，它是典型的 “入门容易，精通困难” 的一部分知识

### 元素(标签)
#### 元信息类标签

#### 替换型标签
img、video、audio 等

#### 语义化标签
它们的特点是视觉表现上互相都差不多，主要的区别在于它们表示了不同的语义，比如大家会经常见到的section、nav、p，这些都是语义类的标签  
语义是我们说话表达的意思，多数的**语义实际上都是由文字来承载的**，语义类标签则是纯文字的补充，比如标题、自然段、章节、列表，这些内容都是纯文字无法表达的，我们需要依靠语义标签代为表达  
语义化的 HTML 能够支持自动生成目录结构，HTML 标准中还专门规定了生成目录结构的算法  

##### 优点：
1. 语义类标签对开发者更为友好，使用语义类标签增强了可读性，即便是在没有 CSS 的时候也能友好的展示
2. 适宜机器阅读，如引擎检索（SEO）、爬虫抓取、屏幕阅读器阅读等

!> "用对比不用好，不用比用错好"

##### 应用
1. 作为自然语言延伸的语义类标签，如 `em`
2. 作为文章标题摘要的语义类标签，如 `h1-h6`、`section+h1`等
3. 作为整体结构的语义类标签，如 `header`、`nav`、`footer`等
  * `header`，通常出现在页面的前面，表示导航或者介绍性的内容
  * `footer`，通常出现在页面的尾部，表示作者信息，相关链接、版权信息等
  * `aside`，表示跟文章主体不那么相关的部分，可能包含导航、广告等工具性质的内容
    * 注意，aside 很容易被理解为侧边栏，它是一种包含的关系，**侧边栏一定是 aside，aside 不一定是侧边栏**
  * `article` 是一种特别的结构，它表示具有一定独立性质的文章，article 和 body 具有相似的结构，应用场景比如报纸中的多篇文章，即典型的多文章结构

##### 其他语义标签
* `abbr` 标签表示缩写，`<abbr title="World Wide Web">WWW</abbr>`
* `hr` 表示故事走向的转变或者话题的转变
* `time`，为了让机器阅读更加方便
* `dfn` 是用来包裹被定义的名词
* `pre` 表示这部分内容是预先排版过的，不需要浏览器进行排版
* `samp` 表示是一段计算机程序的示例输出
* `code` 表示是一段代码
* 在 HTML 中，有三个跟引述相关的标签 blockquote 表示段落级引述内容，q 表示行内的引述内容，cite 表示引述的作品名



## JavaScript
### JavaScript 类型
> 从运行时的角度来看 JavaScript 的类型系统

我们先试着回答下列的问题：
* 为什么有的编程语言规范要求用 void 0 代替 undefined?
* 字符串有最大长度吗？
* `0.1 + 0.2 = 0.3` ？为什么在 JavaScript 中不是这样的？
* ES6 新加入的 Symbol 是个什么东西？
* 为什么给对象添加的方法能用在基础数据类型上？

JavaScript 语言的每一个值都属于一种数据类型，JavaScript 语言规定了7种 **语言类型**  
**语言类型** 广泛用于变量、函数参数、表达式、函数返回值等场合，根据最新语言标准，7中 语言类型如下：
* Undefined
* Null
* Boolean
* String
* Number
* Symbol
* Object

#### Undefined、Null
Undefined 类型表示未定义，它只有一个值，就是 undefined  
任何变量在定义后未被赋值之前，都是 Undefined 类型，值为 undefined，一般我们使用全局变量 undefined 来表示这个值  

现在我们可以来看第一个问题了，为什么要求使用 void 0 代替 undefined？   
这是因为，**undefined 是个全局的变量，有可能被篡改，引起难以预料的错误**
```js
// 全局的 undefined 是无法被篡改的
var undefined = 'foo';
console.log(undefined, typeof undefined)

// 局部作用域中的 undefined 可以被篡改
(function() {
  var undefined = 'foo';
  console.log(undefined, typeof undefined)
})()
```
Null 类型也只有一个值，就是 null，它的语义表示为 **空值**，与 undefined 不同，null 是 JavaScript 关键字

#### Boolean
Boolean 表示逻辑意义上的 真 和 假，有两个值，true 和 false

#### String
String 用于表示文本数据，JavaScript 中的字符串是永远无法变更的，一旦字符串构造出来，无法用任何方式改变字符串的内容，所以字符串具有值类型的特征  
String 有最大长度，是 2^53-1，注意，这个所谓的最大的长度并不是字符个数，因为 String 的意义并非 “字符串”，而是字符串的 UTF16 编码，字符串的的最大长度实际上是受字符串的编码长度影响的

`Unicode` 是现行的字符集的国际标准，`UTF` 是 `Unicode` 的编码方式，规定了码点在计算机中的表示方法，常见的有 `UTF16` 和 `UTF8`

0-65536（U+0000 - U+FFFF）的码点被称为**基本字符区域（BMP）**

#### Number
Number 类型表示我们通常意义上的 “数字”，这个数字大致对应数学的有理数，但是在计算机中有一定的精度限制   

JavaScript 能够准确表示的整数范围在 `-2^53 ~ 2^53` 之间（不含两个端点），超过这个范围，无法精确表示这个值  

在 JavaScript 中有 +0 与 -0 之分，在加法运算中他们没有区别，但是除法的场合需要特别留意，即 **除以 -0，得到 -Infinity**，判断 +0 与 -0 的方式正是，检测 1/x 是 Infinity 还是 -Infinity

非整数的 Number 无法通过 ==(或 ===) 来比较，比如 `0.1 + 0.2 == 0.3` 的结果为 false，原因是浮点数的精度问题导致结果并不是严格相等，正确的判断浮点数相等的方法如下：
```js
  Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON // true
```

#### Symbol
Symbol 表示独一无二的值，它是一切非字符串的对象 key 的集合，在 ES6 规范中，整个对象系统被用 Symbol 重塑  

Symbol 可以具有字符串类型的描述，但是即使描述相同，Symbol 也不相等  

创建 Symbol 的方式是调用 全局的 Symbol 函数，可以传入一个字符串类型的描述，注意，**不能使用 new 操作符，会报错**

`Symbol.iterator` 来自定义 for...of 在对象上的行为


#### Object
Object 是 JavaScript 中最复杂的类型，也是 JavaScript 的核心机制之一，它表示 对象的意思，它是一切有形和无形物体的总称  
在 JavaScript 中，对象的定义时 “属性的集合”，属性分为数据属性和访问器属性，二者都是 key-value 的结构，key 可以是 String 或者 Symbol  

Number、String 和 Boolean，三个构造器是两用的，当跟 new 搭配是，他们产生对象，当直接调用时，表示强制转换  

##### 为什么给对象添加的方法能用在基础数据类型上？
这是因为 `.` 操作符提供了装箱操作，会根据基础类型构造一个临时对象，是的我们能在基础类型上调用对象对象的方法(原型链实现的)


#### 类型转换
因为 JS 是弱类型的语言，所以类型转换发生非常频繁，大部分的运算都会先进行类型转换

##### String to Number
字符串转数字类型，存在一个语法结构，类型转换支持 十进制、二进制、八进制和十六进制  
JavaScript 支持的字符串语法还包括正负号科学计数法，可以使用大写或者小写的 e 来表示，如 `1e3`、`-1e-2`

在不传入第二个参数的情况下，parseInt 只支持 16 进制前缀“0x”，而且会忽略非数字字符，也不支持科学计数法，所以在任何环境下，都建议传入 parseInt 的第二个参数，而parseFloat 则直接把原字符串作为十进制来解析，它不会引入任何的其他进制

**多数情况下，Number 是比 parseInt 和 parseFloat 更好的选择**

##### Number to String
在较小的范围内，数字到字符串的转换是完全符合你直觉的十进制表示  

当 Number 绝对值较大或者较小时，字符串表示则是使用科学计数法表示的。这个算法细节繁多，我们从感性的角度认识，它其实就是保证了产生的字符串不会过长

#### 装箱转换
每一种基本类型 Number、String、Boolean、Symbol 在对象中都有对应的类，所谓装箱转换，**正是把基本类型转换为对应的对象**，它是类型转换中一种相当重要的种类  

全局的 Symbol 函数无法使用 new 来调用，但我们仍可以利用装箱机制来得到一个 Symbol 对象
```js
  const symbolObject = (function () { return this }).call(Symbol("a"))

  console.log(typeof symbolObject)                //object
  console.log(symbolObject instanceof Symbol)     //true    
  console.log(symbolObject.constructor == Symbol) //true
```

#### 拆箱转换
在 JavaScript 标准中，规定了 ToPrimitive 函数，它是对象类型到基本类型的转换（即，拆箱转换）  

对象到 String 和 Number 的转换都遵循 **先拆箱再转换** 的规则，通过拆箱转换，把对象变成基本类型，再从基本类型转换为对应的 String 或者 Number  

拆箱转换会尝试调用 `valueOf` 和 `toString` 来获得拆箱后的基本类型，如果 `valueOf` 和 `toString` 都不存在，或者没有返回基本类型，则会产生类型错误 `TypeError`（对于二者调用的顺序，不同情况下，顺序不一致）

!> 程序 = 算法 + 数据结构，运行时类型包含了所有 JavaScript 执行时所需要的数据结构的定义，所以我们要对它格外重视

#### 注意
**类型** 在 JavaScript 中是一个有争议的概念。一方面，标准中规定了运行时数据类型，另一方面，JS 语言中提供了 typeof 这样的运算，用来返回操作数的类型，但 typeof 的运算结果，与运行时类型的规定有很多不一致的地方   

从一般语言使用者的角度来看，毫无疑问，我们应该按照 typeof 的结果去理解语言的类型系统，但 JS 之父本人也在多个场合表示过，typeof 的设计是有缺陷的，只是现在已经错过了修正它的时机  


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

