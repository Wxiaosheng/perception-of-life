### 手写instanceof

```javascript
// instanceof 表示判断一个变量是否指定类型的子类
// 注意 基本数据类型 和 null 的结果都是 false

function Instanceof (target, parent) {
  if (typeof target !== 'object' || target === null) return false
  
  let proto = Object.getPrototypeOf(target)

  while (true) {
    if (proto === null) return false
    if (proto === parent.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

```