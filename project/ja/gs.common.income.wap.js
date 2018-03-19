(function ($) {
    var u = navigator.userAgent,
        isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        idtImg = {
            width:'0.48rem',
            height:'0.27rem',
            src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAbCAMAAAANt/xAAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACoUExURf////T09f///15eXvX19vLy8/Ly8yYmJvLy8vLy83l5eXR0dEZGRpiYmCIiIigoKOHh4dPT00VFRVpaWi0tLTIyMk5OTmVlZS8vL2xsbMPDw/Ly8/T09fLy8zg4OGlpaXd3dz09PUBAQEBAQFtbW6SkpPLy8////4qKivLy8/7+/srKyqioqLW1tdDQ0FBQUImJifLy8/Ly86qqqvLy8/Ly805OToyMjFMYeZsAAAA4dFJOUxpCdnY+ZjBwdjZ2M0p2dml2dks/Y112OHZ2dgNJJ1c3MVF2UD4nZRssZBsfdnYfQ3ZHRSVERkUrLeoB/gAAASJJREFUOMuVlOl2gkAMhdOxNlMFFGRfRBZbrVbt/v5v1hEcHYblOPcHJwl8J7kBBqLkSUFJBJ/xg4Lib3h5BQW9bWEspAcNNfH2X+YBNGvjBvB7ou5KyLN94E1HNPD6gJ1P3pe3NHXJZDEdsUsb0LBWSC/BeQwnpD4iA6rKciUCSCWxMUqXkHNI6krdmwMG0bEhDQ62OTewrwMDLGmDxYkER4AeD22APRg6oACkTu5Xo/CR6kX0A2xFHYsY7ICyhjsIL6eSXYoeJGfctjiPaYvAYkLcTRu42kU05zMRsHSar7sA3taWgGt+J/Dlk32mAlh6h4UhD0irr6AN3JZEGoCW+ymodID1ruuPL4yCh6U9O14A5VPjI35UUPwDUfKsoCT6B709HMV3l+HeAAAAAElFTkSuQmCC'
        };
    function isAFsup() {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    }
    isAFsup();
    function gsCountAnalysis(jcsrc) {
        var gscaDom = '';
        gscaDom = '<div style="display:none"><img src="'+jcsrc+'"></div>';
        return gscaDom;
    }
    function createTg(tgval) {
        var tgDom = '';
        tgDom = '<span style="display:block;position:absolute;right:.1rem;top:.1rem;padding:0;width:.5rem;height:.25rem;line-height:.25rem;background-color:rgba(0,0,0,.1);border:1px solid rgba(255,255,255,.2);font-size:.2rem;color:rgba(255,255,255,.2);text-align:center;">'+tgval[0]+'</span>';
        return tgDom;
    }
    function createTg2(tgval) {
        var tgDom = '';
        tgDom = '<img style="display:block;position:absolute;left:0;bottom:0;padding:0;width:'+idtImg.width+';height:'+idtImg.height+';" src="'+idtImg.src+'">';
        return tgDom;
    }
    function fakeAlink(url) {
        var aDom = '',rm = new Date().getTime() + Math.floor(Math.random()*1000),aid = 'fakeAlink'+rm;
        aDom += '<a id="'+aid+'" target="_blank" style="display: none;" href="'+url+'"></a>';
        $('body').append(aDom);
        var fakebtn = document.getElementById(aid);
        fakebtn.click();
    }
    var bnu = navigator.userAgent;
    var browser = {
        isAndroid: function () {
            return !!bnu.match(/Android/i);
        },
        isWx: function () {
            return !!bnu.match(/micromessenger/i);
        },
        isBaiduBrowser: function () {
            return !!bnu.match(/baidubrowser/i);
        },
        isUCBrowser: function () {
            return !!bnu.match(/UCBrowser/i);
        },
        isQQBrowser: function () {
            return !!bnu.match(/QQBrowser/i);
        },
        isPcBrowser: function () {
            return !/Android|webOS|iPhone|iPod|BlackBerry/i.test(bnu);
        }
    };
    gsIncomeWap.prototype.gsCountSiteInner = function(gsid) {
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://click.gamersky.com/Common/GetWapHits.aspx",
            data: {
                id: gsid,
                script: "3"
            },
            success: function (data) {}
        });
    };
    function gsIncomeWap() {}
    gsIncomeWap.prototype.base=function (options) {
        var tgDom = '',
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '',tgTag = '';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        tgTag += createTg2(options.tg);
        tgDom += '<div style="position: relative;width: 100%;"><a style="display: block;" href="' + tgUrl + '" data-itemid="' + tgCount + '" class="countHit countHitSql"><img style="display: block;width: 100%;" src="' + tgImg + '"/>'+tgTag+'</a>'+jcCodeDom+'</div>';
        var ldImage = new Image();
        ldImage.src = tgImg;
        ldImage.onload = function () {
            $(options.tar).html(tgDom);
        }
    };
    gsIncomeWap.prototype.fixedBot=function (options) {
        var tgDom = '',
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '',tgTag = '';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        tgTag += createTg2(options.tg);
        var sty1 = 'position: fixed;bottom: 0;left: 0;z-index: 99992;width: 100%;height: auto;box-shadow: 0 0 8px rgba(0,0,0,.5);',
            sty2 = 'position: absolute;top: 0;right: 0;width: 35px;height: 36px;background:url(http://image.gamersky.com/webimg13/wap/2016/icons-adsclose.png) 0 0 no-repeat;background-size: 35px 36px;';
        tgDom += '<div style="'+sty1+'" id="ymwAdBottom2017"><a style="display: block;" href="' + tgUrl + '" data-itemid="' + tgCount + '" class="countHit countHitSql"><img style="display: block;width: 100%;" src="' + tgImg + '"/>'+tgTag+'</a><a style="'+sty2+'" onClick="this.parentNode.parentNode.removeChild(this.parentNode);"></a>'+jcCodeDom+'</div>';

        function sbUc() {
            var $fad = $('#ymwAdBottom2017'),fadW = $fad.width(),fadH = $fad.height(),ww = $(window).width();
            if (fadW/fadH <= 4/3) {
                $fad.hide();
            }
            if(ww>720){
                ww = 720;
            }
            $fad.css({
                'width':ww + 'px',
                'left':'50%',
                'marginLeft': - ww/2 + 'px'
            });
        }

        var ldImage = new Image();
        ldImage.src = tgImg;
        ldImage.onload = function () {
            function timeoutad() {
                var t;
                t= setTimeout(sbUc, 100);
            }
            timeoutad();
            $(window).resize(sbUc).scroll(sbUc).trigger("scroll");
            $('body').append(tgDom);
        };
    };
    gsIncomeWap.prototype.fixedTop=function (options) {
        var tgDom = '',
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '',tgTag = '';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        tgTag += createTg2(options.tg);
        var sty1 = 'position: fixed;top: 0;left: 0;z-index: 99992;width: 100%;height: auto;box-shadow: 0 0 8px rgba(0,0,0,.5);',
            sty2 = 'position: absolute;top: 0;right: 0;width: 35px;height: 36px;background:url(http://image.gamersky.com/webimg13/wap/2016/icons-adsclose.png) 0 0 no-repeat;background-size: 35px 36px;';
        tgDom += '<div id="gsIncomeWapfixedTopHolder" style="margin: 0 auto;width: 100%;height: auto;"><img style="display: block;width: 100%;opacity: 0;" src="' + tgImg + '"/></div><div style="'+sty1+'" id="gsIncomeWapfixedTop"><a style="display: block;" href="' + tgUrl + '" data-itemid="' + tgCount + '" class="countHit countHitSql"><img style="display: block;width: 100%;" src="' + tgImg + '"/>'+tgTag+'</a><a style="'+sty2+'" id="gsIncomeWapfixedTopClose"></a>'+jcCodeDom+'</div>';

        function sbUc() {
            var $fad = $('#gsIncomeWapfixedTop'),fadW = $fad.width(),fadH = $fad.height(),ww = $(window).width(),$fadHolder = $('#gsIncomeWapfixedTopHolder');
            if (fadW/fadH <= 4/3) {
                $fad.hide();
            }
            if(ww>720){
                ww = 720;
            }
            $fadHolder.css({
                'width':ww + 'px'
            });
            $fad.css({
                'width':ww + 'px',
                'left':'50%',
                'marginLeft': - ww/2 + 'px'
            });
        }

        function addAds() {
            var ldImage = new Image();
            ldImage.src = tgImg;
            ldImage.onload = function () {
                function timeoutad() {
                    var t;
                    t= setTimeout(sbUc, 100);
                }
                timeoutad();
                $(window).resize(sbUc).scroll(sbUc).trigger("scroll");
                $(options.tar).html(tgDom);
                $('#gsIncomeWapfixedTopClose').on('click',function () {
                    $('#gsIncomeWapfixedTopHolder').remove();
                    $('#gsIncomeWapfixedTop').remove();
                });
            };
        }
        if($('.ymwTabNavFixed').length<1&&$('#gsKuListNav').length<1){
            addAds();
        }
    };
    gsIncomeWap.prototype.listFour=function (options) {
        var tgDom = '',
            tgTag= options.tag,
            tgTit = options.tit,
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        tgDom += '<li><img src="' + tgImg + '"><h5>';
        if(tgTag){
            tgDom += '<strong>'+tgTag+'</strong><span>|</span>';
        }
        tgDom += tgTit;
        tgDom += '</h5><p><span class="tg">广告</span></p><a href="' + tgUrl + '" data-itemid="' + tgCount + '" class="countHit countHitSql"></a>'+jcCodeDom+'</li>';
        var ldImage = new Image();
        ldImage.src = tgImg;
        ldImage.onload = function () {
            $(options.tar).html(tgDom);
        }
    };
    gsIncomeWap.prototype.picTit1=function (options) {
        var tgDom = '',
            tgTit = options.tit,
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        tgDom += '<a class="ymwAds-tg countHit countHitSql" data-itemid="' + tgCount + '" href="' + tgUrl + '"><img src="' + tgImg + '" alt="' + tgTit + '"><span>广告</span><p>' + tgTit + '</p></a>'+jcCodeDom;
        var ldImage = new Image();
        ldImage.src = tgImg;
        ldImage.onload = function () {
            $(options.tar).html(tgDom);
        }
    };
    gsIncomeWap.prototype.picTit2=function (options) {
        var tgDom = '',
            tgTit = options.tit,
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        tgDom += '<a class="ymwAds-tg2 countHit countHitSql" data-itemid="' + tgCount + '" href="' + tgUrl + '"><img src="' + tgImg + '" alt="' + tgTit + '"><span>广告</span><p>' + tgTit + '</p></a>'+jcCodeDom;
        var ldImage = new Image();
        ldImage.src = tgImg;
        ldImage.onload = function () {
            $(options.tar).html(tgDom);
        }
    };
    gsIncomeWap.prototype.ConList=function (options) {
        var ggDom = '',
            tgTit = options.tit,
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            tgTit2 = options.tit2,
            tgImg2 = options.src2,
            tgUrl2 = options.android2.url,
            tgCount2 = options.android2.countId,
            jcCodeDom = '',innerStyle='';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
            tgUrl2 = options.ios2.url;
            tgCount2 = options.ios2.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }

        if (options.gg1display === true && options.gg2display === true){
            innerStyle = 'style="margin-bottom:1px"';
        }

        if (options.gg1display === true){
            ggDom += '<a href="' + tgUrl + '" data-itemid="' + tgCount + '" class="ymwAds-tg2 countHit countHitSql" '+innerStyle+'><img src="' + tgImg + '" alt="'+tgTit+'"><span>广告</span><p>' + tgTit + '</p></a>';
        }
        if(options.gg2display === true){
            ggDom += '<a href="' + tgUrl2 + '" data-itemid="' + tgCount2 + '" class="ymwAds-tg2 countHit countHitSql" '+innerStyle+'><img src="' + tgImg2 + '" alt="'+tgTit2+'"><span>广告</span><p>' + tgTit2 + '</p></a>';
        }
        ggDom += jcCodeDom;

        $(options.tar).html(ggDom);
    };
    gsIncomeWap.prototype.CommBot=function (options) {
        var tgDom = '',
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount = options.android.countId,
            jcCodeDom = '',tgTag = '';
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount = options.ios.countId;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        tgTag += createTg2(options.tg);
        //判断是否是游戏库，添加游戏库样式
        if($('.gs_zp_wrap').length>0){
            tgDom += '<a style="position:relative;display: block;margin-bottom:0.3rem" ';
        }else{
            tgDom += '<a style="position:relative;display: block;margin: 0 12px;background-color: #fff;" ';
        }
        tgDom += 'href="' + tgUrl + '" data-itemid="' + tgCount + '" class="countHit countHitSql"><img style="display: block;width: 100%;" src="' + tgImg + '">'+tgTag+'</a>'+jcCodeDom;
        var ldImage = new Image();
        ldImage.src = tgImg;
        ldImage.onload = function () {
            $(options.tar).html(tgDom);
        }
    };
    gsIncomeWap.prototype.downBtn=function (options) {
        var tgDom = '',
            tgTxt = options.txt,
            tgUrl = options.url,
            tgCount = options.countId,
            isOld = options.isOld,
            jcCodeDom = '';
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        if(isOld === true){
            tgDom += '<div class="Pd3"><a id="download';
        }else{
            tgDom += '<div class="yu-btn-wrap"><a id="dow';
        }
        tgDom += '" href="' + tgUrl + '" data-itemid="' + tgCount + '" class="countHit countHitSql">'+tgTxt+'</a>'+jcCodeDom+'</div>';
        $(options.tar).html(tgDom);
    };
    gsIncomeWap.prototype.lkV2=function (options) {
        var tgDom = '',
            tgImg = options.src,
            tgUrl = options.android.url,
            tgCount1 = options.android.countId1,
            tgCount2 = options.android.countId2,
            tgCount3 = options.android.countId3,
            jcCodeDom = '',tgTag = '',tgStyle,delayTime = options.delayClick;
        if(isiOS){
            tgUrl = options.ios.url;
            tgCount1 = options.ios.countId1;
            tgCount2 = options.ios.countId2;
            tgCount3 = options.ios.countId3;
        }
        if(options.jcCode){
            jcCodeDom += gsCountAnalysis(options.jcCode);
        }
        if(options.tg){
            tgTag += '<div class="gsTgWapLkInnerTg"></div>';
        }
        tgStyle = '<style>#gsTgWapLkInner{position:relative;overflow:hidden;background-color:#fff}\n' +
            '#gsTgWapLkInnerV2{position:relative;overflow:hidden;background-color:#fff}\n' +
            '#gsTgWapLkInnerV2 .gsTgWapLkInnerFakeImg{display:block;position:absolute;left:0;top:0;width:100%;visibility:hidden}\n' +
            '#gsTgWapLkInnerV2 .gsTgWapLkInnerMain{width:100%;height:100%}\n' +
            '#gsTgWapLkInnerV2 .gsTgWapLkInnerMain canvas{display:block}\n' +
            '#gsTgWapLkInnerV2 .gsTgWapLkInnerTg{display:block;position:absolute;left:0;bottom:0;padding:0;width:'+idtImg.width+';height:'+idtImg.height+';background:url('+idtImg.src+') 0 0 no-repeat;background-size: 100%;}\n' +
            '#gsTgWapLkInnerV2 .gsTgWapLkInnerOpenBtn{display:block;position:absolute;left:0;top:0;width:100%;height:100%}\n' +
            '#gsTgWapLkInnerV2 .gsTgWapLkInnerCloseBtn{opacity:0;visibility:hidden;position:fixed;left:50%;top:.25rem;margin-left:2.65rem;width:.7rem;height:.7rem;border-radius:.7rem;-webkit-transform:translateZ(0);transform:translateZ(0);background:rgba(2,2,2,.6) url(http://image.gamersky.com/webimg13/lib/photoswipe/default-skin.svg) 0 0 no-repeat;-webkit-background-size:auto 1.4rem;background-size:auto 1.4rem;background-position:0 -.7rem;-webkit-transition:all .25s ease;transition:all .25s ease}\n' +
            '#gsTgWapLkInnerV2.cur{position:fixed;left:0;right:0;top:0;bottom:0;height:100%!important;overflow-y:auto;margin:auto;z-index:999990}\n' +
            '#gsTgWapLkInnerV2.cur .gsTgWapLkInnerTg{position: fixed;}\n' +
            '#gsTgWapLkInnerV2.cur .gsTgWapLkInnerFakeImg{visibility:visible}\n' +
            '#gsTgWapLkInnerV2.cur .gsTgWapLkInnerOpenBtn{display:none}\n' +
            '#gsTgWapLkInnerV2.cur .gsTgWapLkInnerCloseBtn{opacity:1;visibility:visible;-webkit-transition-delay:.25s;transition-delay:.25s}\n' +
            '#gsTgWapLkInnerV2.cur .gsTgWapLkInnerMain canvas{display:none}\n' +
            '#gsTgWapLkInnerV2.cur .gsTgWapLkInnerMain .gsTgWapLkInnerLink{position:relative;display:block}\n</style>';
        tgDom += tgStyle;
        tgDom += '<div id="gsTgWapLkInnerV2">';
        tgDom += '<div class="gsTgWapLkInnerMain"><canvas id="gsTgWapLkInnerCanvas"></canvas><img src="'+tgImg+'" class="gsTgWapLkInnerFakeImg"><a class="gsTgWapLkInnerOpenBtn gsTgWapLkInnerOpen"></a>';
        tgDom += '<a target="_blank" href="' + tgUrl + '" data-itemid="' + tgCount1 + '" class="gsTgWapLkInnerLink countHit countHitSql">'+'</a></div><a class="gsTgWapLkInnerClose gsTgWapLkInnerCloseBtn"></a>'+tgTag+jcCodeDom+'</div>';

        function addCount(cid) {
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://click.gamersky.com/Common/GetHits.aspx",
                data: {
                    id: cid,
                    script: "3"
                },
                success: function (data) {}
            });
        }
        function setInnerSize(imginfo) {
            var $wWith = $(window).width(),$wHeight = $(window).height(),
                tarWidth,tarHeight,showHeight,tarRate = 1;
            if($wWith > 720){
                $wWith = 720;
            }
            tarWidth = $wWith;
            tarHeight = tarWidth/options.ratio;
            showHeight = $wWith/imginfo.width*imginfo.height;
            var $tar = $('#gsTgWapLkInnerV2'),
                imgTop = 0;
            $tar.css({
                'width':tarWidth + 'px',
                'height':tarHeight + 'px'
            });
            function animShow() {
                var htmlSclTmp = 0,timerOpen,timerClose,timerCloseScroll,upClick;
                var drawJS = {
                    tarStage:document.getElementById('gsTgWapLkInnerCanvas'),
                    config:{
                        openSpeed:250,
                        closeSpeed:250,
                        backTopSpeed:100
                    },
                    draw:function () {
                        ctx.drawImage(ctxImg,0, tarHeight - showHeight,tarWidth,showHeight);
                    },
                    fakeImgShow:function () {
                        $tar.find('.gsTgWapLkInnerLink').css({
                            height:showHeight+'px'
                        });
                        $tar.find('.gsTgWapLkInnerFakeImg').css({
                            height:showHeight+'px',
                            top:$tar.attr('data-tmpscl')+'px',
                            visibility:'visible'
                        });
                    },
                    fakeImgHide:function () {
                        $tar.find('.gsTgWapLkInnerFakeImg').css({
                            visibility:'hidden'
                        });
                    },
                    updateDraw:function () {
                        var sclTop = this.tarStage.getBoundingClientRect().top,
                            fullSH = $wHeight - tarHeight,
                            fullCH = showHeight - tarHeight;
                        imgTop = 0;
                        tarRate = fullCH/fullSH;
                        if(sclTop < fullSH){
                            imgTop = fullSH - sclTop;
                        }
                        imgTop = imgTop*tarRate;
                        var showY = imgTop - fullCH;
                        if(sclTop < 0){
                            showY = 0;
                        }
                        //离屏绘制
                        cfctx.clearRect(0,0,tarWidth,tarHeight);
                        cfctx.drawImage(ctxImg,0, showY,tarWidth,showHeight);
                        //画入画布
                        ctx.clearRect(0,0,tarWidth,tarHeight);
                        ctx.drawImage(canvasOffscreen,0, 0,tarWidth,tarHeight);
                        $tar.attr('data-tmpscl',showY);
                    },
                    closeEvent:function () {
                        clearTimeout(timerClose);
                        clearTimeout(timerCloseScroll);
                        var thObj = this;
                        function closeAfterScl() {
                            $tar.removeClass('cur');
                            $('html').removeClass('hideScroll');
                            $('html,body').animate({
                                scrollTop:htmlSclTmp
                            },thObj.config.closeSpeed);
                            $tar.animate({
                                width:tarWidth+'px',
                                height:tarHeight + 'px'
                            },thObj.config.closeSpeed);
                            $tar.find('.gsTgWapLkInnerFakeImg').animate({
                                top:$tar.attr('data-tmpscl')+'px'
                            },thObj.config.closeSpeed);
                            timerClose = setTimeout(function () {
                                thObj.fakeImgHide();
                                canAf = true;
                            },thObj.config.closeSpeed);
                        }
                        if($tar.scrollTop() !== 0){
                            $tar.animate({
                                scrollTop:0
                            },thObj.config.backTopSpeed);
                            timerCloseScroll = setTimeout(function () {
                                closeAfterScl();
                            },thObj.config.backTopSpeed);
                        }else{
                            closeAfterScl();
                        }
                    },
                    openEvent:function () {
                        clearTimeout(timerOpen);
                        canAf = false;
                        var tarSt = $tar.offset().top,thObj = this;
                        $wWith = $(window).width();
                        if($wWith > 720){
                            $wWith = 720;
                        }
                        $wHeight = $(window).height();
                        htmlSclTmp = $('html').scrollTop();
                        if(htmlSclTmp === 0){
                            htmlSclTmp = $('body').scrollTop();
                        }
                        this.fakeImgShow();
                        $('html,body').animate({
                            scrollTop:tarSt
                        },thObj.config.openSpeed);
                        $tar.animate({
                            width:$wWith+'px',
                            height:$wHeight + 'px'
                        },thObj.config.openSpeed);
                        $tar.find('.gsTgWapLkInnerFakeImg').animate({
                            top:0
                        },thObj.config.openSpeed);
                        timerOpen = setTimeout(function () {
                            $('html').addClass('hideScroll');
                            $tar.addClass('cur');
                        },thObj.config.openSpeed);
                    },
                    clickFunc:function () {
                        var thisObj = this,
                            openBtn = $tar.find('.gsTgWapLkInnerOpen'),
                            closeBtn = $tar.find('.gsTgWapLkInnerClose');
                        openBtn.on('click',function () {
                            addCount(tgCount3);
                            upClick = setTimeout(function () {
                                window.location.href = tgUrl;
                                addCount(tgCount2);
                            },delayTime*10e2);
                            thisObj.openEvent();
                        });
                        closeBtn.on('click',function () {
                            clearTimeout(upClick);
                            thisObj.closeEvent();
                        });
                    },
                    init:function () {
                        var func = this;
                        this.draw();
                        function render() {
                            if(canAf === true){
                                func.updateDraw();
                            }
                            window.requestAnimationFrame(render);
                        }
                        render();
                        this.clickFunc();
                    }
                };
                var canAf = true,
                    stage = drawJS.tarStage,
                    ctx = stage.getContext('2d'),
                    ctxImg = new Image();
                ctxImg.src = tgImg;
                stage.width = tarWidth;
                stage.height = tarHeight;
                var canvasOffscreen = document.createElement('canvas');
                canvasOffscreen.width = tarWidth;
                canvasOffscreen.height = tarHeight;
                var cfctx = canvasOffscreen.getContext('2d');
                drawJS.init(ctx);
            }
            animShow();
        }
        var ldImage = new Image(),reloadFunc;
        ldImage.src = tgImg;
        ldImage.onload = function () {
            $(options.tar).html(tgDom);
            function doAnim() {
                setInnerSize(ldImage);
            }
            doAnim();
            function hengshuping(){
                clearTimeout(reloadFunc);
                $(options.tar).html(tgDom);
                $('html').removeClass('hideScroll');
                reloadFunc = setTimeout(function () {
                    setInnerSize(ldImage);
                },200);
                //window.location.reload();
            }
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
        };
    };
    window.gsTgWap = new gsIncomeWap();
})(jQuery);