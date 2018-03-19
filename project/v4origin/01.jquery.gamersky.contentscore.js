/// <reference path="~/js/jquery-1.8.3.js"/>
(function ($) {
    $.fn.ContentScore = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.find(".contentscore").mouseout(function () {
                var scoreRanking = parseInt($(".contentscore[scored='true']").attr("ranking"));

                $this.find(".contentscore").each(function () {
                    var ranking = parseInt($(this).attr("ranking"));
                    var src = ranking <= scoreRanking ? siteSetup.sitePath + "Images/fstar.gif" : siteSetup.sitePath + "Images/estar.gif";
                    $(this).attr("src", src);
                });

            }).mouseover(function () {
                var scoreRanking = parseInt($(this).attr("ranking"));

                $this.find(".contentscore").each(function () {
                    var ranking = parseInt($(this).attr("ranking"));
                    var src = ranking <= scoreRanking ? siteSetup.sitePath + "Images/fstar.gif" : siteSetup.sitePath + "Images/estar.gif";
                    $(this).attr("src", src);
                });

            }).click(function () {
                var genneralId = parseInt($(this).attr("itemId"));
                $.pe.ajax('contentpk', {
                    params: {
                        GenneralId: genneralId,
                        Score: parseInt($(this).attr("ranking")),
                        Type: 0
                    },
                    success: function (response) {
                        var data = $(response);
                        var status = data.find('status').text();
                        var result = data.find('result').text();
                        switch (status) {
                            case "ok":
                                $("#contentScoreInit").ContentScoreInit();
                                break;
                            case "AnonymousAgain":
                            case "UserAgain":
                                alert("对不起，您已经评价过了，请勿再评价！");
                                break;
                            case "err":
                                alert("文章评分失败！");
                                break;

                        }
                    }
                });
            });
        });
    };

    $.fn.ContentScoreInit = function (options) {
        return this.each(function () {
            $this = $(this);
            $.pe.ajax('GetContentPKResult', {
                params: {
                    GenneralId: $this.attr("itemId")
                },
                success: function (response) {
                    var data = $(response);
                    var status = data.find('status').text();
                    var totalCount = data.find('totalCount').text();
                    var averageScore = data.find('averageScore').text();
                    switch (status) {
                        case "ok":
                            $this.find(".totalCount").html(totalCount);
                            $this.find(".averageScore").html(averageScore);
                            break;
                        case "err":
                            break;
                    }
                }
            });
        });
    };
})(jQuery);

$(document).ready(function () {
    $("#contentScoreInit").ContentScoreInit();
    $("#contentScoreRanking").ContentScore();
});