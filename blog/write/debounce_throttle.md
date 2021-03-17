### 手写防抖
!> 对于手写某一个功能，首先要明确该功能的作用是什么？其次有哪些需要主要的地方


在平时开发的时候，会有很多场景会频繁触发事件，比如说搜索框实时发请求，onmousemove, resize, onscroll等等，我们并不能或者不想频繁触发事件，咋办呢？这时候就应该用到函数防抖和函数节流了！

```javascript
// 防抖 - 短时间内多次触发同一事件回调函数的执行，最后执行一次或开始的时候执行一次，中途的不执行

function debounce (fn, wait) {
  let timer
  return function (...args) {
    if (timer) clearTimeout(timer)

    const context = this
    timer = setTimeout(() => fn.call(context, ...args), wait)
  }
}
```

### 手写节流
!> 对于手写某一个功能，首先要明确该功能的作用是什么？其次有哪些需要主要的地方

与防抖相似，节流表示在频繁触发回调时，在指定的时间间隔之内只执行一次

```javascript
function throttle (fn, wait) {
  let start
  return function (...args) {
    const current = new Date().getTime()
    
    if (start && current - start >= wait) {
      fn.call(this, ...args)
    }
    start = current
  }
}
```