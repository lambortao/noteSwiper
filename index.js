var switchSwiper = function (options) {
    // 获取元素
    this.el = options.el || $('.swiperSwiper');
    // 获取需要操作的子元素
    this.sonEvent = this.el.children('.swiper-box').children('.swiper-alone');
    // 计算子元素的数量
    this.sonEventNum = this.sonEvent.length;
    // 是否开启自动滚播
    this.autoPlay = options.autoPlay && true;
    // 自动滚播的播放间隔时间
    this.autoPlayTime = options.autoPlayTime || 2000;
    // 图片切换的速度
    this.autoPlaySpeed = options.autoPlaySpeed || 500;
    // 后续图片缩进尺寸
    this.indentation = options.indentation || 30;
    // 是否显示导航点
    this.dots = false;
    // 后续图片缩放比例，精确到小数点后两位
    this.zoom = function() {
        var zoom = options.zoom || 0.9,
            num = 100 - (zoom * 100);

        return num / 100;
    }

    // 初始的css设置
    this.settingCss = function() {
        // 根据排列设置z-index和缩进
        for(let i = 1; i < (this.sonEventNum + 1); i++){
            // 计算并设置缩放和缩进
            var scaleNum = 1 - ((i - 1) * this.zoom()),
                translateXNum = (i - 1) * this.indentation;

            this.sonEvent.eq(this.sonEventNum - i).css({'z-index': i});
            this.sonEvent.eq(i - 1).css({'transform': 'scale('+scaleNum+') translateX('+translateXNum+'px)'});
        }
        // 设置动画的执行时间
        this.sonEvent.css('transition', 'all '+ this.autoPlaySpeed +'ms ease');
    }

    // 向左切换
    this.theLeft = function() {
        // 先把第一个元素做出场动画
        this.sonEvent = this.el.children('.swiper-box').children('.swiper-alone');
        this.sonEvent.eq(0).css({
            'transform': 'translateX(-200px)',
            'opacity': 0
        });
        // 然后做剩下元素的动画
        for(let i = 0;i < this.sonEventNum;i ++) {
            var scaleNum = 1 - (i * this.zoom()),
                translateXNum = i * this.indentation;

            this.sonEvent.eq(i).css({'z-index': (this.sonEventNum - i + 1)});
            this.sonEvent.eq(i + 1).css({'transform': 'scale('+scaleNum+') translateX('+translateXNum+'px)'});
        }

        // 计算出动画后最后一个元素应该在的位置
        var lastScaleNum = 1 - ((this.sonEventNum - 1) * this.zoom()),
            lastTranslateXNum = (this.sonEventNum - 1) * this.indentation;

        // 然后再克隆第一个元素，将元素置于最后
        var lastEvent = this.sonEvent.eq(0).clone();
        lastEvent.appendTo('.swiper-box');
        lastEvent.css({
            'z-index': '1',
            'transform': 'scale('+lastScaleNum+') translateX('+lastTranslateXNum+'px)',
            'opacity': '1'
        });

        // 最后在动画结束之后删除第一个元素
        var than = this;
        setTimeout(function() {
            than.sonEvent.eq(0).remove();
        }, this.autoPlaySpeed);
    }

    // 向右切换
    this.theRight = function() {

    }
    
    // 自动轮播
    this.autoPlayFun = function() {
        if(this.autoPlay){
            let than = this;
            (function swiperPlay() {
                setTimeout(function(){
                    than.theLeft();
                    swiperPlay();
                }, than.autoPlayTime);
            })();
        }
    }

    // 运行初始函数
    this.init = function(){
        this.settingCss();
        this.autoPlayFun();
    }

    this.init();
}