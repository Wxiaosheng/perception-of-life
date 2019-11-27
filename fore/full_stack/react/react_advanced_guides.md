1. [高级指引](/fore/full_stack/react/react_advanced_guides?id=高级指引)
2. [Context](/fore/full_stack/react/react_context)




### 高级指引
#### 代码分割
##### 打包
&emsp;&emsp;打包是从一个文件开始，找到其所有有关的文件，并最终合并到一个文件中。  

##### 代码分割
&emsp;&emsp;将打包的结果分成多个包文件并在运行时动态加载。  
&emsp;&emsp;对应用进行代码分割能够帮助你"**懒加载**"当前用户所需要的内容，能够显著提高应用的性能。尽管并没有减少应用的整体的代码体积，但是**能够避免加载用户永远也用不到的代码，并在初始加载的时候减少所需的代码量**。  

##### import()
&emsp;&emsp;在应用中引入代码分割的最佳方式是通过动态 import() 语法。  
&emsp;&emsp;注意：  
&emsp;&emsp;&emsp;&emsp;1、动态 import() 语法目前只是一个 ECMAScript 提案，而不是正式的标准语法。  
&emsp;&emsp;&emsp;&emsp;2、如果使用 Create React App 该功能已经配置好，如果是自己搭建的 Webpack，则需要进行代码分割的配置。  
&emsp;&emsp;&emsp;&emsp;3、当使用babel时，要使用 babel-plugin-syntax-dynamic-import 插件 解析动态 import 语法，而不是对其进行转换。  

##### React.lazy
&emsp;&emsp;&emsp;&emsp;React.lazy 函数能让你像渲染常规组件一样处理动态引入(的组件)  
&emsp;&emsp;&emsp;&emsp;React.lazy 接受一个函数，该函数需要动态的调用 import()，它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件。  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;**const OtherComponent = React.lazy(() => import('./OtherComponent'))**  
&emsp;&emsp;此代码将**在组件首次渲染时，自动导入包含 OtherComponent 组件的包**。  
&emsp;&emsp;应在 Suspense 组件中渲染 lazy 组件，fallback 属性接受任何在组件加载过程中你想展现的 React 组件，如此使得在等待加载 lazy 组件时做优雅降级。  
&emsp;&emsp;Suspense 组件置于懒加载组件之上的任何位置，你甚至可以用一个 Suspense 组件包裹多个懒加载组件，通常我们一般放置在最外层即可。

##### 异常捕获边界
&emsp;&emsp;如果模块加载失败(网络问题)，它会触发一个错误。可以通过 **异常捕获边界(Errorboundaries)** 技术来处理这些情况，给用户以良好的体验。  
##### 基于路由的代码分割
&emsp;&emsp;决定在哪里引入代码分割需要一些技巧，因为需要确保选择的位置能够均匀地分割代码包而不会影响用户体验。一个不错的选择就是从路由开始，大多数网络用户习惯于页面之间能有个加载切换的过程。   








<p align="right"> 2019年11月27日 </p>