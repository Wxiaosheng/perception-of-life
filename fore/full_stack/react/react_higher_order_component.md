## 高阶组件
> 即，Higher Order Component  
> 高阶组件是 React 中复用组件逻辑的一种高级技巧。  
> 高阶组件自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

&emsp;&emsp;具体而言，**高阶组件是参数为组件，返回值为新组件的函数**。

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent)
```

&emsp;&emsp;**组件是将 props 转化为 UI，而高阶组件是将组件转换为另一个组件**。


#### 使用 HOC 解决横切关注点问题
> 横切关注点，可以简单的理解成相同抽象逻辑(某一个功能)，但不能通过定义组件的方式实现复用

&emsp;&emsp;当我们有两个这样的组件，他们都有以下的实现细节：  
&emsp;&emsp;&emsp;&emsp;1、在挂载时，向 DataSource (是个全局范围内的数据源变量) 添加一个监听器订阅数据的变化；  
&emsp;&emsp;&emsp;&emsp;2、在监听器的内部，当数据源发生变化的时候，调用 setState ；  
&emsp;&emsp;&emsp;&emsp;3、在卸载时，移除取消订阅；  
&emsp;&emsp;&emsp;&emsp;4、在 DataSource 中订阅的数据节点却是不同的(无法通过组件的方式复用)；  

&emsp;&emsp;注意，HOC 组件并不会修改传入的组件，也不会使用继承的来复制其行为。相反，HOC 通过将一个组件 **包装** 在容器组件中来组成 **新组件**。HOC 是 **纯函数，没有副作用**。


#### 与容器组件的比较
&emsp;&emsp;容器组件担任 **分离将高层和底层关注的责任**，由容器管理订阅和状态，将 props 传递给组件并处理渲染成 UI。 HOC 使用容器作为其实现方式的一部分，可以将 HOC 视为 **参数化的容器组件**。


#### 常见约定
* 将不相关的 props 传递给被包裹的组件  
* 最大化可组合性  
* 包装显示名称以便轻松调试  


#### 注意事项
##### 不要在 render 方法中使用 HOC
&emsp;&emsp;React 的 diff 算法(称为 协调) 使用组件标识来确定它是应该的更新现有子树还是丢弃并挂载新子树。  
&emsp;&emsp;如果从 render 返回的组件与前一个渲染中的组件相同(===)，则 React 通过将子树与新子树进行区分来地柜更新子树。如果他们不相等，则完全卸载子树。  
&emsp;&emsp;对于 HOC 来说，不应该在组件的 render 方法中对子组件应用 HOC，因为每次调用 render 函数都会创建一个新的 EnhancedComponent，这将导致**子树每次渲染都会进行卸载和重新挂载的操作**。  
&emsp;&emsp;这不仅仅是性能的问题，**重新挂载组件会导致该组件及其所有子组件的状态丢失**。 

##### 务必复制静态方法
&emsp;&emsp;有时定义在 React 组件的静态方法很有用，但是通常将 HOC 应用于组件时，原始组件将使用容器组件进行包装。这就意味着新组件没有原始组件的任何静态方法。  
```javascript
// 定义静态函数
WrappedComponent.staticMethod = function(){ /* ... */ }

// 应用 HOC，EnhancedComponent 上是没有 staticMethod 的，因为返回的是一个新的组件
const EnhancedComponent = enhance(WrappedComponent)

// 解决方案，使用 hoist-non-react-statics 自动拷贝所有非静态方法
import hoistNonReactStatic from 'hoist-non-react-static'

const enhance = function(WrappedComponent){
  class Enhance extends React.Component { /* ... */ }
  hoistNonReactStatic(Enhance, WrappedComponent)
  return Enhance
}
```
&emsp;&emsp;除了导出组件，另一个可执行的方案是再额外导出这些静态方法。  
```javascript
MyComponent.someFunction = someFunction
export default MyComponent

// 单独导出静态方法
export { someFunction }

// 使用时，直接将这些静态方法导入进来
import MyComponent, { someFunction } from './MyComponent'
```

##### Refs 不会被传递
&emsp;&emsp;因为 ref 实际上并不是 props，而是类似于 key 一样，它是由 React 专门处理的。





<p align="right"> 2019年12月3日 </p>
