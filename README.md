# noteSwiper - 翻页轮播
### 这个插件针对性很强，主要是给某个项目内使用，只是封装了个别的常用API供使用，功能并不多。

# 用法
需要引入index.js和src/css目录下的index.css，然后遵循html目录并设置几个常用参数即可
```
    new switchSwiper({
        autoPlay: true,
        zoom: 0.95,
        autoPlayTime: 3000
    });
```

# html结构
```
    <div class="swiperSwiper">
        <div class="swiper-box" style="margin-left: 60px;">
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

# API
>   - autoPlay - 是否开启自动播放
>   - autoPlayTime - 自动播放的时间间隔
>   - autoPlaySpeed - 自动播放的图片移动速度，也指一般情况下图片的滚动速度
>   - indentation - 图片的缩进尺寸
>   - zoom - 图片的缩放比例，最小0最大1，如设置为0.9则第二个元素的大小是0.9，第三个是0.8以此类推


# 预览地址：
>   http://zytao.cc/demo/noteSwiper/