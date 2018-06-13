///<reference path="/js/jquery-1.8.3.js"/>
(function ($) {
    $.fn.ThunderDownLoad = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.click(function (event) {
                event.preventDefault();

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "//click.gamersky.com/Common/GetHits.aspx",
                    data: {
                        id: $this.attr("itemid"),
                        script: "3",
                        hot: "true"
                    },
                    success: function (data) {
                    }
                });

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "//db4.gamersky.com/Common/ShowDownloadUrlJsonp.aspx",
                    data: {
                        urlid: $this.attr("urlid"),
                        id: $this.attr("itemid")
                    },
                    success: function (data) {
                        if (data.status == "ok") {
                            var thunder_url = data.body;
                            if (thunderHrefAttr) {
                                $this.attr(thunderHrefAttr, ThunderEncode(thunder_url));
                            }
                            else {
                                $this.attr("thunderHref", ThunderEncode(thunder_url));
                            }

                            $this.attr("thunderPid", "51185");
                            $this.attr("thunderResTitle", "");
                            $this.contextmenu(function () {
                                ThunderNetwork_SetHref(this);
                            });

                            $this.unbind("click");
                            $this.click(function (event) {
                                event.preventDefault();
                                OnDownloadClick_Simple(this, 2, 4);
                            });

                            OnDownloadClick_Simple($this.get(0), 2, 4);
                        }
                        else {
                        }
                    }
                });
            });
        });
    };

    $(document).ready(function () {
        $(".gsthunder").ThunderDownLoad();
        $(".dvurl1 li a").attr("target", "_blank");
    });
})(jQuery);