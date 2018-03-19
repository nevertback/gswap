function loadingFun() {
	var items = new Array(),
		errors = new Array(),
		current = 0,
		loadwrap = $('#loading'),
		loadbar = $('#loadingBar');

	var getImages = function(element) {
		$(element).find('*:not(script)').each(function() {
			var url = "";

			if ($(this).css('background-image').indexOf('none') == -1 && $(this).css('background-image').indexOf('-gradient') == -1) {
				url = $(this).css('background-image');
				if (url.indexOf('url') != -1) {
					var temp = url.match(/url\((.*?)\)/);
					url = temp[1].replace(/\"/g, '');
				}
			} else if ($(this).get(0).nodeName.toLowerCase() == 'img' && typeof($(this).attr('src')) != 'undefined') {
				url = $(this).attr('src');
			}

			if (url.length > 0) {
				items.push(url);
			}
		});
	}
	var preloading = function() {
		for (var i = 0; i < items.length; i++) {
			if (loadImg(items[i]));
		}
	}
	var loadImg = function(url) {
		var imgLoad = new Image();
		$(imgLoad)
			.load(function() {
				completeLoading();
			})
			.error(function() {
				errors.push($(this).attr('src'));
				completeLoading();
			})
			.attr('src', url);
	}
	var completeLoading = function() {
		current++;
		var per = Math.round((current / items.length) * 100);

		loadAnim(per);

		if (current >= items.length) {
			current = items.length;
			loadAnim(100,onComplete);
		}
	}

	var loadAnim = function(perc, callback){
		loadbar.stop().animate({
			width: perc + '%'
		}, 500, 'linear',function(){
			callback();
		});
	}

	var onComplete = function() {
		loadwrap.fadeOut(200);
	};
	getImages('body');
	preloading();
};
(function(){
	if($('#loading').length>0){
		loadingFun();
	}	
})();