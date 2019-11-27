## Context
> Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

* [何时使用 Context][1]
* [使用 Context 之前的考虑][2]
* [API][3]
  * [React.createContext][4]
  * [Context.Provider][5]
  * [Class.contextType][6]
  * [Context.Consumer][7]
  * [Context.displayName][8]
* [示例][9]
  * [动态 Context][10]
  * [在嵌套组件中更新 Context][11]
  * [使用多个 Context][12]
  * [注意事项][13]


### 何时使用 Context
&emsp;&emsp;Context 设计目的是为了共享那些对于一个组件树而言是 ”全局“ 的数据，例如当前的用户信息、主题等。 

&emsp;&emsp;这个例子是一个不使用 Context 情况下，通过 props 属性层层传递，其中的 Box 组件并没有需要使用 user 的数据，却要接受并且向下传递数据，这其实是非常不友好的，因为如果中间不止 Box 一层而是有多层时，这是就会产生非常多的无用代码。  
```javascript
import React, { Component } from 'react'

export default class APP extends Component {
  constructor(props){
    super(props)
  
    this.state = {
      user: {
        name: 'tianzun',
        age: 25
      }
    }
  }

  render () {
    return <div style={{ fontSize: '0.16rem' }}>
      list test pages
      <Box user={this.state.user} />
    </div>
  }
}

// 中间组件，需要仅仅为了数据传递而 要接受无关数据和向下传递数据
const Box = props => {
  return <div>
    this is box.
    <User user={props.user} />
  </div>
}

const User = props => {
  console.log('User', props)
  return <div>
    this is User module.
    <p>{ `${props.user.name}: ${props.user.age}` }</p>
  </div>
}
```

&emsp;&emsp;通过 Context 传递数据，如下：
```javascript
import React, { Component } from 'react'

// 创建一个 User 的 Context，并且可以设定默认值(只有没有匹配到 Provider 时，默认值才会生效)
const UserContext = React.createContext({ name: 'tianzun', age: 25 })

export default class APP extends Component {
  render () {
    // 使用定义的 Context 的 Provider 来将当前对于组件树为全局的对象传递给以下的 组件树
    // 如果不设置 value 的值，则使用定义时的默认值
    return <UserContext.Provider value={{ name: 'tianzun_test', age: 26 }}>
      <div style={{ fontSize: '0.16rem' }}>
        list test pages
        <Box />
      </div>
    </UserContext.Provider>
  }
}

// 中间组件无需再传递数据
const Box = props => {
  return <div>
    this is box.
    <User />
  </div>
}

class User extends Component {
  // 子组件需要定义为 class 组件
  // 指定 contextType 读取当前的定义的 UserContext
  // React 会往上找到最近的 UserContext 的 Provider，然后使用它的值
  static contextType = UserContext
  render(){
    // 通过 this.context 获取共享的数据
    return <div>
      this is User module.
      <p>{ this.context && `${this.context.name}: ${this.context.age}` }</p>
    </div>
  }
}
```


### 使用 Context 之前的考虑
&emsp;&emsp;Context 使用场景在于很多不同的组件需要访问同样的数据，请谨慎使用，因为这会使得组件的复用性变差。（为什么呢？）  
&emsp;&emsp;如果你是想避免一层一层的传递一些属性，官方建议，[组合组件][14]有时候是一个比Context更好的解决方案。  
&emsp;&emsp;简单的说，**一种无需Context的解决方案是 将最后用到数据的组件一层一层的传递下去，而中间组件无需知道该组件所需的数据和实现的方式**。  
&emsp;&emsp;注意，这并不是适用于每一个场景，这种将逻辑提升到组件树的更高层次来处理，会使得这些高层组件变得更更复杂，并且会强行将低层组件的适应这样的形式，这可能不会是你想要的。  


### API
#### React.createContext
```javascript
  const MyContext = React.createContext(defaultValue)
```
&emsp;&emsp;创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取当前的 Context 值。  
&emsp;&emsp;只有当组件所处的组件树中没有匹配到 Provider 是，其默认值才会生效。这有助于在不使用Provider包装组件的情况下对组件进行测试。  

