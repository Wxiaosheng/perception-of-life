
#### @babel/polyfill
本质上@babel/polyfill是core-js库的别名，包含了  regenerator 和 core-js 两个库。  

随着 core-js@3 的更新，@babel/polyfill 无法从2过渡到3，因此 @babel/polyfill 已经被放弃。  

##### 安装
> 因为 polyfill 是在源代码之前运行，所以我们需要它是一个依赖项，而不是devDependency

```bash
  npm install @babel/polyfill --save
```