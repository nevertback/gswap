(function ($) {
    var basepath = 'http://ja1.gamersky.com/';
    var tgList = [
        {//wap首页底部浮窗（全站通发）(V1)
            tid:'#gsTgWapBottomFixed',
            url:'wap/wap.bottom.fixed.v1.js'
        },
        {//WAP首页横幅（全站通发）(V1)
            tid:'#gsTgWapTop',
            url:'wap/wap.top.v1.js'
        },
        {//wap首页手游下载下方横幅(V1)
            tid:'#gsTgWapIndexentTop',
            url:'wap/wap.indexent.top.v1.js'
        },
        {//WAP首页推荐第四条(V1)
            tid:'#gsTgWapIndexlist4',
            url:'wap/wap.indexlist4.v1.js'
        },
        {//WAP首页列表横幅(V1)
            tid:'#gsTgWapIndexremenTop',
            url:'wap/wap.indexremen.top.v1.js'
        },
        {//wap首页热门游戏下方推荐(V1)
            tid:'#gsTgWapIndexremenBottom',
            url:'wap/wap.indexremen.bottom.v1.js'
        },
        {//WAP内容页导航下方banner(V1)
            tid:'#gsTgWapNavBottom',
            url:'wap/wap.nav.bottom.v1.js'
        },
        {//wap内容页横幅推荐(V1)
            tid:'#gsTgWapConBdshareTop',
            url:'wap/wap.con.bdshare.top.v1.js'
        },
        {//wap内容页图文推荐(V1)
            tid:'#gsTgWapConArticleBot',
            url:'wap/wap.con.article.bot.v1.js'
        },
        {//wap内容页底部横幅(V1)
            tid:'#gsTgWapCommBot',
            url:'wap/wap.comm.bot.v1.js'
        },
        {//wap游戏库内容页中部横幅(V1)
            tid:'#gsTgWapKuTl',
            url:'wap/wap.ku.tl.v1.js'
        },
        {//wap游戏库内容页下载Android(V1)
            tid:'#gsTgWapKudownAndroid',
            url:'wap/wap.kudown.android.v1.js'
        },
        {//wap游戏库内容页下载Android(V1)
            tid:'#gsTgWapKudownIos',
            url:'wap/wap.kudown.ios.v1.js'
        },
        {//wap下载页按钮Android(V1)
            tid:'#gsTgWapDownAndroid',
            url:'wap/wap.down.android.v1.js'
        },
        {//	wap下载页按钮IOS(V1)
            tid:'#gsTgWapDownIos',
            url:'wap/wap.down.ios.v1.js'
        },
        {//wap首页镂空背景
            tid:'#gsTgWapLk',
            url:'wap/wap.lk.v1.js'
        },
        {//wap全站顶部悬浮
            tid:'#gsTgWapBottomFixed',
            url:'wap/wap.top.fixed.v1.js'
        }
    ];
    function loadGsTgJs(tid,url) {
        if($(tid).length>0){
            var nt = new Date().getTime();
            $.getScript(basepath+url+'?gettime='+nt);
        }
    }
    function loadList() {
        for(var i = 0;i<tgList.length;i++){
            loadGsTgJs(tgList[i].tid,tgList[i].url);
        }
    }
    var ntz = new Date().getTime();
    $.getScript('ja/gs.common.income.wap.js',function () {
    //$.getScript('http://ja.gamersky.com/gs.common.income.wap.js',function () {
        loadList();
    });
})(jQuery);