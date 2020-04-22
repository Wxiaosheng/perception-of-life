
TypeScript 是 JavaScript 类型的超集，他可以编译成纯 JavaScript 。

1. [基础类型](/full_stack/typescript/base)

2. [接口](/full_stack/typescript/interface)

<!-- 3. [类](/full_stack/typescript/classes) -->






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

