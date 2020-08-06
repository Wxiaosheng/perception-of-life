### 手写一个 React

React 其实要解决的问题有以下三个：
1. JSX 语法的解析
2. component
3. 虚拟DOM

现在我们就带着这些问题，一起来看一看

#### 搭建环境
##### 使用 webpack 搭建本地开发环境
1. 初始化本地项目 (新建一个文件夹)  
  `yarn init`

2. yarn 安装基础包  
  `yarn add webpack webpack-cli -D`

3. 为了开发体验，我们同时还需要配置 `babel` 以及 解析 jsx 的拆件
  `yarn add babel-loader @babel/core @babel/preset-env @babel/plugin-transform-react-jsx -D`

完整的 webpack 配置文件如下
```js
const path = require("path")

module.exports = {
  entry: "main.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "dist")
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-transform-react-jsx", { pragma: "MyReact.createElement" }]
            ]
          }
        }
      }
    ]
  }
}
```

#### 解析 JSX 语法
##### 首先创建 MyReact 
```js
export const MyReact = {
  createElement(type, attributes, ...children) {
    let element
    if (typeof type === 'string') {
      element = document.createElement(type)
    }
    // 处理 props
    for (let key in attributes) {
      if (key === "className") {
        element.setAttribute("class", attributes[key])
      } else {
        element.setAttribute(key, attributes[key])
      }
    }
    // 处理 children
    for (let child of children) {
      if (typeof child !== 'object' || Array.isArray(child)) {
        child = child.toString()
      }
      if (typeof child === 'string') {
        child = document.createTextNode(child)
      }
      element.appendChild(child)
    }
    return element
  }
}
```
在根目录下创建 `main.js`(需要与 package.json 保持一致)，如下所示
```js
// main.js
import { MyReact } from './MyReact'

const a = <div>
  <span>main</span>
</div>

console.log(a)
```
此时我们能看到解析的结果如下图所示：
![解析jsx](/blog/images/transform-jsx.png)

至此，我们就完成了对 jsx 语法的解析


#### 自定义组件
在 React 的开发过程中，我们通常使用的都是自定义组件，下面就给出自定义组件的实现方式
```js
// main.js
const { MyReact, Component } = require("./MyReact");

class MyComponent extends Component {
  render() {
    return <div>
      <span>MyComponent</span>
    </div>
  }
}
MyReact.render(<MyComponent />, document.body)

// MyReact.js 
class ElementWarpper {
  constructor(type) {
    this.type = type
    this.props = Object.create(null)
    this.children = []
  }
  setAttribute(name, value) {
    this.props[name] = value
  }
  appendChild(vChild) {
    this.children.push(vChild)
  }
  createElement() {
    let element = document.createElement(this.type)
    // 处理 props
    for (let key in this.props) {
      if (key === "className") {
        element.setAttribute("class", this.props[key])
      } else {
        element.setAttribute(key, this.props[key])
      }
    }
    // 处理 children
    for (let child of this.children) {
      if (typeof child !== 'object' || Array.isArray(child)) {
        child = child.toString()
      }
      if (typeof child === 'string') {
        child = new TextWarpper(child)
      }
      child.mountTo(element)
    }
    return element
  }
  mountTo(parent) {
    parent.appendChild(this.createElement())
  }
}

class TextWarpper {
  constructor(content) {
    this.type = "#text"
    this.props = Object.create(null)
    this.children = [content]
  }
  createElement() {
    return document.createTextNode(this.children[0])
  }
  mountTo(parent) {
    parent.appendChild(this.createElement())
  }
}

export class Component {
  constructor() {
    this.props = Object.create(null)
    this.children = []
  }
  get vdom() {
    return this.vdom
  }
  setAttribute(name, value) {
    this.props[name] = value
  }
  appendChild(vChild) {
    this.children.push(vChild)
  }
  mountTo(parent) {
    // 生成 新 vdom
    const vdom = this.render()
    console.log("Component mountTo", vdom)

    // 比较前后两次的 vdom 是否一致

    vdom.mountTo(parent)
    // 缓存当前的 vdom
    this.vdom = vdom
  }
}

export const MyReact = {
  createElement(type, attributes, ...children) {
    let element
    if (typeof type === 'function') {
      element = new type()
    }
    if (typeof type === 'string') {
      element = new ElementWarpper(type)
    }
    // 处理 props
    for (let key in attributes) {
      if (key === "className") {
        element.setAttribute("class", attributes[key])
      } else {
        element.setAttribute(key, attributes[key])
      }
    }
    // 处理 children
    for (let child of children) {
      if (typeof child !== 'object' || Array.isArray(child)) {
        child = child.toString()
      }
      if (typeof child === 'string') {
        child = new TextWarpper(child)
      }
      element.appendChild(child)
    }
    return element
  },
  render(vdom, root) {
    vdom.mountTo(root)
  }
}
```
结果如下图 所示：
![解析自定义组件](/blog/images/my-component.png)

!> 注意，如果自定义组件需要包裹子组件，那么在处理 children 的时候，需要递归的处理一下即可


#### 虚拟 DOM
如果你仔细看自定义组件的代码，可以发现，在 Component 的 mountTo 方法中，有一句注释，**比较前后两次的 vdom 是否一致**

这里实现的思路其实就是要将上次渲染的 vdom 缓存下来，当下次再次生成 vdom 时，将两次进行对比，找出其中的不同，即可实现精准的更新，这里就不提供具体的实现了，有兴趣可以自行实现下看看

