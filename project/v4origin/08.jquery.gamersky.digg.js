// JavaScript Document
///<reference path="/js/jquery-1.8.3.js"/>
///<reference path="00.swfobject.js"/>
///<reference path="00.jquery.cookie.js"/>
///<reference path="00.json2.js"/>
///<reference path="01.video.js"/>
(function ($) {
    var labelJsonpUrl = "//db5.gamersky.com/LabelJsonpAjax.aspx";
    $.fn.supportMeInit = function (options) {
        return this.each(function () {        
            var $this = $(this);
            var itemId=parseInt($this.attr("data-itemId"));
            var field= $this.attr("data-field");           
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
                    if ($this.find("span").length > 0) {
                        $this.find("span").text(responseJson.body);
                    } else {
                        $this.text(responseJson.body);
                    }
                }
            });
        })
    };  
    $.fn.supportMe = function (options)  {       
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
                        itemId:itemId,
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
            $this.click(function () {
                var isSupport = false;
                if ($.fn.cookie("GamerSkySupport" + itemId)) {
                    isSupport = true;
                }
                if (isSupport) {
                    alert("已投票！");
                    return false;
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
                        $this.supportMeInit();
                    }
                });
                return false;
            });
            $this.supportMeInit();          
        });    
    }
    $(document).ready(function () {
        $("a.supportMe").supportMe();
    });
})(jQuery);