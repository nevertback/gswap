(function ($) {
    $.fn.cycm = function (options) {
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
    };
    $.fn.ContentHit = function (options) {
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//click.gamersky.com/Common/GetHits.aspx",
                data: {
                    id: $this.attr("generalId"),
                    script: "3"
                },
                success: function (data) {
                    $this.html(data.hits+'°');
                }
            });
        });
    };

    $.fn.ContentWapHit = function (options) {
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//click.gamersky.com/Common/GetWapHits.aspx",
                data: {
                    id: $this.attr("generalId"), script:3,
                },
                success: function (data) {
                    $this.html(data.waphits);
                }
            });
        });
    };
    $.fn.GetHitShouYou = function () {
        var itemid = $(".yu-icon.yu-btn-android").attr("data-itemId");
        var fieldname = $(".yu-icon.yu-btn-android").attr("data-fieldname");
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "//db5.gamersky.com/HitShouYou.aspx",
            data: { 'ID': itemid, 'fieldname': fieldname },
            success: function (data) {
                $(".wapandroid").html(data.body);
            }
        });
    };
    $.fn.GetHitSyIos = function () {
        var itemid = $(".yu-icon.yu-btn-ios").attr("data-itemId");
        var fieldname = $(".yu-icon.yu-btn-ios").attr("data-fieldname");
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "//db5.gamersky.com/HitShouYou.aspx",
            data: { 'ID': itemid, 'fieldname': fieldname },
            success: function (data) {
                $(".Ios").html(data.body);
            }
        });
    } 
    $(document).ready(function () {      
        $(".cy_comment").cycm();
        $(".wapandroid").GetHitShouYou();
        $(".Ios").GetHitSyIos();
        $("#countn").ContentHit();
        $("#wapcountn").ContentWapHit();
        $("#SelectPage").change(function () {
            var url = window.location.href;
            var reg = /\.(shtml)/i;
            var suffix = ".html";
            if (reg.test(url)) {
                suffix=".shtml"
            }
            var id = $(".cy_comment").attr("data-sid");
            if ($("#SelectPage").val() == 1) {
                window.location.href = "Content-" + id + suffix;
            } else {
                window.location.href = "Content-" + id + "_" + $("#SelectPage").val() + suffix;
            }
        });
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        if (isAndroid == true) {
            $("#sy").attr("href", "/shouyou/android/");           
        }
        else {
            $("#sy").attr("href", "/shouyou/ios/");          
        }
        $(document).on("click", ".countHit,.countHitSql", function () {
            var $this = $(this);
            var judge = "false";
            if ($this.hasClass("countHitSql")) {
                judge = "true";
            }
            var hot = 'false';
            if ($this.attr("data-hot")) {
                hot = $this.attr("data-hot");
            }
            var fieldName = "";
            if ($this.attr("data-fieldName")) {
                fieldName = $this.attr("data-fieldName");
            }
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//click.gamersky.com/Common/GetHits.aspx",
                data: { id: $this.attr("data-itemid"), script: "3", hot: hot, fieldName: fieldName, judge: judge },
                success: function (data) { }
            });
        });
    }); 
})(jQuery);
var _config = {
    sso: {
        onlySSO: true
    },
    registerUrl: '//i.gamersky.com/user/register/',
    hide_face: 1,
    showFloorNum: 1
};