///<reference path="/js/jquery-1.8.3.js"/>
///<reference path="00.swfobject.js"/>
///<reference path="01.video.js"/>

(function ($) {
    var labelJsonpUrl = "//db5.gamersky.com/LabelJsonpAjax.aspx";

    function isMobile() {
        var sUserAgent = navigator.userAgent.toLowerCase(),
        bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
        bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
        bIsMidp = sUserAgent.match(/midp/i) == "midp",
        bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
        bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
        bIsAndroid = sUserAgent.match(/android/i) == "android",
        bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
        bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile",
        bIsWebview = sUserAgent.match(/webview/i) == "webview";
        return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
    }
    $.fn.GamerSkyPlayer = function (options) {
        var config = {
            'height': '100%',
            'width': '100%',
            'videoSource': '.ymwQhYuanBtn'
        };

        if (options) { $.extend(config, options); }
        return this.each(function () {
            $(config.videoSource).on('touchend', function (event) {
                var $this = $(this);
                $this.siblings().removeClass('current');
                $this.addClass('current');
                var site_name = $(this).attr("data-sitename");
                var vid = $(this).attr("data-vid");
                var source = $(this).attr("data-source");
                if (!source) {
                    source = "";
                }
                var flashvars = "";
                var play_url = "";
                var iframe = false;
                var iframeUrl = "";
                switch (site_name) {
                    case 'youku':
                        play_url = 'http://static.youku.com/v1.0.0222/v/swf/player.swf?VideoIDS=' + vid;
                        flashvars += '&isShowRelatedVideo=false&amp;showAd=0&amp;show_pre=1&amp;show_next=1&amp;VideoIDS=' + vid + '&amp;isAutoPlay=true&amp;isDebug=false&amp;UserID=&amp;winType=interior&amp;playMovie=true&amp;RecordCode=1001,1002,1003,1004,1005,1006,2001,3001,3002,3003,3004,3005,3007,3008,9999';
                        iframe = true;
                        iframeUrl = "//player.youku.com/embed/" + vid;
                        break;
                    case 'tudou':
                        var digit_regex = /^\d+$/;
                        flashvars = 'tvcCode=-1&hd=2';
                        play_url = 'http://tudou.com/v/' + vid + '/&autoPlay=true';

                        if (vid.indexOf("code:") >= 0) {
                            if ($.browser.msie) {
                                if ($.browser.version == "6.0" || $.browser.version == "7.0" || $.browser.version == "8.0" || $.browser.version == "9.0") {
                                    play_url = 'http://tudou.com/v/' + vid.replace("code:", "") + '/&autoPlay=true';
                                }
                                else {
                                    iframe = true;
                                    iframeUrl = "//www.tudou.com/programs/view/html5embed.action?code=" + vid.replace("code:", "") + "&autoPlay=true";
                                }
                            }
                            else {
                                iframe = true;
                                iframeUrl = "//www.tudou.com/programs/view/html5embed.action?code=" + vid.replace("code:", "") + "&autoPlay=true";
                            }
                        }
                        break;
                    case 'tudou2':
                        flashvars = 'tvcCode=-1&hd=2';
                        play_url = 'http://js.tudouui.com/bin/lingtong/PortalPlayer_60.swf?tvcCode=-1&hd=2&iid=' + vid;
                        break;
                    case 'ku6':
                        play_url = "//player.ku6cdn.com/default/out/pv201109151705.swf?ver=108&vid=" + vid + "&type=v&referer=";
                        break;
                    case 'sina':
                        play_url = "//p.you.video.sina.com.cn/swf/bokePlayer20130723_V4_1_42_21.swf?vid=" + vid + "&clip_id=&imgurl=&auto=1&vblog=1&type=0&tabad=1&autoLoad=1&autoPlay=1&as=0&tjAD=0&tj=0&casualPlay=1&head=0&logo=0&share=0";
                        break;
                    case 'qq':
                        play_url = 'http://mat1.qq.com/news/act3/js/QQPlayer3.swf?vid=' + vid + '&skin=http://mat1.qq.com/news/act3/js/skins/QQPlayerSkin.swf&autoplay=1'
                        break;
                    case 'qq2':
                        play_url = 'http://imgcache.qq.com/tencentvideo_v1/player/TencentPlayer.swf?_v=20110829&vid=' + vid + '&autoplay=1';
                        break;
                    case 'pptv':
                        play_url = (vid.length > 13) ? 'http://player.pptv.com/v/' + vid + '.swf' : 'http://player.pptv.com/cid/' + vid + '.swf';
                        break;
                    case 'sohu':
                    case 'sohuvid':
                        play_url = 'http://share.vrs.sohu.com/' + vid + '/v.swf&skinNum=1&topBar=0&showRecommend=0&autoplay=true&api_key=e68e42f2beae6ba9ad6bd25e2653632f&fbarad=';
                        break;
                    case 'sohuid':
                        play_url = 'http://share.vrs.sohu.com/my/v.swf&topBar=1&id=' + vid + '&autoplay=true&from=page';
                        break;
                    case 'letv':
                        play_url = 'http://i7.imgs.letv.com/player/swfPlayer.swf?id=' + vid + '&autoplay=1&isPlayerAd=0';
                        break;
                    case 'letv1':
                        play_url = vid.replace(/&width=\d+/g, "").replace(/&height=\d+/g, "");
                        iframe = true;
                        iframeUrl = play_url + "&width=" + config.width + "&height=" + config.height;
                    case 'qingkong':
                        play_url = 'http://donghua.dmzj.com/flvplayer.swf?file=http://v.qingkong.net/bp/a.php/' + vid + '.mp4&autostart=true';
                        break;
                    case 'cntv':
                        play_url = 'http://player.cntv.cn/standard/cntvOutSidePlayer.swf?videoId=VIDE100165778382&videoCenterId=' + vid;
                        break;
                    case '56':
                        play_url = 'http://player.56.com/v_' + vid + '.swf/1030_ycc20060631.swf';
                        break;
                    case 'iqiyi':
                        play_url = vid.replace("&coop=测试&cid=", "") + "&cid=qc_105082_300395&bd=1&autoplay=1&coop=coop_1010_ymxk" + "&source=" + source;
                        iframe = true;
                        iframeUrl = play_url;
                        break;
                    case '17173':
                        //play_url = 'http://f.v.17173cdn.com/flash/PreloaderFileFirstpage.swf?cid=' + vid + "&autoplay=1"; 
                        play_url = 'http://f.v.17173cdn.com/flash/PreloaderFileFirstpage.swf?cid=' + vid + '&refer=';
                        break;
                    case 'ac':
                        play_url = 'http://static.acfun.mm111.net/player/ACFlashPlayer.out.swf?type=page&url=http://www.acfun.tv/v/' + vid;
                        break;
                    case 'bi':
                        play_url = "//static.hdslb.com/miniloader.swf?aid=" + vid + "&page=1";
                        break;
                    default:
                        play_url = vid;
                        break;
                }
                if (iframe) {                    
                    var iframeHtml = '<iframe height="' + config.height + '" width="' + config.width + '" src="' + iframeUrl + '" frameborder=0 allowfullscreen></iframe>';
                    if (site_name == 'youku') {
                        $.getScript('http://player.youku.com/jsapi', function() {
                            player = new YKU.Player("gamersky_player_box", {
                                client_id: '6bfe5b183f11e7d9',
                                vid: vid,
                                show_related: false
                            });
                        });
                    } else {
                        $("#gamersky_player_box").html(iframeHtml);
                    }
                } else {
                    var swf_obj = new SWFObject(play_url, 'gsvobject', config.width, config.height, '9.0.0', '#000000');
                    swf_obj.addParam('allowfullscreen', 'true');
                    swf_obj.addParam('allownetworking', 'all');
                    swf_obj.addParam('allowscriptaccess', 'always');
                    swf_obj.addParam('wmode', 'opaque');
                    swf_obj.addParam('quality', 'high');
                    swf_obj.addParam('flashvars', flashvars);
                    swf_obj.write('gamersky_player_box');
                }                             
            });
            $(config.videoSource).eq(0).trigger("touchend");
        });
    };

    $.fn.WapsupportMeInit = function (options) {
        return this.each(function () {
            var $this = $(this);
            var itemId = parseInt($this.attr("data-itemId"));
            var field = $this.attr("data-field");
            var isSupport = false;
            var tableName = $this.attr("data-table");
            if (!tableName) {
                tableName = 'PE_U_Video';
            }
            if ($.fn.cookie("GamerSkySupport" + itemId)) {
                isSupport = true;
            }
            var jsondata = {
                type: "updatelabel", labelname: "读取支持反对率", attr: {
                    itemId: itemId,
                    field: field,
                    tableName: tableName
                }
            };
            $.ajax({
                type: "GET",
                url: labelJsonpUrl,
                dataType: "jsonp",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                success: function (responseJson) {
                    if ($this.hasClass("play")) {
                        $this.html("<i class='yu-icon yu-icon-play'></i>" + responseJson.body + "");
                    }
                    if ($this.hasClass("ok")) {
                        $this.html("<i class='yu-icon yu-icon-zan'></i>" + responseJson.body + "");
                    }
                    if ($this.hasClass("no")) {
                        $this.html("<i class='yu-icon yu-icon-cai'></i>" + responseJson.body + "");
                    }
                }
            });
        })
    };
    $.fn.WapsupportMe = function (options) {
        return this.each(function () {
            var $this = $(this);
            var itemId = parseInt($this.attr("data-itemId"));
            var field = $this.attr("data-field");

            var tableName = $this.attr("data-table");
            if (!tableName) {
                tableName = 'PE_U_Video';
            }
            var autoUpdate = $this.attr("data-auto");
            if (autoUpdate && autoUpdate == 'true') {
                var jsondata = {
                    type: "updatelabel", labelname: "Digg统计", attr: {
                        itemId: itemId,
                        field: field,
                        tableName: tableName
                    }
                };
                $.ajax({
                    type: "GET",
                    url: labelJsonpUrl,
                    dataType: "jsonp",
                    data: {
                        jsondata: JSON2.stringify(jsondata)
                    },
                    success: function (responseJson) {
                    }
                });
            }
            $(this).on('tap', function (event) {
                var isSupport = false;
                if ($.fn.cookie("GamerSkySupport" + itemId)) {
                    isSupport = true;
                }
                if (isSupport) {
                    return;
                }
                $.fn.cookie("GamerSkySupport" + itemId, 1, { path: "/" });
                var jsondata = {
                    type: "updatelabel", labelname: "Digg统计", attr: {
                        itemId: itemId,
                        field: field,
                        tableName: tableName
                    }
                };
                $.ajax({
                    type: "GET",
                    url: labelJsonpUrl,
                    dataType: "jsonp",
                    data: {
                        jsondata: JSON2.stringify(jsondata)
                    },
                    success: function (responseJson) {
                        $this.WapsupportMeInit();
                    }
                });

            });
            $this.WapsupportMeInit();
        });
    }
    $(document).ready(function () {        
        $(".wapsupportMe").WapsupportMe();
        // var iframeLength = document.getElementsByTagName("iframe").length;
        // var embedLenfth = document.getElementsByTagName("embed").length;
        // $("#leshitvauto").height(document.body.clientWidth * (9 / 16)).width(document.body.clientWidth - 20);
        // if (iframeLength > 0) {
        //     for (var i = 0; i < iframeLength; i++) {
        //         var iframeElements = document.getElementsByTagName("iframe")[i];
        //         if (iframeElements.style["display"] != "none") {
        //             iframeElements.removeAttribute("style");
        //         }
        //         iframeElements.height = document.body.clientWidth * (9 / 16);
        //         iframeElements.width = document.body.clientWidth - 20;
        //     }

        // }
        // if (embedLenfth > 0) {
        //     for (var n = 0; n < embedLenfth; n++) {
        //         if (document.getElementsByTagName("embed")[n].style["display"] != "none") {
        //             document.getElementsByTagName("embed")[n].removeAttribute("style");
        //         }
        //         document.getElementsByTagName("embed")[n].height = document.body.clientWidth * (9 / 16);
        //         document.getElementsByTagName("embed")[n].width = document.body.clientWidth - 20;
        //     }
        // }
    });
})(jQuery);
