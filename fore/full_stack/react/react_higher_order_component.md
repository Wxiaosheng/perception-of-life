## 高阶组件
> 即，Higher Order Component  
> 高阶组件是 React 中复用组件逻辑的一种高级技巧。  
> 高阶组件自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

&emsp;&emsp;具体而言，**高阶组件是参数为组件，返回值为新组件的函数**。

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent)
```

&emsp;&emsp;**组件是将 props 转化为 UI，而高阶组件是将组件转换为另一个组件**。




