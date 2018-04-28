(function ($) {
    function resizeSwpHeight() {
        var $ycTab = $('#ycTab');
        var rh = $ycTab.find('.swiper-slide-active').css("height");
        $ycTab.find('.swiper-wrapper').css('height', rh);
    }
    var articleId = $("#SOHUCS").attr("sid");
    var checkIndex = 0;
    var checkDate = "";
    var isCheck = false;
    if (window.applicationCache) {//如果支持html5
        //localStorage.setItem("checkIndex" + generalId, $(this).index());
        checkIndex = localStorage.getItem("checkIndex" + articleId);//localStorage.checkIndex;
        checkDate = localStorage.checkDate;
    }
    if (checkDate != "") {
        var date = new Date(checkDate);
        var dateNow = new Date();
        date.setHours(date.getHours() + 24);
        if (date > dateNow) {
            isCheck = true;
        }
    }
    if (window.applicationCache) {
        localStorage.checkDate = new Date();
    }
   
    $.fn.GetNewWapComment = function (options) {
        return this.each(function () {
            var $this = $(this);
            //var articleId = $this.attr("sid");
            var pageIndex = 1;
            var pageSize = 10;
            var jsondata = {
                pageIndex: pageIndex, pageSize: pageSize, articleId: articleId, isHot: true
            };
            $.ajax({
                type: "get",
                dataType: "jsonp",
                url: "//cm.gamersky.com/wapapi/getnewestcomment2",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                success: function (data) {
                    var data = $.parseJSON(data.body);

                    commnet = "<h4 class='ym-comm-title2'>全部评论</h4>";
                    commnet += "<div class='ym-comm-sel'><a class='ym-comm-sel-new cur'>最新</a><a class='ym-comm-sel-early'>最早</a></div>";
                    if (data.NewComment != null) {
                        $(".ym-comm-floors-all").html(commnet);
                        $(".ym-comm-floors-all").append(data.NewComment + data.Page);
                    }
                    console.log(data)
                    if (pageIndex + 1 > Math.ceil(data.Count / data.PageSize)) {
                        $(".ym-comm-floors-all").find(".ym-comm-btnwrap").addClass("ym-comm-btnwrap-all");
                        $(".ym-comm-floors-all").find(".ym-comm-btn-more").html("全部加载完成");
                    }
                    if (data.Count > 0 || data.OneselfCount > 0) {
                        var cmtid = $(".ym-comm-new").next().attr("cmtid");
                        $(".ym-comm-new").attr("cmtid", cmtid);
                    }
                    $(".ym-comms-wrap > .ym-comm-floor").last().addClass("last");

                    $(".ym-comm-floor-inner-wrap").each(function () {
                        $(this).find(".ym-comm-floor-inner").last().addClass("last");
                    });
                    //$(".ym-comm-btnwrap").html($("<div>" + data.Page + "</div>").find(".ym-comm-btnwrap").html());

                    var $ycTab = $('.ym-comm-floors-all');
                    var $ycn = $ycTab.find('.ym-comm-sel');
                    $ycn.find('a').on('click', function (e) {
                        e.preventDefault();
                        $ycn.find('a').removeClass('cur');
                        $(this).addClass('cur');
                        //ycSwp.slideTo($(this).index());
                        localStorage.checkIndex = $(this).index();
                        localStorage.setItem("checkIndex" + generalId, $(this).index());
                        localStorage.checkDate = new Date();
                        if ($(this).index() == 1) {
                            $(".ym-comm-floors-all").GetEarliestWapComment();
                        }
                        else {
                            $(".ym-comm-floors-all").GetNewWapComment();
                        }
                    });
                    //评论切换JS 结束
                    $(".ym-comm-floors-all").find(".ym-comm-btn-more").attr("data-url", "//cm.gamersky.com/wapapi/getnewestcomment2").GetWapCommentMore();
                    newcomm.insertRe();
                    newcomm.txtMore();
                    like();
                    cycm();
                    resizeSwpHeight();
                }
            });
        });
    }

    $.fn.GetEarliestWapComment = function (options) {
        return this.each(function () {
            var $this = $(this);
            //var articleId = $this.attr("sid");
            var pageIndex = 1;
            var pageSize = 10;
            var jsondata = {
                pageIndex: pageIndex, pageSize: pageSize, articleId: articleId, isHot: true
            };
            $.ajax({
                type: "get",
                dataType: "jsonp",
                url: "//cm.gamersky.com/wapapi/getearliestcomment2",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                success: function (data) {
                    var data = $.parseJSON(data.body);

                    commnet = "<h4 class='ym-comm-title2'>全部评论</h4>";
                    commnet += " <div class='ym-comm-sel'><a class='ym-comm-sel-new'>最新</a><a class='ym-comm-sel-early cur'>最早</a></div>";
                    if (data.NewComment != null) {
                        $(".ym-comm-floors-all").html(commnet);
                        $(".ym-comm-floors-all").append(data.NewComment + data.Page);
                    }
                    console.log(data)
                    if (pageIndex + 1 > Math.ceil(data.Count / data.PageSize)) {
                        $(".ym-comm-floors-all").find(".ym-comm-btnwrap").addClass("ym-comm-btnwrap-all");
                        $(".ym-comm-floors-all").find(".ym-comm-btn-more").addClass("cmt-loadallbtn cur").html("全部加载完成");
                    }
                    if (data.Count > 0 || data.OneselfCount > 0) {
                        var cmtid = $(".ym-comm-new").next().attr("cmtid");
                        $(".ym-comm-new").attr("cmtid", cmtid);
                    }
                    $(".ym-comms-wrap > .ym-comm-floor").last().addClass("last");

                    $(".ym-comm-floor-inner-wrap").each(function () {
                        $(this).find(".ym-comm-floor-inner").last().addClass("last");
                    });

                    var $ycTab = $('.ym-comm-floors-all');
                    var $ycn = $ycTab.find('.ym-comm-sel');
                    $ycn.find('a').on('click', function (e) {
                        e.preventDefault();
                        $ycn.find('a').removeClass('cur');
                        $(this).addClass('cur');
                        //ycSwp.slideTo($(this).index());
                        localStorage.checkIndex = $(this).index();
                        localStorage.setItem("checkIndex" + generalId, $(this).index());
                        localStorage.checkDate = new Date();
                        if ($(this).index() == 1) {
                            $(".ym-comm-floors-all").GetEarliestWapComment();
                        }
                        else {
                            $(".ym-comm-floors-all").GetNewWapComment();
                        }
                    });
                    //评论切换JS 结束
                    $(".ym-comm-floors-all").find(".ym-comm-btn-more").attr("data-url", "//cm.gamersky.com/wapapi/getearliestcomment2").GetWapCommentMore();

                    newcomm.insertRe();
                    newcomm.txtMore();
                    like();
                    cycm();
                    resizeSwpHeight();
                }
            });
        });
    }

    $.fn.GetWapComment = function (options) {
        return this.each(function () {
            var $this = $(this);
            //var articleId = $this.attr("sid");
            var pageIndex = 1;
            var pageSize = 10;
            var jsondata = {
                pageIndex: pageIndex, pageSize: pageSize, articleId: articleId
            };
            $.ajax({
                type: "get",
                dataType: "jsonp",
                url: "//cm.gamersky.com/wapapi/gethotcomment2",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                success: function (data) {
                    var data = $.parseJSON(data.body);
                    $("#SOHUCS").html();
                    if (pageIndex == 1) {
                        $("#SOHUCS").append(data.Login); 
                    }
                    var commnet = "<div class='ym-comms-wrap'></div>";
                    $("#SOHUCS").append(commnet);
                    commnet = "<div class='ym-comm-floors ym-comm-floors-hot'>";
                    commnet += "<h4 class='ym-comm-title2'>热门评论</h4>";
                    if (data.HotComment != "") {
                       commnet += data.HotComment;
                       commnet += data.Page;
                    }
                    commnet += "</div>";
                    if (data.Count > 0 || data.OneselfCount > 0) {
                        $(".ym-comms-wrap").append(commnet);
                    }
                    if (pageIndex + 1 > Math.ceil(data.Count / data.PageSize)) {
                        $(".ym-comm-floors-hot").find(".ym-comm-btnwrap").addClass("ym-comm-btnwrap-all");
                        $(".ym-comm-floors-hot").find(".ym-comm-btn-more").html("全部加载完成");
                    }
                    $(".ym-comms-wrap").GetWapWholeComment();
                    $(".ym-comm-floors-hot").find(".ym-comm-btn-more").attr("data-url", "//cm.gamersky.com/wapapi/gethotcomment2").GetWapHotCommentMore();
                }
            });
        });
    };

    $.fn.GetWapWholeComment = function (options) {
        var pageIndex = 1;
        var pageSize = 10;
        var jsondata = {
            pageIndex: pageIndex, pageSize: pageSize, articleId: articleId
        };
        $.ajax({
            type: "get",
            dataType: "jsonp",
            url: "//cm.gamersky.com/wapapi/getnewestcomment2",
            data: {
                jsondata: JSON2.stringify(jsondata)
            },
            success: function (data) {
                var data = $.parseJSON(data.body);
                if (data.IsClose) {
                    $("#SOHUCS .ym-comms-wrap").remove();
                    $("#SOHUCS").append(data.Close);
                }
                else if (data.Count == 0 && data.OneselfCount == 0) {
                    $(".ym-comms-wrap").html(data.NoComment);
                }
                commnet = "<div class='ym-comm-floors ym-comm-floors-all'>";
                commnet += "<h4 class='ym-comm-title2'>全部评论</h4>";
                commnet += " <div class='ym-comm-sel'><a class='ym-comm-sel-new cur'>最新</a><a class='ym-comm-sel-early'>最早</a></div>";
                if (data.NewComment != "") {
                    commnet += data.NewComment;
                    commnet += data.Page;
                }
                commnet += "</div>";
                if (data.Count > 0 || data.OneselfCount > 0) {
                    $(".ym-comms-wrap").append(commnet);
                }
                if (pageIndex + 1 > Math.ceil(data.Count / data.PageSize)) {
                    $(".ym-comm-floors-all").find(".ym-comm-btnwrap").addClass("ym-comm-btnwrap-all");
                    $(".ym-comm-floors-all").find(".ym-comm-btn-more").html("全部加载完成");
                }
                $(".ym-comms-wrap > .ym-comm-floor").last().addClass("last");

                $(".ym-comm-floor-inner-wrap").each(function () {
                    $(this).find(".ym-comm-floor-inner").last().addClass("last");
                });
                //resizeSwpHeight();

                $.getScript('//j.gamersky.com/web2015/comment/wapjs/new.comment.zhengce.js?' + new Date().getTime(), function (data, status, jqxhr) {
                    $(".ym-comm-floors-all").find(".ym-comm-btn-more").attr("data-url", "//cm.gamersky.com/wapapi/getnewestcomment2").GetWapCommentMore();
                    newcomm.insertRe();
                    newcomm.txtMore();
                    like();
                    cycm();

                    //评论切换JS开始
                    var $ycTab = $('.ym-comm-floors-all');
                    if ($ycTab.length > 0) {
                        var $ycn = $ycTab.find('.ym-comm-sel'), ycTop = $ycn.offset().top;
                        $ycn.find('a').on('click', function (e) {
                            e.preventDefault();
                            $ycn.find('a').removeClass('cur');
                            $(this).addClass('cur');
                            //ycSwp.slideTo($(this).index());
                            localStorage.checkIndex = $(this).index();
                            localStorage.setItem("checkIndex" + generalId, $(this).index());
                            localStorage.checkDate = new Date();
                            if ($(this).index() == 1) {
                                $(".ym-comm-floors-all").GetEarliestWapComment();
                            }
                            else {
                                $(".ym-comm-floors-all").GetNewWapComment();
                            }
                        });
                    }
                });
            }
        });
    }

    $.fn.GetWapHotCommentMore = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.click(function (event) {
                event.preventDefault();
                var pageIndex = parseInt($this.attr("pageIndex")) + 1;
                var pageSize = parseInt($this.attr("data-pagesize"));
                var oneselfCount = parseInt($this.attr("data-oneself"));
                var count = parseInt($this.attr("data-count"));
                var cmtid = $(".ym-comm-floors-hot").find(".newlist:first").attr("cmtid");//$(".ym-comm-new").attr("cmtid");
                var lastcmtid = "";
                var lastlegnth = $(".ym-comm-floors-hot").find(".newlist").length;
                $("#SOHUCS").find(".ym-comm-floors-hot .newlist").each(function (index, item) {
                    if (index >= lastlegnth - 20) {
                        lastcmtid += $(this).attr("cmtid") + ",";
                    }
                });
                if (oneselfCount > 0 && count == 0) {
                    count = 1;
                }
                if (pageIndex > Math.ceil(count / pageSize)) {
                    $this.addClass("ym-comm-btn-more-done").html("全部加载完成");
                    return;
                }
                $(".ym-comm-loading").show();
                var jsondata = {
                    pageIndex: pageIndex, pageSize: pageSize, articleId: articleId, cmtid: cmtid, lastcmtid: lastcmtid
                };
                if ($this.attr("data-click") == "true") {
                    return;
                }
                $this.attr("data-click", "true");
                var url = $this.attr("data-url");
                $.ajax({
                    type: "get",
                    dataType: "jsonp",
                    url: url,
                    data: {
                        jsondata: JSON2.stringify(jsondata)
                    },
                    success: function (data) {
                        $(".ym-comm-loading").hide();
                        $this.attr("data-click", "false");
                        $this.attr("pageIndex", pageIndex);
                        var html = "";
                        var data = $.parseJSON(data.body);
                        if (pageIndex == Math.ceil(count / pageSize)) {
                            $this.parent(".ym-comm-btnwrap").addClass("ym-comm-btnwrap-all");
                            $this.addClass("ym-comm-btn-more-done").html("全部加载完成");
                        }
                        if (data.HotComment != "") {
                            $(".ym-comm-floors-hot > .ym-comm-floor").last().after(data.HotComment).removeClass("last");
                            $(".ym-comm-floors-hot > .ym-comm-floor").last().addClass("last");
                            $(".ym-comm-floor-inner-wrap").each(function () {
                                $(this).find(".ym-comm-floor-inner").last().addClass("last");
                            });
                            newcomm.insertRe();
                            newcomm.txtMore();
                            like();
                            cycm();
                            resizeSwpHeight();
                        }
                    }
                });
            });
        });
    };

    $.fn.GetWapCommentMore = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.click(function (event) {
                event.preventDefault();
                var pageIndex = parseInt($this.attr("pageIndex")) + 1;
                var pageSize = parseInt($this.attr("data-pagesize"));
                var oneselfCount = parseInt($this.attr("data-oneself"));
                var count = parseInt($this.attr("data-count"));
                var cmtid = $(".ym-comm-floors-all").find(".newlist:first").attr("cmtid");//$(".ym-comm-new").attr("cmtid");
                if (oneselfCount > 0 && count == 0) {
                    count = 1;
                }
                if (pageIndex > Math.ceil(count / pageSize)) {
                    $this.addClass("ym-comm-btn-more-done").html("全部加载完成");
                    return;
                }
                $(".ym-comm-loading").show();
                var jsondata = {
                    pageIndex: pageIndex, pageSize: pageSize, articleId: articleId, cmtid: cmtid, count: count
                };
                if ($this.attr("data-click") == "true") {
                    return;
                }
                $this.attr("data-click", "true");
                var url = $this.attr("data-url");
                $.ajax({
                    type: "get",
                    dataType: "jsonp",
                    url: url,
                    data: {
                        jsondata: JSON2.stringify(jsondata)
                    },
                    success: function (data) {
                        $(".ym-comm-loading").hide();
                        $this.attr("data-click", "false");
                        $this.attr("pageIndex", pageIndex);
                        var html = "";
                        var data = $.parseJSON(data.body);
                        if (pageIndex == Math.ceil(count / pageSize)) {
                            $this.parent(".ym-comm-btnwrap").addClass("ym-comm-btnwrap-all");
                            $this.addClass("ym-comm-btn-more-done").html("全部加载完成");
                        }
                        if (data.NewComment != "") {
                            $(".ym-comm-floors-all > .ym-comm-floor").last().after(data.NewComment).removeClass("last");
                            $(".ym-comm-floors-all > .ym-comm-floor").last().addClass("last");
                            $(".ym-comm-floor-inner-wrap").each(function () {
                                $(this).find(".ym-comm-floor-inner").last().addClass("last");
                            });
                            newcomm.insertRe();
                            newcomm.txtMore();
                            like();
                            cycm();
                            resizeSwpHeight();
                        }
                    }
                });
            });
        });
    };

	$.fn.isBindPhone = function () {
        function createZc() {
            var zcDom = '',sty1 = '';
            sty1 = 'style="position: fixed;left: 50%;top: 50%;margin:-1.34rem 0 0 -2.8rem;z-index:999999;padding:0.4rem 0.5rem 0;width: 4.6rem;height: 2.28rem;background-color:#fff;box-shadow: 0 0 0.4rem rgba(4,0,0,0.3);border-radius:0.1rem;"';
            zcDom += '<div class="tmpZcPop" style="position: fixed;left: 0;top: 0;z-index:999998;width: 100%;height: 100%;"></div><div class="tmpZcPop" '+sty1+'><div style="line-height: 0.5rem;font-size: 0.26rem;color:#333;">根据相关规定，需要绑定手机号才能进行评论，感谢您的配合。</div><a class="tmpZcBind" style="display: block;margin: 0.3rem auto 0;width: 2.38rem;height: 0.64rem;line-height: 0.64rem;font-size: 0.26rem;color:#fff;text-align: center;background-color:#e7222a;border-radius: 0.05rem;" href="//i.gamersky.com/user/info/mobilebind">绑定手机</a><a class="tmpZcClose" style="display: block;position: absolute;right: 0;top: 0;width: 0.5rem;height: 0.5rem;border-radius:0 0.1rem 0 0.1rem;background-color:#f2f2f3;"><img style="display: block;margin: 0.12rem 0 0 0.12rem;width: 0.26rem;height: 0.26rem;" src="http://image.gamersky.com/webimg15/wap/comm/zc-close.png" alt="X"></a></div>';
            return zcDom;
        }
        function clkAlert() {
            $(document).on('click','#SOHUCS .ym-comm-re .textarea,#SOHUCS .ym-comm-re .submit',function () {
                $('body').append(createZc());
                $('#SOHUCS .ym-comm-re .textarea').blur();
                $('.tmpZcClose').on('click',function () {
                    $('.tmpZcPop').remove();
                });
            });
        }
        clkAlert();
    };
    //$.fn.bindFirst = function (name, fn) {
    //    this.on(name, fn).trigger(name);
    //    this.each(function () {
    //        var handlers = $._data(this, 'events')[name.split('.')[0]];
    //        var handler = handlers.pop();
    //        handlers.splice(0, 0, handler);
    //    });
    //};
})(jQuery);
$(document).ready(function () {
    $("#SOHUCS").GetWapComment();
    $("#SOHUCS").addClass('ym-comm');
    $('head').append('<link rel="stylesheet" href="//j.gamersky.com/wap/css/new_comment.css">');
	$('.ym-comm-niming').hide();
    //var isTrim = function (s) { return s.replace(/(^\s*)|(\s*$)/g, ""); };  //清除空格
    //var scroll = false;
    //$(window).bindFirst('scroll', function (event) {
    //    if ($(window).height() + $(document).scrollTop() >= $("#SOHUCS").offset().top) {
    //        if (!isTrim($("#SOHUCS").html()) && !scroll) {
    //            scroll = true;
                
    //        }
    //    }
    //});
});
