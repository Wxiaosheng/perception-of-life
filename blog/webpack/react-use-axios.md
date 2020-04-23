### 在 create-react-app 中使用 axios
> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

#### 特性
* 从浏览器中创建 XMLHttpRequests
* 从 node.js 创建 http 请求
* 支持 Promise API
* 拦截请求和响应
* 转换请求数据和响应数据
* 取消请求
* 自动转换 JSON 数据
* 客户端支持防御 XSRF

#### 安装
```
  yarn add axios
```

#### 使用
##### 创建 axios 实例
```ts
  import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

  const instance: AxiosInstance = axios.create({
    // 超时设置(单位毫秒),1分钟.
    timeout: 60 * 1000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true,
    // 响应的数据格式: json / blob /document /arraybuffer / text / stream
    responseType: "json",
  });

  // 请求拦截
  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // To-Do: 在发送请求之前做些什么
      return config;
    },
    (error: AxiosError) => {
      // To-Do: 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 响应拦截
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // To-Do: 对响应数据做点什么
      return data;
    },
    (error: AxiosError) => {
      // To-Do: 响应失败 - 跳转错误页面
      return Promise.reject(error);
    }
  );

  export default instance;
```
##### 通过创建的实例对象调用对应的API
```ts
  import {  AxiosResponse } from "axios";
  import instance from './instance'

  const getDate: (url: string) => Promise<AxiosResponse> = (url) => instance.get(url)

  export {
    getDate
  }
```

#### 配置接口代理
1. 在 package.json 中，新增 proxy 选项 
```json
  "proxy": {
    "/api-dev": {
      "target": "http://www.targetdomain.com",
      "secure": true,
      "changeOrigin": true,
      "pathRewrite": {
        "^/api-dev": ""
      }
    }
  }
```

!> 如果本地服务报错，如下  
hen specified, "proxy" in package.json must be a string.  
Instead, the type of "proxy" was "object".  
Either remove "proxy" from package.json, or make it a string.  
则使用， "proxy": "http://www.targetdomain.com"

2. 开启本地服务以后，如果访问页面出现 **Invalid Host header** 提示，原因是新版的 webpack-dev-server 出于安全考虑，默认检查 hostname，如果 hostname 不是配置内的就不能访问。这样有2中方法，一种是设置跳过host检查，一种是直接 host 设置成你的地址。  

  * 关闭host检查，devServer 下添加/修改 disableHostCheck: true，跳过检查
  * 设置host，devServer 中的 host默认值为 `0.0.0.0`，可以修改成自己的 host

