### 继承
首先 先定义一个父类：
```javascript
function Person (name) {
    this.name = name;
    this.showName = function () {
        return this.name
    }
}
Person.prototype.age = 18
```

#### 1、原型链继承
##### 实现
  让新实例的原型等于父类的实例 

##### 特点
  实例可以继承的属性有：实例构造函数的属性，父类构造函数的属性，父类原型的属性  
  实例不可以继承的属性有：父类实例的属性(因为继承时仅初始化了一次父类)  

##### 缺点 
  1、不可以动态的向父类构造函数传参，只能初始化时传递一次参数  
  2、继承单一  
  3、所有新实例都会共享父类实例的属性   

一个实例修改了原型属性，另一个实例的原型属性也会被修改 

```javascript
function Student(name) {
    this.name = name;    
}
Student.prototype = new Person() // 无法动态的接受参数

const s = new Student('s')
console.log(s.name)
console.log(s.age)
console.log(s.showName())
```


#### 2、借用构造函数继承
##### 实现
  用 call 和 apply 将父类构造函数引入子类构造函数中  
  其实就是使用子类的实例替换父类构造函数的this  

##### 特点
  1、只继承了父类构造函数的属性，没有继承父类原型链的属性  
  2、可以动态的向父类构造函数传参  
  3、可以继承多个构造函数的属性(call多个)  

##### 缺点
  1、只能继承父类构造函数的属性，不能继承父类原型链的属性  
  2、无法实现构造函数的复用  
  3、每个实例都有分类构造函数的副本，臃肿  
```javascript
function Student(name){
    Person.call(this, name) // 此处可以动态的接受参数
    this.age = 12
}

const s = new Student('s')
console.log(s.name)
console.log(s.age)
console.log(s.showName())
```


#### 3、组合继承 （常用）
##### 实现
  组合原型链继承和借用构造函数继承  

##### 特点
  1、可以继承父类构造函数和原型上的属性，可以传参，可以复用  
  2、每个子类新实例引入的构造函数属性都是私有的  

##### 缺点
  调用了两次父类构造函数(耗内存)，子类的构造函数会替代原型上的那个父类构造函数  

```javascript
function Student(name){
    // 实现父类构造函数属性继承，且都是子类私有的
    Person.call(this, name)
}
// 实现父类原型继承，但子类的构造函数会替代原型上的那个父类构造函数
Student.prototype = new Person()

const s = new Student('s')
console.log(s.name)
console.log(s.age)
console.log(s.showName())
```


#### 4、原型式继承
##### 实现
  用一个函数封装一个对象，然后该对象继承传入的对象，最后返回这个对象的实例  

##### 特点
  类似于复制一个对象，用函数来包装  

##### 缺点
  1、只能继承原型上的属性，不能继承构造函数的属性  
  2、无法实现复用（新实例的属性都是后面添加的）  

##### 与 原型链继承 的异同
  同：都实现了继承原型上的属性  
  异：原型式继承更类似于匿名函数的性质，想要直接使用，不用像原型链继承需要定义子类构造函数  

```javascript
function content(obj) {
    function F(){}
    F.prototype = obj
    return new F()
}
const p = new Person('p')
// student 能继承 父类Person 原型上的属性
const student = content(p)
console.log(s.name)
console.log(s.age)
console.log(s.showName())
```


#### 5、寄生式继承
##### 实现
  就是给原型式继承外面套了个壳  

##### 特点
  可以将 subobject 看成是一个 Student 的构造函数，只是这个构造函数只需要调用，不需要new  

##### 缺点
  没用到原型，无法复用 subobject 的属性  

```javascript
function content(obj) {
    function F(){}
    F.prototype = obj
    return new F()
}
const p = new Person('p')
// 以上是原型式继承，给原型式继承再套个壳 传递参数
function subobject(obj) {
    const sub = content(obj)
    sub.name = 'sub'
    return sub
}
const student = subobject(p)
console.log(s.name)
console.log(s.age)
console.log(s.showName())
```


#### 6、寄生组合式继承（常用）
##### 实现
  对寄生式继承在封装了一层

```javascript
// 寄生
function content(obj) {
    function F(){}
    F.prototype = obj
    return new F()
}
// content 返回的就是F实例，只不过是一种实现了原型继承的表现形式
const con = content(Person.prototype)

// 组合
function Student(name) {
    Person.call(this, name) // 实现了继承构造函数属性
}
Student.prototype = con
con.constructor = Student // 一定要修复实例? 见下图

const s = new Student('s');
console.log(s.name)
console.log(s.age)
console.log(s.showName())
```

```javascript
// 上述和以下例子的效果是一样的
function F(){}
F.prototype = Person.prototype
function Student(name) {
    // 实现了构造函数属性的继承
    Person.call(this, name)
}
// 实现了原型链属性的继承
Student.prototype = new F()

const s = new Student('s');
console.log(s.name)
console.log(s.age)
console.log(s.showName())
```

以上这些方式，其实与其说是对象的继承，更像是函数的功能用法，如何用函数做到复用，组合，这些和使用继承的思考是一样的。  

新版本 ES6已经原生支持 创建对象和实现对象的继承：
```javascript

class Person {
    constructor(name) {
        this.name = name
    }
    showName(){
        return this.name
    }
}

class Student extends Person {
    constructor(name, age) {
        super(name) // super => Person的构造函数
        this.age = age
    }
}

const s = new Student('s', 18)
```

<p align="right"> 2019年10月17日 </p>