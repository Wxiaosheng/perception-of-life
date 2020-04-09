### H5 唤醒APP

&emsp;&emsp;H5 是一种跨平台、能快速传播 并且 易于迭代的web页面。  

通常来说，它有以下几个作用：  
  1. **传播效应**，一般是为品牌进行宣传，让更多的人知道和了解这个品牌
  2. **品牌推广**，形式一般是小游戏，抽奖，或者邀请函，活动介绍等
  3. **商品展示**，一般是展示商家的产品，特别突出产品的某些好处，吸引人们的眼球  


&emsp;&emsp;在企业发展的过程中，经常使用 H5 页面进行宣传、或者做内容的分享。在这个过程中，常常需要页面有一个引流的功能。那么什么是引流呢？  
&emsp;&emsp;这里简单的下一个定义，就是在H5页面通过点击页面的某一个按钮，**引导已下载APP的用户打开APP，引导未下载APP的用户下载APP**。


#### 实现原理
##### URL Scheme
> 应用间的通信方式

&emsp;&emsp;互相无关应用间的通信，通常来说可以通过应用所在的宿主环境（Android）来实现间接的通信，如：  
应用A 可以通过系统判断应用B是否安装，或者直接打开已经安装过 应用B，同时，还可以通过 **URL Scheme** 的方式进行应用间的通信。  
&emsp;&emsp;在 IOS 中，使用了名为 **沙盒** 的机制：**应用只能访问它声明可能访问的资源**。  
&emsp;&emsp;也就阻碍了应用间合理的信息共享，某种程度上限制了应用的能力。因此，我们急需要一个辅助工具来帮助我们实现应用通信， **URL Scheme** 就是这个工具。

&emsp;&emsp;下面来看看，URL Scheme 的组成方式：
```txt
  [scheme:][//authority][path][?query][#fragment]

  例如微信的 URL Scheme，weixin://

  可以与微信官网的地址类比下：
      weixin://
      https://weixin.qq.com/
  由此发现，可以将 URL Scheme 看成开发者自定义的一种协议
  ```
因此，当我们想通过H5打开原生应用时，就可以像直接通过页面跳转的方式访问对应应用的 **URL Scheme**  


#### 实现方式
##### iframe
&emsp;&emsp;通过动态的生成 iframe 标签，设置 src 属性，一段时间后移除该DOM节点
```javascript
  const tryCallAPPByIframe = (URLScheme) => {
    const iframe = document.createElement('iframe')
    const body = document.body
    iframe.src = URLScheme
    body.appendChild(iframe)

    setTimeout(() => {
      document.body.removeChild(iframe)
    }, 3000)
  }
```

##### window.location.href
&emsp;&emsp;通过window.location.href跳转 URL Scheme 地址
```javascript
  const tryCallAPP = (URLScheme) => {
    window.location.href = URLScheme
  }
```

##### Universal Link
&emsp;&emsp;**Universal Link** 是苹果在 WWDC2015 上为 iOS9 引入的新功能，通过传统的 HTTP 链接即可打开 APP。如果用户未安装 APP，则会跳转到该链接所对应的页面  

&emsp;&emsp;**Universal Link** 的意义则是把普通url，也赋予了能打开App的能力，而不必编写专门的 **Schema Url** 去唤起App，也就是说Universal Link的表现形式其实就是一个普通的url，例如知乎的Universal Link是“https://oia.zhihu.com”  

&emsp;&emsp;**Universal Link** 的开发是原生应用该实现的功能，H5只是负责调用

#### 兼容性问题
##### IOS 系统
&emsp;&emsp;1、 在IOS系统中，Safari做了安全控制，通过 iframe 无法使用 URL Scheme 协议唤醒 APP  
&emsp;&emsp;2、 在IOS系统中，如果未安装 APP，通过 **URL Scheme** 协议唤醒 APP，会弹出 “Safari 打不开网页，因为网页无效” ，体验很差  
&emsp;&emsp;3、 在IOS系统中，微信[屏蔽](https://juejin.im/post/5a5371626fb9a01cb64ea37d)了 **URL Scheme** 协议唤醒 APP，也屏蔽了 **Universal Link** 链接唤醒 APP  
&emsp;&emsp;4、 在IOS系统中，微信能唤醒 APP 的应用都是加入了微信的白名单，未加入白名单一律无法唤醒  

##### Android 系统
&emsp;&emsp;1、 在Android系统中，高版本 chrome 浏览器已经不支持 **URL Scheme** 协议唤醒 APP，需要使用 [intent 跳转](https://developer.chrome.com/multidevice/android/intents)  
&emsp;&emsp;2、 在Android系统中，微信屏蔽了 **URL Scheme** 协议唤醒 APP，因此需要直接跳转腾讯应用宝APP对应的页面 
&emsp;&emsp;3、在 QQ 中，使用 window.location.href 唤醒无效， 需要使用 top.location 


最后，奉上一份参考代码：
```javascript
  const tryCallAPP = (URLScheme) => {
    // 在 IOS 中，通过 window.location.href 唤醒APP
    if (env.isIOS) {
      if (env.isWeiXin) { // 微信无法唤醒APP，因此跳转下载页面，并提示 Safari 中打开(这样既能下载APP，也能唤醒APP)
        return window.location.href = 'https://www.xxx.com/down'
      } else {
        return window.location.href = URLScheme
      }
    }

    if (env.isAndroid) {
      if (env.isWeiXin) { // 微信无法唤醒APP，因此跳转腾讯应用宝页面
        return window.location.href = 'xxxxxxx'
      } else {
        // Android 中 可以通过 iframe 的方式 唤醒APP
        tryCallAPPByIframe(URLScheme)
      }
    }

    // 由于H5无法判断是否已唤醒 APP，因此采取间接的方式判断是否唤醒 APP
    setTimeout(() => {
      window.location.href = 'https://www.xxx.com/down' // 2秒内未唤醒APP，则跳转下载APP
    }, 2000)
  }
```


#### 其他方法唤醒微信
##### 跳转原理分析

从手机浏览器等非微信环境，跳转到微信，都是利用 weixin://dl/business/?ticket=ta428dhj739hg3efe6e  这种形式的微信 scheme。 
就是利用微信提供给这些商家的接口，把我们的链接转换成对应的 ticket 链接。  

在哪儿可以找到微信跳转的接口呢？我们分析跳转链接后，发现了接口的出处。 

接口地址： http://www.seoniao.com

到网站上可以申请到微信跳转接口，然后直接调用他们提供的接口，就可以把我们的链接转换成对应的微信跳转链接了，微信跳转 wap 跳转微信接口。



<p align="right"> 2020年4月9日 </p>