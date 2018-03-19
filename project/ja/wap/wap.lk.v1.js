(function ($) {
    var gsOption = {};gsOption.android = {};gsOption.ios = {};
    gsOption.src ='http://imgf.gamersky.com/img/clx_500x1200_0209.jpg';
    gsOption.android.url = 'https://adl.netease.com/d/g/clx/c/youmin';
    gsOption.android.countId1 = '1009575';//安卓二次点击下载
    gsOption.android.countId2 = '1013624';//安卓自然跳转下载
    gsOption.android.countId3 = '1013628';//安卓广告点击
    gsOption.ios.url = 'https://adl.netease.com/d/g/clx/c/youmin';
    gsOption.ios.countId1 = '1009576';//ios-二次点击下载
    gsOption.ios.countId2 = '1013627';//ios自然跳转下载
    gsOption.ios.countId3 = '1013630';//ios-广告点击
    gsOption.jcCode = 'http://image.gamersky.com/webimg13/zhuanti/common/blank.png';
    gsOption.ratio = 500/230;
    gsOption.delayClick = 2;//延迟跳转时间（秒）
    gsOption.tg = '广告';
    gsOption.tar = '#gsTgWapLk';
    gsTgWap.lkV2(gsOption);
})(jQuery);