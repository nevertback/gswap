(function ($) {
    $.fn.SoftGl = function (options) {
        return this.each(function () {
            var tableName = "PE_U_Soft";
            if ($("#jcjbContentData").attr("data-tableName") != null) {
                tableName = $("#jcjbContentData").attr("data-tableName");
            }
            var op = {
                GeneralId: $("#jcjbContentData").attr("data-generalId"),
                NodeId: $("#jcjbContentData").attr("data-nodeId"),
                Top: 8,
                TableName: tableName
            };

            $.ajax({
                type: "POST",
                url: "//db2.gamersky.com/ContentAjaxNew.aspx",
                dataType: "jsonp",
                data: {
                    jsondata: JSON2.stringify({ type: "getcorrelation", GeneralId: op.GeneralId, NodeId: op.NodeId, Top: op.Top, TableName: op.TableName })
                },
                success: function (response) {
                    var data = response;
                    if (data == undefined || data.length <= 0) {
                        $("#softwenda").hide();
                    }
                    else {
                        for (var i = 0; i < data.length; i++) {
                            $("#softwenda").find(".wd").append('<li class="like"><a href="' + data[i].url + '" target="_blank">' + data[i].title + '</a></li>');
                        }
                    }
                }
            });
        });
    };
    $.fn.SoftCorrelation = function (options) {
        return this.each(function () {
            var $this = $(this);
            var location = options;
            var locationContt = $this.find(".contt").eq(location);
            var locationConttLength = locationContt.attr("value");//locationContt.find(".txt .like li").length;
            var isRemove = false;
            $this.find(".contt").each(function (index, element) {
                var conttlilength = $(element).find(".txt .like li").length;
                if (conttlilength <= 0) {
                    $(element).hide();
                    isRemove = true;
                    locationConttLength = parseInt(locationConttLength) + parseInt($(element).attr("value"));
                    locationContt.find(".tit").removeClass().addClass("tit tp" + locationConttLength);
                    locationContt.find(".txt").removeClass().addClass("txt th" + locationConttLength);
                    locationContt.find(".like").removeClass().addClass("like lh" + locationConttLength);
                }
            });
            var lastLength = parseInt(locationConttLength) - 1;
            if (location == 0) {
                $(".txtlist .tl_like.tr .contt:eq(0) .txt .like li:gt(" + lastLength + ")").remove();
            }
            else {
                $(".txtlist .tl_like.tl .contt:eq(1) .txt .like li:gt(" + lastLength + ")").remove();
            }
        });
    };
    $.fn.DownContentHot = function(options){
        return this.each(function(){
            var $this = $(this);
            var ganeralId = $this.attr("data-ganeralId");
            $.ajax({
                type: "POST",
                url: "//db2.gamersky.com/ContentAjaxNew.aspx",
                dataType: "jsonp",
                data: {
                    jsondata: JSON2.stringify({ type: "getcontenthot", GeneralId:ganeralId})
                },
                success: function (response) {
                    var data = response;
                    if (data.status=="ok")
                     {
                        $this.html("&nbsp;"+data.body);
                     };
                }
            });
        })
    }

    $(document).ready(function () {
        $(".td_dl[itemprop='inContentHot']").DownContentHot();
        $("#softwenda").SoftGl();
        $(".txtlist .tl_like.tl").SoftCorrelation(1);
        $(".txtlist .tl_like.tr").SoftCorrelation(0);
    });
})(jQuery);