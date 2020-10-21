## LRU Cache
即最近最少使用，是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰

[LeetCode 入口](https://leetcode-cn.com/problems/lru-cache/solution/)

### 实现的关键点
1. 最近最少使用，即意味着我们需要自己手动维护一个使用顺序，比如使用一个数组来存放
2. 使用 Hash Table（`{}`）可以非常快速的访问和存储数据，时间复杂度为 O(1)
3. JavaScript 自带的 Map 有一个特点，即 **keys API 返回的结果的顺序即为当前对象属性添加时的顺序**，因此使用 Map 可以不用单独开辟存储空间维护数据使用顺序

```javascript
class LRUCache {
  constructor (capacity) {
    this.capacity = capacity
    this.cache = new Map()
  }

  get (key) {
    if (!this.cache.has(key)) return -1
    // 对于重新访问的数据，需要跟新顺序
    const value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }

  set (key) {
    let delKey = key
    // 对于超出存储大小的新值，如果之前从未出现，则删除当前顺序的第一条记录
    if (!this.cache.has(key) && this.cache.size >= this.capacity) {
      const { value: oldKey } = this.cache.keys().next()
      delKey = oldKey
    }
    this.cache.delete(delKey) 
    this.cache.set(key, value)
  }
}
```