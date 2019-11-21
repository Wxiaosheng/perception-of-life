### 使用 index 做为 key 潜在的问题
&emsp;&emsp;个人结合官方推荐的 [文档][1]，写出了这个能说明这个问题的文章。

&emsp;&emsp;通常，我们再开发的过程中，经常性能能够遇见这样的一个场景。当页面有一个列表项或者列表区域时，我们经常会通过 map 的形式一次性渲染出数据所对应的所有列表项，如：
```javascript
// 使用数组的角标 index 作为 React Component 的 key
const List = (props) => {
  return <div>{
    props.list.map((item, index) => <Item key={index} data={item} />)
  }</div>
}
```
&emsp;&emsp;**注意**：如果不设置 key，则 React 会给出 <span style='color:red;'>Warning: Each child in a list should have a unique "key" prop.</span> 的警告。

#### key
&emsp;&emsp;The key is the only thing React uses to identify DOM elements. 也就是说，在 React 中 key 是用来识别元素的唯一标志。当应用中数据发生了增删时，React 的 diff 算法 可以根据 key 快速的计算出需要更新的 DOM 节点。对于 diff 算法，可以参考此篇 [文章][2]。

&emsp;&emsp;首先，我们来看下面这个常见的例子：
```javascript
import React, { Component } from 'react'

export default class List extends Component {
  constructor(props){
    super(props)

    this.state = {
      list: ['item 0', 'item 1']
    }
  }

  // 在头部压入一个元素
  unshiftItem(){ 
    const list = this.state.list.slice()
    list.unshift(`item ${list.length}`)
    this.setState({ list })
  }

  // 在尾部推进一个元素
  pushItem(){
    const list = this.state.list.slice()
    list.push(`item ${list.length}`)
    this.setState({ list })
  }

  render () {
    const { list } = this.state

    return <div style={{ fontSize: '0.12rem' }}>
      <div>{
        list.map((item, index) => <Item key={index} value={item} />)
      }</div>
      <p>
        <button onClick={this.unshiftItem.bind(this)}>压入一个元素</button>  
        <button onClick={this.pushItem.bind(this)}>推入一个元素</button> 
      </p>
    </div>
  }
}

const Item = (props) => {
  return <h3>{props.value}</h3>
}
```

&emsp;&emsp;你可以执行下这个例子，你会发现使用 index 作为 Item 的 key 时都不会发生我们所担心的数据错乱的问题。请先不要着急，接着看下面这个例子：
```javascript
// List 的组件不动，让我们对 Item 组件进行一些改造，结果如下

const Item = (props) => {
  return <div>
    <label>
      {props.value}
      <input type="text" name='ipt' />
    </label>
  </div>
}
```
&emsp;&emsp;请观看下面的一段短视频，就能发现我们预料不到的错误出现了，右侧的输入框中的内容并没有出现我们预想的结果，这就是本文标题中所说的 **潜在问题**。  
<div style='margin: 0 auto;max-width: 800px;padding: 30px 15px 40px;position: relative;'><video style='width:100%' src='../../images/index_key.mp4' controls='controls'></div>

&emsp;&emsp;仔细观看右侧的 DOM 结构不难发现，整个 Item 组件由于使用的 key 是 index，当压入一个新的元素时，这个新元素的 index 就是原来的 index，导致 React 错误的认为新渲染的这个 DOM 节点还是原来的 DOM 节点，只是内部的 文本发生了变化('item 0' => 'item 2')，而 input 输入框由于两者都有，所以 React 并没去更新这个 input DOM 节点，因此才到这个问题的发生。  

&emsp;&emsp;综上所述，我们发现出现这个问题的原因还是因为标识 Item 组价的 key 导致的，index 与 渲染 Item 的数据不是严格一一对应关系，只是一个相对的关系，即数组中的索引 index 为0的位置的元素在数组发生变化后，它所对应的值可能会发生变化。这样就导致前后两次 index 对应的数据可能不唯一，而 React 计算时根据 key 还认为该组件没有发生变化。







<p align="right"> 2019年11月21日 </p>

[1]:https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318
[2]:fore/full_stack/react/react_diff