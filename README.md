# noteSwiper - 翻页轮播
### 针对性很强的插件，主要是给某个项目内使用，只是封装了个别的常用API供使用，功能并不多。
- 里面的动画大多是用CSS3写的，所以只兼容现代浏览器
- 基于jQuery
- 不要破坏下面的HTML结构，类名不可更改

# html结构
```
    <div class="swiperSwiper">
        <div class="swiper-box">
            <div class="swiper-alone">
                <img src="./src/img/1.jpg">
            </div>
            <div class="swiper-alone">
                <img src="./src/img/2.jpg">
            </div>
            <div class="swiper-alone">
                <img src="./src/img/3.jpg">
            </div>
            <div class="swiper-alone">
                <img src="./src/img/2.jpg">
            </div>
        </div>
        <div class="swiper-dots"></div>
    </div>
```

# 用法
需要引入index.js和src/css目录下的index.css，然后遵循html目录并设置几个常用参数即可
```
    new switchSwiper({
        autoPlay: true,
        zoom: 0.95,
        autoPlayTime: 3000
    });
```

# API
>   - autoPlay - boolean - 是否开启自动播放
>   - autoPlayTime - （number）毫秒 - 自动播放的时间间隔
>   - autoPlaySpeed - （number）毫秒 - 自动播放的图片移动速度，也指一般情况下图片的滚动速度
>   - indentation - （number）像素 - 图片的缩进尺寸
>   - zoom - （number）scale - 图片的缩放比例，最小0最大1，如设置为0.9则第二个元素的大小是0.9，第三个是0.8以此类推


# 预览地址：
>   - http://zytao.cc/demo/noteSwiper/
>   - <img src="./src/img/ewm.png">