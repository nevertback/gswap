
function loadJs(sid, jsurl, callback) {
    var nodeHead = document.getElementsByTagName('head')[0];
    var nodeScript = null;
    if (document.getElementById(sid) == null) {
        nodeScript = document.createElement('script');
        nodeScript.setAttribute('type', 'text/javascript');
        nodeScript.setAttribute('src', jsurl);
        nodeScript.setAttribute('id', sid);
        if (callback != null) {
            nodeScript.onload = nodeScript.onreadystatechange = function () {
                if (nodeScript.ready) {
                    return false;
                }
                if (!nodeScript.readyState || nodeScript.readyState == "loaded" || nodeScript.readyState == 'complete') {
                    nodeScript.ready = true;
                    callback();
                }
            };
        }
        nodeHead.appendChild(nodeScript);
    } else {
        if (callback != null) {
            callback();
        }
    }
};

(function ($) {
    function checkIsNullOrEmpty(value) {
        if (!value || value == "") {
            alert("描述不能为空！");
            return false;
        }

        return true;
    };


    function checkEmail(value) {
        if (value) {
            if (!isEmail(value)) {
                alert("您输入的邮箱有误请从新输入");
                return false;
            }
            else {
                return true;
            }
        }
        return true;
    };

    function checkPhone(value) {
        if (value) {
            if (!isPhone(value)) {
                alert("您输入的电话有误请从新输入");
                return false;
            }
            else {
                return true;
            }
        }
        return true;
    };


    function isEmail(str) {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        return reg.test(str);
    };

    function isPhone(str) {
        var reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
        return reg.test(str);
    };

    function getQueryString(name) {
        var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)"), r;
        var r = window.location.search.match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    };

    $.fn.ContentCorrect = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.click(function (event) {
                event.preventDefault();
                loadJs("uploadify", "//j.gamersky.com/Uploadify/jquery.uploadify.js", function () {
                    var html = '<div class="ui-error-bj" style="display:none" ><div class="ui-error-hd"><a class="ui-error-close" href="javascript:">×</a></div><div class="ui-error-con"><div class="ui-error-tit"><span class="ui-error-text-1">标题：</span><span class="ui-error-nr"></span></div><div class="ui-error-ms"><span class="ui-error-text-2">描述：</span><div class="ui-error-textarea inputbj"><textarea class="tarea"></textarea></div></div><div class="ui-error-pic"><span class="ui-error-text" style="margin-left:30px;">上传图片 ：</span><div class="ui-error-b" style="margin-bottom:10px"><input id="buttonbj" style="display:none" name="error" type="file" multiple="false"></div><img src="" id="showPicture" /></div><div class="ui-error-phone"><span class="ui-error-text">电话：</span><div class="ui-error-input inputbj"><input type="text" class="input">	</div></div><div class="ui-error-mail">  <span class="ui-error-text">邮箱：</span> <div class="ui-error-input inputbj"><input type="text" class="input"></div>  </div>  <div class="ui-error-tj1">  <div class="tj1-botton"><a class="buttonbj" ></a></div>  </div>   <div class="ui-error-tj2">    <div class="tj2-botton"><a class="buttonbj"></a> </div> </div> </div></div>';

                    $.blockUI({
                        message: $(html),
                        css: {
                            cursor: 'auto',
                            width: '0px',
                            height: '0px',
                            left: '50%',
                            top: '50%',
                            overflow: 'visible',
                            border: "0px"
                        },
                        overlayCSS: {
                            backgroundColor: '#000',
                            opacity: 0.6,
                            cursor: 'auto'
                        },
                        onBlock: function () {
                            $('.blockUI').bgiframe();
                            $(".ui-error-tit .ui-error-nr").text($("#jcjbContentData").attr("title"));
                            $("#buttonbj").uploadify({
                                'swf': '/js/Uploadify/uploadify.swf',
                                'uploader': '//up.gamersky.com/ReportUpload.php',
                                'auto': true,
                                'multi': false,
                                'buttonText': '选择',
                                'fileSizeLimit': '10MB',
                                'buttonImage': '//j.gamersky.com/Uploadify/select.jpg',
                                'fileTypeExts': '*.jpg;*.jpge;*.gif;*.png',
                                'wmode': 'transparent',
                                'width': 79,
                                'height': 34,
                                'onUploadSuccess': function (file, data, response) {
                                    var dataObj = eval("(" + data + ")");
                                    $("#showPicture").attr("src", dataObj.OtherParameter);
                                    $("#showPicture").attr("picUrl", dataObj.OtherParameter).show();
                                },
                                'onSelectError': function (file, errorCode, errorMsg) {
                                    switch (errorCode) {
                                        case -100:
                                            alert("上传的文件数量已经超出系统限制的" + $('#file_upload').uploadify('settings', 'queueSizeLimit') + "个文件！");
                                            break;
                                        case -110:
                                            alert("文件 [" + file.name + "] 大小超出系统限制的" + $('#file_upload').uploadify('settings', 'fileSizeLimit') + "大小！");
                                            break;
                                        case -120:
                                            alert("文件 [" + file.name + "] 大小异常！");
                                            break;
                                        case -130:
                                            alert("文件 [" + file.name + "] 类型不正确！");
                                            break;
                                        default:
                                            alert("文件上传错误！");
                                            break;
                                    }
                                }
                            });

                            $('.ui-error-bj .tj1-botton').click(function () {
                                var CorrectInfo = {};
                                CorrectInfo.Title = $("#jcjbContentData").attr("title");
                                CorrectInfo.GeneralId = $("#jcjbContentData").attr("data-generalId");
                                CorrectInfo.Description = $(".ui-error-ms .inputbj .tarea").val();
                                if (checkPhone($(".ui-error-phone .inputbj .input").val()) == false || checkIsNullOrEmpty($(".ui-error-ms .inputbj .tarea").val()) == false || checkEmail($(".ui-error-mail .inputbj .input").val()) == false) {
                                    return;
                                }
                                CorrectInfo.Phone = $(".ui-error-phone .inputbj .input").val();
                                CorrectInfo.Email = $(".ui-error-mail .inputbj .input").val();
                                CorrectInfo.PhotoUrl = $("#showPicture").attr("picUrl");
                                CorrectInfo.IsReport = 0;
                                CorrectInfo.State = 999;
                                $.ajax({
                                    url: '//db5.gamersky.com/CorrectReport.aspx',
                                    type: "get",
                                    data: { 'ContentData': JSON2.stringify(CorrectInfo) },
                                    dataType: 'jsonp',
                                    contentType: 'application/json;charset=utf-8',
                                    cache: false,
                                    success: function (data) {
                                        alert(data.body);
                                    },
                                    error: function (xhr) {

                                    }
                                });
                                $.unblockUI();
                            });

                            $('.ui-error-close').click(function () {
                                $.unblockUI();

                            });

                            $('.tj2-botton .buttonbj').click(function () {
                                $.unblockUI();
                            });
                        },
                        onUnblock: function () {
                            $('.ui-error-bj').remove();
                        }
                    });

                });
            });
        });
    }


    $.fn.ContentReport = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.click(function (event) {
                event.preventDefault();
                loadJs("uploadify", "//j.gamersky.com/Uploadify/jquery.uploadify.js", function () {
                    var html = '<div class="ui-error-bj" style="display:none"><div class="ui-error-hd"><a class="ui-error-close" href="javascript:">×</a></div><div class="ui-error-con"><div class="ui-error-tit"><span class="ui-error-text-1">标题：</span><span class="ui-error-nr"></span></div><div class="ui-error-ms"><span class="ui-error-text-2">描述：</span><div class="ui-error-textarea inputbj"><textarea class="tarea"></textarea></div></div><div class="ui-error-pic"><span class="ui-error-text" style="margin-left:30px;">上传图片 ：</span><div class="ui-error-b" style="margin-bottom:10px" ><input id="buttonbj" style="display:none;" name="error" type="file" multiple="false"></div><img src="" id="showPicture" /></div><div class="ui-error-phone"><span class="ui-error-text">电话：</span><div class="ui-error-input inputbj"><input type="text" class="input">	</div></div><div class="ui-error-mail"><span class="ui-error-text">邮箱：</span> <div class="ui-error-input inputbj"><input type="text" class="input"></div>  </div>  <div class="ui-error-tj1">  <div class="tj1-botton"><a class="buttonbj" ></a></div>  </div>   <div class="ui-error-tj2">    <div class="tj2-botton"><a class="buttonbj"></a> </div></div></div></div>';

                    $.blockUI({
                        message: $(html),
                        css: {
                            cursor: 'auto',
                            width: '0px',
                            height: '0px',
                            left: '50%',
                            top: '50%',
                            overflow: 'visible',
                            border: "0px"
                        },
                        overlayCSS: {
                            backgroundColor: '#000',
                            opacity: 0.6,
                            cursor: 'auto'
                        },
                        onBlock: function () {
                            $('.blockUI').bgiframe();
                            $(".ui-error-tit .ui-error-nr").text($("#jcjbContentData").attr("title"));
                            $("#buttonbj").uploadify({
                                'swf': '/js/Uploadify/uploadify.swf',
                                'uploader': '//up.gamersky.com/ReportUpload.php',
                                'auto': true,
                                'multi': false,
                                'buttonText': '选择',
                                'fileSizeLimit': '10MB',
                                'buttonImage': '//j.gamersky.com/Uploadify/select.jpg',
                                'fileTypeExts': '*.jpg;*.jpge;*.gif;*.png',
                                'wmode': 'transparent',
                                'width': 79,
                                'height': 34,
                                'onUploadSuccess': function (file, data, response) {
                                    var dataObj = eval("(" + data + ")");
                                    $("#showPicture").attr("src", dataObj.OtherParameter);
                                    $("#showPicture").attr("picUrl", dataObj.OtherParameter).show();

                                },
                                'onSelectError': function (file, errorCode, errorMsg) {
                                    switch (errorCode) {
                                        case -100:
                                            alert("上传的文件数量已经超出系统限制的" + $('#file_upload').uploadify('settings', 'queueSizeLimit') + "个文件！");
                                            break;
                                        case -110:
                                            alert("文件 [" + file.name + "] 大小超出系统限制的" + $('#file_upload').uploadify('settings', 'fileSizeLimit') + "大小！");
                                            break;
                                        case -120:
                                            alert("文件 [" + file.name + "] 大小异常！");
                                            break;
                                        case -130:
                                            alert("文件 [" + file.name + "] 类型不正确！");
                                            break;
                                        default:
                                            alert("文件上传错误！");
                                            break;
                                    }
                                }
                            });


                            $('.ui-error-bj .tj1-botton').click(function () {
                                var ContentData = {};
                                ContentData.Title = $("#jcjbContentData").attr("title");
                                ContentData.GeneralId = $("#jcjbContentData").attr("data-generalId");
                                ContentData.Description = $(".ui-error-ms .inputbj .tarea").val();
                                if (checkPhone($(".ui-error-phone .inputbj .input").val()) == false || checkIsNullOrEmpty($(".ui-error-ms .inputbj .tarea").val()) == false || checkEmail($(".ui-error-mail .inputbj .input").val()) == false) {
                                    return;
                                }
                                ContentData.Phone = $(".ui-error-phone .inputbj .input").val();
                                ContentData.Email = $(".ui-error-mail .inputbj .input").val();
                                ContentData.PhotoUrl = $("#showPicture").attr("picUrl");
                                ContentData.IsReport = 1;
                                ContentData.IsInit = 1;
                                $.ajax({
                                    url: '//db5.gamersky.com/CorrectReport.aspx',
                                    type: "get",
                                    data: { 'ContentData': JSON2.stringify(ContentData) },
                                    dataType: 'jsonp',
                                    contentType: 'application/json;charset=utf-8',
                                    cache: false,
                                    success: function (data) {
                                        alert(data.body);
                                    },
                                    error: function (xhr) {

                                    }
                                });
                                $.unblockUI();
                            });

                            $('.ui-error-close').click(function () {
                                $.unblockUI();
                            });

                            $('.tj2-botton .buttonbj').click(function () {

                                $.unblockUI();
                            });


                        },
                        onUnblock: function () {
                            $('.ui-error-bj').remove();
                        }
                    });

                });
            });
        });
    }

    $.fn.Collection = function (options) {
        return this.each(function () {
            var $this = $(this);
            var generalId = $("#jcjbContentData").attr("data-generalId");
            $this.click(function (event) {
                event.preventDefault();
                $.ajax({
                    url: '//i.gamersky.com/api/addcollect',
                    type: "get",
                    data: { "generalId": generalId },
                    dataType: 'jsonp',
                    success: function (data) {
                        if (data.status == "ok") {
                            alert("收藏成功！");
                        }
                        else {
                            alert(data.body);
                        }
                    },
                    error: function (xhr) {

                    }
                });
            });
        });
    }

    $(document).ready(function () {
        if ($("#jcjbContentData").length > 0) {
            $(".JCJB").show();
        }
        $(".btnContentReport").ContentReport();
        $(".btnContentCorrect").ContentCorrect();
        $(".btnCollection").Collection();
    });

})(jQuery);