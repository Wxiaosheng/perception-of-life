#### 接口
> 为了让程序有价值，我们需要能够处理最简单的数据单元：数字，字符串，结构体，布尔值等。

TypeScript的核心原则之一是对值所具有的结构进行类型检查，在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。 

```ts
  function printLabel(obj: { label: string }): void {
    console.log(obj.label)
  }

  let myObj = { size: 26, label: 'Size 26' }
  printLabel(myObj)
```
类型检查器会查看printLabel的调用。 printLabel有一个参数，并要求这个对象参数有一个名为label类型为string的属性。  

!> 注意，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配。 

```ts
  // 使用接口
  interface ObjValue {
    label: string
  }

  function printLabel(obj: ObjValue): void {
    console.log(obj.label)
  }

  let myObj = { size: 26, label: 'Size 26' }
  printLabel(myObj)
```
!> 接口就好比一个名字，用来描述上面例子里的要求，**必须包含一个label属性且类型为 string**

##### 可选属性
接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。  
即给函数传入的参数对象中只有部分属性赋值了。  
**可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。**
```ts
  // 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个 ? 符号
  interface Config {
    color?: string
    width?: number
  }
```

##### 只读属性
一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性
```ts
  interface Point {
    readonly x: number
    readonly y: number
  }

  // 你可以通过赋值一个对象字面量来构造一个Point。 赋值后， x和y再也不能被改变了。
  let p1: Point = { x: 10, y: 20 };
  p1.x = 5; // error!
```
!> TypeScript具有 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改
```ts
  let a: number[] = [1, 2, 3]
  let ro: ReadonlyArray<number> = a;

  ro[0] = 12        // Error
  ro.push(5)        // Error
  ro.length = 100   // Error
  a =ro             // Error
```
!> 上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用[类型断言](#1)重写 `a = ro as number[]`

##### 类型断言 :id=1
类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。   
它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。
```typescript
  // 类型断言有两种形式
  // 一是 "尖括号" 语法
  let someValue: any = "string"
  let strLength: number = (<string>someValue).length

  // 另一个为 as 语法
  let someValue: any = "string"
  let strLength: number = (someValue as string).length
```
!> 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 as 语法断言是被允许的。


##### readonly vs const
最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。


#### 函数类型
接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。  

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
```ts
  interface SearchFunc {
    (source: sting, substring: string): boolean
  }

  let mySearch: SearchFunc
  mySearch = function(source: string, subString: string) {
    let result = source.search(subString)
    return result > -1
  }
```
!> 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。  


#### 
可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。
```ts
  interface StringArray {
    [index: number]: string
  }

  let myArray: StringArray
  myArray = ["Bob", "Fred"]

  let myStr: string = myArray[0]
```

#### 类类型
##### 实现接口
与 C# 或 Java 里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去符合某种契约。
```ts
  interface ClockInterface {
    currentTime: Date
  }

  class Clock implements ClockInterface {
    currentTime: Date
    construction(h: number, m: number) { }
  }
```
接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。

##### 类静态部分与实例部分的区别
当你操作类和接口的时候，你要知道类是具有两个类型的：**静态部分的类型和实例的类型**。  
```ts
  // 这是一个 ❌(错误的)示例
  interface ClockConstructor {
    new (hour: number, minute: number)
  }

  class Clock implements ClockConstructor {
    currentTime: Date

    constructor(h: number, m: number){ }
  }
```
!> 因为当一个类实现了一个接口时，只对其实例部分进行类型检查。  
constructor存在于类的静态部分，所以不在检查的范围内，因此出错。


##### 继承接口
和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。
```ts
  interface Shape {
    color: string
  }
  interface Square extends Shape {
    sideLength: number
  }

  let square = <Square>{}
  square.color = 'red'
  square.sideLength = 10
```
一个接口可以继承多个接口，创建出多个接口的合成接口。
```ts
  interface Square extends Shape, PenStroke {
    sideLength: number;
  }
```

##### 混合类型
接口能够描述JavaScript里丰富的类型，因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。
```ts
  // 一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性
  interface Counter {
    (start: number): string
    interval: number
    reset(): void
  }
  function getCounter(): Counter {
    let counter = <Counter>function(start: number) { }
    counter.interval = 123
    counter.reset = function(){ }
    return counter
  }
  let c = getCounter();
  c(10)
  c.reset()
  c.interval = 5.0
```

##### 接口继承类
当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。  
接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

