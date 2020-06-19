### XSS 攻击

XSS，Cross Site Script 跨站脚本。  

XSS攻击 通常指的是通过利用网页开发时留下的漏洞，通过巧妙的方法注入恶意指令代码到网页，使用户加载并执行攻击者恶意制造的网页程序。

* 攻击者： 黑客
* 受害者： 目标网站的用户浏览器
* 攻击方法： 脚本
* 目的： 就是想尽一切方法，将一段脚本内容放到目标网站的目标浏览器上解释执行 !!!


#### 类型
##### 反射型
> 发出请求时，XSS代码出现在URL中，作为输入提交到服务器，服务器解释后相应，在响应内容中出现这段XSS代码，最后由浏览器解释执行！  

> 简单的说，就是通过访问 URL 的方式，发起攻击。

例如，之前遇见的子站的 URL 跳转中，return_url 中加入了一段脚本 `<ScRiPt>alert(document.cookie)</ScRiPt>`，在跳转改 URL 时，会自动将页面的 cookie 弹出，链接如下(经过转义)
    
    http://xxx.xxxx.xxx/site/data/prepare_order/?content_type=album&content_id=23519836&return_url=http://baidu.com%27%3E%3CScRiPt%3Ealert(document.cookie)%3C/ScRiPt%3E`

##### 存储型
存储型XSS和反射型XSS的区别：
提交的XSS代码会存储在服务器上，下次请求目标页面的时候不需要再次提交XSS代码！！
存储的位置可以是数据库、内存、文件系统等。