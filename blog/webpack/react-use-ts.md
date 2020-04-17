### 在 create-react-app 中使用 TypeScript
create-react-app [官方给出了两种的方法配置 typescript](https://www.html.cn/create-react-app/docs/adding-typescript/) 

#### 1、使用 TypeScript 启动新的 Create React App 项目
```
  yarn create react-app my-app --typescript
```

#### 2.、要将 TypeScript 添加到 Create React App 项目
```
  yarn add typescript @types/node @types/react @types/react-dom @types/jest
```
!> 官方文档中说会自动生成 tsconfig.js文件，但是亲测发现并不会自动生成该文件(未eject时也不能生成)，需要自己手动加入



