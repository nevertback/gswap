(function () {
    function setIframeSize(wrap, n) {
        function aritcleVideo() {
            var ww = $(document).width(),
                aw = ww - n,
                ch = aw / 16 * 9;
            $(wrap).find('iframe').css({
                'width': aw + 'px',
                'height': ch + 'px'
            });
            if ($('#youkuplayer_0').length != 0) {
                $(wrap).find('#youkuplayer_0').css({
                    'width': aw + 'px',
                    'height': ch + 'px'
                });
            } else if ($('#youkuplayer_1').length != 0) {
                $(wrap).find('#youkuplayer_1').css({
                    'width': aw + 'px',
                    'height': ch + 'px'
                });
            }
        }
        if ($(wrap).length != 0) {
            aritcleVideo();
            setTimeout(function () {
                aritcleVideo();
            }, 2000);
        } else {
            return false;
        }
    }
    function setIframeSizeRem(wrap, ww) {
        function aritcleVideo() {
            var iframeLength = document.getElementsByTagName("iframe").length;
            if (iframeLength > 0) {
                for (var i = 0; i < iframeLength; i++) {
                    var iframeElements = document.getElementsByTagName("iframe")[i];
                    if (iframeElements.style["display"] != "none") {
                        iframeElements.removeAttribute("style");
                    }
                }
            }
            var aw = ww,
                ch = aw / 16 * 9;
            $(wrap).find('iframe').css({
                'width': aw + 'rem',
                'height': ch + 'rem'
            });
            if ($('#youkuplayer_0').length > 0) {
                $(wrap).find('#youkuplayer_0').css({
                    'width': aw + 'rem',
                    'height': ch + 'rem'
                });
            } else if ($('#youkuplayer_1').length > 0) {
                $(wrap).find('#youkuplayer_1').css({
                    'width': aw + 'rem',
                    'height': ch + 'rem'
                });
            }
            $('#leshitvauto').css({
                'width': aw + 'rem',
                'height': ch + 'rem'
            });
        }
        if ($(wrap).length != 0) {
            aritcleVideo();
            setTimeout(function () {
                aritcleVideo();
            }, 2000);
        } else {
            return false;
        }
    }
    setIframeSizeRem('.ymw-contxt', 6.7);
    setIframeSize('.ymw-rel-infos', 28);
    function downVideo() {
        var ww = $(document).width(),
            aw = ww - 28,
            ch = aw / 16 * 9;
        if ($('.ymw-gmvd').find('.yu-btn-yuan').length == 0) {
            $('.ymw-gmvd').remove();
        } else {
            $('.ymw-gmvd').find('.yu-btn-yuan').addClass('ymwQhYuanBtn');
            $("#gamersky_player_box").GamerSkyPlayer();
            $("#gamersky_player_box").css({ 'width': aw + 'px', 'height': ch + 'px' });
        }
    }
    if ($('.ymw-gmvd').length != 0) {
        downVideo();
    }
    (!$('.ymw-contxt').length == 0) ? contentJs() : void 0;
    if ($('.pingce2').length != 0) {
        addPcNum();
    }
    if ($('.dianping').length != 0) {
        addPcNum();
    }
})();
(function ($) {
    $.fn.wanFun = function () {
        var ids = "";
        $(".btnAddRemark[data-type='7']").each(function () {
            if (ids != "") {
                ids = ids + ","
            }
            ids = ids + $(this).attr("gameId");
        });
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "//cm1.gamersky.com/apirating/getwanrating",
            data: { 'Idlist': ids },
            success: function (data) {
                if (data.status == 'ok') {
                    $.each(data.result, function (index, value) {
                        $(".btnAddRemark[gameId='" + value.gameId + "'][data-type='7']").find("i").text(value.wantplayCount);
                        $(".btnAddRemark[gameId='" + value.gameId + "'][data-type='8']").find("i").text(value.playedCount);
                    });
                }
            }
        });
    };
    $.fn.addwanFun = function (fun) {
        var $this = $(this);
        if ($this.attr("data-isclk") == "true") {
            $this.attr("data-isclk", false);
            var gameId = $("#remarkFilter").attr("sid");
            var type = $this.attr("data-type");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//cm1.gamersky.com/apirating/addwanRating",
                data: { 'Rating': JSON2.stringify({ "GenneralId": gameId, 'Sorce': "1", 'Type': type,'FromDevice':1 }) },
                success: function (data) {
                    if (data.status == "ok") {
                        if ($this.hasClass("cur")) {
                            var $that = $(".game_bot").find(".btnAddRemark[data-type=" + type + "]");
                            $that.addClass("cur").siblings().removeClass("cur");
                            $that.find("i").html(data.times);
                            var m = parseInt($that.siblings().find("i").text());
                            if (m > 0 && data.isFrist == false) {
                                $that.siblings().find("i").html(m - 1);
                            }
                        }
                        else {
                            $this.addClass("cur").siblings().removeClass("cur");
                            $this.find("i").html(data.times);
                            var m = parseInt($this.siblings().find("i").text());
                            if (m > 0 && data.isFrist == false) {
                                $this.siblings().find("i").html(m - 1);
                            }
                        }
                        $(".addreview").attr("data-type", type);
                        setTimeout(function () { $(".mycomment").GetMyCommet() }, 1000);
                    }
                    $this.attr("data-isclk", true);
                    if (fun != undefined) { fun(data); }
                }
            });
        }
    }
    $.fn.getMyRating = function () {
        var gameId = $("#remarkFilter").attr("sid");
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//cm1.gamersky.com/apirating/getuserrating",
                data: { 'Rating': JSON2.stringify({ "GenneralId": gameId, 'Type': "0" }) },
                success: function (data) {
                    if (data.sorce > 0) {
                        var n = parseInt(data.sorce / 2);
                        var txt = $this.find("a").eq(n - 1).attr("data-txt");
                        $this.find(".gs_zp_txt").html(txt);
                        $this.find("a").removeClass("cur");
                        var cmtId = $(".mycomment").find(".comm_infos").attr("cmtid");
                        $(".myscorestar[cmtid=" + cmtId + "]").find("a").removeClass("cur");
                        for (var i = 0; i < n; i++) {
                            $this.find("a").eq(i).addClass("cur");
                            $(".myscorestar[cmtid=" + cmtId + "]").each(function () {
                                $(this).find("a").eq(i).addClass("cur");
                            });
                        }
                    }
                }
            });
        })
    }
    $.fn.getUserRating = function () {
        return this.each(function () {
            var $this = $(this);
            var gameId = $this.attr("gameId");
            $.ajax({
                type: "GET", dataType: "jsonp", url: "//cm1.gamersky.com/apirating/getplayersscore",
                data: { jsondata: JSON2.stringify({ genneralId: gameId, num: "10" }) },
                success: function (responseJson) {
                    if (responseJson.status == 'ok') {
                        $(".game_score_loading").hide();
                        $(".game_top").find(".userrating").removeClass("sc_loading");
                        if ($(".dataTime").attr("date-selltime") == "已上市") {
                            if (responseJson.totalnumber >= 10) {
                                var sorce = responseJson.sorce >= 10 ? "10" : responseJson.sorce;
                                $this.show().find(".num").html(sorce);
                                $this.find(".comm span").html(responseJson.totalnumber);
                                $this.find(".gs_zp_star_group").find("i").attr("style", "width:" + responseJson.sorce * 10 + "%");
                            }
                            else {
                                $this.show().find(".num").attr("class", "noper").html("人数不足");
                                $this.find(".comm span").html(responseJson.totalnumber);
                            }
                        }
                        else {
                            if ($this.find(".game_score").length > 0) {
                                $this.show().attr("class", "no_game").find(".game_score").attr("class", "num").html("<span>" + responseJson.wanNumber + "</span>人期待");
                            }
                            else {
                                $this.show().attr("class", "no_game").find(".num").html("<span>" + responseJson.wanNumber + "</span>人期待");
                            }
                            $this.find(".gs_zp_star_group,.comm").remove()
                        }

                    }
                }
            });
        })
    }
    $.fn.judgewanFun = function () {
        var ids = "";
        $(".btnAddRemark[data-type='7']").each(function () {
            if (ids != "") {
                ids = ids + ","
            }
            ids = ids + $(this).attr("gameId");
        });
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "//cm1.gamersky.com/apirating/Judge",
            data: { 'Idlist': ids },
            success: function (data) {
                if (data.status == "ok") {
                    $.each(data.result, function (index, value) {
                        if (value.wantPlay == 'True') {
                            $(".btnAddRemark[gameId='" + value.gameId + "'][data-type='7']").addClass("cur");
                            $(".addreview").attr("data-type", 7);
                            $(".scorestar a").attr("title", "玩过才可以打分!");
                        }
                        if (value.played == 'True') {
                            $(".addreview").attr("data-type", 8);
                            $(".btnAddRemark[gameId='" + value.gameId + "'][data-type='8']").addClass("cur");
                        }
                    });
                }
            }
        });
    }
    $('.ymw-btns-pc').attr('target', '_blank')
    $('.ymw-btns-pc').on('click', function () {
        var cookieval = 'wapopenpc', cookievalTime = 'wapopenpctimeout';
        if ($.fn.cookie(cookieval) == undefined || $.fn.cookie(cookieval) == null) {
            $.fn.cookie(cookieval, 'yes', { path: '/', domain: '.gamersky.com' })
        }
        if ($.fn.cookie(cookievalTime) == undefined || $.fn.cookie(cookievalTime) == null) {
            $.fn.cookie(cookievalTime, 'yes', { path: '/', domain: '.gamersky.com', expires: 0.5 })
        }
    })
    $.fn.QZloginForm = function () {
        var $this = $(this);
        $this.on("click", "#qqLogin", function (event) {
            event.preventDefault();
            var returnUrl = window.location.href;
            window.location.href = "//i.gamersky.com/oauth/authorizelogin?authorizetype=qq&returnUrl=" + encodeURI(returnUrl);
        }).on("click", "#sinaLogin", function (event) {
            event.preventDefault();
            var returnUrl = window.location.href;
            window.location.href = "//i.gamersky.com/oauth/authorizelogin?authorizetype=sina&returnUrl=" + encodeURI(returnUrl);
        })
    };
    $.fn.insertYmwLoginPop = function () {
        // $('.ymw-loginpopMsk,.ymw-loginpop').remove();
        // var returnUrl = encodeURI(window.location.href);
        // var ymwLoginDom = '';
        // ymwLoginDom += '<div class="ymw-loginpopMsk"></div><div class="ymw-loginpop"><h5>登录后参加互动</h5><p><span>你可以通过一下方式登录</span></p><div class="ymw-loginpop-btns">';
        // 游民登录
        // ymwLoginDom += '<a target="_blank" href="//i.gamersky.com/user/login.html?from=' + returnUrl + '" class="ymw-loginpop-gs"></a>';
        //QQ登录
        // ymwLoginDom += '<a target="_blank" href="javascript:;" id="qqLogin" class="ymw-loginpop-qq"></a>';
        //微博登录
        // ymwLoginDom += '<a target="_blank" href="javascript:;"  id="sinaLogin" class="ymw-loginpop-wb"></a>';
        // ymwLoginDom += '</div></div>';
        // $('body').append(ymwLoginDom);
        //点击弹窗外部关闭弹窗
        // $('.ymw-loginpopMsk').on('click', function () {
        // removeYmwLoginPop();
        // })
        $(".gsZpPopLoginClose").show();
        $(".gs_zp_pop_login").show();
        $('.gsZpPopLoginClose').on('click', function () {
            $(".gs_zp_pop_login").hide();
            $(".gsZpPopLoginClose").hide();
        })
    };
    $.fn.loginStatus = function () {
        var $this = $(this);
        var UserCookie = $.cookie("UserCookie");
        if (UserCookie !== undefined && UserCookie !== null) {
            var responseJson = $.parseJSON(UserCookie);
            var userface = responseJson.userface;
            if (userface == '') {
                userface = 'http://image.gamersky.com/webimg15/comment/anonymous.jpg';
            }
            $this.attr("src", userface);
            $this.next().html(responseJson.username);

        }
        else {
            $.ajax({
                type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/logincheck",
                success: function (responseJson) {
                    if (responseJson.status == "ok") {
                        $this.attr("src", responseJson.userface);
                        $this.next().html(responseJson.username);

                    }
                    else{
                        $(".gs_zp_myscore").parents(".gs_zp_box").click(function(){
                            $(this).insertYmwLoginPop();
                        });
                    }
                }
            });
        }
    };
    $.fn.gameMoreFun = function () {
        var $this = $(this);
        var gameId = $this.attr("gameId");
        var moreNumber = $(".dataTime").attr("date-selltime") == "未上市" ? 0 : 10;
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "//cm1.gamersky.com/apirating/gamemore",
            data: { 'jsondata': JSON2.stringify({ "GenneralId": gameId, number: moreNumber }) },
            success: function (data) {
                if (data.status == "ok") {
                    var htm = "";
                    var len = data.result.length > 3 ? 3 : data.result.length;
                    if(len==0){
                        $this.hide();
                    }
                    else if (len == 1 && data.result[0].percentAge == 0) {
                        $this.hide();
                    }
                    else {
                        for (var i = 0; i < len; i++) {
                            var percentAge = data.result[i].percentAge;
                            if (parseInt(percentAge) > 0) {
                                var nodeName = data.result[i].nodeName;
                                if (data.isListed == true) {
                                    htm += ' <p>好于' + percentAge + '%的' + nodeName + '</p>';
                                }
                                else {
                                    if (data.result[i].nodeDir == 'ku') {
                                        nodeName = "所有游戏";
                                    }
                                    htm += ' <p>超过' + percentAge + '%的'+nodeName+'</p>';
                                }
                            }
                        }
                        $this.html(htm);
                    }

                }
                else {
                    $this.hide();
                }
            }
        });
    };
    $.fn.starStatisticalFun = function () {
        return this.each(function () {
            var $this = $(this);
            var gameId = $this.attr("gameId");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//cm1.gamersky.com/apirating/starstatistics",
                data: { "GenneralId": gameId },
                success: function (data) {
                    if (data.status == "ok") {
                        var n = 0; maxNum = 0;
                        maxNum = parseFloat(data.result[0].percentAge);
                        for (var i = 1; i < data.result.length; i++) {
                            var h = parseFloat(data.result[i].percentAge);
                            if (h > maxNum) {
                                maxNum = h;
                            }
                        }

                        for (var i = data.result.length - 1; i >= 0; i--) {
                            n++;
                            var m = data.result[i].percentAge;
                            var w = m == maxNum ? "2rem" : (m / maxNum) * 2 + "rem";
                            w = maxNum == 0 ? maxNum : w;
                            $this.find(".star_progress").find("i").eq(n - 1).attr("style", "width:" + w + "");
                            $this.find(".t2").eq(n - 1).html("" + m + "%");
                        }
                    }
                }
            });
        })
    };
    //APP 下载统计
    $.fn.addClickCount = function (cid,cpos) {
        var $this = $(this),$href = $this.attr('href'),newUrl = '';
        $this.addClass('countHit countHitSql').attr('data-itemid',cid);
        if(typeof $href !== 'undefined'){
            if($href.indexOf('?') === -1){
                newUrl = $href+'?formpos='+cpos;
            }else{
                newUrl = $href+'&formpos='+cpos;
            }
            $this.attr('href',newUrl).attr('target','_blank');
        }
    }
})(jQuery);
$(function () {
    //APP 下载统计
    /*
    $('.ywm-header-img').find('a').addClickCount(995626,'wapnavindex');
    $('.ymw-logo').addClickCount(995625,'wapnav');
    $('.ymw-app-open').addClickCount(995625,'wapnav');
    $('.ymw-btns-app').addClickCount(995627,'wapbot');
    */
    $(".btnAddRemark").wanFun();
    $(".ymw_stars").getMyRating();
    checkMarketTime(".pingtai");
    $(".headpic").loginStatus();

    var pageIndex = $(".contentpage").attr("data-pageindx");
    if (pageIndex > 1) {
        var pageUrl = $(".contentpage").attr("href");
        pageUrl = pageUrl.split(".shtml");
        var contentpageUrl = pageUrl[0] + "_" + pageIndex + ".shtml?tag=wap"
        $(".contentpage").attr("href", contentpageUrl);
    }
});
function addPcNum() {
    function pc(str1, str2) {
        if ($(str1).length > 0) {
            var $str1 = $(str1), n = $str1.find(str2).text();
            if (n.indexOf(".") != -1) { n = Number(n.split(".")[1]) > 0 && Number(n.split(".")[1]) < 5 ? n.split(".")[0] + ".5" : Number(n).toFixed(); }
            n = n.replace(/.{0}/, "n").replace(".", "-");
            $str1.find(str2).attr("class", "pnum " + n);
        }
    }
    pc(".pingce2", ".pnum"); //游民点评
    pc(".dianping", ".pnum");    //游民点评
}
function contentJs() {
    for (var m = 0; m < document.getElementsByTagName("span").length; m++) {
        if (document.getElementsByTagName("span")[m].style.color == "rgb(255, 204, 0)") {
            document.getElementsByTagName("span")[m].style.color = "#d26217";
        }
        if (document.getElementsByTagName("span")[m].color == "#ffcc00" || document.getElementsByTagName("span")[m].color == "rgb(255, 204, 0)") {
            document.getElementsByTagName("span")[m].color = "#d26217";
        }
        //翠绿色替换
        if (document.getElementsByTagName("span")[m].color == "#00ee00") {
            document.getElementsByTagName("span")[m].color = "#228B22";
        }
    }
    for (var t = 0; t < document.getElementsByTagName("strong").length; t++) {
        if (document.getElementsByTagName("strong")[t].style.color == "rgb(255, 204, 0)") {
            document.getElementsByTagName("strong")[t].style.color = "#d26217";
        }
        if (document.getElementsByTagName("strong")[t].color == "#ffcc00" || document.getElementsByTagName("strong")[t].color == "rgb(255, 204, 0)") {
            document.getElementsByTagName("strong")[t].color = "#d26217";
        }
        //翠绿色替换
        if (document.getElementsByTagName("strong")[t].color == "#00ee00") {
            document.getElementsByTagName("strong")[t].color = "#228B22";
        }
    }

    for (var n = 0; n < document.getElementsByTagName("font").length; n++) {
        if (document.getElementsByTagName("font")[n].style.color == "rgb(255, 204, 0)") {
            document.getElementsByTagName("font")[n].style.color = "#d26217";
        }
        if (document.getElementsByTagName("font")[n].color == "#ffcc00" || document.getElementsByTagName("font")[n].color == "rgb(255, 204, 0)") {
            document.getElementsByTagName("font")[n].color = "#d26217";
        }
        //翠绿色替换
        if (document.getElementsByTagName("font")[n].color == "#00ee00") {
            document.getElementsByTagName("font")[n].color = "#228B22";
        }
        //黄色替换
        if (document.getElementsByTagName("font")[n].color == "#FFFF00") {
            document.getElementsByTagName("font")[n].color = "#ff6000";
        }
    }
    var blockreference = $(".blockreference").html();
    if ($(".blockreference").length > 0) {
        if ($(".referencecontent").length > 0) {
            $(".referencecontent").html(blockreference);
            $(".blockreference").remove();
        } else {
            $(".blockreference").css("display", "block");
        }
    }
}
function judgeTime(sellTime) {
    var reg = new RegExp("[\\u4E00-\\u9FFF]+");
    if (reg.test(sellTime)) {
        return false;
    }
    else {
        var myDate = new Date();
        var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        var date = myDate.getDate();
        var h = myDate.getHours();
        var m = myDate.getMinutes();
        var s = myDate.getSeconds();
        var now = year + '-' + padleft0(month) + "-" + padleft0(date);
        if (!checkEndTime(sellTime, now)) {
            return false;
        }
    }
    return true;
}
function checkMarketTime(div) {
    $(div).find("a").each(function () {
        var $this = $(this);
        var time = $this.attr("data-time");
        if (judgeTime(time)) {
            $(".dataTime").attr("date-selltime", "已上市");
            return false
        }
        else {
            $(".dataTime").attr("date-selltime", "未上市");
        }
    });
    setTimeout(function () { judgeListedState(".dataTime") }, 200);
}
function judgeListedState(div) {
    $(div).each(function () {
        var $this = $(this);
        var sellTime = $this.attr("date-selltime");
        var gameId = $("#remarkFilter").attr("sid"),qdDom = '';
        if (sellTime == '未上市') {
            qdDom += "<div class='btn_nogame btnAddRemark' gameid='" + gameId + "' data-isclk='true' data-type='7'>期待</div>";
            $(qdDom).insertAfter($('.game_bot').find('.btngroup'));
            $(".game_bot").show().find('.btngroup').remove();
            $(".btnAddRemark").btnAddRemarkFun();
            $(".addreview").attr("data-type", "7");
        }
        else {
            $(".game_bot").show();
            $(".star_details").starStatisticalFun().show();
            $(".addreview").attr("data-type", "8");
        }
    });
    $(".userrating").getUserRating();
    $(".remark_compare").gameMoreFun();
    $(".ymw_zp_pf_wd").judgewanFun();
}
//补齐两位数
function padleft0(obj) {
    return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
}
//比较日期大小
function checkEndTime(startTime, endTime) {
    if (typeof (startTime) == "undefined" || typeof (endTime) == "undefined") {
        return;
    }
    var start = new Date(startTime.replace("-", "/").replace("-", "/"));
    var end = new Date(endTime.replace("-", "/").replace("-", "/"));
    if (end < start) {
        return false;
    }
    return true;
}
function removeYmwLoginPop() {
    $('.ymw-loginpopMsk,.ymw-loginpop').remove();
}
(function ($) {
    var countlist = {
        //wap统计App打开-全站
        allsite:{
            count:995625,
            okcount:1002787
        },
        //wap统计App打开-首页
        home:{
            count:995626,
            okcount:1004314
        },
        //wap统计App打开-底部
        bottom:{
            count:995627,
            okcount:1004315
        },
        //wap统计App打开-内容页中按钮
        content:{
            count:1000245,
            okcount:1004317
        },
        //pc统计App打开-推荐阅读
        recommend:{
            count:1002539,
            okcount:1004318
        }
    };
    function fakeAlink(url) {
        var aDom = '',rm = new Date().getTime() + Math.floor(Math.random()*1000),aid = 'fakeAlink'+rm;
        aDom += '<a id="'+aid+'" target="_blank" style="display: none;" href="'+url+'"></a>';
        $('body').append(aDom);
        var fakebtn = document.getElementById(aid);
        fakebtn.click();
    }
    //APP
    var openAppJs = {
        config:{
            content:{
                cid:$('#wapcountn').attr('generalid'),
                target:'#gsTgWapConBdshareTop',
                backtarget:'.ymw-bdshare-new',
                pos:'before',
                count:countlist.content.count,
                okcount:countlist.content.okcount
            }
        },
        getUrlInfos:function () {
            var urlInfos='';
            urlInfos = location.href;
            if(urlInfos.indexOf('/news/')>0 || urlInfos.match('/content') !== null){
                return '新闻'
            }else if(urlInfos.indexOf('/gl/')>0 || urlInfos.indexOf('/sygl/')>0 || urlInfos.indexOf('/olgl/')>0){
                return '攻略'
            }else{
                return '其他'
            }
        },
        androidJump:function (fig) {
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
            var defaultCfg = {
                schema: "home",
                protocal: "gamersky",
                loadWaiting: "3000",
                failUrl: "http://a.gamersky.com/app/",
                apkInfo: {
                    PKG: "com.gamersky",
                    CATEGORY: "android.intent.category.DEFAULT",
                    ACTION: "android.intent.action.VIEW"
                }
            };
            $.extend(defaultCfg,fig);
            var vv = {
                generateSchema: function (config) {
                    var schemaStr = '';
                    // uc,qq
                    if (browser.isUCBrowser() || browser.isQQBrowser()) {
                        schemaStr = config.protocal + "://" + config.schema;
                    } else {
                        schemaStr = "intent://" + config.schema + "#Intent;" +
                            "scheme=" + config.protocal + ";" +
                            "action=" + config.apkInfo.ACTION + ";" +
                            "S.browser_fallback_url=" + encodeURIComponent(config.failUrl) + ";" +
                            "end";
                    }
                    return schemaStr;
                },
                loadSchema: function (config) {
                    var schemaUrl = this.generateSchema(config),
                        loadTimer = null;
                    if (browser.isWx() || browser.isPcBrowser()) {
                        window.location.href = config.failUrl;
                    } else {
                        fakeAlink(schemaUrl);
                    }
                    var start = Date.now();
                    loadTimer = setTimeout(function () {
                        if (document.hidden || document.webkitHidden) {
                            return;
                        }
                        if (Date.now() - start > config.loadWaiting + 200) {}
                        else {
                            window.location.href = config.failUrl;
                        }

                    }, config.loadWaiting);

                    var visibilitychange = function () {
                        var tag = document.hidden || document.webkitHidden;
                        tag && clearTimeout(loadTimer);
                    };
                    document.addEventListener('visibilitychange', visibilitychange, false);
                    document.addEventListener('webkitvisibilitychange', visibilitychange, false);
                    window.addEventListener('pagehide', function () {
                        clearTimeout(loadTimer);
                    }, false);
                }
            };
            vv.loadSchema(defaultCfg);
        },
        clkEvents:function (opt,cid,rel) {
            var thObj = this,isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            switch (opt) {
                case 'home':
                    if(isiOS){
                        fakeAlink('https://a.gamersky.com/app/home/refer/'+rel);
                    }else{
                        thObj.androidJump({
                            schema: "home?referer="+rel
                        });
                    }
                    break;
                case 'game':
                    if(isiOS){
                        fakeAlink('https://a.gamersky.com/app/game/refer/'+rel);
                    }else{
                        thObj.androidJump({
                            schema: "home?tab=game&referer="+rel
                        });
                    }
                    break;
                case 'gamecon':
                    if(isiOS){
                        fakeAlink('https://a.gamersky.com/app/game/'+cid+'/refer/'+rel);
                    }else{
                        thObj.androidJump({
                            schema: "home?id="+cid+'&action=game&tab=game&referer='+rel
                        });
                    }
                    break;
                case 'content':
                    if(isiOS){
                        fakeAlink('https://a.gamersky.com/app/news/'+cid+'/refer/'+rel);
                    }else{
                        thObj.androidJump({
                            schema: "home?action=news&id="+cid+'&referer='+rel
                        });
                    }
                    break;
                case 'contentTuijian':
                    if(isiOS){
                        fakeAlink('https://a.gamersky.com/app/news/'+cid+'/refer/'+rel);
                    }else{
                        thObj.androidJump({
                            schema: "home?action=news&id="+cid+'&referer='+rel,
                            failUrl: "http://a.gamersky.com/app/?source=WapTuiJian"
                        });
                    }
                    break;
                case 'contentNeiRong':
                    if(isiOS){
                        fakeAlink('https://a.gamersky.com/app/news/'+cid+'/refer/'+rel);
                    }else{
                        thObj.androidJump({
                            schema: "home?action=news&id="+cid+'&referer='+rel,
                            failUrl: "http://a.gamersky.com/app/?source=WapNeiRong"
                        });
                    }
                    break;
                case 'contentGongLue':
                    if(isiOS){
                        fakeAlink('https://a.gamersky.com/app/news/'+cid+'/refer/'+rel);
                    }else{
                        thObj.androidJump({
                            schema: "home?action=news&id="+cid+'&referer='+rel,
                            failUrl: "http://a.gamersky.com/app/?source=WapGongLue"
                        });
                    }
                    break;
                case 'strategy':
                    if(isiOS){
                        fakeAlink('https://a.gamersky.com/app/game/'+cid+'/strategiesSet/refer/'+rel);
                    }else{
                        thObj.androidJump({
                            schema: "home?action=game&id="+cid+"&open=strategy&tab=game&apprel="+rel
                        });
                    }
                    break;
                default:
                    if(isiOS){
                        fakeAlink('https://a.gamersky.com/app/home/refer/'+rel);
                    }else{
                        thObj.androidJump({
                            schema: "home?referer="+rel
                        });
                    }
            }

        },
        contentBtn:function (isback) {
            var btnDom = '',
                defaultCfg = {
                    txts:[
                        '打开游民APP，查看更多精彩内容',
                        '打开游民APP，查看更多精彩攻略',
                        '打开游民APP，查看更多精彩内容'
                    ],
                    role:'contentNeiRong',
                    btnStyle:'display: block;margin: 0.3rem auto;width: 5.4rem;height: 0.8rem;line-height: 0.8rem;background-color: #e72029;font-size: 0.28rem;color: #fff !important;text-align: center;border-radius: 0.1rem;'
                },
                cfg = this.config,createBtn = true;
            var strategyConfig = {
                txt:'查询实用攻略资料，推荐APP攻略集',
                role:'strategy'
            };
            var btnRoles,btnTxt = '',btnCid;
            btnRoles = defaultCfg.role;
            btnCid = cfg.content.cid;
            if(this.getUrlInfos() === '新闻'){
                btnTxt = defaultCfg.txts[0];
                createBtn = false;
            }else if(this.getUrlInfos() === '攻略'){
                btnTxt = defaultCfg.txts[1];
            }else{
                btnTxt = defaultCfg.txts[2];
            }
            var $strategy = $('#gsSCMexist');
            if($strategy.length>0){
                btnRoles = strategyConfig.role;
                btnCid = $strategy.data('kuid');
                btnTxt = strategyConfig.txt;
            }

            btnDom += '<a class="countHit countHitSql openGamerskyApp" data-approle="'+btnRoles+'" data-itemid="'+cfg.content.count+'" style="'+defaultCfg.btnStyle+'" id="gsGotoApp" data-appcid="'+btnCid+'" data-apprel="'+cfg.content.okcount+'">';
            btnDom += btnTxt;
            btnDom += '</a>';

            var insertTar;
            if(isback === true){
                insertTar = cfg.content.backtarget;
            }else{
                insertTar = cfg.content.target;
            }
            if(createBtn === false){
                btnDom = '<div id="gsTgWapGotoAppContentBtn" style="padding: 0.3rem 0;"></div>';
            }
            if(cfg.content.pos === 'before'){
                $(btnDom).insertBefore(insertTar);
            }else if(cfg.content.pos === 'after'){
                $(btnDom).insertAfter(insertTar);
            }
        },
        homeBtn:function (role,cid) {
            var $btn = $('.gsOpenAppHome'),
                btnConfig={
                    countIndex:countlist.home.count,
                    count:countlist.allsite.count,
                    countBot:countlist.bottom.count,
                    countClass:'countHit countHitSql openGamerskyApp',
                    okcountIndex:countlist.home.okcount,
                    okcount:countlist.allsite.okcount,
                    okcountBot:countlist.bottom.okcount
                };
            $btn.each(function () {
                var $this = $(this),tid,okid,isIndex = $this.data('isindex');
                $this.addClass(btnConfig.countClass);
                if(isIndex === 'yes'){
                    tid = btnConfig.countIndex;
                    okid = btnConfig.okcountIndex;
                }else{
                    tid = btnConfig.count;
                    okid = btnConfig.okcount;
                }
                if($this.hasClass('ymw-btns-app')){
                    role = 'home';
                    tid = btnConfig.countBot;
                    okid = btnConfig.okcountBot;
                }
                $this.attr({
                    'data-itemid':tid,
                    'data-approle':role,
                    'data-apprel':okid
                });
                if(cid){
                    $this.attr('data-appcid',cid);
                }
            });
        },
        relContentBtn:function () {
            var $relBtn = $('.ymw-rel-list .ymw-list-tp1').find('a');
            $relBtn.addClass('has-open-app-tags openAppRelContentBtn countHit countHitSql');
            $relBtn.each(function () {
                var $this = $(this),aid;
                aid = parseInt($this.closest('li').find('.cy_comment').attr('data-sid'));
                $this.removeAttr('href').attr({'data-aid':aid,'data-itemid':1019002});
            })
        },
        writeBtn:function () {
            var _this = this;
            if($(this.config.content.target).length>0){
                this.contentBtn();
                this.homeBtn('content',this.config.content.cid);
            }else if($(this.config.content.backtarget).length>0){
                this.contentBtn(true);
                this.homeBtn('content',this.config.content.cid);
            }else if($('#gsKuList').length>0){
                this.homeBtn('game');
            }else if($('#gsZp').length>0){
                this.homeBtn('gamecon',$('#gsZp').find('.game_score').eq(0).attr('gameId'));
            }else{
                this.homeBtn('home');
            }
            /*
             * 相关内容App引导(关闭|开启)
             * openRelToApp(false|true)
             */
            function openRelToApp(isOpen) {
                if(($(_this.config.content.backtarget).length>0 || $(_this.config.content.target).length>0) &&isOpen === true){
                    _this.relContentBtn();
                }
            }
            openRelToApp(false);

        },
        bindClk:function () {
            var thObj = this;
            $(document).on('tap','.openGamerskyApp',function () {
                var $this = $(this),role = $this.attr('data-approle'),cid,rel = $this.attr('data-apprel');
                if($this.hasClass('gsOpenAppHome') !== true){
                    if(role === 'content'){
                        cid = $this.attr('data-appcid');
                        thObj.clkEvents(role,cid,rel);
                    }else{
                        cid = $this.attr('data-appcid');
                        thObj.clkEvents(role,cid,rel);
                    }
                }
            });
            $(document).on('click','.openGamerskyAppDiy',function () {
                var $this = $(this),cid = $this.data('appcid'),rel = countlist.recommend.okcount;
                thObj.clkEvents('contentTuijian',cid,rel);
            });
            $('.ymw-rel-list').on('click','.openAppRelContentBtn',function () {
                var $this = $(this),aid = $this.attr('data-aid');
                thObj.clkEvents('contentTuijian',aid,1019004);
            });
            $(document).on('click','.gsOpenAppBtn',function () {
                var $this = $(this),
                    approle = $this.data('approle'),
                    apprel = $this.attr('data-apprel'),
                    appcid = $this.data('appcid');
                if($.trim(appcid) === '' || typeof appcid === "undefined"){
                    appcid = $('#wapcountn').attr('generalId');
                };
                thObj.clkEvents(approle,appcid,apprel);
            });
        },
        init:function () {
            this.writeBtn();
            this.bindClk();
        }
    };
    function ReWriteWapCount() {
        $('.gsOpenAppBtn').each(function () {
            var $ts = $(this),ctid = $ts.attr('data-wapitemid');
            $ts.attr('data-itemid',ctid);
        });
        $('.recommend-app-btn').each(function () {
            var $ts = $(this);
            $ts.removeAttr('target href');
        });
    }
    ReWriteWapCount();
    openAppJs.init();
})(jQuery);
(function ($) {
    var hideContext = {
        config:{
            maxHeight:24,
            setHeight:18,
            glMh:32,
            glSh:26
        },
        addMask:function () {
            var msk = '';
            msk += '<div id="gsAreaContextOpen" class="gsAreaContextOpen">';
            msk += '<a>展开阅读全文</a>';
            msk += '</div>';
            return msk;
        },
        insertMask:function (tar) {
            tar.append(this.addMask());
        },
        insertBtn:function () {
            var $tar = $('#gsAreaContext'),
                $tarArt = $tar.find('.gsAreaContextArt'),
                maxHeight = this.config.maxHeight,
                setHeight = this.config.setHeight,
                tarHeight = $tarArt.height(),
                ww = $(window).width(),
                tarHeightRem = 0;
            if($('#gsSCM').length>0){
                maxHeight = this.config.glMh;
                setHeight = this.config.glSh;
            }
            function bindClk() {
                var openBtn = $('#gsAreaContextOpen');
                openBtn.find('a').on('tap',function () {
                    setTimeout(function () {
                        $tar.addClass('cur');
                        $tar.css('max-height','');
                    },300);
                });
            }
            tarHeightRem = tarHeight/ww*7.2;
            if(tarHeightRem>maxHeight){
                $tar.css('max-height',setHeight+'rem');
                this.insertMask($tar);
                bindClk();
            }
        },
        init:function () {
            var $page = $('#pe100_page_contentpage'),
                $pageBtn = $page.find('.yu-btnwrap'),
                conpage = $pageBtn.length,
                num = 0;
            if(conpage>0){
                num = parseInt($pageBtn.find('span').html().split('')[0]);
            }
            if(num <2 ){
                this.insertBtn();
            }else{
                $('#gsAreaContext').addClass('cur');
            }
        }
    };
    if($('#gsAreaContext').length>0){
        hideContext.init();
    }

    var contentVideo = {
        topVideo:function (tar,player,vid,vurl) {
            var playerDom;
            switch($.trim(player)){
                case 'qq':
                    playerDom = '<iframe frameborder="0" width="100%" height="100%" src="https://v.qq.com/iframe/player.html?vid='+vid+'&tiny=0&auto=0" allowfullscreen></iframe>';
                    break;
                case 'youku':
                    playerDom = '<iframe height="100%" width="100%" src="http://player.youku.com/embed/'+vid+'==" frameborder=0 allowfullscreen></iframe>';
                    break;
                case 'bi':
                    playerDom = '<div class="ymwContentTopVideoBi" style="opacity: 0;transition:all 0.25s ease;width: 7.2rem;height: 4.5rem;overflow: hidden;"><div style="margin-top:-0.85rem;width: 7.2rem;height: 5.35rem;"><iframe height="100%" width="100%" src="'+vurl+'" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe></div></div>';
                    tar.css({
                        'height':'4.5rem',
                        'background':'url(http://image.gamersky.com/webimg13/lib/icons/loading.gif) center center no-repeat',
                        'background-size':'0.3rem auto'
                    });
                    break;
                case 'biback':
                    var tmpUrl = vurl,calcUrl;
                    calcUrl = tmpUrl.match(/av[0-9]*/)[0].replace('av','');
                    playerDom = '<iframe height="100%" width="100%" src="//player.bilibili.com/player.html?aid='+calcUrl+'" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>';
                    break;
            }
            if(typeof playerDom !== 'undefined'){
                tar.html(playerDom).css('display','block');
                if(tar.find('.ymwContentTopVideoBi').length>0){
                    setTimeout(function () {
                        tar.find('.ymwContentTopVideoBi').css('opacity',1);
                    },2000);
                }
            }
        },
        init:function () {
            var $contentTopVideo = $('#ymwContentTopVideo'),videoDataFrom = $('#ymwTopVideoInfos .vd');
            if($contentTopVideo.length>0){
                var playerSet = videoDataFrom.data('sitename'),vid = videoDataFrom.data('vid'),vurl = videoDataFrom.data('url');
                this.topVideo($contentTopVideo,playerSet,vid,vurl);
            }
        }
    };
    contentVideo.init();
})(jQuery);
(function ($) {
    //功能扩展1
    $.fn.extend({
        GsExtFncPicTips:function () {
            var _this = this;
            _this.find('.picact').each(function () {
                var $ts = $(this),$dad = $ts.closest('p');
                $dad.css({
                    marginBottom:'0.1rem',
                    color:'#888',
                    fontSize:'0.24rem',
                    lineHeight:'0.4rem'
                })
            })
        }
    });
    //功能扩展2
    var gsExtFncs = {
        addTgMonitor:function () {
            var timeStamp = new Date().getTime();
            $.getScript('//j.gamersky.com/common/tg/allsite.tg.monitor.wap.js?'+timeStamp);
        }
    };
    //功能扩展
    var gsExt = {
        picTips:function(open){
            if(open === true){
                $('.gsAreaContextArt').GsExtFncPicTips();
            }
        },
        tgMonitor:function(open){
            if(open === true){
                gsExtFncs.addTgMonitor();
            }
        },
        init:function () {
            //开启文章内容图注功能
            this.picTips(false);
            this.tgMonitor(true);
        }
    };
    gsExt.init();
})(jQuery);