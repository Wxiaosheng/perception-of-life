## 让可滚动的 div 容器，自动滚动到最底部

在工作实践中，通常我们会遇见一些这样的场景，在某些操作后，希望页面滚动到操作的部位，例如下图所示：

![div-scroll](/work/images/div-scroll.png)

当点击左侧的模块按钮，基于 React 的页面会修改数据源，使右侧的展示列表从新渲染。现在我们希望当添加的模块比较多的时候，自动的滚动窗口到右侧滑框的最底部，展示出当前想添加的新模块。

#### 解决方法一，动态设置 scrollTop
每个 DOM 元素都有 scrollTop 属性，表示可滚动元素在父元素内滚动过的距离，如下图所示：

![scrollTop](/work/images/scrollTop.jpg)

因此可以动态的设置 scrollTop 的值，来控制右侧可滑动的内容，将其赋值为 scrollHeight （当前可滑动元素可滑动的高度）

```javascript
// 左侧的 添加模块事件
addModule = (type) => {
  // ... 新增模块，最后 setState
  this.setState({
    modules: newModules
  }, () => {
    // 启动一个微任务，在DOM更新结束后，滚动右侧元素
    // 为什么要在 DOM 更新结束后才开始滚动？
    // 因为在 DOM 更新后，scrollHeight 高度会包含新创建模块的高度
    Promise.resolve().then(() => {
      this.rightRef.scrollTop = this.rightRef.scrollHeight
    })
  })
}
```

#### 方法二、scrollIntoView
**Element.scrollIntoView() 方法让当前的元素滚动到浏览器窗口的可视区域内**

##### [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)

    element.scrollIntoView();                      // 等同于element.scrollIntoView(true) 
    element.scrollIntoView(alignToTop);            // Boolean型参数 
    element.scrollIntoView(scrollIntoViewOptions); // Object型参数

这里我们只用关心不传参数，或者传 Boolean型参数，如果为true，元素的顶端将和其所在滚动区的可视区域的顶端对齐，如果为false，元素的底端将和其所在滚动区的可视区域的底端对齐

当出现类似的场景时，我们还可以在滚动元素最底部加一个隐藏的元素，每次需要滚动到最底部时，调用该元素的 `scrollIntoView`

```javascript
<div style="width:500px;overflow:auto">
  <div id="msg" style="overflow:hidden;width:480px;"></div>
  <div id="msg_end" style="height:0px; overflow:hidden"></div>
</div>

function onGetMessage (context) {
  msg.innerHTML += context;
  msg_end.scrollIntoView(); 
} 
```