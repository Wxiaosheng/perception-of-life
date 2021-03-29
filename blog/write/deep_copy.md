### 手写深浅拷贝
!> 对于手写某一个功能，首先要明确该功能的作用是什么？其次有哪些需要主要的地方

#### 什么是深浅拷贝
JavaScript 中变量的数据一共有 `String`、`Number`、`Boolean`、`Undefined`、`Null`、`Symbol`、`Object`  
其中 `Object` 属于引用数据类型，变量存储不是数据本身，而是指向数据的内存地址  

**浅拷贝** 是指变量赋值时只进行 值拷贝，对于引用数据类型来说只复制内存地址，而不是复制内存地址所引用的数据本身  
**深拷贝** 是指变量赋值时不仅进行只拷贝，而且对于引用数据类型是拷贝一份新的引用的对象  

```javascript
// 浅拷贝
function clone(obj) {
  if (!obj) return obj
  if (Array.isArray(obj)) return [...obj]

  const target = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      target[key] = obj[key]
    }
  }
  return target
}
```

```javascript
// 深拷贝 - 递归写法
function deepClone(obj) {
  if (!obj) return obj
  
  const target = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
        target[key] = deepClone(obj[key])
      } else {
        target[key] = obj[key]
      }
    }
  }
  return target
}
```

```javascript
// 深拷贝 - 非递归写法
// 可以将 拷贝的对象看成一颗树，遍历树上的每个节点并复制
function deepClone(obj) {
  if (!obj) return obj
  
  const target = {}, 
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
        target[key] = deepClone(obj[key])
      } else {
        target[key] = obj[key]
      }
    }
  }
  return target
}
```
