### 手写 New 
!> 对于手写某一个功能，首先要明确该功能的作用是什么？其次有哪些需要主要的地方

```javascript
// 1. 创建了一个新对象，并且新对象的 __proto__ 属性指向 构造函数的 prototype
// 2. 调用构造函数，并且指定构造函数执行环境中的 this 为上一步创建的新对象
// 3. return 这个新对象（当构造函数没有显性的 return 一个 object）

function myNew (constructor, ...args) {
  const obj = Object.create(constructor.prototype)

  const result = constructor.call(obj, ...args)

  return typeof result === 'object' ? result : obj
}
```