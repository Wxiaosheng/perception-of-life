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