### Context.Provider
```javascript
  <MyContext.Provider value={/* 某个值 */} />
```
&emsp;&emsp;每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 Context 的变化。  
&emsp;&emsp;Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。  
&emsp;&emsp;当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。
&emsp;&emsp;通过新旧值检验来确定变化，使用了与 [Object.is][15] 相同的算法。  

#### Class.contextType
```javascript
class User extends Component {
  static contextType = UserContext
  render(){
    // 通过 this.context 获取共享的数据
    return <div>
      this is User module.
      <p>{ this.context && `${this.context.name}: ${this.context.age}` }</p>
    </div>
  }
}
```
&emsp;&emsp;挂载在 class 上的 contextType 属性会被重新复制为一个由 React.createContext() 创建的 Context 对象。这能让你使用 this.context 来消费(使用)最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。  
&emsp;&emsp;注意：如果你正在使用实验性的 [public class fields][16] 语法，你可以使用 static 这个类属性来初始化你的 contextType。  

#### Context.Consumer
```javascript
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>

// 例如将上面例子中的 User 改写成函数组件的形式
const User = props => {
  return <UserContext.Consumer>{
    context => <div> this is User module. <p>{ context && `${context.name}: ${context.age}` }</p></div>
  }</UserContext.Consumer>
}
```
&emsp;&emsp;React 组件也可以订阅到 context 变更，这能在函数式组件中完成订阅 context。这需要函数作为子元素（function as a child）这种做法，这个函数接收当前的 context 值，返回一个 React 节点。  

##### Context.displayName
&emsp;&emsp;context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。  


### 示例
#### 动态 Context
```javascript
import React, { Component } from 'react'

// 创建一个 User 的 Context，并且可以设定默认值(只有没有匹配到 Provider 时，默认值才会生效)
const UserContext = React.createContext({ name: 'tianzun', age: 25 })

export default class APP extends Component {
  constructor(props){
    super(props)
  
    this.state = {
      user: { name: 'tianzun_test', age: 26 }
    }
  }
  
  onchang(user){
    this.setState({ user })
  }

  render () {
    // 使用定义的 Context 的 Provider 来将当前对于组件树为全局的对象传递给以下的 组件树
    // 如果不设置 value 的值，则使用定义时的默认值
    return <UserContext.Provider value={{ value: this.state.user, onchang: this.onchang.bind(this) }}>
      <div style={{ fontSize: '0.16rem' }}>
        list test pages
        <Box />
      </div>
    </UserContext.Provider>
  }
}

// 中间组件无需再传递数据
const Box = props => {
  return <div>
    this is box.
    <User />
  </div>
}

class User extends Component {
  // 子组件需要定义为 class 组件
  // 指定 contextType 读取当前的定义的 UserContext
  // React 会往上找到最近的 UserContext 的 Provider，然后使用它的值
  static contextType = UserContext

  render(){
    // 通过 this.context 获取共享的数据
    return <div>
      this is User module.
      <p>{ this.context && `${this.context.value.name}: ${this.context.value.age}` }</p>
      <button onClick={() => this.context.onchang({ name: 'tianzun', age: '27'})}>change</button>
    </div>
  }
}
```

#### 消费多个 Context
&emsp;&emsp;为了确保 context 快速进行重渲染，React 需要使每一个 consumers 组件的 context 在组件树中成为一个单独的节点。
```javascript
import React, { Component } from 'react'

// 创建一个 User 的 Context，并且可以设定默认值(只有没有匹配到 Provider 时，默认值才会生效)
const UserContext = React.createContext({ name: 'tianzun', age: 25 })
// 创建一个 Theme 的 Context
const ThemeContext = React.createContext('light')

export default class APP extends Component {
  constructor(props){
    super(props)
  
    this.state = {
      user: { name: 'tianzun_test', age: 26 }
    }
  }
  
  onchang(user){
    this.setState({ user })
  }

  render () {
    // 使用定义的 Context 的 Provider 来将当前对于组件树为全局的对象传递给以下的 组件树
    // 如果不设置 value 的值，则使用定义时的默认值
    return <UserContext.Provider value={{ value: this.state.user, onchang: this.onchang.bind(this) }}>
      <ThemeContext.Provider value={'dark'}>
        <div style={{ fontSize: '0.16rem' }}>
          list test pages
          <Box />
        </div>
      </ThemeContext.Provider>
    </UserContext.Provider>
  }
}

// 中间组件无需再传递数据
const Box = props => {
  return <div>
    this is box.
    <User />
  </div>
}

const User = props => {
  // 使用不同 Context 的 Consumer 获取对应的 value
  return <UserContext.Consumer>
    {
      context => <ThemeContext.Consumer>
        {
          theme => <div>
            this is User module. 
            <p>{ context && `${context.value.name}: ${context.value.age}` }</p>
            <p>{ theme }</p>
          </div>
        }
      </ThemeContext.Consumer>
    }
  </UserContext.Consumer>
}
```

