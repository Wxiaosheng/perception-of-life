
TypeScript 是 JavaScript 类型的超集，他可以编译成纯 JavaScript 。

1. [基础类型](/full_stack/typescript/base)

2. [接口](/full_stack/typescript/interface)





#### 类型断言
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
!> 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。










#### 类
TypeScript支持JavaScript的新特性，比如支持基于类的面向对象编程。

#### 类型注解
TypeScript 里的类型注解是一种轻量级的为函数或变量添加约束的方式。  

例如，我们希望函数接收一个字符串类型的参数。 
```typescript
  function greeter (person: string) {
    return "Hello, " + person
  }
```

!> 注意,尽管有错误对应的 .js 文件还是被创建了。 就算你的代码里有错误，你仍然可以使用TypeScript，但在这种情况下，TypeScript会警告你代码可能不会按预期执行。

