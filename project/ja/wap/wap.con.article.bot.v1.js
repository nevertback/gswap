(function ($) {
    var gsOption = {};gsOption.android = {};gsOption.ios = {};gsOption.android2 = {};gsOption.ios2 = {};
    gsOption.tit = '《坦克世界：闪击战》今天上线';//标题
    gsOption.src ='http://imgf.gamersky.com/img/tksj_220x150_1213.jpg';//素材地址
    //连接地址 安卓
    gsOption.android.url = 'https://adl.netease.com/d/g/dt/c/ymxk';
    gsOption.android.countId = '684095';//统计 安卓
    //连接地址 苹果
    gsOption.ios.url = 'https://adl.netease.com/d/g/dt/c/ymxk';
    gsOption.ios.countId = '684096';//统计 苹果
    gsOption.gg1display = true; //不显示：false;显示：true
    //第二条
    gsOption.tit2 = '《不朽凡人》期待你的加入';//标题
    gsOption.src2 ='http://imgf.gamersky.com/img/bxfr_220x150_1222_a.jpg';//素材地址
    //连接地址 安卓
    gsOption.android2.url = 'https://adl.netease.com/d/g/dt/c/ymxk';
    gsOption.android2.countId = '871410';//统计 安卓
    //连接地址 苹果
    gsOption.ios2.url = 'https://adl.netease.com/d/g/dt/c/ymxk';
    gsOption.ios2.countId = '871411';//统计 苹果
    gsOption.gg2display = true; //不显示：false;显示：true

    gsOption.tar = '#gsTgWapConArticleBot';
    gsTgWap.ConList(gsOption);
})(jQuery);