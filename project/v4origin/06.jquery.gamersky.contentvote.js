///<reference path="/js/jquery-1.9.1.js"/>
///<reference path="/js/jquery.hotkeys.js"/>
(function ($) {
    $.fn.WapContentVote = function (options) {
        return this.each(function () {
            var $this = $(this);
            var generalId = $this.attr("data-id");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://db5.gamersky.com/ContentVoteJsonp.aspx",
                data: {
                    id: generalId, a: "0"
                },
                success: function (data) {                    
                    if (data.items.length > 0) {
                        var datavote = data;
                        $this.find(".votetitle").html(data.vote.VoteTitle);
                        var thisli='';
                        var inputType = 'radio';
                        if (data.vote.ItemType > 0) {
                            inputType = 'checkbox';
                        }                        
                        var totNums = 0;
                        for (var vi = 0; vi < data.items.length; vi++) {
                            totNums += data.items[vi].VoteNumber;
                        }
                        for (var i = 0; i < data.items.length; i++) {
                            var n = i + 1;
                            var percNum = data.items[i].VoteNumber/totNums*100 + '%';
                            thisli += '<p><span class="ymw-con-vote-iptwrap"><input id="ymwVote' + n + '" name="ymwVoteRio" type="' + inputType + '" value="' + data.items[i].Title + '"></span><label for="ymwVote' + n + '">' + data.items[i].Title + '</label><span class="ymw-con-vote-pro"><i style="width:' + percNum + '"></i></span><span class="ymw-con-vote-num">' + data.items[i].VoteNumber + '票</span></p>';                           
                        }
                        var p = $(thisli);
                        $this.find(".votetitle").after(p);
                        $this.show();
                        $this.find("input[name='ymwVoteRio']").click(function () {
                            var $this = $(this);
                            $this.attr("checked", "checked");
                        });
                        $this.find(".toupiao-vbtn").click(function () {
                            var v = "";
                            $this.find("input[name='ymwVoteRio']").each(function () {
                                if ($(this).attr("checked")) {
                                    if (v.length > 0)
                                        v = v + ",";
                                        v = v + $(this).attr("value");
                                }
                            });
                            if (v.length == 0)  {
                                alert("请至少选择一个选项！");
                                return;
                            }                             
                            $.ajax({
                                type: "GET",
                                dataType: "jsonp",
                                url: "http://db5.gamersky.com/ContentVoteJsonp.aspx",
                                data: {
                                    id: generalId, a: "1", v: v
                                },
                                success: function (data) {
                                    $this.addClass('ymw-con-vote-res');                                    
                                    if (data.status == "ok") {
                                        alert("投票成功！");
                                    }
                                    else {
                                        alert(data.message);
                                    }
                                }
                            });
                            return false;          
                        });
                    }
                    else {
                        $this.hide();
                    }                   
                }
            });
        });
    };

    $.fn.WapHotVote = function (options) {
        return this.each(function () {
            var $this = $(this);
            var generalId = $(this).attr("data-itemId");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://db5.gamersky.com/VoteJson.aspx",
                data: {
                    id: generalId, a: "init"
                },
                success: function (data) { 
                    var redPot = '<h5>' + data.RedPoint + '</h5><p>' + data.RedDescription + '</p>',
                    bluePot = '<h5>' + data.BluePoint + '</h5><p>' + data.BlueDescription + '</p>';
                    $this.find('.ymwRedPoint').html(redPot);
                    $this.find('.ymwBluePoint').html(bluePot);
                    $this.find(".redPollNumber").attr('data-num', data.RedPoll).html(data.RedPoll + '人');
                    $this.find(".bluePollNumber").attr('data-num', data.RedPoll).html(data.BluePoll + '人');
                    var proCountred = parseInt(data.RedPoll);
                    var proCountblue = parseInt(data.BluePoll);
                    var proCountsum = proCountred + proCountblue;
                    var proRedW = proCountred / proCountsum * 100 + '%';
                    if (proCountsum == 0) {
                        proRedW='50%';
                    }
                    $this.find('.yu-pro-r').css('width', proRedW);
                }
            });

            $this.find(".votebtn").click(function () {
                $votebtn = $(this);
                var cookieKey = "waphotvote-" + generalId;
                if ($.fn.cookie(cookieKey) !== undefined && $.fn.cookie(cookieKey) !== null) {
                    if ($votebtn.hasClass("OK") || $votebtn.hasClass("NO")) {
                        alert("您已投过票");
                    }
                    return;
                }
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://db5.gamersky.com/VoteJson.aspx",
                    data: {
                        id: generalId, a: "vote", p: $votebtn.attr("data-point")
                    },
                    success: function (data) {
                        if (data.status == "ok") {
                            if ($votebtn.attr("data-point") == "red") {                            
                                $this.find(".redPollNumber").html(parseInt($this.find(".redPollNumber").html()) + 1);
                                $this.find(".redPollNumber").attr('data-num', parseInt($this.find(".redPollNumber").html()));
                            }
                            else {                               
                                $this.find(".bluePollNumber").html(parseInt($this.find(".bluePollNumber").html()) + 1);
                                $this.find(".bluePollNumber").attr('data-num', parseInt($this.find(".bluePollNumber").html()))
                            }
                            var proCountred = parseInt($this.find(".redPollNumber").html());
                            var proCountblue = parseInt($this.find(".bluePollNumber").html());
                            var proCounsum = proCountred + proCountblue;
                            var proRedW = proCountred / proCounsum * 100 + '%';
                            $this.find('.yu-pro-r').css('width', proRedW);                       
                            $.fn.cookie(cookieKey, "1", { path: "/", expires: 365 });
                        }
                        else {
                            if ($votebtn.hasClass("OK") || $votebtn.hasClass("NO")) {
                                alert("您已投过票");
                            }
                        }
                    }
                });
            });
        });
    };


    $(document).ready(function () {
        $(".wapvote").WapContentVote();
        $(".hotVote").WapHotVote();
    });

})(jQuery);
