## React
> A JavaScript library for building user interfaces  
> 即，用于构建用户界面的 JavaScript 库

自己的学习教程都是基于[官方文档][1]的，个人认为这是学习React最好、最全的文档。

### 特点
&emsp;&emsp;声明式、组件化、一次学习，随处编写。  
&emsp;&emsp;在 React 中，有一个命名规范，通常会将代表事件的监听 prop 命名为 on[Event]，将处理事件的监听方法命名为 handle[Event] 这样的格式。例如：    

    onClick  <=> handleClick  

#### 不可变性在 React 中非常重要
##### what - 是什么？
&emsp;&emsp;在修改 state 中的数据时，使用新的数据替换旧的数据，就是指数据的不可变性。  

    好处：  
      简化复杂的功能
      跟踪数据的改变
&emsp;&emsp;确定在 React 中何时重新渲染(**性能优化**)

#### 函数组件
&emsp;&emsp;如果要定义的组件只包含一个 render 方法，且不包含 state，那么就使用函数组件会更简单。

    语法：
      function FunctionComponent(props){ return <div>...</div> }

#### 时间旅行
&emsp;&emsp;通过将每一步的 state 的状态存储下来，就可以快速实现状态的穿越。

### 核心概念（main concepts）
#### JSX 语法（JSX syntax）
&emsp;&emsp;是一个 JavaScript 的语法扩展。


#### 元素渲染（Rendering Elements）
&emsp;&emsp;是构成 React 应用最小的砖块  
&emsp;&emsp;与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。  
&emsp;&emsp;React 元素是不可变对象，一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。  


##### React 只更新它需要更新的部分
&emsp;&emsp;React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。- diff 算法  
&emsp;&emsp;根据我们的经验，考虑 UI 在任意给定时刻的状态，而不是随时间变化的过程，能够消灭一整类的 bug。


#### 组件 & Props
&emsp;&emsp;组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。  
&emsp;&emsp;分类： **函数组件** 和 **类(class)组件**  
&emsp;&emsp;通过不同的组件能够组成复杂的、大型的应用，且 **Props 是只读的**


#### state & 生命周期
&emsp;&emsp;正确的使用 state  
&emsp;&emsp;&emsp;&emsp;1、不要直接修改 state，需要通过 setState 去修改。  
&emsp;&emsp;&emsp;&emsp;2、state 的更新可能是异步的。(出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用)  
&emsp;&emsp;&emsp;&emsp;3、state 的更新会被合并。(只会更新setState中传入的部分，其他部分不变)  

&emsp;&emsp;数据流动是向下的，通常会被叫做 **“自上而下”** 或是 **“单向”** 的数据流


#### 事件处理
&emsp;&emsp;React元素的事件处理和DOM元素的很相似，但是有一点语法上的不同：  
&emsp;&emsp;&emsp;&emsp;1、React 事件的命名采用小驼峰(camelCase)，而不是纯小写。  
&emsp;&emsp;&emsp;&emsp;2、使用 JSX 语法时，需要传入一个函数作为事件的处理函数，而不是一个字符串。  

&emsp;&emsp;在 React 中不能通过返回false的方式阻止默认行为，必须显示的调用 preventDefault。  

&emsp;&emsp;**绑定this**  
&emsp;&emsp;&emsp;&emsp;1、使用 bind 方法，绑定this。  
&emsp;&emsp;&emsp;&emsp;2、使用实验性的 public class fields 语法，Create React App 默认启用此语法。  
&emsp;&emsp;&emsp;&emsp;3、使用箭头函数。  


#### 条件渲染
&emsp;&emsp;在 React 中，你可以创建不同的组件来封装各种你需要的行为，然后依据应用的不同状态，你可以只渲染对应状态下的部分内容。  
&emsp;&emsp;运算符：与运算符 &&、 三目运算符 x ? a : b、阻止组件渲染(return null)  
&emsp;&emsp;**注意**，在组件的render方法中return null，并不会影响组件生命周期的触发。


#### 列表 & key
&emsp;&emsp;key 只是在兄弟节点之间必须唯一。  
&emsp;&emsp;当使用 map 渲染组件时，如果使用 index 做为key，则会存在安全隐患，具体可以参照 [Index as a key is an anti-pattern][2]  
&emsp;&emsp;为了更好的理解使用 index 作为 key 存在的问题，请参考这篇 [文章][3]


#### 状态提升
&emsp;&emsp;通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。


#### 组合 VS 继承
&emsp;&emsp;React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用。  
&emsp;&emsp;如果你想要在组件间复用非 UI 的功能，我们建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类，组件可以直接引入（import）而无需通过 extend 继承它们。


#### React 哲学
&emsp;&emsp;第一步：将设计好的 UI 划分为组件层级  
&emsp;&emsp;&emsp;&emsp;将组件当作一种函数或者是对象来考虑，根据单一功能原则来判定组件的范围。  

&emsp;&emsp;第二步：用 React 创建一个静态版本  
&emsp;&emsp;&emsp;&emsp;将渲染 UI 和添加交互这两个过程分开，这是因为，编写一个应用的静态版本时，往往要编写大量代码，而不需要考虑太多交互细节；添加交互功能时则要考虑大量细节，而不需要编写太多代码。  
&emsp;&emsp;&emsp;&emsp;React 单向数据流（也叫单向绑定）的思想使得组件模块化，易于快速开发  

&emsp;&emsp;第三步：确定 UI state 的最小（且完整）表示  

&emsp;&emsp;第四步：确定 state 放置的位置  
&emsp;&emsp;&emsp;&emsp;React 中的数据流是单向的，并顺着组件层级从上往下传递  

&emsp;&emsp;第五步：添加反向数据流  
&emsp;&emsp;&emsp;&emsp;较低层级的组件更新较高层级组件中的 state  

&emsp;&emsp;尽管你可能需要编写更多的代码，但是别忘了：**比起写，代码更多地是给人看的**。  

&emsp;&emsp;当你开始构建更大的组件库时，你会意识到这种代码模块化和清晰度的重要性，并且随着代码重用程度的加深，你的代码行数也会显著地减少。




<p align="right"> 2019年11月21日 </p>

[1]:https://zh-hans.reactjs.org/docs/getting-started.html
[2]:https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318
[3]:full_stack/react/index_key_problem

