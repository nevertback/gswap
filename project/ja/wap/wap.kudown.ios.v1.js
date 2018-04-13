(function ($) {
    var gsOption = {};
    gsOption.txt ='IOS版下载';
    gsOption.url = 'https://adl.netease.com/d/g/land/c/youming';
    gsOption.countId = '668629';
    gsOption.tar = '#gsTgWapKudownIos';
    gsOption.isOld = false;
    gsOption.excludeGame = [351859];
    var ua = navigator.userAgent.toLowerCase(),
        isIosPhone = /iphone|ipad|ipod/.test(ua);
    if(isIosPhone){
        gsTgWap.downBtn(gsOption);
    }
})(jQuery);