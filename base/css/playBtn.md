### CSS3 + JS 实现音视频播放器播放按钮

首先来看一下效果：

![播放按钮效果](../../../images/playBtn.gif)

实现原理：  
使用一层 div 盒子，内置 5 个元素，分别代表 播放和暂停时的5根线，然后通过 animation 来制作动效。具体代码参照下方：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>播放按钮动效</title>
  <style>
    * { padding: 0; margin: 0; list-style: none; }
    .box {
      width: 500px;
      height: 300px;
      margin: 100px auto;
    }
    .btn {
      width: 50px;
      height: 50px;
      border: 2px solid #f86442;
      border-radius: 50%;
      background: #ffffff;
      margin: 100px auto;
      position: relative;
      overflow: hidden;
    }
    .playing > .line1 {
      animation: playing_1 0.5s ease-in-out;
    }
    .paused > .line1 {
      animation: paused_1 0.5s ease-in-out;
      top: -25px;
    }
    .playing > .line2 {
      animation: playing_2 0.5s ease-in-out;
    }
    .paused > .line2 {
      animation: paused_2 0.5s ease-in-out;
      top: -25px;
    }

    .playing > .line3 {
      animation: playing_3 0.5s ease-in-out;
      left: -10px;
    }
    .paused > .line3 {
      animation: paused_3 0.5s ease-in-out;
    }
    .playing > .line4 {
      animation: playing_4 0.5s ease-in-out;
      top: -10px;
      left: 48px;
    }
    .paused > .line4 {
      animation: paused_4 0.5s ease-in-out;
    }
    .playing > .line5 {
      animation: playing_5 0.5s ease-in-out;
      top: 40px;
      left: 48px;
    }
    .paused > .line5 {
      animation: paused_5 0.5s ease-in-out;
    }

    .line {
      position: absolute;
      border-radius: 10px;
      background: #f86442;
    }
    .line1 {
      top: 15px;
      left: 17px;
      width: 2px;
      height: 22px;
    }
    .line2 {
      top: 15px;
      right: 15px;
      width: 2px;
      height: 22px;
    }
    .line3 {
      top: 15px;
      left: 17px;
      width: 2px;
      height: 22px;
    }
    .line4 {
      top: 10px;
      left: 26px;
      width: 2px;
      height: 22px;
      transform-origin: center center;
      transform: rotate(-60deg);
    }
    .line5 {
      top: 20px;
      left: 26px;
      width: 2px;
      height: 22px;
      transform-origin: center center;
      transform: rotate(60deg);
    }

    @keyframes playing_1 {
      0% { top: -25px; }
      100% { top: 15px; }
    }
    @keyframes paused_1 {
      0% { top: 15px; }
      100% { top: -25px; }
    }
    @keyframes playing_2 {
      0% { top: 55px; }
      100% { top: 15px; }
    }
    @keyframes paused_2 {
      0% { top: 15px; }
      100% { top: 55px; }
    }
    @keyframes playing_3 {
      0% { left: 15px; }
      100% { left: -10px; }
    }
    @keyframes paused_3 {
      0% { left: -10px; }
      100% { left: 15px; }
    }
    @keyframes playing_4 {
      0% { top: 10px; left: 26px; transform-origin: center center; transform: rotate(-60deg); }
      100% { top: -16px; left: 58px; transform-origin: center center; transform: rotate(300deg); }
    }
    @keyframes paused_4 {
      0% { top: -16px; left: 58px; transform-origin: center center; transform: rotate(300deg); }
      100% { top: 10px; left: 26px; transform-origin: center center; transform: rotate(-60deg); }
    }
    @keyframes playing_5 {
      0% { top: 20px; left: 26px; transform-origin: center center; transform: rotate(60deg); }
      100% { top: 45px; left: 58px; transform-origin: center center; transform: rotate(-420deg); }
    }
    @keyframes paused_5 {
      0% { top: 40px; left: 58px; transform-origin: center center; transform: rotate(-420deg); }
      100% { top: 20px; left: 26px; transform-origin: center center; transform: rotate(60deg); }
    }
  </style>
</head>
<body>
  
  <div class="box">
    <div id='btn' class="btn paused" >
      <div class="line line1"></div>
      <div class="line line2"></div>
      <div class="line line3"></div>
      <div class="line line4"></div>
      <div class="line line5"></div>
    </div>
  </div>

  <script>
    let isPlay = false
    const btn = document.getElementById('btn')

    btn.onclick = () => {
      btn.className = isPlay ? 'btn paused' : 'btn playing'
      isPlay = !isPlay
    }

  </script>

</body>
</html>
```