#### 注意事项
&emsp;&emsp;因为 context 会使用参考标识（reference identity）来决定何时进行渲染，这里可能会有一些陷阱，当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。  
&emsp;&emsp;举个例子，当每一次 Provider 重渲染时，以下的代码会重渲染所有下面的 consumers 组件，因为 value 属性总是被赋值为新的对象：
```javascript
class APP extends Component {
  render () {
    // 因为 value 接受的是匿名对象，因此每次父组件重新渲染时，Object.is 的算法会认为是不同的对象而导致在 consumers 组件中触发意外的渲染
    return <UserContext.Provider value={{ name: 'tianzun_test', age: 26 }}>
      <div style={{ fontSize: '0.16rem' }}>
        list test pages
        <Box />
      </div>
    </UserContext.Provider>
  }
}

// 解决方案就是将 value 的值复制给一个变量，最常见的方式就是放在 state 中
class APP extends Component {
  constructor(props){
    super(props)

    this.state = {
      user: { name: 'tianzun_test', age: 26 }
    }
  }
  render () {
    // 因为 value 接受的是匿名对象，因此每次父组件重新渲染时，Object.is 的算法会认为是不同的对象而导致在 consumers 组件中触发意外的渲染
    return <UserContext.Provider value={this.state.user}>
      <div style={{ fontSize: '0.16rem' }}>
        list test pages
        <Box />
      </div>
    </UserContext.Provider>
  }
}
```







<p align="right"> 2019年11月21日 </p>

[1]:https://wxiaosheng.github.io/perception-of-life/#/fore/full_stack/react/react_context?id=何时使用-context
[2]:https://wxiaosheng.github.io/perception-of-life/#/fore/full_stack/react/react_context?id=使用-context-之前的考虑
[3]:https://wxiaosheng.github.io/perception-of-life/#/fore/full_stack/react/react_context?id=api
[4]:https://wxiaosheng.github.io/perception-of-life/#/fore/full_stack/react/react_context?id=reactcreatecontext
[5]:https://wxiaosheng.github.io/perception-of-life/#/fore/full_stack/react/react_context?id=contextprovider
[6]:https://wxiaosheng.github.io/perception-of-life/#/fore/full_stack/react/react_context?id=classcontexttype
[7]:https://wxiaosheng.github.io/perception-of-life/#/fore/full_stack/react/react_context?id=contextconsumer
[8]:https://wxiaosheng.github.io/perception-of-life/#/fore/full_stack/react/react_context?id=contextdisplayname
[9]:https://wxiaosheng.github.io/perception-of-life/#/fore/full_stack/react/react_context?id=%e7%a4%ba%e4%be%8b
[10]:https://wxiaosheng.github.io/perception-of-life/#/fore/full_stack/react/react_context?id=%e4%bd%95%e6%97%b6%e4%bd%bf%e7%94%a8-context
[11]:https://wxiaosheng.github.io/perception-of-life/#/fore/full_stack/react/react_context?id=%e6%b6%88%e8%b4%b9%e5%a4%9a%e4%b8%aa-context
[12]:https://wxiaosheng.github.io/perception-of-life/#/fore/full_stack/react/react_context?id=%e6%b6%88%e8%b4%b9%e5%a4%9a%e4%b8%aa-context
[13]:https://wxiaosheng.github.io/perception-of-life/#/fore/full_stack/react/react_context?id=%e6%b3%a8%e6%84%8f%e4%ba%8b%e9%a1%b9
[14]:https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html
[15]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description
[16]:https://babeljs.io/docs/en/babel-plugin-proposal-class-properties