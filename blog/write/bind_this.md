### 手写call
!> 对于手写某一个功能，首先要明确该功能的作用是什么？其次有哪些需要主要的地方

```javascript
/* 
  功能
    1. call 是每一个函数都具备的方法，因此挂载在 Function.prototype
    2. call 接受的第一个参数，即为需要绑定的对象，剩余的参数都是绑定函数执行时的参数
  
  注意：
    第一个参数可以为 undefined、null，此时需要绑定的对象是 全局对象
    第一个参数为值类型时，需要装箱

  实现思路
    1. 在绑定对象上新建一个（私有）属性，值为需要绑定的函数
    2. 通过绑定对象.属性的方式 调用函数（此时函数执行环境中的this天然就是绑定对象）
    3. 最后删除新建的（私有）属性，并 返回函数执行结果
*/

Function.prototype.call2 = function (target, ...args) {
  if (target === undefined || target === null) {
    target = (function(){ return this })()
  }

  if (typeof target === 'string') target = new String(target)
  if (typeof target === 'number') target = new Number(target)
  if (typeof target === 'boolean') target = new Boolean(target)

  target._fn = this

  const result = target._fn(...args)

  delete target.fn

  return result
}
```

### 手写apply
!> 对于手写某一个功能，首先要明确该功能的作用是什么？其次有哪些需要主要的地方

```javascript
/* 
  功能和实现思路基本与 call 的一致，二者不同点在于：
    call 接受的是参数列表
    apply 接受的是一个数组
*/

Function.prototype.apply2 = function (target, params) {
  if (!Array.isArray(params)) {
    return throw Error('参数传递错误')
  }
  
  if (target === undefined || target === null) {
    target = (function(){ return this })()
  }

  if (typeof target === 'string') target = new String(target)
  if (typeof target === 'number') target = new Number(target)
  if (typeof target === 'boolean') target = new Boolean(target)

  target._fn = this

  const result = target._fn(...params)

  delete target._fn

  return result
}
```

### 手写bind
!> 对于手写某一个功能，首先要明确该功能的作用是什么？其次有哪些需要主要的地方

```javascript
/* 
  功能
    bind 和 call、apply 的作用都是相同的，绑定函数执行环境中的 this
    但 bind 是返回一个绑定了 this 的函数，由开发者自行确定调用时机
    而 call、apply 则是绑定了 this 后立即执行函数
*/

Function.prototype.bind2 = function (target, ...args) {
  const self = this
  return function () {
    return self.call(target, ...args)
  }
}
```

