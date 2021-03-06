#### 基础类型
##### 布尔值
最基本的数据类型就是简单的 true/false 值，在 JavaScript 和 TypeScript 里叫做boolean（其它语言中也一样）。
```typescript
  let isDone: boolean = false
```

##### 数字
和 JavaScript一样，TypeScript 里的所有数字都是浮点数。   
这些浮点数的类型是 number。
```typescript
  let decLiteral: number = 6
  let hexLiteral: number = 0xf00d
```

##### 字符串
像其它语言里一样，我们使用 string表示文本数据类型。 和 JavaScript 一样，可以使用双引号 " 或单引号 ' 表示字符串。
```typescript
  let name: string = 'tianzun'

  // 还可以使用模版字符串，它可以定义多行文本和内嵌表达式
  let sentence = `Hello, my name is ${ name }.`
```

##### 数组
有两种方式可以定义数组 
```typescript
  // 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组
  let array1: number[] = [1, 2, 3]

  // 第二种方式是使用数组泛型，Array<元素类型>
  let array2: Array<number> = [1, 2, 3]
```

##### 元祖 Tuple
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
```typescript
  let x: [string, number]
  x = ['hello', 10]  // OK
  x = [10, 'hello']  // Error
```
当访问一个已知索引的元素，会得到正确的类型。
```typescript
console.log(x[0].substr(1))  // OK
console.log(x[1].substr(1))  // Error, 'number' does not have 'substr'
```
当访问一个越界的元素，会使用联合类型替代。
```typescript
  x[3] = 'world'  // OK, 字符串可以赋值给(string | number)类型
  console.log(x[5].toString())  // OK, 'string' 和 'number' 都有 toString
  x[6] = true  // Error, 布尔不是(string | number)类型
```

##### 枚举
enum类型是对JavaScript标准数据类型的一个补充。像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
```typescript
  enum Color {Red, Green, Blue}
  let c: Color = Color.Green;
```
默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。
```typescript
  enum Color {Red = 1, Green, Blue}
  let c: Color = Color.Green;

  // 或者，全部都采用手动赋值

  enum Color {Red = 1, Green = 2, Blue = 4}
  let c: Color = Color.Green;
```
枚举类型提供的一个便利是你可以由枚举的值得到它的名字。
```typescript
  // 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：
  enum Color {Red = 1, Green, Blue}
  let colorName: string = Color[2];

  console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
```

##### Any
有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。   
这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。
```typescript
  let notSource: any = 4

  notSure = "maybe a string instead"
  notSure = false  // okay, definitely a boolean
```
!> 你可能认为 Object有相似的作用，就像它在其它语言中那样。 但是 Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法

##### Void
某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。   
当一个函数没有返回值时，你通常会见到其返回值类型是 void
```typescript
  function warnUser(): void {
    console.log('This is warnning message.')
  }
```
!>  声明一个void类型的变量没有什么大用，因为你只能为它赋予 `undefined` 和 `null`

##### Null 和 Undefined
TypeScript 里，undefined 和 null 两者各自有自己的类型分别叫做 undefined 和 null，和 void 相似，它们的本身的类型用处不是很大
```typescript
  // Not much else we can assign to these variables!
  let u: undefined = undefined;
  let n: null = null;
```
!> 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给 number 类型的变量，但是当你指定了--strictNullChecks 标记，null 和 undefined 只能赋值给void和它们各自

##### Never
never 类型表示的是那些永不存在的值的类型。   
例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。  
```typescript
  // 返回never的函数必须存在无法达到的终点
  function error(message: string): never {
      throw new Error(message);
  }

  // 推断的返回值类型为never
  function fail() {
      return error("Something failed");
  }

  // 返回never的函数必须存在无法达到的终点
  function infiniteLoop(): never {
      while (true) {
      }
  }
```

##### Object
object 表示非原始类型，也就是除 number，string，boolean，symbol，null 或 undefined 之外的类型。