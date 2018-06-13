/*
global $,Swiper
 */
//gamersky js
//by Mrrr.Tian
//c:2016.05.05
//u:2018
var ymwapJs = {
	closeScroll:function () {
        $('html,body').addClass('hideScroll');
    },
	openScroll:function () {
        $('html,body').removeClass('hideScroll');
    },
	hMeun : function() {
	    $('.ymw-meun').on('click', function () {
	        $(this).toggleClass('cur');
	        $('.ymwMeunPop').toggleClass('cur');
		});
	},
	sliderFun: function() {
        $('.ymwSlider').each(function() {
            var mySwiper = new Swiper($(this), {
                direction: 'horizontal',
                loop: true,
                pagination: $(this).find('.swiper-pagination'),
                autoplay: 3000,
                autoplayDisableOnInteraction : false
            });
            mySwiper.onResize()
        });	  
	},
	scrollImgFun: function() {
        $('.ymwScroImg').each(function() {
            var mySwiper = new Swiper($(this), {
                pagination: $(this).find('.swiper-pagination'),
                slidesPerView : 'auto',
                slidesPerGroup : 3,
                paginationClickable :true
            });
            mySwiper.onResize()
        });	  
	},
    indexNavNew:function () {
        var mySwiper = new Swiper('#ymwHeaderSwp', {
            slidesPerView : 'auto',
            slideClass : 'ymwHeaderSwpItem'
        });
        var searchBtbClk = true,$searchPop = $('#ywmHeaderSearchPop'),iptTimer;
        $('#ywmHeaderSearchBtn').on('click',function () {
            var $this = $(this);
            clearTimeout(iptTimer);
            if(searchBtbClk === true){
                $this.addClass('cur');
                $searchPop.addClass('cur');
                iptTimer = setTimeout(function () {
                    $searchPop.find('input').eq(0).focus();
                },500);
                searchBtbClk = false;
            }else{
                $this.removeClass('cur');
                $searchPop.removeClass('cur');
                searchBtbClk = true;
            }
        });
    },
    tabFun: function() {
        var ymwt = $('.ymwTab');
        ymwt.each(function(){
            var ymwtNav = $(this).find('.ymwTabNav'),
            ymwtCon = $(this).find('.ymwTabCon'),
            navNum = $(this).attr('data-navnum'),
            rRo = $(this).attr('data-rRo'),
            defAct = $(this).attr('data-def')||0;
            var mySwiper2 = new Swiper(ymwtNav, {
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                slidesPerView: navNum,
                resistanceRatio : rRo,
                onTap: function() {
                    mySwiper3.slideTo(mySwiper2.clickedIndex)
                },
                onInit: function() {
                    ymwtNav.find('.swiper-slide').eq(0).addClass('active-nav');
                }
            });
            var mySwiper3 = new Swiper(ymwtCon, {
                autoHeight: true,
                onSlideChangeStart: function() {
                    updateNavPosition()
                }
            });
            function updateNavPosition() {
                ymwtNav.find('.active-nav').removeClass('active-nav');
                var activeNav = ymwtNav.find('.swiper-slide').eq(mySwiper3.activeIndex).addClass('active-nav');
                if (!activeNav.hasClass('swiper-slide-visible')) {
                    if (activeNav.index() > mySwiper2.activeIndex) {
                        var thumbsPerNav = Math.floor(mySwiper2.width / activeNav.width()) - 1;
                        mySwiper2.slideTo(activeNav.index() - thumbsPerNav)
                    } else {
                        mySwiper2.slideTo(activeNav.index())
                    }
                }
            }
            function goDef(){
                mySwiper3.slideTo(defAct, 0, false);
                updateNavPosition();
            }
            goDef();
            $(window).resize(function(){
                setTimeout(function(){
                    var w = $('.ymwtNav').find('.swiper-wrapper').width()/3;
                    mySwiper2.slides.css('width',w+'px');
                    mySwiper2.update(true);
                    mySwiper3.update(true);
                },100);                
            });                                        
        }); 
    },
	listPic:function(){
		var ww = $(window).width(),liw = (ww - 14*3)/2;
        var imgsrc = $('.ymw-list-pic').find('li').eq(0).find('img').attr('src');
        var nimg = new Image();
        nimg.src = imgsrc;
        var imgh = nimg.height,
        imgw = nimg.width;
		$('.ymw-list-pic').find('li').each(function(){
            $(this).css({ 'width': liw + 'px' });            
            $(this).find('img').css({ 'height': nimg.height * liw / nimg.width + 'px' });
        });
	},
    listThree:function(thli){
        var ww = $(window).width(),liw = (ww - 14*2 - 18*2)/3;
        $(thli).find('li').each(function(){
            $(this).find('a').css({ 'width': liw + 'px' });
            var imgsrc = $(this).find('a').eq(0).find('img').attr('src');
            var nimg = new Image();
            nimg.src = imgsrc;
            var imgh = nimg.height,
            imgw = nimg.width;
            $(this).find('a').find('img').css({ 'height': nimg.height * liw / nimg.width + 'px' });
            //$(this).find('a').find('p').css({ 'top': nimg.height * liw / nimg.width - 24 + 'px','width':nimg.width * liw / nimg.width - 16 +'px'});
        });
    },
    fixTabNav:function(){
        var st,ft;
        function ymwTNF(){
            var $ww = $(window).width();
            if($ww>720){
                $ww = 720;
            }
            ft = $('.ymwTabNavFixed').parent().offset().top;
            function fixScl() {
                st = $(window).scrollTop();
                if(st >= ft){
                    $('.ymwTabNavFixed').css({'position':'fixed','top':'0','left':'50%','margin-left':'-'+$ww/2+'px','width':$ww - 28 + 'px','z-index':'99992'}).parent().css({'padding-top':$('.ymwTabNavFixed').height()+20+'px'});
                }else{
                    $('.ymwTabNavFixed').css({'position':'','top':'','left':'','margin-left':'','z-index':'','width':''}).parent().css({'padding-top':''});
                }
            }
            fixScl();
            $(window).scroll(function(){
                fixScl();
            });
        }
        ymwTNF();
        $(window).resize(ymwTNF);
    },
    sxFun:function(){
        $('.ymwSxScroImg').each(function() {
            var $this = $(this),
            cn = $(this).find('.cur').parent().index(),tn;
            cn>0?tn=cn:tn=0;
            var mySwiper = new Swiper($(this),{
                freeMode : true,
                freeModeSticky : true,
                slidesPerView : 'auto',
                onInit:function(swiper){
                    swiper.slideTo(tn, 300, false);
                    addSdw(swiper,$this)
                }, onSlideChangeEnd: function(swiper) {
                    addSdw(swiper,$this)
                }
            });
            mySwiper.onResize();
        });  
        function addSdw(swiper,a){
            if (swiper.isEnd) {
                a.removeClass('ymwWS');
            } else {
                a.addClass('ymwWS');
            }
        }
        var tf = false;
        $('.ymwSxbtn').on('tap',function(){            
            if(tf==true){                
                $('.ymwSxPop,.ymw-sx-pop-mask').removeClass('cur');
                $(this).removeClass('cur');
                $('.ymw-sx-pop-mask').remove();
                tf = false;
            }else{
                $('.ymwSxPop,.ymw-sx-pop-mask').addClass('cur');
                $(this).addClass('cur');
                $('.ymw-sx-pop-mask').css({'height':$(window).height()+'px'});
                tf = true;
                setTimeout(function(){
                    $('.ymw-sx-pop-mask').on('tap',function(){
                        $(this).removeClass('cur');        
                        $('.ymwSxPop,.ymwSxbtn').removeClass('cur');
                        tf = false;          
                    });
                },500);             
            }            
        });
    },
    //截图
    jtFunc:function(){
        function setImg(a){
            var imgsrc = a.find('.swiper-slide').eq(0).find('img').attr('src');
            var nimg = new Image();
            nimg.src = imgsrc;
            var imgh = nimg.height,
            imgw = nimg.width;
            if(imgw/imgh>1){
                a.find('img').css({'height': 177 + 'px'});
            }else{
                a.find('img').css({'height': 250 + 'px'});
            }            
        }
        $('.ymwJtImg').each(function() {
            var $this = $(this);
            setImg($this);
            var mySwiper = new Swiper($(this),{
                freeMode : true,
                freeModeSticky : true,
                slidesPerView : 'auto',
                spaceBetween : 8
            });
            mySwiper.onResize();
        }); 
    },
    //展开
    zkFunc:function(){
        $('.ymw-autoHide').each(function(){
            var $this=$(this),tf=true;
            var txtp=$this.find('.ymw-autoHide-txt').children(),sumH=0;
            for (var i = 0; i < txtp.length; i++) {
                sumH += txtp.eq(i).height();
            };
            if(sumH<105){
                $this.find('.ymw-autoHide-btn').hide();
            }else{
                $this.find('.ymw-autoHide-btn').show()
            }
            
            $this.find('.ymw-autoHide-btn').on('click',function(event){
                event.preventDefault();
                if(tf == true){
                    $this.find('.ymw-autoHide-txt').css({'max-height':sumH + 'px'});
                    $(this).addClass('cur').text("收起");
                    tf=false;
                }else{
                    $this.find('.ymw-autoHide-txt').css({'max-height':''});
                    $(this).removeClass('cur').text("展开");
                    tf=true;
                }
            });
            $(window).resize(function(){
                if (tf == false) {
                    sumH = 0;
                    for (var i = 0; i < txtp.length; i++) {
                        sumH += txtp.eq(i).height();
                    };
                    if (sumH < 105) {
                        $this.find('.ymw-autoHide-btn').hide();
                    }else{
                        $this.find('.ymw-autoHide-btn').show()
                    }
                    $this.find('.ymw-autoHide-txt').css({
                        'max-height': sumH + 'px'
                    });
                } else {
                    sumH = 0;
                    for (var i = 0; i < txtp.length; i++) {
                        sumH += txtp.eq(i).height();
                    };
                    if (sumH < 105) {
                        $this.find('.ymw-autoHide-btn').hide();
                    }else{
                        $this.find('.ymw-autoHide-btn').show()
                    }
                }
            });
        });
    },
    //评分
    pfFunc:function(){
        var mbtn = $('.ymw-pf-btn'),pfpop='',pfnums=[];
        for (var i = 0; i < 20; i++) {
            if(i%2==0){
                pfnums[i] = '<a href="javascript:;" class="ymw-pf-pop-nums-btn">' + (i+1)*0.5 + '</a>';
            }else if(i<19){
                pfnums[i] = '<a href="javascript:;" class="ymw-pf-pop-nums-btn">' + (i+1)*0.5 + '.0</a>';
            }else{
                pfnums[i] = '<a href="javascript:;" class="ymw-pf-pop-nums-btn">' + (i+1)*0.5 + '</a>';
            }
        };
        pfpop = '<div class="ymw-pf-pop"><div class="ymw-pf-pop-mask"></div><div class="ymw-pf-pop-main"><h5>选择您的分数</h5><div class="clearfix ymw-pf-pop-nums">' + pfnums.join('') +'</div><a href="javascript:;" class="ymw-pf-pop-close"></a></div></div>';

        var TT = $("#myScore").attr("data-generalid");
        var cookiesKey = "WapPL" + TT;
        if ($.fn.cookie(cookiesKey) !== null) {
            mbtn.find('.ymw-pf-btn-s1').html($.fn.cookie(cookiesKey));
        }

        mbtn.each(function(){
            $(this).on('tap',function(event){
                event.preventDefault();
                var TT = $(this).attr("data-generalid");
                var cookieKey = "WapPL" + TT;
                if ($.fn.cookie(cookieKey) == null) {
                    $('body').append(pfpop);
                    smtPf($('.ymw-pf-pop-nums-btn'));
                    lockHtml()
                    $('.ymw-pf-pop').find('.ymw-pf-pop-mask').on('tap',function(event){
                        event.preventDefault();
                        $('.ymw-pf-pop').remove();
                        unlockHtml();
                    });
                    $('.ymw-pf-pop').find('.ymw-pf-pop-close').on('click',function(event){
                        event.preventDefault();
                        $('.ymw-pf-pop').remove();
                        unlockHtml();
                    });
                }                
            });
        });
        //提交评分
        function smtPf(btn) {
            btn.on('touchend', function(event) {
                event.preventDefault();
                var chTxt = '您的评分' + $(this).html();
                var num = $(this).html();
                mbtn.find('.ymw-pf-btn-s1').html(chTxt);
                $('.ymw-pf-pop').remove();
                unlockHtml();

                var TT = $("#myScore").attr("data-generalid");
                var dataType = $("#myScore").attr("data-type");
                var tips = $("#myScore").attr("data-tips");
                var cookieKey = "WapPL" + TT;
                if ($.fn.cookie(cookieKey) !== null) {
                    alert("对不起，您已经提交过评分！");
                } else {
                    $.ajax({
                        type: "GET",
                        dataType: "jsonp",
                        url: "//db5.gamersky.com/RatingJsonpAjax.aspx",
                        data: {
                            'Rating': JSON2.stringify({
                                "GenneralId": TT,
                                'Sorce': num,
                                'Type': dataType
                            }),
                            'Action': "rating"
                        },
                        success: function(data) {
                            if (data.hasOwnProperty("status")) {
                                switch (data.status) {
                                    case "err":
                                        alert("提交" + tips + "错误！");
                                        break;
                                    case "existuser":
                                    case "existip":
                                        alert("已" + tips + "！");
                                        break;
                                    default:
                                        break;
                                }
                            } else {
                                $.fn.cookie(cookieKey, chTxt, {
                                    path: "/",
                                    expires: 365
                                });
                            }
                        }
                    });
                }
            });
        }
        

    },
    //快速跳转
    qukTo:function(){
        var $wind = $(window),$windw=$wind.height();
        var qk = '<div class="ymw-backtotop"><a id="ymwBTT" class="ymw-btt-btn"></a>';
        if($('.ymw-contxt').length>0 && $('.ymw-article-nav-pop').length<=0){
            qk += '<a id="ymwBTC" class="ymw-btc-btn">评论</a>';
        }
        if($('.ymw-article-nav-pop').length){
            qk += '<a id="ymwOPN" class="ymw-opn-btn"></a>';
        }
        qk += '</div>';
        $('body').append(qk);
        function btnFun(){
            var $bbwrap=$('.ymw-backtotop');
            
            $wind.scroll(function () {
                if ($wind.scrollTop() > $windw/2) {
                    $bbwrap.addClass('cur');
                } else {
                    $bbwrap.removeClass('cur');
                }
            });
        }
        btnFun();
        $(window).resize(btnFun);
        $('#ymwBTT').on('click', function (event) {
            event.preventDefault();
            $('html,body').animate({scrollTop:$('body').offset().top}, 300);
        });
        $('#ymwBTC').on('click', function (event) {
            event.preventDefault();
            $('html,body').animate({scrollTop:$('.ymw-comm').offset().top}, 300);
        });
        $('#ymwOPN').on('click', function (event) {
            event.preventDefault();
            ymwapJs.openAnPop();
        });
        var timeout = false;
        $(window).scroll(function(){
            $('.ymw-backtotop').css({'opacity':'1'});
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function() {
                $('.ymw-backtotop').css({'opacity':'0.2'});
            },500);
            
        });
    },
    //剧集
    dhsets: function () {        
        var $wrap = $('.ymw-juji'),
        ymwtNav = $wrap.find('.ymwTabNav'),
        navNum = ymwtNav.attr('data-navnum'),
        rRo = ymwtNav.attr('data-rRo')
        defAct = ymwtNav.attr('data-def')||0;
        var mySwiperJJ = new Swiper(ymwtNav, {
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            slidesPerView: navNum,
            resistanceRatio : rRo,
            onInit: function() {
                ymwtNav.find('.swiper-slide-active').addClass('active-nav');
            }
        });        
        var jjDom = $('.ymw-juji');
        var generalId = parseInt(jjDom.attr("data-itemid"));
        var playOrderId = parseInt(jjDom.attr("playOrderId"));
        var id = jjDom.attr("data-generalId");
        var data = {
            isCache: false, cacheTime: 0, GeneralId: generalId
        };
        $.ajax({
            type: 'GET',
            url: "//db2.gamersky.com/WapAjax.aspx",
            data: {
                json: JSON2.stringify(data), jsondata: "getdhsets"
            },
            async: false,
            dataType: "jsonp",
            success: function (responseJson) {
                var total = 0;
                var sclass = "";
                var html = "";
                var html2 = "";
                var htmlArr = [];
                if (responseJson.length > 30) {
                    total = Math.ceil(responseJson.length / 30) - 1;
                }
                if (responseJson.length % 30 > 0) {
                    total = total + 1;
                }
                for (var i = 1; i <= responseJson.length ; i++) {
                    var aclass = "";
                    if (responseJson[i - 1].GeneralID == parseInt(id)) {
                        aclass = "class=cur";
                    }
                    if (responseJson.length > 30) {

                        htmlArr[i] = "<li data-hit='1' data-playorder='" + responseJson[i - 1].playOrderId + "' style='display: none'><a " + aclass + " href='/donghua/" + responseJson[i - 1].GeneralID + ".html'>" + responseJson[i - 1].EpisodeTitle + "</a></li>";
                    } else {
                        htmlArr[i] = "<li data-hit='0' data-playorder='" + responseJson[i - 1].playOrderId + "'><a " + aclass + " href='/donghua/" + responseJson[i - 1].GeneralID + ".html'>" + responseJson[i - 1].EpisodeTitle + "</a></li>";
                    }
                }
                html = '<ul class="clearfix">' + htmlArr.join('') + '</ul>';

                if (responseJson.length > 30) {
                    for (var m = total; m >= 1; m--) {
                        var min = (m - 1) * 30 + 1;
                        var max = m * 30;
                        if (max > responseJson.length) {
                            max = responseJson.length;
                        }
                        var classname = "";
                        if (min <= playOrderId && max >= playOrderId) {
                            classname = "active-nav";
                        }
                        if (m == total) {
                            classname = "active-nav";
                        }
                        else {
                            classname = "";
                        }                    
                        html2 += "<div class='swiper-slide " + classname + "' ><a href='javascript:; ' data-min='" + min + "' data-max='" + max + "'>" + max + "-" + min + "</a></div>";
                    }
                }
                else {
                    if (responseJson.length > 0) {
                        html2 = "<div class='swiper-slide active-nav'><a href='javascript:; ' data-min='1' data-max='" + responseJson.length + "'>1-" + responseJson.length + "</a></div>";
                    }
                }
                jjDom.find(".ymwJJtabnav").html(html2);
                jjDom.find(".ymwJJtabcon").html(html);
                mySwiperJJ.update();
                function swpGoto() {
                    var swpgoto;
                    if (responseJson.length > 30) {
                        for (var m = total; m >= 1; m--) {
                            var min = (m - 1) * 30 + 1;
                            var max = m * 30;
                            if (min <= playOrderId && max >= playOrderId) {
                                swpgoto = total - m;
                            }
                        }
                        mySwiperJJ.slideTo(swpgoto,200,false);
                        ymwtNav.find('.swiper-slide').eq(swpgoto).find('a').trigger('click');
                    }
                }
                
                function dhsetsList(){
                    var min = parseInt($(".ymwJJtabnav").find(".active-nav").find("a").attr('data-min'));
                    var max = parseInt($(".ymwJJtabnav").find(".active-nav").find("a").attr("data-max"));
                    $(".ymwJJtabcon li[data-hit='1']").each(function (index, element) {
                        if (parseInt($(element).attr("data-playorder")) >= min && parseInt($(element).attr("data-playorder")) <= max) {
                            $(element).show();
                        } else {
                            $(element).hide();
                        }
                    });
                    $('.ymwJJtabnav').find("a").on('click',function () {
                        var $this = $(this);
                        var min = parseInt($this.attr('data-min'));
                        var max = parseInt($this.attr("data-max"));
                        $(".ymwJJtabcon li[data-hit='1']").each(function (index, element) {
                            if (parseInt($(element).attr("data-playorder")) >= min && parseInt($(element).attr("data-playorder")) <= max) {
                                $(element).show();
                            } else {
                                $(element).hide();
                            }
                        });
                        $('.ymwJJtabnav').find('.swiper-slide').removeClass('active-nav');
                        $this.parent().addClass('active-nav');
                    });
                };
                dhsetsList();
                swpGoto();
            }
        });
        $('.yu-btn-yuan').addClass('ymwQhYuanBtn');
        var yqybl = $('.ymwQhYuanBtn').length;
        function dhdom(){
            var ww = $(window).width(),wh = ww * 9/16;
            $('.ymw-congame-dh-con-vd,.playArea').css({'width':ww+'px','height':wh+'px'});
        }
        dhdom(); 
        $("#gamersky_player_box").GamerSkyPlayer();        
        $(window).resize(function(){
            dhdom();
        });
        var $yuanWrap = $('.ymw-congame-dh-con-ctl-l-btns');
        $yuanWrap.append($('.ymw-congame-dh-con-ctl-l').find('.yu-btn-yuan:gt(0)'));
        function qhYuan() {
            $('.ymwQhYuanBtnMask').on('tap', function() {
                $yuanWrap.slideDown(250);
                $('.ymw-congame-dh-con-ctl-l').find('.ymwQhYuanBtn').each(function() {
                    $(this).on('tap', function() {
                        $yuanWrap.append($('.ymw-congame-dh-con-ctl-l-btn').find('.ymwQhYuanBtn'));
                        $('.ymw-congame-dh-con-ctl-l-btn').append($(this));
                        $('.ymw-congame-dh-con-ctl-l').find('.ymwQhYuanBtn').removeClass('current');
                        $(this).addClass('current').off('tap');
                        $yuanWrap.slideUp(150);
                    });
                });
            });
        }
        if(yqybl === 1){
            return false;
        }else{
            qhYuan();
        };       
    },
    //攻略模仿
    glFunc:function(){        
        function listSize(){
            var gllist = $('.ymw-glal-list'),
            ww = $(window).width(),
            liw = (ww - 42)/2;
            gllist.find('li').each(function(){
                var imgsrc = $(this).find('a').eq(0).find('img').attr('src');
                var nimg = new Image();
                nimg.src = imgsrc;
                var imgh = nimg.height,
                imgw = nimg.width;
                $(this).find('a').css({'width':liw + 'px'});
                $(this).find('a').find('img').css({ 'height': nimg.height * liw / nimg.width + 'px' });
            });
        }
        //listSize();
        var glNavHtml = '',
        $glMoreBtn = $('.wapglDataButton');
        $glMoreBtn.each(function(){
            $(this).on('click',glMoreBtnFunc);
            glNavHtml += '<li><a href="javascript:;" class="ymw-zmqkt" data-lito="ymw-glall-'+$(this).attr('data-zm')+'"><span>'+$(this).attr('data-zm')+'</span></a></li>';
        });
        $('#ymwGlallNav').find('.ymw-fullpop-con').html(glNavHtml);
        $('#ymwA-Z').on('click',function(){  
            var $this = $(this);
            $('#ymwGlallNav').addClass('cur');
            lockHtml();
            $('#ymwGlallNav').find('.ymw-fullpop-close').on('click',function(){
                $('#ymwGlallNav').removeClass('cur');
                unlockHtml();
            });
        });
        $(window).resize(function(){
            if($('#ymwGlallNav').hasClass('cur')==true){
                $('#ymwGlallNav').removeClass('cur');
                unlockHtml();
            }
        });
        function zMqkt(){
            $('.ymw-zmqkt').each(function(){
                $(this).on('click',function(){
                    $('#ymwGlallNav').removeClass('cur');
                    unlockHtml();
                    var tarZ = $(this).attr('data-lito');
                    $('html,body').animate({scrollTop:$('.'+tarZ).offset().top-47}, 300);
                });
            });
        }
        zMqkt();
        var ymwt = $('.ymwTabGL');
        var ymwtNav = ymwt.find('.ymwTabNav'),
            ymwtCon = ymwt.find('.ymwTabCon'),
            navNum = ymwt.attr('data-navnum'),
            rRo = ymwt.attr('data-rRo');
        defAct = ymwt.attr('data-def') || 0;
        var mySwiper2 = new Swiper(ymwtNav, {
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            slidesPerView: navNum,
            resistanceRatio: rRo,
            onTap: function() {
                mySwiper3.slideTo(mySwiper2.clickedIndex)
            },
            onInit: function() {
                ymwtNav.find('.swiper-slide').eq(0).addClass('active-nav');
            }
        });
        var mySwiper3 = new Swiper(ymwtCon, {
            autoHeight: true,
            onSlideChangeStart: function() {
                updateNavPosition()
            },
            onSlideChangeEnd: function() {
                shSlNav()
            }
        });
        function updateNavPosition() {
            ymwtNav.find('.active-nav').removeClass('active-nav')
            var activeNav = ymwtNav.find('.swiper-slide').eq(mySwiper3.activeIndex).addClass('active-nav');
            if (!activeNav.hasClass('swiper-slide-visible')) {
                if (activeNav.index() > mySwiper2.activeIndex) {
                    var thumbsPerNav = Math.floor(mySwiper2.width / activeNav.width()) - 1
                    mySwiper2.slideTo(activeNav.index() - thumbsPerNav)
                } else {
                    mySwiper2.slideTo(activeNav.index())
                }
            }
        }
        function shSlNav(){
            if(mySwiper3.activeIndex==1){
                $('.ymwA-Z').addClass('cur');                
                $('.ymw-backtotop').hide();
            }else{
                $('.ymwA-Z').removeClass('cur');
                $('.ymw-backtotop').show();
            }
        }
        function goDef() {
            mySwiper3.slideTo(defAct, 0, false);
            updateNavPosition();
        }
        goDef()
        $(window).resize(function() {
            setTimeout(function() {
                var w = $('.ymwtNav').find('.swiper-wrapper').width() / 3;
                mySwiper2.slides.css('width', w + 'px');
                mySwiper2.update(true);
                mySwiper3.update(true);
            }, 100);
        });
        function glMoreBtnFunc(event) {
            event.preventDefault();
            var $this = $(this);
            var zm = $this.attr("data-zm");
            var reload = $this.attr("reload");
            var templata = "{PE.Label id=\"获取Wap攻略推荐列表\" page=\"5\" size=\"100\" type=\"all\" zm=\"" + zm + "\" /}";
            var data = {
                isCache: false, cacheTime: 0, templateKey: "", templata: templata
            };
            $.ajax({
                type: 'GET',
                url: "//db2.gamersky.com/WapAjax.aspx",
                data: {
                    json: JSON2.stringify(data), jsondata: "putlabelbody"
                },
                dataType: "jsonp",
                beforeSend:function(){                    
                    $this.text('加载中...');
                },
                success: function (data) {
                    if (reload == "true") {
                        $this.attr("reload", false);
                        $this.before(data.body);                     
                        $this.html("已全部展开");
                    }
                    else {
                        $this.html("已全部展开");                        
                    }
                },
                complete:function(){
                    //listSize();
                    ymwtCon.find('.swiper-wrapper').css({'height':$('.ymw-glall-con').height()+'px'});
                    setTimeout(function(){
                        //listSize();
                        ymwtCon.find('.swiper-wrapper').css({'height':$('.ymw-glall-con').height()+'px'});
                    }, 3000);      
                    $this.off().css({'color':'#ddd'});           
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
        }
        $(window).resize(function(){
            //listSize();
        });
    },
    searchPageFunc:function(){
        var $wrap = $('.ymwsRespage'),
        ymwtNav = $wrap.find('.ymwTabNav'),
        navNum = ymwtNav.attr('data-navnum'),
        rRo = ymwtNav.attr('data-rRo')
        defAct = ymwtNav.attr('data-def')||0;
        var mySwiperJJ = new Swiper(ymwtNav, {
            slidesPerView: navNum,
            resistanceRatio : rRo,
            onInit: function() {
                ymwtNav.find('.swiper-slide').eq(defAct).addClass('active-nav');                
            }
        });
        
    },
    SyLinkFun:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器            
        $('.ymwSyLink').each(function(){
            if (isAndroid == true) {
                $(this).attr("href", "//wap.gamersky.com/shouyou/android/");
            }
            else {
                $(this).attr("href", "//wap.gamersky.com/shouyou/ios/");
            }
        });
    },
    htmlAndroidiOs:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        if (isAndroid == true) {
            $('html').removeClass('ymw-iOsWap');
            $('html').addClass('ymw-androidWap');
        }else{
            $('html').removeClass('ymw-androidWap');
            $('html').addClass('ymw-iOsWap');
        }
    },
    ymwPzDataFun:function(){
        var pzData = $('.ymwPzData'),
        pzDataIn = $('.ymwPzDataIn'),
        pzDataDD = pzData.find('.PZ.DD'),
        pzDataTJ = pzData.find('.PZ.TJ');
        pzDataDD.find('li.tit').remove();
        pzDataTJ.find('li.tit').remove();
        $('.ymwPzDataIn').find('.swiper-slide').eq(0).html(pzDataDD);
        $('.ymwPzDataIn').find('.swiper-slide').eq(1).html(pzDataTJ);
        var pzn = pzData.find('.PZXQ').length;
        if (pzn === 0) {
            $('.ymw-peizhi').remove();
        };
    },
    ymwsyScoreFun: function() {
        var $starWp = $('#ymsSyDlStarsWrap'),$scoreTxt = $('#myScoreTxt'),$scoreBtn = $('#ymwScoreSubmit'),$scoreLike = $('#ymwScoreLike'),
        scoreTxt = ['不忍直视','平庸之作','不妨一试','公认佳作','不容错过'];
        function getPos(e){
            if (e.originalEvent.targetTouches[0] !== undefined && e.originalEvent.targetTouches[0].pageX !== undefined) {
                e.pageX = e.originalEvent.targetTouches[0].pageX;
            }
            if (e.originalEvent.targetTouches[0] !== undefined && e.originalEvent.targetTouches[0].pageY !== undefined) {
                e.pageY = e.originalEvent.targetTouches[0].pageY;
            }
            return e;
        }
        var widthTimer;
        var starFuncs = function(){             
            $starWp.find('.ymw_score_stars').find('i').css('width',$starWp.find('.ymw_score_stars').width()+'px');
            widthTimer = setTimeout(function(){
                $starWp.find('.ymw_score_stars').find('i').css('width',$starWp.find('.ymw_score_stars').width()+'px')
            },500)
        }
        starFuncs.prototype = {
            positionInfos:function(){
                var infos,theStar = $starWp.find('.ymw_score_stars');
                infos = {
                    width:theStar.width(),
                    left:theStar.offset().left
                }
                return infos;
            },
            changeState:function(e){
                var ePos = getPos(e),dtc,
                s0 = starInfos.left,sw = starInfos.width,
                x = ePos.pageX;
                dtc = x - s0,
                conDtc = dtc/sw>1?1:(dtc/sw);
                starNum = Math.floor(conDtc*10)%2==0?Math.floor(conDtc*10)/2:(Math.floor(conDtc*10)-1)/2;
                starNum = starNum<0?0:starNum;
                scorenum = starNum>4?10:(starNum+1)*2;
                scorenum = scorenum<0?0:scorenum;
                var changeStar = conDtc*100+'%';
                $starWp.find('.ymw_score_stars').find('span').width(changeStar);
                $scoreTxt.find('span').text(scoreTxt[starNum]);
                $scoreBtn.attr({'data-scorenum':scorenum,'data-scoretxt':scoreTxt[starNum]})
            }
        }
        var starInfosFunc = new starFuncs();
        var starInfos = starInfosFunc.positionInfos();
        function btnTouches(){
            $('.ymsSyDlStarsWrap').on('touchstart',function (e){
                e.preventDefault()
                starInfosFunc.changeState(e);
                $scoreBtn.removeClass('cur')
            })
            $('.ymsSyDlStarsWrap').on('touchmove', function (e) {
                e.preventDefault();
                starInfosFunc.changeState(e)            
            });
            $('.ymsSyDlStarsWrap').on('touchend',function(){
                $scoreBtn.addClass('cur')
            });
        }
        //提交按钮
        var TT = $scoreBtn.attr("data-generalid");
        var cookiesKey = "WapPL" + TT,cookieNums=0,cookieNumsCalc=0;
        function scoreFunc(){
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//i.gamersky.com/api/logincheck",
                success: function(responseJson) {
                    if (responseJson.status == "ok") {
                        btnTouches()
                    } else {
                        if ($.fn.cookie(cookiesKey) !== null) {
                            cookieNums = parseInt($.fn.cookie(cookiesKey), 10);
                            cookieNumsCalc = cookieNums % 2 == 0 ? cookieNums / 2 : (cookieNums + 1) / 2;
                            $starWp.find('.ymw_score_stars').find('span').width((cookieNums) * 10 + '%');
                            $scoreTxt.find('span').html(scoreTxt[cookieNumsCalc - 1]);
                        } else {
                            btnTouches()
                        }
                    }
                }
            });
            $scoreBtn.off();
            $scoreBtn.on('click',function (e){
                e.preventDefault();
                var $this = $(this),
                num = $this.attr('data-scorenum'),
                dataid = $this.attr("data-generalid"),
                dataType = $this.attr("data-type"),
                dataTips = $this.attr("data-tips"),
                cookieKey = "WapPL" + dataid,
                cookieTxt = $this.attr('data-scoretxt');
                $scoreBtn.removeClass('cur')                    
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "//i.gamersky.com/apirating/rating",
                    data: {
                        Rating: JSON2.stringify({ GenneralId: dataid, Sorce: num, Type: dataType }), Action: "rating"
                    },
                    success: function(data) {
                        if (data.hasOwnProperty("status")) {
                            switch (data.status) {
                                case "err":
                                    alert("提交" + dataTips + "错误！");
                                    break;
                                case "existuser":
                                case "existip":
                                    alert("已" + dataTips + "！");
                                    break;
                                default:
                                    break;
                            }
                        } else {                                
                        }
                        $('.ymsSyDlStarsWrap').off();
                        $.fn.cookie(cookieKey, num, {path: "/",expires: 365});
                    }
                });
                
            }); 
        }       
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "//i.gamersky.com/apirating/getcontentratingloginfo",
            data: {
                'generalId': TT
            },
            success: function(data) {
                var dataParse,scoreUserSubmit,scoreUserCalc,starWidthNum,starWidth;                          
                if (data.status == "ok") {
                    dataParse = $.parseJSON(data.body);
                    scoreUserSubmit = Math.floor(dataParse.Sorce);
                    starWidthNum = parseInt(dataParse.Sorce, 10);
                    starWidth = starWidthNum%2==0?starWidthNum:(starWidthNum+1);
                    scoreUserCalc = scoreUserSubmit%2==0?scoreUserSubmit/2:(scoreUserSubmit+1)/2;
                    $starWp.find('.ymw_score_stars').find('span').width(starWidth*10+'%');
                    $scoreTxt.find('span').html(scoreTxt[scoreUserCalc-1]);
                }else{
                    scoreFunc()
                }
            }
        });
        //喜欢
        function likeFun() {
            var lkId = $scoreLike.attr('data-generalid'),
            lkType = $scoreLike.attr('data-type'),
            lkScore = $scoreLike.attr('data-sorce'),
            lkTips = $scoreLike.attr('data-tips'),
            likeCookie = 'R' + $scoreLike.attr('data-generalid') + 'likeother';
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//i.gamersky.com/apirating/initgroup",
                data: {
                    'generalId': lkId,
                    'ratingGroupType': lkType,
                    'Action': "initGroup"
                },
                success: function(data) {
                    if (data.hasOwnProperty("status")) {
                        console.log(data);
                    } else {
                        $scoreLike.find('span').text(data[0].Times)
                    }
                }
            });
            if ($.fn.cookie(likeCookie) !== null) {
                $scoreLike.addClass('cur');
            } else {
                $scoreLike.on('click', function() {
                    $scoreLike.addClass('cur');
                    $.fn.cookie(likeCookie, 1, {path: "/",expires: 365});
                    $.ajax({
                        type: "GET",
                        dataType: "jsonp",
                        url: "//i.gamersky.com/apirating/rating",
                        data: {
                            'Rating': JSON2.stringify({
                                "GenneralId": lkId,
                                'Sorce': lkScore,
                                'Type': lkType
                            }),
                            'Action': "rating"
                        },
                        success: function(data) {
                            if (data.hasOwnProperty("status")) {
                                switch (data.status) {
                                    case "err":
                                        alert("提交" + lkTips + "错误！");
                                        break;
                                    case "existuser":
                                    case "existip":
                                        alert("已" + lkTips + "！");
                                        break;
                                    default:
                                        break;
                                }
                            } else {
                                console.log('ok')
                            }
                        }
                    });
                })
            }
        }
        likeFun()
    },
    ymwListJxFunc:function(){
        var $list = $('.ymwListJx'),listData,moreBtn = $('.ymwListJxMore'),lazyLoadImgHolder = 'http://image.gamersky.com/webimg13/loadpic.gif';
        var listSet = {
            templatekey:$list.attr('templatekey'),
            id:0,
            nodeid:$list.attr('data-nodeid'),
            page:$list.attr('data-page'),
            nodes:$list.attr('nodes'),
        }
        function addList(baseData){
            var tmpDom = '',othersData,rens;
            if(baseData.others){
                try{
                    othersData = eval("("+baseData.others+")");
                    rens = othersData.reasons;
                }catch(err){
                    console.error(baseData.tit+"  “精选简介”字段有一个错误需要处理："+err);
                    othersData = {
                        subtitle:'',
                        bigimg:'http://image.gamersky.com/webimg13/nopic.png'
                    }
                    rens='';
                }                
            }else{
                console.error(baseData.tit+"  “精选简介”字段数据为空");
                othersData = {
                    subtitle:'',
                    bigimg:'http://image.gamersky.com/webimg13/nopic.png'
                }
                rens='';
            }
            tmpDom += '<li data-id="'+baseData.id+'"><div class="lmc_tit"><a href="'+baseData.url+'">';
            tmpDom += baseData.icon;
            tmpDom += '</a><h5><a href="'+baseData.url+'">';
            tmpDom += baseData.tit;
            tmpDom += '</a></h5><p>';
            tmpDom += othersData.subtitle;
            tmpDom += '</p><a class="lmc_like ymwLike" data-generalId="'+baseData.id+'">0</a></div><a class="lmc_img" href="'+baseData.url+'"><img src="'+lazyLoadImgHolder+'" data-src="'+othersData.bigimg+'" alt="游民星空" class="lmcLzimg"></a>';
            for (var i = 0; i < rens.length; i++) {
                tmpDom += '<p class="lmc_para">'+rens[i]+'</p>';
            };
            tmpDom += '</li>';
            return tmpDom;
        }
        function likeFunc(){
            var $like = $('.ymwLike'),tips = "喜欢";
            $like.each(function(){
                var $this = $(this),generalId = $this.attr("data-generalId"),cookieKey = "R" + generalId + "-5";
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "//i.gamersky.com/apirating/initgroup",
                    data: {'generalId': generalId,'ratingGroupType': 5,'Action': "initGroup"},
                    success: function(data) {
                        if (!data.hasOwnProperty("status")){
                            $this.html(data[0].Times)
                        }                        
                    },
                    error:function(err){
                        $this.html('请刷新')
                    }
                });
                if ($.fn.cookie(cookieKey) !== undefined && $.fn.cookie(cookieKey) !== null) {
                    $this.addClass('cur');
                }else{
                    $this.on('click',function(){
                        $this.addClass('cur');
                        $.ajax({
                            type: "GET",
                            dataType: "jsonp",
                            url: "//i.gamersky.com/apirating/rating",
                            data: {'Rating':JSON2.stringify({ "GenneralId": generalId,'Sorce': 1,'Type':5}),'Action':"rating" },
                            success: function (data) {
                                if (data.hasOwnProperty("status")) {
                                    switch (data.status) {
                                        case "err":
                                            alert("提交" + tips + "错误！");
                                            break;
                                        case "existuser":
                                        case "existip":
                                            alert("已" + tips + "！");
                                            break;
                                        default:    
                                            break;
                                    }
                                }
                                else{
                                    $this.html(data.Times);
                                }
                                $.fn.cookie(cookieKey, JSON2.stringify({ "GenneralId":generalId,'Sorce':1,'Type':5}),{ path:"/",expires: 365 });
                            }
                        });
                        $this.off();
                    })
                }
            });
        }
        function getListData(initSet){
            var jsondata = {
                type: "getwaplabelpage", isCache: true, cacheTime: 0, templatekey: initSet.templatekey, id: initSet.id, nodeId: initSet.nodeid, page: initSet.page, nodes: initSet.nodes
            },listDom = '';
            $.ajax({
                type: 'GET',
                async:false,
                url: "//db2.gamersky.com/LabelJsonpAjax.aspx",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                dataType: "jsonp",
                beforeSend:function(){
                    moreBtn.addClass('ymw-more-loading').find('span').html('正在加载');
                },
                success: function (data) {
                    var gd = data.body,newData,strStart,strEnd,parseData,initnum = 0,imglist;
                    function loadImgsFunc(urls,maxnum,tar){
                        var obj = new Image();
                        obj.src = urls;
                        obj.onload = function(){
                            initnum++;
                            if($(tar).hasClass('lmcLzimg')){
                                $(tar).attr('src',$(tar).attr('data-src'))
                            };
                            if(initnum >= maxnum){
                                var h = $list.closest('.swiper-slide').height() + 'px';
                                $list.closest('.swiper-wrapper').css('height',h);
                            }
                        }
                    }
                    if (data.body.indexOf("没有任何记录") > 0) {
                        moreBtn.attr('data-txt','全部加载完成');
                        moreBtn.off();
                    }else{
                        strStart = gd.indexOf('bodyDataStart')+13;
                        strEnd = gd.indexOf('bodyDataEnd') - strStart;
                        newData = gd.substr(strStart,strEnd) + ']';
                        try{
                            parseData = eval("("+newData+")");
                        }catch(err){
                            console.error("parseData has a error:"+err)
                        }
                        $.each(parseData,function(index,items){
                            listDom += addList(items);                            
                        })
                        $list.append(listDom);
                        imglist = $list.find('img');
                        for (var i = 0; i < imglist.length; i++) {
                            loadImgsFunc(imglist[i].src,imglist.length,imglist[i])
                        };
                        likeFunc();
                    }                    
                },
                complete:function(){  
                    setTimeout(function(){
                        var h = $list.closest('.swiper-slide').height() + 'px';
                        $list.closest('.swiper-wrapper').css('height',h);
                    },300);                  
                    moreBtn.removeClass('ymw-more-loading').find('span').html(moreBtn.attr('data-txt'));
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
        }
        function getMoreList(){
            moreBtn.on('click',function(){
                var lastId = $list.find('li').eq(-1).attr('data-id'),pageNum = listSet.page;
                listSet.id = lastId;
                listSet.page++;
                getListData(listSet);
            })
        }
        getListData(listSet);
        getMoreList()
    },
    ymwListZoneFunc:function(){
        var $list = $('.ymwListZone'),
            listNav = $list.find('.lmz_nav'),
            listCon = $list.find('.lmz_items_wrap'),
            zoneConf = {};
        zoneConf = {
            blockData:{
                zq_rmzq:{nav:'热门专区',dataArea:'dataArea_rmzq',realData:''},
                zq_jsby:{nav:'角色扮演',dataArea:'dataArea_jsby',realData:''},
                zq_kp:{nav:'卡牌',dataArea:'dataArea_kp',realData:''},
                zq_pk:{nav:'跑酷',dataArea:'dataArea_pk',realData:''},
                zq_tf:{nav:'塔防',dataArea:'dataArea_tf',realData:''},
                zq_dz:{nav:'动作',dataArea:'dataArea_dz',realData:''},
                zq_yywd:{nav:'音乐舞蹈',dataArea:'dataArea_yywd',realData:''},
                zq_sj:{nav:'射击',dataArea:'dataArea_sj',realData:''},
                zq_ty:{nav:'体育',dataArea:'dataArea_ty',realData:''},
                zq_yc:{nav:'养成',dataArea:'dataArea_yc',realData:''},
                zq_gd:{nav:'格斗',dataArea:'dataArea_gd',realData:''},
                zq_cljy:{nav:'策略经营',dataArea:'dataArea_cljy',realData:''},
                zq_qp:{nav:'棋牌',dataArea:'dataArea_qp',realData:''}
            }
        }
        function iGetInnerText(testStr) {
            var resultStr = testStr.replace(/\s+/g, "");
            resultStr = resultStr.replace(/<\/?.+?>/g,"");
            resultStr = resultStr.replace(/[\r\n]/g, "");
            return resultStr;
        }
        function renderListNav(){
            var listNavDom = '',navData = zoneConf.blockData;
            listNavDom += '<div class="lmz_nav_row">';
            var navnums = 0;
            $.each(navData,function(index,items){
                navnums++
                if(index != 'zq_rmzq'){
                    listNavDom += '<a data-tar="'+index+'">'+items.nav+'</a>';
                    if(index=='zq_dz'||index=='zq_gd'){listNavDom += '</div><div class="lmz_nav_row">'} 
                }          
            });
            listNavDom += '</div>';          
            listNav.html(listNavDom);
            listNav.find('.lmz_nav_row').each(function(){
                var $this = $(this),aLen = $this.find('a').length;
                var placeholderA = ['<a class="navPlaceHolder">占位</a>', '<a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a>', '<a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a>', '<a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a>'];
                if(aLen < 5){
                    $this.append(placeholderA[4-aLen]);
                }
            });
            listNav.find('a').on('click',function(){
                var $this = $(this),tarId = $this.attr('data-tar'),tarTop = $('#'+tarId).offset().top - 48;
                $('html,body').animate({scrollTop:tarTop}, 300);
            });
        };
        function listLi(lidata){
            var liDom = '';
            liDom += '<li><a href="'+lidata.url+'"><span class="lmz_img"><img src="'+lidata.imgsrc+'" alt="'+lidata.tit+'"></span><span class="lmz_tit">'+lidata.tit+'</span><span class="lmz_platform"><i class="txt">平台：</i>';
            if(lidata.andIos != 'none'){
                liDom += '未知';
            }            
            if(lidata.and != 'none'){
                liDom += '<i class="lmz_icons lmz_icons_andorid"></i>';
            }
            if(lidata.ios != 'none'){
                liDom += '<i class="lmz_icons lmz_icons_ios"></i>';
            }
            liDom += '</span><i class="lmz_time"><i class="txt">上市：</i><i class="time">'+lidata.time+'</i></i></a></li>';
            return liDom;
        }
        function createListCon(itemData,key){
            var listConDom = '',conData = itemData,conDataSim,conDataSimFormat,newArrayData=[],itemsShow = true;
            conDataSim = $('.dataArea').find('.'+conData.dataArea).html();            
            try{
                conDataSimFormat = eval("("+iGetInnerText(conDataSim)+")");
            }catch(err){
                console.error(conData.nav+"-数据错误（数据不存在）："+err);
                itemsShow = false;
            }          
            listConDom += '<div class="lmz_items" id="'+key+'">';
            listConDom += '<h5><span>'+conData.nav+'</span></h5>';
            listConDom += '<ul class="lmz_flex_row">';
            if(conDataSim){
                for (var i = 0; i < conDataSimFormat.length; i++) {
                    if(i < 6){
                        listConDom += listLi(conDataSimFormat[i]);
                        if(i==2){
                            listConDom += '</ul><ul class="lmz_flex_row">';
                        }
                    }else{
                        newArrayData.push(conDataSimFormat[i])
                    }
                };
            }
            listConDom += '</ul><a class="lmz_more ymwListZoneMore" data-list="'+key+'">点击展开</a>';
            listConDom += '</div>';            
            if(itemsShow == false){
                listConDom = '';
                newArrayData=[]
            }
            return [listConDom,newArrayData];
        }
        function createListConMore(itemData){
            var listConDom = '',conData = itemData;
            listConDom += '<ul class="lmz_flex_row">';            
            for (var i = 0; i < conData.length; i++) {                
                listConDom += listLi(conData[i]);
                if((i+1)%3==0 && i != (conData.length)-1){
                    listConDom += '</ul><ul class="lmz_flex_row">';
                }                
            };            
            listConDom += '</ul>';
            return listConDom;
        }
        function addPlaceHolder(){            
            listCon.find('.lmz_flex_row').each(function(){
                var $this = $(this),thisLi = $this.find('li').length;
                if(thisLi == 2){
                    $this.append('<li></li>');
                }
            });
        }
        function listMore(){
            var $more = $list.find('.ymwListZoneMore');
            $more.on('click',function(){
                var $this = $(this),tmpListDom = '',moreDataPos = $this.attr('data-list'),clkData = zoneConf.blockData[moreDataPos].realData;
                tmpListDom += createListConMore(clkData);
                $this.remove();
                $('#'+moreDataPos).append(tmpListDom);
                var h = $list.closest('.swiper-slide').height() + 'px';
                $list.closest('.swiper-wrapper').css('height',h);
                addPlaceHolder();
            });
        }
        function renderListCon(){
            var tmpListDom = '',istDataOri = zoneConf.blockData;
            $.each(istDataOri,function(i,items){
                var createListConRe = createListCon(items,i);
                tmpListDom += createListConRe[0];
                items.realData = createListConRe[1];                
            });
            listCon.html(tmpListDom);
            listMore();
            addPlaceHolder();
            listCon.find('.lmz_items').each(function(){
                if($(this).find('li').length<6){
                    $(this).find('.lmz_more').remove()
                };
            });
        }
        renderListNav();
        renderListCon();
    },
	//众评
    zpFunc:function () {
        var $zp = $('#ymwZpAreaStar'),zpBtn = $zp.find('a'),zpTxt = $zp.find('span'),
        zpDataList = ['渣作，不玩也罢','平庸，索然无味','一般，普普通通','佳作，值得一玩','神作，不容错过'];
        function getPos(e){
            if (e.originalEvent.targetTouches[0] !== undefined && e.originalEvent.targetTouches[0].pageX !== undefined) {
                e.pageX = e.originalEvent.targetTouches[0].pageX;
            }
            if (e.originalEvent.targetTouches[0] !== undefined && e.originalEvent.targetTouches[0].pageY !== undefined) {
                e.pageY = e.originalEvent.targetTouches[0].pageY;
            }
            return e;
        }
        function selectStar(sn) {
            zpBtn.each(function (i) {
                if(i<=sn){
                    $(this).addClass('cur');
                    zpTxt.html(zpDataList[sn]);
                }
            })
        }
        function touchSelectStars(e) {
            var $ys = $zp.find('.ymw_stars'),
                ysw = $ys.width(),ysl = $ys.offset().left;
            var posx = getPos(e).pageX - ysl;
            var slnum = parseInt(posx/ysw*10/2);
            var starIndex = slnum>4?4:slnum;
            zpBtn.removeClass('cur');
            selectStar(starIndex < 0 ? 0 : starIndex);
            if ($(".ymw_zp_pf_wd .tpbtn").eq(0).hasClass("cur")) {
                return false;
            }

            $ys.submitMyScore(starIndex);
            if(!$(".ymw_zp_pf_wd .tpbtn").eq(1).hasClass("cur"))
            {
                $(".ymw_zp_pf_wd .tpbtn").eq(1).addwanFun();
            }
        }
        $zp.find('.ymw_stars').on({
            'touchstart': function (e) {
                if ($(".ymw_zp_pf_wd").attr("date-selltime") == "未上市") { alert("该游戏未上市！"); return false; }
                $.ajax({
                    type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/logincheck",
                    success: function (responseJson) {
                        if (responseJson.status == "ok") {                           
                            touchSelectStars(e);
                        }
                        else {
                            $(".ymw-loginpop-btns").insertYmwLoginPop();
                            $(".ymw-loginpop-btns").QZloginForm();
                        }
                    }
                })
               
            },
            'touchmove':function (e) {
                e.preventDefault();
                touchSelectStars(e);
            },
            'touchend':function (e) {
                e.preventDefault();
                var selectIndex = $zp.find('a.cur').index();             
                //$('.ymw_stars').submitMyScore(selectIndex);
            }
        });
    },
    //导航+攻略集
    openAnPop:function () {
        var nowSt = $('body').scrollTop(),
            anp = $('.ymw-article-nav-pop');
        window.gsArticleNavSt = nowSt;
        var ww = $(window).width()/7.2,wh = $(window).height()-1.3*ww;
        anp.find('.ymw-anp-con').css('height',wh+'px');
        anp.addClass('cur');
        ymwapJs.closeScroll();
        $(window).resize(function () {
            ww = $(window).width()/7.2,wh = $(window).height()-1.3*ww;
            anp.find('.ymw-anp-con').css('height',wh+'px');
        });
        if($('#ymwAdBottom').length>0){
            $('#ymwAdBottom').hide();
        }
        var curTop = anp.find('a.cur').offset().top - anp.find('.ymw-anp-con-scroll').offset().top;
        anp.find('.ymw-anp-con-scroll').scrollTop(curTop);
    },
    closeAnPop:function () {
        var anp = $('.ymw-article-nav-pop');
        anp.find('.ymw-anp-con-scroll').scrollTop(0);
        anp.removeClass('cur');
        ymwapJs.openScroll();
        $('html,body').animate({scrollTop:window.gsArticleNavSt}, 0);
        if($('#ymwAdBottom').length>0){
            $('#ymwAdBottom').show();
        }
    },
    articleNav:function () {
        var isRenderSel = true;
        function renderSelect() {
            var $an = $('.ymw-article-nav-in'),anpDom = '';
            anpDom += '<div class="ymw-article-nav-pop"><div class="ymw-anp-tit"><i></i>文章导航</div><a class="ymw-anp-close"></a><div class="ymw-anp-con"><div class="ymw-anp-con-scroll">';
            anpDom += createPop();
            function createPop() {
                var dataSel = $('.ymw-article-nav-select'),
                    dataCon = dataSel.html(),anbtnDom,
                    curTxt = dataSel.find('option:selected').html(),
                    curVal = dataSel.find('option:selected').val();
                anbtnDom = '<a class="ymw-article-nav-in-d"><span>'+curTxt+'</span></a>';
                $(anbtnDom).insertAfter($an.find('.ymw-article-nav-in-t'));
                var navList = '',
                    oriUrl = window.location.href,exTe = /\.(shtml)/i,
                    ccId = $(".cy_comment").attr("data-sid"),exnm = '.html';
                if(exTe.test(oriUrl)){
                    exnm = '.shtml';
                }
                navList += '<ul>';
                dataSel.find('option').each(function (i,item) {
                    var $this = $(this),onVal = $this.val(),onHtml = $this.html(),onUrl;
                    if(onVal == 1){
                        onUrl = 'Content-'+ccId+exnm;
                    }else{
                        onUrl = 'Content-'+ccId+'_'+onVal+exnm;
                    }
                    if(onVal == curVal){
                        navList += '<li><a class="cur" href="'+onUrl+'">'+onHtml+'</a></li>';
                    }else{
                        navList += '<li><a href="'+onUrl+'">'+onHtml+'</a></li>';
                    }
                });
                navList += '</ul>';
                return navList;
            }
            anpDom += '</div></div></div>';
            $('body').append(anpDom);
            var anBtn = $an.find('.ymw-article-nav-in-d'),anp = $('.ymw-article-nav-pop');
            anBtn.on('click',ymwapJs.openAnPop);
            anp.find('.ymw-anp-close').on('click',ymwapJs.closeAnPop);

            var locationTimer;
            anp.find('.ymw-anp-con-scroll').find('a').on('click',function (e) {
                var thisHref = $(this).attr('href');
                var u = navigator.userAgent, app = navigator.appVersion;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
                ymwapJs.closeAnPop();
                if (isAndroid == true) {
                    e.preventDefault();
                    clearTimeout(locationTimer);
                    locationTimer = setTimeout(function () {
                        window.location =  thisHref;
                    },200);
                }
            });
        }
        $('.ymw-article-nav-select').find('option').each(function () {
            if($(this).html().length == 0){
                isRenderSel = false;
            }
        });
        if(isRenderSel){
            renderSelect();
        }else{
            $('.ymw-article-nav-in').remove();
        }

    },
    gsSCMfunc:function () {
        //攻略集
        function strategyCollect() {
            var gl = $('.gs_strategy_collect'),
                glBtn = gl.find('.gs_sc_item_btn'),
                glItem = gl.find('.gs_sc_item');
            glItem.each(function () {
               $(this).find('li').each(function () {
                   var aDom = $(this).find('a');
                   aDom.attr('href',aDom.attr('waphref'));
                   aDom.removeAttr('target');
               });
            });
            gl.find('.gs_sc_item_more').each(function(){
                var aDom = $(this);
                aDom.attr('href',aDom.attr('waphref'));
                aDom.removeAttr('target');
            });
            glBtn.on('click',function () {
                var $this = $(this);
                if($this.attr('data-clk') === 'true'){
                    glItem.removeClass('cur');
                    glBtn.attr('data-clk','false');
                }else{
                    glItem.removeClass('cur');
                    $this.closest('.gs_sc_item').addClass('cur');
                    glBtn.attr('data-clk','false');
                    $this.attr('data-clk','true');
                }
            });
            glBtn.attr('data-clk','false');
            glItem.eq(0).addClass('cur').find('.gs_sc_item_btn').attr('data-clk','true');
        }
        var $gsSCM = $('#gsSCM');
        $gsSCM.find('.collectbox').show();
        if($gsSCM.find('.gs_sc_item').length<=0){
            $gsSCM.remove();
        }else{
            strategyCollect();
        }
    },
    gsListFunc:function () {
        var glList = $('#gsGlList');
        function strategyCollect() {
            var gl = $('.gs_strategy_collect'),
                glBtn = gl.find('.gs_sc_item_btn'),
                glItem = gl.find('.gs_sc_item');
            gl.find('.gs_sc_tit').hide();
            glItem.each(function () {
                $(this).find('li').each(function () {
                    var aDom = $(this).find('a');
                    aDom.attr('href',aDom.attr('waphref'));
                    aDom.removeAttr('target');
                });
            });
            gl.find('.gs_sc_item_more').each(function(){
                var aDom = $(this);
                aDom.attr('href',aDom.attr('waphref'));
                aDom.removeAttr('target');
            });
            function autoMove() {
                var itemCur = gl.find('.gs_sc_item.cur');
                if(itemCur.length>0){
                    var sti = $('body').scrollTop() > $('html').scrollTop()?$('body').scrollTop():$('html').scrollTop();
                    var dt = itemCur.offset().top,st = sti + 46;
                    if(dt < st){
                        $('html,body').animate({scrollTop:dt - 46},100);
                    }
                }
            }
            glBtn.on('click',function () {
                var $this = $(this),slHeight;
                if($this.attr('data-clk') === 'true'){
                    glBtn.attr('data-clk','false');
                    glItem.removeClass('cur');
                }else{
                    glItem.removeClass('cur');
                    glBtn.attr('data-clk','false');
                    $this.attr('data-clk','true');
                    $this.closest('.gs_sc_item').addClass('cur');
                }
                autoMove()
                slHeight = gl.closest('.swiper-slide').height()
                gl.closest('.swiper-wrapper').css('height',slHeight+'px');
            });
            glBtn.attr('data-clk','false');
            glItem.eq(0).addClass('cur').find('.gs_sc_item_btn').attr('data-clk','true');
        }
        var $gsSCM = $('#gsGlListSCM');
        $gsSCM.find('.collectbox').show();
        if($gsSCM.find('.gs_sc_item').length<=0){
            $gsSCM.closest('.swiper-slide').remove();
            glList.attr('data-navnum',2);
            glList.find('.ymwTabNav').find('.swiper-slide').eq(0).remove();
        }else{
            strategyCollect();
            var slHeightInit = $('.gs_strategy_collect').closest('.swiper-slide').height();
            $('.gs_strategy_collect').closest('.swiper-wrapper').css('height',slHeightInit+'px');
        }
    },
    getHotsCount:function () {
        if($('.gsShowHots').length>0){
            $('.gsShowHots').each(function () {
                var $ul = $(this);
                $ul.find('li').each(function () {
                    var $this = $(this),
                        $hid = $this.find('.gsHots'),
                        hid = $hid.data('hots'),
                        isld = $hid.attr('data-isld');
                    if(isld == 'false'){

                        $.ajax({
                            type: "GET",
                            dataType: "jsonp",
                            url: "//click.gamersky.com/Common/GetHits.aspx",
                            data: {
                                id: hid,
                                script: "3"
                            },
                            success: function (data) {
                                $hid.html('人气：'+data.hits);
                                $hid.attr('data-isld',true);
                            }
                        });
                    }
                })
            })
        }
    },
	doJs:function(th,fun){
		if(!th.length == 0){
			fun&&fun();
		}
	}
}
//调用数据
var ymwapDataJs={   
    getCmnums:function(){
        var cycm = "";
        $(".cy_comment").each(function () {
            var $this = $(this);
            if (cycm !== "") {
                cycm = cycm + ","
            }
            if($this.attr('data-isloaded') !== 'loaded'){
                cycm = cycm + $this.attr("data-sid");
            }
        });
        if (cycm !== "") {
            $.ajax({
                type: "GET",
                url: "//cm.gamersky.com/commentapi/count",
                dataType: "jsonp",
                data: {
                    topic_source_id: cycm
                },
                success: function (responseJson) {
                    $.each(responseJson.result,function (i,item) {
                        $('.cy_comment[data-sid='+item.id+']')
                            .attr('data-isloaded','loaded')
                            .text(item.comments);
                    });
                }
            });
        }
    }, 
    newsloadmoreFunc:function(){
        $ymwLdMoreBtn = $('.newsloadmore');
        $ymwLdMoreBtn.on('touchend',ymwLdMoreBtnFun);
        function ymwLdMoreBtnFun(event) {
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var $ulist = $('.ymwNews');
            var templatekey = $ulist.attr("templateKey");
            var page = parseInt($ulist.attr("data-page")) + 1;
            var nodeid = $ulist.attr("data-nodeId");
            var id = $(".ymwNews").find('li').eq(-1).attr("data-id");
            var nodes = $('.ymwNews').attr("nodes");
            var jsondata = {
                type: "getwaplabelpage", isCache: true, cacheTime: 60, templatekey: templatekey, id: id, nodeId: nodeid, page: page, nodes: nodes
            };
            $.ajax({
                type: 'GET',
                url: "//db2.gamersky.com/LabelJsonpAjax.aspx",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                dataType: "jsonp",
                beforeSend:function(){                    
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function (data) {
                    $ulist.attr("data-page", page);
                    if (data.body.indexOf("没有任何记录") > 0) {
                        $this.attr('data-txt','全部加载完成');
                    }
                    else {
                        $(data.body).insertBefore($this);
                    }
                },
                complete:function(){
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    ymwapDataJs.getCmnums();
                    $this.on('touchend',ymwLdMoreBtnFun);              
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
            return false;
        }
    },
    //加载更多列表
    ymwListMoreFun: function () {
        var $ul = $('.ymwListMore');
        $ul.each(function () {
            var $this = $(this),
                ulist = $this.find('li'),
                ldnum = $this.attr('data-listshow'),
                lmbtn = $this.find('.ymwListMoreBtn'),
                url = lmbtn.attr('data-link'),
                txt = lmbtn.attr('data-txt');
            for (var i = ldnum; i < ulist.length; i++) {
                ulist.eq(i).hide();
            };
            lmbtn.on('click', function (event) {
                event.preventDefault();
                for (var i = ldnum; i < ulist.length; i++) {
                    ulist.eq(i).show();
                };
                $(this).attr('href', url).off().find('span').html(txt);
            });
        });
    },
    ymwSpecialmoreFun:function () {
        $btn = $('.specialmore');
        $btn.each(function(){
            $(this).on('touchend',specialmoreFun);
        });
        function specialmoreFun(event) {
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var wapList = $this.closest('.speciallist');
            var templatekey = wapList.attr("data-templatekey");
            var page = parseInt(wapList.attr("data-page")) + 1;
            var specialid = wapList.attr("data-specialid");
            var isspecialId = wapList.attr("data-isSpecialId");
            var jsondata = {
                type: "getwapspecialpage",
                isCache: true,
                cacheTime: 60,
                specialId: specialid,
                isSpecialId: isspecialId,
                templatekey: templatekey,
                page: page
            };
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//db2.gamersky.com/LabelJsonpAjax.aspx",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                beforeSend: function() {
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function(data) {
                    if (data.status = 'ok') {
                        wapList.attr("data-page", page);
                        if (data.totalPages <= page) {
                            if (data.totalPages == page) {
                                $(data.body).insertBefore($this);
                            }
                            $this.attr('data-txt','全部加载完成');
                        } else {
                            if (data.totalPages > page) {
                                $(data.body).insertBefore($this);                                                               
                            }
                        }
                        ymwapJs.getHotsCount();
                    }
                },
                complete: function() {
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    var h = $this.closest('.swiper-slide').height() + 'px';
                    $this.closest('.swiper-wrapper').css('height',h);
                    $this.on('touchend', specialmoreFun);
                },
                error: function() {
                    if (navigator.userAgent.indexOf('UCBrowser') > -1) {
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
        }
    },
    ymwKulistloadmoreFun:function () {
        $btn = $('.kulistloadmore');
        $btn.each(function(){
            $(this).on('touchend',KulistloadmoreFun);
        });
        function KulistloadmoreFun(event) {
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var wapList = $this.closest(".wapList");
            var len = wapList.find("li").length;
            var nodeid = wapList.attr("data-nodeid");
            var modeid = wapList.attr("data-modeid");
            var Keyword = wapList.attr("Keyword");
            var gamelib = wapList.attr("data-gamelid");
            var page = parseInt(wapList.attr("data-page")) + 1;
            var type = wapList.attr('data-type');
            var templata = "{PE.Label id='获取wap游戏内容页相关内容' gameLib='" + gamelib + "' page='" + page + "' size='10' nodeid='" + nodeid + "' specialid='' Keyword='" + Keyword + "' ModelId='" + modeid + "' type='" + type + "' /}";
            var data = {
                isCache: false, cacheTime: 0, templateKey: "", templata: templata
            };
            $.ajax({
                type: 'GET',
                url: "//db2.gamersky.com/WapAjax.aspx",
                data: {
                    json: JSON2.stringify(data), jsondata: "putlabelbody"
                },
                dataType: "jsonp",
                beforeSend: function() {
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function(data) {
                    wapList.attr("data-page", page);
                    if (len < 10 * (page - 1)) {
                        $this.attr('data-txt','全部加载完成');              
                    }
                    else {
                        $(data.body).insertBefore($this);
                    }
                },
                complete: function() {
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    var h = $this.closest('.swiper-slide').height() + 'px';
                    $this.closest('.swiper-wrapper').css('height',h);
                    $this.on('touchend', KulistloadmoreFun);
                    ymwapDataJs.getCmnums();
                },
                error: function() {
                    if (navigator.userAgent.indexOf('UCBrowser') > -1) {
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
        }
    },
    ymwNewglldmoreFun:function () {
        $btn = $('.glnewmore');
        $btn.each(function(){
            $(this).on('touchend',NewglldmoreFun);
        });
        function NewglldmoreFun(event) {
            event.preventDefault();
            var $this = $(this);
            var page = parseInt($this.attr("data-page")) + 1;
            var templata = "{PE.Label id=\"获取Wap攻略推荐列表\" page=\"" + page + "\" size=\"20\" type=\"new\" zm=\"\" /}";
            var data = {
                isCache: false, cacheTime: 0, templateKey: "", templata: templata
            };
            $.ajax({
                type: 'GET',
                url: "//db2.gamersky.com/WapAjax.aspx",
                data: {
                    json: JSON2.stringify(data), jsondata: "putlabelbody"
                },
                dataType: "jsonp",
                beforeSend: function() {
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function(data) {
                    $this.attr("data-page", page);
                    $(data.body).insertBefore($this);                    
                },
                complete: function() {
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    var h = $this.closest('.swiper-slide').height() + 'px';
                    $this.closest('.swiper-wrapper').css('height',h);
                    $this.on('touchend', NewglldmoreFun);
                },
                error: function() {
                    if (navigator.userAgent.indexOf('UCBrowser') > -1) {
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
            return false;
        }
    },
    searchFun: function () {
        var $swrap = $('#ymwSearchIn'),
        defSecTxt = "输入搜索内容";
        $swrap.each(function(){
            var $this = $(this),
            $searchBtn = $this.find('.ymwSearchBtn'),
            $sipt = $this.find('.ymw-search-ipt');
            $sipt.on("keypress",secIptFun);
            $searchBtn.on("tap", secBtnFun);          
            $sipt.on({
                'focus':function(){
                    if($(this).val()==defSecTxt){
                        $(this).val('');
                    }
                },
                'blur':function(){
                    if($(this).val()==''){
                        $(this).val(defSecTxt);
                    }
                }
            });
        });
        
        function secIptFun(event,ipt){
            if (event.which == 13 && !event.shiftKey) {
                event.preventDefault();
                goSearch($(this));
            }
        }
        function secBtnFun(event,ipt){            
            event.preventDefault();
            goSearch($(this).parent().find('.ymw-search-ipt'));                      
        }
        function goSearch(ipt){
            var searchText = ipt.val();
            var node = $(".ymw-search-nav .cur").attr("date-node");
            if (typeof(node) == "undefined") {
                node = "all";
            }
            if (searchText != "" && searchText != defSecTxt) {
                searchText = encodeURIComponent(searchText.replace("<", "").replace(">", ""));
                window.location.href = "//wap.gamersky.com/" + node + "/search.html?keyword=" + searchText + "";
            }
        }
    },
    wapSearchMoreFunc: function () {
        $wapSMBtn = $('.wapSearchButton');
        $wapSMBtn.on('touchend', wapSearchMoreBtn);
        function wapSearchMoreBtn(event){
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var wapList = $(".wapList");
            var dataUrl = wapList.attr("data-dataurl");
            var pageSize = wapList.attr("data-pagesize");
            var type = wapList.attr("data-type");
            var page = parseInt(wapList.attr("data-page")) + 1;
            var totalPage = parseInt(wapList.attr("date-totalpage"));
            var excludeItems = wapList.attr("excludeItems");
            var keyword = wapList.attr("keyword");
            $.ajax({
                type: "GET",
                url: dataUrl,
                dataType: "html",
                data: {
                    page: page,
                    pageSize: pageSize,
                    type: type,
                    excludeItems: excludeItems,
                    keyword: keyword
                },
                beforeSend: function() {
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function (html) {
                    wapList.attr("data-page", page);
                    if (totalPage < page) {
                        $this.attr('data-txt','全部加载完成'); 
                    }
                    else {
                        wapList.append(html);
                        ymwapDataJs.getCmnums();
                    }
                },
                complete: function() {
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    $this.on('touchend', wapSearchMoreBtn);
                    ymwapJs.doJs($('.ymw-list-three'),ymwapJs.listThree('.ymw-list-three'));
                    setTimeout(function(){
                        ymwapJs.listThree('.ymw-list-three');
                        resizeSwpH($this);
                    },2000); 
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                    console.log('错误')
                }
            });
        }
    }, 
    waploadmoreFunc:function(){
        $ymwLdMoreBtn = $('.wapDataButton');
        $ymwLdMoreBtn.on('click',ymwLdMoreBtnFun);
        function ymwLdMoreBtnFun(event) {
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var $ulist = $(this).closest('.wapList');
            var templatekey = $ulist.attr("templateKey");
            var page = parseInt($ulist.attr("data-page")) + 1;
            var nodeid = $ulist.attr("data-nodeId");
            var id = $ulist.find('li').eq(-1).attr("data-id");
            var nodes = $ulist.attr("nodes");
            var jsondata = {
                type: "getwaplabelpage", isCache: true, cacheTime: 60, templatekey: templatekey, id: id, nodeId: nodeid, page: page, nodes: nodes
            };
            $.ajax({
                type: 'GET',
                url: "//db2.gamersky.com/LabelJsonpAjax.aspx",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                dataType: "jsonp",
                beforeSend:function(){                    
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function (data) {
                    $ulist.attr("data-page", page);
                    if (data.body.indexOf("没有任何记录") > 0) {
                        $this.attr('data-txt','全部加载完成');
                    }
                    else {
                        $(data.body).insertBefore($this);
                        ymwapDataJs.getUserScore();
                    }
                },
                complete:function(){
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    ymwapDataJs.getCmnums();
                    var h = $this.closest('.swiper-slide').height() + 'px';
                    $this.closest('.swiper-wrapper').css('height',h);
                    $this.on('touchend',ymwLdMoreBtnFun);              
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
            return false;
        }
    }, 
    waploadmoreAFunc:function(){
        $ymwLdMoreBtn = $('.wapDataButtonA');
        $ymwLdMoreBtn.on('touchend',ymwLdMoreBtnFun);
        function ymwLdMoreBtnFun(event) {
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var $ulist = $(this).closest('.wapListA');
            var templatekey = $ulist.attr("templateKey");
            var page = parseInt($ulist.attr("data-page")) + 1;
            var nodeid = $ulist.attr("data-nodeId");
            var id = $ulist.find('li').eq(-2).find('a').eq(-1).attr("data-id");
            var nodes = $ulist.attr("nodes");
            var jsondata = {
                type: "getwaplabelpage", isCache: true, cacheTime: 60, templatekey: templatekey, id: id, nodeId: nodeid, page: page, nodes: nodes
            };
            $.ajax({
                type: 'GET',
                url: "//db2.gamersky.com/LabelJsonpAjax.aspx",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                dataType: "jsonp",
                beforeSend:function(){                    
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function (data) {
                    $ulist.attr("data-page", page);
                    if (data.body.indexOf("没有任何记录") > 0) {
                        $this.attr('data-txt','全部加载完成');
                    }
                    else {
                        $(data.body).insertBefore($this.prev());
                        $this.prev().remove();
                    }
                },
                complete:function(){
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt')); 
                    $this.on('touchend',ymwLdMoreBtnFun); 
                    ymwapJs.listThree('.ymw-list-three');
                    resizeSwpH($this);                  
                    isImgLoad($(this).closest('.wapListA').find('img'),function(){
                        ymwapJs.listThree('.ymw-list-three');
                        resizeSwpH($this);                     
                    });
                    setTimeout(function(){
                        ymwapJs.listThree('.ymw-list-three');
                        resizeSwpH($this);
                    },2000);  
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
            return false;
        }
    }, 
    waploadmoreDHFunc:function(){
        $ymwLdMoreBtn = $('.wapDataButtonDH');
        $ymwLdMoreBtn.on('touchend',ymwLdMoreBtnDHFun);
        function ymwLdMoreBtnDHFun(event) {
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var $ulist = $(this).closest('.wapList');
            var templatekey = $ulist.attr("templateKey");
            var page = parseInt($ulist.attr("data-page")) + 1;
            var nodeid = $ulist.attr("data-nodeId");
            var id = $ulist.find('li').eq(-1).attr("data-id");
            var nodes = $ulist.attr("nodes");
            var templata = "{PE.Label id=\"获取Wap动画列表\" page=\"" + page + "\" size=\"20\" type=\"red\" /}";
            var data = {
                isCache: false, cacheTime: 0, templateKey: "", templata: templata
            };
            $.ajax({
                type: 'GET',
                url: "//db2.gamersky.com/WapAjax.aspx",
                data: {
                    json: JSON2.stringify(data), jsondata: "putlabelbody"
                },
                dataType: "jsonp",
                beforeSend:function(){                    
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function (data) {
                    $ulist.attr("data-page", page);
                    if (data.body.indexOf("没有任何记录") > 0) {
                        $this.attr('data-txt','全部加载完成');
                    }
                    else {
                        $(data.body).insertBefore($this);
                    }
                },
                complete:function(){
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    ymwapDataJs.getCmnums();
                    $this.on('touchend',ymwLdMoreBtnDHFun);   
                    resizeSwpH($ulist);           
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
            return false;
        }
    }, 
    wapConMoreFunc:function(){
        $ymwLdMoreBtn = $('.wapContentButton');
        $ymwLdMoreBtn.on('touchend',wapConMoreFunc);
        function wapConMoreFunc(event) {
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var $ulist = $(this).closest('.wapList');
            var templatekey = $ulist.attr("templateKey");
            var page = parseInt($ulist.attr("data-page")) + 1;
            var nodeid = $ulist.attr("data-nodeId");
            var id = $this.attr("data-generalid");
            var jsondata = {
                isCache: false, cacheTime: 0, templateKey: templatekey, id: id, page: page
            };
            $.ajax({
                type: 'GET',
                url: "//db2.gamersky.com/TemplateJsonp.aspx",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                dataType: "jsonp",
                beforeSend:function(){                    
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function (data) {
                    if (data.status = 'ok') {
                        $ulist.attr("data-page", page);
                        if (page >= data.totalPages) {
                            $this.attr('data-txt','全部加载完成');
                            if (page == data.totalPages) {
                                $(data.body).insertAfter($ulist.find('li').last());
                            }
                        }
                        else {
                            $(data.body).insertAfter($ulist.find('li').last());
                        }
                    }
                },
                complete:function(){
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    ymwapDataJs.getCmnums();
                    $this.on('touchend',wapConMoreFunc);
                    //ymwapJs.doJs($('.ymw-list-pic'),ymwapJs.listPic);
                    resizeSwpH($ulist);          
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
            return false;
        }
    },
    tagldmoreFunc:function(){
        $wapTagBtn = $('.wapTagButton');
        $wapTagBtn.on('touchend', wapTagMoreBtn);
        function wapTagMoreBtn(event){
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var wapList = $this.parent().find(".wapList");
            var dataUrl = wapList.attr("data-dataurl");
            var pageSize = wapList.attr("data-pagesize");
            var type = wapList.attr("data-type");
            var sort = wapList.attr("data-sort");
            var page = parseInt(wapList.attr("data-page")) + 1;
            var totalPage = parseInt(wapList.attr("date-totalpage"));
            $.ajax({
                type: "GET",
                url: dataUrl,
                dataType: "html",
                data: {
                    page: page,
                    pageSize: pageSize,
                    type: type,
                    sort: sort,
                },
                beforeSend: function() {
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function (html) {
                    wapList.attr("data-page", page);
                    if (totalPage < page) {
                        $this.attr('data-txt','全部加载完成'); 
                    }else if(totalPage == page){
                        $this.attr('data-txt','全部加载完成'); 
                        wapList.append(html);
                        ymwapDataJs.getCmnums();
                    }else {
                        wapList.append(html);
                        ymwapDataJs.getCmnums();
                    }
                },
                complete: function() {
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    $this.on('touchend', wapTagMoreBtn);
                    ymwapJs.doJs($('.ymw-list-three'),ymwapJs.listThree('.ymw-list-three'));
                    resizeSwpH(wapList);
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                    console.log('错误')
                }
            });
        }
    },
    getUserScore:function(){
        $('.ymwUserScoreShow').each(function() {
            var $this = $(this),
                gid = $this.attr('data-generalId');
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//i.gamersky.com/apirating/init",
                data: {
                    'generalId': gid,
                    'ratingType': 0,
                    'Action': "init"
                },
                success: function(data) {
                    if (data.hasOwnProperty("status")) {
                        switch (data.status) {
                            case "err":
                                console.log("提交" + tips + "错误！");
                                break;
                            case "existuser":
                            case "existip":
                                console.log("已" + tips + "！");
                                break;
                            default:
                                break;
                        }
                    } else {
                        //$this.find('i').html('('+data.Times+'人参与)');
                        var jsnum = Math.floor(data.Average);
                        $this.addClass('ymw-star'+ jsnum).html('<span>('+data.Times+'人参与)</span>')
                        //$this.html((data.Average == 10 ? "10" : data.Average.toFixed(1)) + '分<b>('+data.Times+')</b>');
                    }
                }
            });
        });
    }
}
ymwapJs.htmlAndroidiOs();
ymwapJs.doJs($('#ymwHeaderSwp'),ymwapJs.indexNavNew);
ymwapJs.doJs($('#gsGlList'),ymwapJs.gsListFunc);
ymwapJs.doJs($('.ymw-meun'),ymwapJs.hMeun);
ymwapJs.doJs($('.ymwSlider'),ymwapJs.sliderFun);
ymwapJs.doJs($('.ymwScroImg'),ymwapJs.scrollImgFun);
//ymwapJs.doJs($('.ymw-list-pic'),ymwapJs.listPic);
ymwapJs.doJs($('.ymw-list-three'),ymwapJs.listThree('.ymw-list-three'));
ymwapJs.doJs($('.ymwTab'),ymwapJs.tabFun);
ymwapJs.doJs($('.ymwTabNavFixed'),ymwapJs.fixTabNav);
ymwapJs.doJs($('.ymwSxbtn'),ymwapJs.sxFun);
ymwapJs.doJs($('.ymwJtImg'),ymwapJs.jtFunc);
ymwapJs.doJs($('.ymw-autoHide'),ymwapJs.zkFunc);
ymwapJs.doJs($('.ymw-pf-btn'),ymwapJs.pfFunc);
ymwapJs.doJs($('.ymw-juji'),ymwapJs.dhsets);
ymwapJs.doJs($('.ymw-glal-list-2017'),ymwapJs.glFunc);
ymwapJs.doJs($('.ymwsRespage'),ymwapJs.searchPageFunc);
ymwapJs.doJs($('.ymwSyLink'),ymwapJs.SyLinkFun);
ymwapJs.doJs($('.ymwPzData'),ymwapJs.ymwPzDataFun);
ymwapJs.doJs($('.ymwListJx'),ymwapJs.ymwListJxFunc);
ymwapJs.doJs($('.ymwListZone'),ymwapJs.ymwListZoneFunc);
ymwapJs.doJs($('.ymsSyDlStarsWrap'),ymwapJs.ymwsyScoreFun);
ymwapJs.doJs($('#ymwZpAreaStar'),ymwapJs.zpFunc);
ymwapJs.doJs($('.ymw-article-nav-in'),ymwapJs.articleNav);
ymwapJs.doJs($('#gsSCM'),ymwapJs.gsSCMfunc);

ymwapJs.doJs($('.newsloadmore'),ymwapDataJs.newsloadmoreFunc);
ymwapJs.doJs($('.ymwListMore'),ymwapDataJs.ymwListMoreFun);
ymwapJs.doJs($('.specialmore'),ymwapDataJs.ymwSpecialmoreFun);
ymwapJs.doJs($('.kulistloadmore'),ymwapDataJs.ymwKulistloadmoreFun);
ymwapJs.doJs($('.glnewmore'),ymwapDataJs.ymwNewglldmoreFun);
ymwapJs.doJs($('#ymwSearchIn'),ymwapDataJs.searchFun);
ymwapJs.doJs($('.wapSearchButton'),ymwapDataJs.wapSearchMoreFunc);
ymwapJs.doJs($('.wapDataButton'),ymwapDataJs.waploadmoreFunc);
ymwapJs.doJs($('.wapDataButtonA'),ymwapDataJs.waploadmoreAFunc);
ymwapJs.doJs($('.wapDataButtonDH'),ymwapDataJs.waploadmoreDHFunc);
ymwapJs.doJs($('.wapContentButton'),ymwapDataJs.wapConMoreFunc);
ymwapJs.doJs($('.wapTagButton'), ymwapDataJs.tagldmoreFunc);
ymwapJs.doJs($('.ymwUserScoreShow'),ymwapDataJs.getUserScore);
ymwapJs.getHotsCount();

$(window).resize(function(){
	//ymwapJs.doJs($('.ymw-list-pic'),ymwapJs.listPic);
    ymwapJs.doJs($('.ymw-list-three'),ymwapJs.listThree('.ymw-list-three'));
    ymwapJs.doJs($('.ymwSxbtn'),ymwapJs.sxFun);
    ymwapJs.doJs($('.ymwJtImg'),ymwapJs.jtFunc);
    ymwapJs.doJs($('.ymwsRespage'),ymwapJs.searchPageFunc);
    ymwapJs.doJs($('#ymsSyDlStarsWrap'),ymwapJs.ymwsyScoreFun);
});
ymwapJs.qukTo();


function lockHtml(){
    var H = $('html'),w1,w2;
    w1 = $(window).width();
    H.addClass('html-lock-test');
    w2 = $(window).width();
    H.removeClass('html-lock-test');
    $("<style type='text/css' id='lockhtmlstyle'>.htmllock-margin{margin-right:" + (w2 - w1) + "px;overflow: hidden;}</style>").appendTo("head");
    H.addClass('htmllock-margin');
}
function unlockHtml(){
    var H = $('html');
    H.removeClass('htmllock-margin');
}
var t_img;
var isLoad = true;
function isImgLoad(myimg,callback){
    myimg.each(function(){
        if(this.height === 0){
            isLoad = false;
            return false;
        }
    });
    if(isLoad){
        clearTimeout(t_img);
        callback();
    }else{
        isLoad = true;
        t_img = setTimeout(function(){
            isImgLoad(callback);
        },200);
    }
}
function resizeSwpH(ths){
    var h = ths.closest('.swiper-slide').height() + 'px';
    ths.closest('.swiper-wrapper').css('height',h); 
}

function resizeVD() {    
    $(window).resize(function() {
        var ww = $(window).width() - 28,
            wh = ww * 9 / 16;
        $('.ymw-congame-dh-con-vd,.playArea').css({
            'width': ww + 'px',
            'height': wh + 'px'
        });
    });    
}
if($('.playArea').length>0 && $('.ymw-congame-dh-con').length < 1){
    resizeVD()
}
if($('.ymw-rel-infos').find('iframe').length>0){
    $(window).resize(function() {
        var ww = $(window).width() - 28,
            wh = ww * 9 / 16;
        $('.ymw-rel-infos').find('iframe').css({
            'width': ww + 'px',
            'height': wh + 'px'
        });
    }); 
}