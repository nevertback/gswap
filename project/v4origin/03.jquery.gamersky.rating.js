(function ($) {

    Number.prototype.toFixed = function (d) {
        var s = this + "";
        if (!d) d = 0;
        if (s.indexOf(".") == -1) s += ".";
        s += new Array(d + 1).join("0");
        if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
            var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
            if (a == d + 2) {
                a = s.match(/\d/g);
                if (parseInt(a[a.length - 1]) > 4) {
                    for (var i = a.length - 2; i >= 0; i--) {
                        a[i] = parseInt(a[i]) + 1;
                        if (a[i] == 10) {
                            a[i] = 0;
                            b = i != 1;
                        } else break;
                    }
                }
                s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");

            } if (b) s = s.substr(1);
            return (pm + s).replace(/\.$/, "");
        } return this + "";

    };
    $.fn.KuScore = function (options) {
        return this.each(function () {
            var $this = $(this);
            $(".midL1_2").bind("selectstart", function () { return false; });	//禁止选中复制

            var cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-type");

            if ($.fn.cookie(cookieKey) !== undefined) {
                $this.unbind("mousemove");

                var kuScore = JSON2.parse($.fn.cookie(cookieKey));
                $(".S3_2").html(kuScore.Sorce);
                var scoreEle = parseInt(parseFloat(kuScore.Sorce) * 2) - 1;
                $this.find("ul").attr("class", "u" + String(scoreEle));
                var leftWidth = 0;
                $this.find("ul li").each(function (i) {
                    if (i <= scoreEle) {
                        if ((i & 1) != 0) {
                            leftWidth = leftWidth + 1;
                        }
                        leftWidth = leftWidth + $(this).width();
                    }
                });
                $this.find("span").css("left", leftWidth);
            }
            else {
                var vL = $this.offset().left + 1.5, vW = $this.width();
                $this.mousemove(function (event) {
                    var Le = event.pageX - vL, inde = $this.find("ul li").index();
                    if (Le >= 0 && Le <= vW - 13) {
                        $this.find("span").css("left", Le);
                        if (Le <= 0) { $(".S3_2").html("0.0"); $this.find("ul").attr("class", ""); }
                        var LL = 0, j = 0, htm = "";
                        for (var i = 0; i <= inde; i++) {
                            LL = (i & 1) != 0 ? LL + 7 : LL + 6;
                            j = j + 0.5;
                            htm = String(j).length == 1 ? j.toFixed(1) : j;
                            if (Le > LL - ((i & 1) != 0 ? 7 : 6) && Le <= LL) { $(".S3_2").html(htm); $this.attr("data-sorce", htm); $this.find("ul").attr("class", "u" + i); }
                        }
                    }
                });
            }
        });
    };
    $.fn.Rating = function (options) {
        return this.each(function () {
            var $this = $(this);
            var tips = $this.attr("data-tips");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//i.gamersky.com/apirating/init",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingType': $this.attr("data-type"), 'Action': "init" },
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
                    else {
                        $("#" + $this.attr("data-totleId")).html(data.Times);
                        $("#" + $this.attr("data-avgscore")).html(data.Average == 10 ? "10" : data.Average.toFixed(1));
                    }

                }
            });
            $this.click(function (event) {
                event.preventDefault();
                $(".S31_2").unbind("mousemove");
                var cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-type");

                if ($this.is('[data-group]')) {
                    cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-group");
                }
                if ($.fn.cookie(cookieKey) !== undefined && $.fn.cookie(cookieKey) !== null) {
                    alert("已" + tips + "！");
                    return;
                }

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "//i.gamersky.com/apirating/rating",
                    data: { 'Rating': JSON2.stringify({ "GenneralId": $this.attr("data-generalId"), 'Sorce': $this.attr("data-sorce"), 'Type': $this.attr("data-type") }), 'Action': "rating" },
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
                        else {
                            $("#" + $this.attr("data-totleId")).html(data.Times);
                            $("#" + $this.attr("data-avgscore")).html(data.Average == 10 ? "10" : data.Average.toFixed(1));

                            $.fn.cookie(cookieKey, JSON2.stringify({ "GenneralId": $this.attr("data-generalId"), 'Sorce': $this.attr("data-sorce"), 'Type': $this.attr("data-type") }), { path: "/", expires: 365 });

                            $(".S31_2").KuScore();

                        }
                    }
                });

            });
        });
    };
    $.fn.DhRating = function (options) {
        return this.each(function () {
            var $this = $(this);
            var tips = $this.attr("data-tips");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//i.gamersky.com/apirating/init",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingType': $this.attr("data-type"), 'Action': "init" },
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
                    else {
                        $("#" + $this.attr("data-totleId")).html(data.Times);
                        $("#" + $this.attr("data-avgscore")).html(data.Average == "" + 10 ? "10" : ""+data.Average.toFixed(1));
                    }

                }
            });
            $this.click(function (event) {
                event.preventDefault();
                $(".S31_2").unbind("mousemove");
                var cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-type");

                if ($this.is('[data-group]')) {
                    cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-group");
                }
                if ($.fn.cookie(cookieKey) !== undefined && $.fn.cookie(cookieKey) !== null) {
                    alert("已" + tips + "！");
                    return;
                }

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "//i.gamersky.com/apirating/rating",
                    data: { 'Rating': JSON2.stringify({ "GenneralId": $this.attr("data-generalId"), 'Sorce': $this.attr("data-sorce"), 'Type': $this.attr("data-type") }), 'Action': "rating" },
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
                        else {
                            $("#" + $this.attr("data-totleId")).html(data.Times);
                            $("#" + $this.attr("data-avgscore")).html(data.Average == 10 ? "10" : data.Average.toFixed(1));

                            $.fn.cookie(cookieKey, JSON2.stringify({ "GenneralId": $this.attr("data-generalId"), 'Sorce': $this.attr("data-sorce"), 'Type': $this.attr("data-type") }), { path: "/", expires: 365 });

                            $(".S31_2").KuScore();

                        }
                    }
                });

            });
        });
    };
    $.fn.RatingGamersky = function (options) {
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//i.gamersky.com/apirating/grade",
                data: { 'generalId': $this.attr("data-generalId"), 'Action': "grade" },
                success: function (data) {
                    if (data.EditorRating != "" && data.RatingUrl != "") {
                        var html = " <a href='" + data.RatingUrl + "'  target='_blank'><div class='PFl_num S1_2'>" + data.EditorRating + "</div></a>";
                        $this.append(html);
                    }
                    else {
                        var html = "<div class='PFl_num S1_2'>--</div>";
                        $this.append(html);
                    }

                }
            });


        });
    };
    $.fn.RatingGroup = function (options) {
        return this.each(function () {
            var $this = $(this);
            var tips = $this.attr("data-tips");
            var number1 = $(".ratingGroupAction").length;
            var types = "";
            var toteid = "";
            for (var c = 0; c < number1; c++) {
                types += $(".ratingGroupAction").eq(c).attr("data-type") + ",";
            }
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//i.gamersky.com/apirating/initgroup",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingGroupType': types, 'Action': "initGroup" },
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
                    else {
                        $(".ratingGroupAction").each(function () {
                            var hasType = false;
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].Type == $(this).attr("data-type")) {
                                    var totleid = $(this).attr("data-totleid");
                                    $("#" + totleid).html(data[i].Times);
                                    hasType = true;
                                }
                            }

                            if (!hasType) {
                                var totleid = $(this).attr("data-totleid");
                                $("#" + totleid).html(0);
                            }
                        });

                        var like = $("#like").html();
                        var unlike = $("#unlike").html();
                        var sorce = Math.round((eval(like) / (eval(like) + eval(unlike))) * 100);
                        var btnWidth = $(".btn12").width();
                        if (isNaN(sorce)) {
                            $(".btn12").attr("style", "margin-left:-"+btnWidth/2+"px;");
                            $(".ZSr_m").attr("style", "background-position:-74px  0;");
                            $("#Sorce").html(0);
                        }
                        else {
                            $(".btn12").attr("style", "margin-left:" + Math.round(-btnWidth / 2 - (btnWidth / 2 - btnWidth * sorce / 100)) + "px;");
                            $(".ZSr_m").attr("style", "background-position:" + Math.round(-74 - (74 - 148 * sorce / 100)) + "px 0;");
                            $("#Sorce").html(sorce);
                        }
                    }
                }
            });


            $this.find(".ratingGroupAction").click(function (event) {
                event.preventDefault();
                var $thisAction = $(this);
                $(".S31_2").unbind("mousemove");
                var cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-type");

                if ($thisAction.is('[data-group]')) {
                    cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-group");
                }
                if ($.fn.cookie(cookieKey) !== undefined && $.fn.cookie(cookieKey) !== null) {
                    alert("已" + tips + "！");
                    return;
                }

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "//i.gamersky.com/apirating/rating",
                    data: { 'Rating': JSON2.stringify({ "GenneralId": $thisAction.attr("data-generalId"), 'Sorce': $thisAction.attr("data-sorce"), 'Type': $thisAction.attr("data-type") }), 'Action': "rating" },
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
                        else {

                            $("#" + $thisAction.attr("data-totleId")).html(data.Times);
                            var like = $("#like").html();
                            var unlike = $("#unlike").html();
                            var sorce = Math.round((eval(like) / (eval(like) + eval(unlike))) * 100);
                            var btnWidth = $(".btn12").width();
                            if (isNaN(sorce)) {
                                $(".btn12").attr("style", "margin-left:-"+btnWidth+"px;");
                                $(".ZSr_m").attr("style", "background-position:-74px 0;");
                                $("#Sorce").html(0);
                            }
                            else {
                                $("#Sorce").html(sorce);
                                $(".ZSr_m").attr("style", "background-position:" + Math.round(-74 - (74 - 148 * sorce / 100)) + "px 0;");
                                $(".btn12").attr("style", "margin-left:" + Math.round(-btnWidth / 2 - (btnWidth / 2 - btnWidth * sorce / 100)) + "px;");
                            }
                            $("#" + $thisAction.attr("data-avgscore")).html(data.Average == 10 ? "10" : data.Average.toFixed(1));

                            $.fn.cookie(cookieKey, JSON2.stringify({ "GenneralId": $thisAction.attr("data-generalId"), 'Sorce': $thisAction.attr("data-sorce"), 'Type': $thisAction.attr("data-type") }), { path: "/", expires: 365 });

                            $(".S31_2").KuScore();

                        }
                    }
                });
            });


        });
    };
    $.fn.RatingGroupLike = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.find("li").each(function (i, element) {
                var $lithis = $(element);
                var generalid = $(element).attr("data-generalid");
                var types = $(element).attr("data-type");
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "//i.gamersky.com/apirating/initgroup",
                    data: { 'generalId': generalid, 'ratingGroupType': types, 'Action': "initGroup" },
                    success: function (data) {
                        if (data.length = 1) {
                            $lithis.find("div a .huo").html(data[0].Times);
                        }
                    }
                });

            });
        });
    };
    $.fn.Ratingmore = function (options) {
        return this.each(function () {
            var $this = $(this);
            var gamerskyrating = $this.find(".gamerskyrating");//本站评分
            var userrating = $this.find(".userrating");//用户评分
            //用户评分
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//i.gamersky.com/apirating/grade",
                data: { 'generalId': $this.attr("data-generalId"), 'Action': "grade" },
                success: function (data) {
                    if (data.EditorRating != "" && data.EditorRating != "0") {
                        $(gamerskyrating).html(data.EditorRating);
                    }
                    else {
                        $(gamerskyrating).html("--");
                    }
                }
            });
            //本站评分
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//i.gamersky.com/apirating/init",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingType': $(userrating).attr("data-type"), 'Action': "init" },
                success: function (data) {
                    if (!data.hasOwnProperty("status")) {
                        $(userrating).html(data.Average == 10 ? "10" : data.Average.toFixed(1));
                    }
                }
            });
            //喜欢和不喜欢
            var number1 = $this.find(".ratingGroupAction").length;
            var types = "";
            var toteid = "";
            for (var c = 0; c < number1; c++) {
                types += $this.find(".ratingGroupAction").eq(c).attr("data-type") + ",";
            }
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//i.gamersky.com/apirating/initgroup",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingGroupType': types, 'Action': "initGroup" },
                success: function (data) {
                    if (!data.hasOwnProperty("status")) {
                        $(".ratingGroupAction").each(function () {
                            var hasType = false;
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].Type == $(this).attr("data-type")) {
                                    var totleid = $(this).attr("data-totleid");
                                    $this.find("#" + totleid).html(data[i].Times);
                                    hasType = true;
                                }
                            }

                            if (!hasType) {
                                var totleid = $(this).attr("data-totleid");
                                $this.find("#" + totleid).html(0);
                            }
                        });

                        var like = $this.find("#like").html();
                        var unlike = $this.find("#unlike").html();
                        var sorce = Math.round((eval(like) / (eval(like) + eval(unlike))) * 100);
                        var btnWidth = $(".jindu").width();
                        if (isNaN(sorce)) {
                            $this.find(".tiao").attr("style", "width:" + btnWidth / 2 + "px;");
                        }
                        else {
                            $this.find(".tiao").attr("style", "width:" + Math.round(btnWidth * sorce / 100) + "px;");
                        }
                    }
                }
            });
          
            $this.find(".ratingGroupAction").one('tap',function (event) {
                event.preventDefault();
                var $thisAction = $(this);
                var tips = $this.attr("data-tips");
                $(".S31_2").unbind("mousemove");
                var cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-type");

                if ($thisAction.is('[data-group]')) {
                    cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-group");
                }
                if ($.fn.cookie(cookieKey) !== undefined && $.fn.cookie(cookieKey) !== null) {
                    alert("已" + tips + "！");
                    return;
                }

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "//i.gamersky.com/apirating/rating",
                    data: { 'Rating': JSON2.stringify({ "GenneralId": $thisAction.attr("data-generalId"), 'Sorce': $thisAction.attr("data-sorce"), 'Type': $thisAction.attr("data-type") }), 'Action': "rating" },
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
                        else {
                            $this.find("#" + $thisAction.attr("data-totleId")).html(data.Times);
                            var like = $this.find("#like").html();
                            var unlike = $this.find("#unlike").html();
                            var sorce = Math.round((eval(like) / (eval(like) + eval(unlike))) * 100);
                            var btnWidth = $(".jindu").width();
                            if (isNaN(sorce)) {
                                $this.find(".tiao").attr("style", "width:" + btnWidth / 2 + "px;");
                            }
                            else {
                                $this.find(".tiao").attr("style", "width:" + Math.round(btnWidth * sorce / 100) + "px;");
                            }
                            $.fn.cookie(cookieKey, JSON2.stringify({ "GenneralId": $thisAction.attr("data-generalId"), 'Sorce': $thisAction.attr("data-sorce"), 'Type': $thisAction.attr("data-type") }), { path: "/", expires: 365 });

                        }
                    }
                });
            });
        });
    };
    $.fn.GamerskyUserPF = function (options) {
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//db5.gamersky.com/RatingJsonpAjax.aspx",
                data: { 'generalId': $this.attr("data-generalId"), 'Action': "grade" },
                success: function (data) {
                    if (data.EditorRating != "" && data.RatingUrl != "") {
                        $this.find('i').html(data.EditorRating);
                    }
                    else {
                        $this.find('i').html("--");
                    }
                }
            });


        });
    };
    $(document).ready(function () {
        $(".ratingGroup").RatingGroup();
        $(".ratingAction").Rating();
        $(".DhRatingAction").DhRating();
        $(".S31_2").KuScore();
        $("#gamerskyrating").RatingGamersky();
        $(".ratingGroupLike").RatingGroupLike();
        $(".ratingmore").Ratingmore();
        $("#gamerskypf").GamerskyUserPF();
    });
})(jQuery);