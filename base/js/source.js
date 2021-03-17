// 手写 call （一定要明确函数作用）
// call 作为函数原型上的方法，作用是绑定this 和 参数 并执行函数

Function.prototype.call2 = function (target, ...args) {
  // _call 的 this 是需要绑定 this 的函数
  // 原生改变this的方式 => 变成普通函数调用，或者通过对象的属性调用
  // 实现原理
  // 1.给目标对象添加新的方法，值为需要绑定函数，即 this
  // 2.通过目标对象执行新绑定的方法（即通过对象调用的方式改变this指向）
  // 3.删除目标对象上新添加的方法，并且将调用后的结果返A回

  target = (target === undefined || target === null) ? window : target

  target.__fn = this
  const result = target.__fn(...args)
  delete target.__fn
  return result
}

Function.prototype.apply2 = function (target) {
  // apply 与 call 的实现思路是一样的，区别在于参数传递
  target = (target === undefined || target === null) ? window : target

  target.__fn = this
  const params = arguments[1] ? arguments[1] : undefined
  const result = target.__fn(...params)
  delete target.__fn
  return result
}

Function.prototype.bind2 = function (target, ...args) {
  // 返回一个绑定了 this 的函数
  const self = this
  return function () {
    return self.call2(target, ...args)
    // return self.apply2(target, [...args])
  }
}

// new 操作符
// 1. 创建一个新对象，并且新对象的 __proto__ 属性指向 构造函数的 prototype 
// 2. 构造函数的执行环境中的 this 指向这个新对象
// 3. 返回当前创建的新对象（构造函数没有显性的return object）
function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype)

  const result = constructor.call(obj, ...args)

  return typeof result === 'object' ? result : obj
}