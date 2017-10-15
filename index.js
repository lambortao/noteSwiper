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
        return (100 - ((options.zoom || 0.9) * 100)) / 100;
    }

    var clearAutoPlay;

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

    // 监听动画结束 - 辅助性函数
    this.animateEnd = function (event, fun) {
        function transitionSonEnd() {
            fun();
            event.off('transitionend',transitionSonEnd);
        }
        event.on('transitionend',transitionSonEnd);
    }

    // 根据排列计算位置 - 辅助性函数
    this.countScale = function(num) {
        return 1 - (num * this.zoom());
    }
    this.countTranslateX = function(num) {
        return num * this.indentation;
    }
    
    // 获取手指拖动切换的阈值
    this.moveValue = function() {
        return (parseInt(this.sonEvent.css('width')) / 2);
    }

    // 向左切换
    this.theLeft = function() {
        // 初始更新一下DOM列表，然后把第一个元素做出场动画
        this.sonEventNew = this.el.children('.swiper-box').children('.swiper-alone');
        this.sonEventNew.eq(0).css({'transform': 'translateX(-200px)','opacity': 0});

        // 然后做剩下元素的动画
        for(let i = 0;i < this.sonEventNum;i ++) {
            var scaleNum = 1 - (i * this.zoom()),
                translateXNum = i * this.indentation;

            this.sonEventNew.eq(i).css({'z-index': (this.sonEventNum - i + 1)});
            this.sonEventNew.eq(i + 1).css({'transform': 'scale('+scaleNum+') translateX('+translateXNum+'px)'});
        }

        // 计算出动画后最后一个元素应该在的位置
        var lastScaleNum = 1 - ((this.sonEventNum - 1) * this.zoom()),
            lastTranslateXNum = (this.sonEventNum - 1) * this.indentation;

        // 然后再克隆第一个元素，将元素置于最后
        var lastEvent = this.sonEventNew.eq(0).clone();
        lastEvent.appendTo('.swiper-box');
        lastEvent.css({'z-index': '1','transform': 'scale('+lastScaleNum+') translateX('+lastTranslateXNum+'px)','opacity': '1'});

        // 最后在动画结束之后删除第一个元素
        var than = this;
        setTimeout(function() {
            than.sonEventNew.eq(0).remove();
        }, this.autoPlaySpeed);
    }

    // 向右切换
    this.theRight = function() {
        // 初始更新一下DOM列表，然后克隆最后出最后一个子元素
        this.sonEventNew = this.el.children('.swiper-box').children('.swiper-alone');
        var lastEvent = this.sonEventNew.eq(this.sonEventNum - 1);
        this.lastEventClone = lastEvent.clone();

        // 监听最后一个元素消失后就删除
        lastEvent.css('opacity', '0');
        this.animateEnd(lastEvent, function() {
            lastEvent.remove();
        });

        // 将其他的元素向后移动一位
        for(let i = 0;i < (this.sonEventNum);i ++) {
            // 计算位置
            var scaleNum = 1 - ((i + 1) * this.zoom()),
                translateXNum = (i + 1) * this.indentation;

            this.sonEventNew.eq(i).css({'transform': 'scale('+scaleNum+') translateX('+translateXNum+'px)', 'z-index': (this.sonEventNum - i - 1)});
        }

        // 将初始时克隆的元素放到首位并出现
        this.lastEventClone.css({'transform': 'translateX(-200px)','opacity': 0, 'z-index': this.sonEventNum});
        this.lastEventClone.prependTo('.swiper-box');
        this.lastEventClone.css({'transform': 'translateX(0)','opacity': 1});
    }
    
    // 手动切换
    this.manualSelect = function() {
        var touchMain = document.querySelector('.swiper-box'),
            moveEvent,
            startX,moveX,endX,
            than = this,
            moveDistance;

        function touchs(e) {
            var touch = e.touches[0];
            startX = Math.floor(touch.pageX);
            // console.log('touchstart = ' + startX);

            // 鼠标按住的时候获取当前的第一个元素，并取消延迟
            moveEvent = $('.swiper-box').children('.swiper-alone').eq(0);
            moveEvent.css('transition', 'none');
            // 鼠标按住的时候停止自动播放
            window.clearTimeout(clearAutoPlay);
        }

        function touchm(e) {
            var touch = e.touches[0];
            moveX = Math.floor(touch.pageX);

            // 计算手指拖动的距离，并设置给第一个子元素
            moveDistance = moveX - startX;
            moveEvent.css('transform', 'translateX('+ moveDistance +'px)');
        }

        function touche(e) {
            var touche = e.changedTouches[0];
            endX = Math.floor(touche.pageX);
            moveEvent.css('transition', 'all '+ than.autoPlaySpeed +'ms ease');
            // console.log('touchend = ' + endX);
            
            // 手指离开屏幕的时候计算当前的位置
            
            if(moveDistance >= 120){
                than.theRight();
            }else if(moveDistance <= -120){
                than.theLeft();
            }else{
                moveEvent.css('transform', 'translateX(0px)');  
            }
            // 手指离开屏幕的时候开启自动播放
            than.autoPlayFun();
        }

        touchMain.addEventListener('touchstart', touchs, false);
        touchMain.addEventListener('touchmove', touchm, false);
        touchMain.addEventListener('touchend', touche, false);
    }

    // 自动轮播
    this.autoPlayFun = function() {
        if(this.autoPlay){
            let than = this;
            (function swiperPlay() {
                clearAutoPlay = window.setTimeout(function(){
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
        this.manualSelect();
    }

    this.init();
}