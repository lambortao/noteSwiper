var switchSwiper = function (options) {
    // 获取元素
    this.el = options.el || $('.swiperSwiper');
    // 是否开启自动滚播
    this.autoPlay = options.autoPlay && true;
    // 自动滚播的播放间隔时间
    this.autoPlayTime = options.autoPlayTime || 2000;
    // 图片切换的速度
    this.autoPlaySpeed = options.autoPlaySpeed || 2000;
    // 后续图片缩进尺寸
    this.indentation = options.indentation || 30;
    // 是否显示导航点
    this.dots = false;
    // 后续图片缩放比例，精确到小数点后两位
    this.zoom = function() {
        var zoom = options.zoom || 0.9;
        var num = 100 - (zoom * 100);
        return num / 100;
    }

    // 初始的css设置
    this.settingCss = function() {
        // 根据排列设置z-index和缩进
        var sonEvent = this.el.children('.swiper-box').children('.swiper-alone');
        var sonLength = sonEvent.length;
        var zoomNum = this.zoom();
        for(let i = 1; i < (sonLength + 1); i++){
            // 计算缩放比和缩进
            var scaleNum = 1 - ((i - 1) * zoomNum);
            sonEvent.eq(sonLength - i).css({
                'z-index': i
            });
            sonEvent.eq(i - 1).css({
                'transform': 'scale('+scaleNum+') translateX('+((i - 1) * this.indentation)+'px)'
            });
        }
    }

    // 向左切换
    this.theLeft = function() {
        
    }

    // 向右切换
    this.theRight = function() {

    }

    // 运行初始函数
    this.init = function(){
        this.settingCss();
    }

    this.init();
}