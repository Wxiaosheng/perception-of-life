### 原型和原型链
首先，我们来看一个我们再代码中经常使用的却没有深入细究的实例
```javascript
  const obj = { key: "value" } 

  obj.toString() // [object Object]
```
我们在自定义对象时，仅仅定义 `key` 的属性，并没有定义 `toString` 的方法，但是在代码中却可以调用并且获得结果，那么现在我就来深入的解释一下发生在背后的原因。

#### 必备基础知识
JavaScript 中的数据类型分为两大类，**值类型**(也叫基本数据类型) 和 **引用数据类型** 
 
**值类型**：String、Number、Boolean、null、undefined、Symbol(ES6 新增)  
**引用数据类型**：Object、Function、Array  

!> 判断数据类型的方法，请参见 。。。

在这里我们仅仅来聊一聊 `Object` 和 `Function`  

```javascript
  // 使用对象直接量创建对象
  // 优点：
  //  1、写法直观，简洁无歧义
  //  2、强调对象是一个简单的可变的散列表，而不必一定派生自某个类
  //  3、当使用 Object() 创建对象时，解析器需要顺着原型链开始查找，直到找到 Object 构造函数为止，而直接量的写法则不会
  const obj = { key: "value" } 

  console.log(obj) // 控制台输出结果如下
  /* 
    {key: "value"}
      key: "value"
      __proto__: Object
  */
```
在 JavaScript 中，所有的对象都有 `__proto__` 的属性，指向`该对象的原型对象`，而且 Function 也是对象，是一种特殊的对象

#### new 一个对象到底发生了什么
随便百度一下，就能发现常见的，对 new 的过程有如下描述：
1. 创建一个空对象，将它的引用赋给 this，继承函数的原型；
2. 通过 this 将属性和方法添加到这个对象上；
3. 最后返回这个 this 指向的新对象(如果没有手动指定return时)

```javascript
  function myNew (Parent, arguments) {
    // 创建一个新对象赋值给this，并 继承函数的原型
    // 这一步其实是要拆成两小步的
    // 1、创建新对象，赋值给 this
    // this = {}
    // 2、继承函数的原型
    // this.__proto__ = Parent.prototype

    // 合并写法
    this = Object.create(Parent.prototype)

    // 将属性和方法添加到 this 指向的对象上
    this.argments = arguments

    // 返回这个 this 指向的新对象(如果没有手动指定 return)
    return this
  }
```

!> Object.create 创建一个新对象，并使用传入的对象作为该对象的原型

#### 创建(构造)函数
在 JavaScript 中，每一个函数都有一个 `prototype` 的属性，指向一个对象，该对象即是构造函数的**原型对象**  

每个原型对象都有一个 `constructor` 属性，指向该原型对象所属的构造函数

无论是使用下列哪种方式创建的函数，都会自带 `prototype` 属性:  
1. const func = function () {}
2. const func = new Function () {}
3. function func () {}

!> 获取原型对象的是3种方式：  
1、`obj.__proto__`，由于 `__proto__`属性为内部属性，所以一般推荐是使用  
2、`Parent.prototype`，通过父类构造函数的 prototype 访问  
3、`Object.getPrototypeOf(obj)`，通过顶层对象的 getPrototypeOf 方法获取，推荐使用

#### 对象的继承
通过我们手动的实现 `new` 运算符可以发现，新创建的对象通过 `__proto__` 属性，引用了父类构造函数的原型对象 `prototype`，由此实现了**继承** 

!> 注意：  
1、在 JavaScript 中，每个**对象**都有 `__proto__` 属性，指向该对象的父类构造函数的原型对象   
2、在 JavaScript 中，每个**函数**都有 `prototype` 属性，即构造函数的原型对象 (由于函数也是对象，所以函数也有 `__proto__` 的属性)

![prototype](/base/images/prototype.jpg)

#### 原型链

在 JavaScript 中，实现继承的方式，就是通过对象的原型串联起来的，一级一级的向上查找而形成的链式结构，称为**原型链**

![proto_chain](/base/images/proto_chain.png)


#### 继承
> 可简单的理解为，即子类无需定义即可使用父类已定义的属性和方法

##### 如何实现继承
```javascript
/* 
  1、原型链继承
    子类对象继承父类构造函数的实例
  
  优点：既能继承父类原型上的属性和方法，也能继承父类上的属性和方法
  缺点：
    1、不能动态的给父构造函数传递参数
    2、继承单一
    3、所有的子类，都会共享父类实例的属性和方法
*/
function Parent (name, age) {
  this.name = name
  this.age = age
}
const parent = new Parent("obj1", 21)
const obj1 = {}
obj1.__proto__ = parent

/*
  2、借用构造函数继承
    通过 call / apply 在子类构造函数中动态调用父类构造函数

  优点：
    1、可以动态的传递参数
    2、可以多继承(多个 call/apply)
  缺点：
    1、只能继承父类的实例属性和方法，不能继承父类原型的属性和方法
    2、每个子类构造函数中，都要手动调用父类构造函数，臃肿
*/
function Parent (name, age) {
  this.name = name
  this.age = age
}
function Children (name, age) {
  Parent.call(this, name, age)
  // ...
}
const obj2 = new Children("obj2", 22)

/*
  3、组合继承
    组合 原型链继承 和 借用构造函数继承
  优点：
    1、既能继承构造函数属性，又能继承原型属性
    2、可以动态传参
  缺点：
    1、不支持多继承(父类原型上的属性)
    2、子类实例原型上的构造函数指向父类构造函数
*/
function Parent (name, age) {
  this.name = name
  this.age = age
}
function Children(name, age){
  Parent.call(this, name, age)
  // ...
}
Children.prototype = new Parent()
const obj3 = new Children("obj3", 23)

/*
  4、原型式继承
    通过一个函数封装，创建一个新对象，将传入的对象作为新对象的原型对象，返回新对象
  优点：
    1、能继承原型上的属性
  缺点：
    1、不能继承实例上的属性
    2、单一继承
*/
function Parent (name, age) {
  this.name = name
  this.age = age
}
function content(p){
  function F(){}
  f.prototype = p
  return new F() 
}
const obj4 = content(new Parent("obj4", 24))

/*
  5、寄生式继承
    在原型式继承的基础上，再套上一层函数，用于处理函数的传参
  优点：
    1、支持动态传参
  缺点：
    1、没用到subject的原型，无法共享该构造函数原型的属性
*/
function Parent (name, age) {
  this.name = name
  this.age = age
}
function content(p){
  function F(){}
  F.prototype = p
  return new F()
}
function subject(name, age,level){
  const cont = content(new Parent(name, age))
  cont.level = level
  return cont
}
const obj5 = subject("obj5", 25, 5)

/*
  6、寄生式组合继承(推荐)
    通过寄生，完成原型上属性的继承
    通过组合，完成实例上属性的继承
*/
function content(obj){
  function F(){}
  F.prototype = obj
  return new F()
}
// 寄生
const cont = content(Parent.prototype)
// 组合
function Child(name, age){
  Parent.call(this, name, age)
  // ...
}
cont.constructor = Child // 唯一的不足
Child.prototype = cont
const obj6 = new Child("obj6", 26)
```

