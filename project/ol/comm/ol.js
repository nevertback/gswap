function loadJs(t, a, e) {
	var n = document.getElementsByTagName("head")[0],
		i = null;
	null == document.getElementById(t) ? (i = document.createElement("script"), i.setAttribute("type", "text/javascript"), i.setAttribute("src", a), i.setAttribute("id", t), null != e && (i.onload = i.onreadystatechange = function() {
		return !i.ready && void(i.readyState && "loaded" != i.readyState && "complete" != i.readyState || (i.ready = !0, e()))
	}), n.appendChild(i)) : null != e && e()
}
function lockHtml() {
	var t, a, e = $("html");
	t = $(window).width(), e.addClass("html-lock-test"), a = $(window).width(), e.removeClass("html-lock-test"), $("<style type='text/css' id='lockhtmlstyle'>.htmllock-margin{margin-right:" + (a - t) + "px;overflow: hidden;}</style>").appendTo("head"), e.addClass("htmllock-margin")
}
function unlockHtml() {
	var t = $("html");
	t.removeClass("htmllock-margin")
}
function isImgLoad(t, a) {
	t.each(function() {
		if (0 === this.height) return isLoad = !1, !1
	}), isLoad ? (clearTimeout(t_img), a()) : (isLoad = !0, t_img = setTimeout(function() {
		isImgLoad(a)
	}, 200))
}
function resizeSwpH(t) {
	var a = t.closest(".swiper-slide").height() + "px";
	t.closest(".swiper-wrapper").css("height", a)
}
function resizeVD() {
	$(window).resize(function() {
		var t = $(window).width() - 28,
			a = 9 * t / 16;
		$(".ymw-congame-dh-con-vd,.playArea").css({
			width: t + "px",
			height: a + "px"
		})
	})
}
function loadingFun() {
	var t = new Array,
		a = new Array,
		e = 0,
		n = $("#loading"),
		i = $("#loadingBar"),
		r = function(a) {
			$(a).find("*:not(script)").each(function() {
				var a = "";
				if ($(this).css("background-image").indexOf("none") == -1 && $(this).css("background-image").indexOf("-gradient") == -1) {
					if (a = $(this).css("background-image"), a.indexOf("url") != -1) {
						var e = a.match(/url\((.*?)\)/);
						a = e[1].replace(/\"/g, "")
					}
				} else "img" == $(this).get(0).nodeName.toLowerCase() && "undefined" != typeof $(this).attr("src") && (a = $(this).attr("src"));
				a.length > 0 && t.push(a)
			})
		},
		s = function() {
			for (var a = 0; a < t.length; a++) o(t[a])
		},
		o = function(t) {
			var e = new Image;
			$(e).load(function() {
				c()
			}).error(function() {
				a.push($(this).attr("src")), c()
			}).attr("src", t)
		},
		c = function() {
			e++;
			var a = Math.round(e / t.length * 100);
			d(a), e >= t.length && (e = t.length, d(100, l))
		},
		d = function(t, a) {
			i.stop().animate({
				width: t + "%"
			}, 500, "linear", function() {
				a()
			})
		},
		l = function() {
			n.fadeOut(200)
		};
	r("body"), s()
}!
function(t) {
	"function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t) {
	function a(t) {
		return t
	}
	function e(t) {
		return decodeURIComponent(t.replace(i, " "))
	}
	function n(t) {
		0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
		try {
			return r.json ? JSON.parse(t) : t
		} catch (a) {}
	}
	var i = /\+/g,
		r = t.cookie = function(i, s, o) {
			if (void 0 !== s) {
				if (o = t.extend({}, r.defaults, o), "number" == typeof o.expires) {
					var c = o.expires,
						d = o.expires = new Date;
					d.setDate(d.getDate() + c)
				}
				return s = r.json ? JSON.stringify(s) : String(s), document.cookie = [r.raw ? i : encodeURIComponent(i), "=", r.raw ? s : encodeURIComponent(s), o.expires ? "; expires=" + o.expires.toUTCString() : "", o.path ? "; path=" + o.path : "", o.domain ? "; domain=" + o.domain : "", o.secure ? "; secure" : ""].join("")
			}
			for (var l = r.raw ? a : e, p = document.cookie.split("; "), u = i ? void 0 : {}, m = 0, f = p.length; m < f; m++) {
				var h = p[m].split("="),
					y = l(h.shift()),
					g = l(h.join("="));
				if (i && i === y) {
					u = n(g);
					break
				}
				i || (u[y] = n(g))
			}
			return u
		};
	r.defaults = {}, t.removeCookie = function(a, e) {
		return void 0 !== t.cookie(a) && (t.cookie(a, "", t.extend({}, e, {
			expires: -1
		})), !0)
	}
}), function() {
	var t = function(t, a) {
			var e = document.getElementsByTagName("head")[0],
				n = document.createElement("script");
			n.setAttribute("type", "text/javascript"), n.setAttribute("src", t), e.appendChild(n);
			var i = function() {
					"function" == typeof a && a()
				};
			document.all ? n.onreadystatechange = function() {
				"loaded" != n.readyState && "complete" != n.readyState || i()
			} : n.onload = function() {
				i()
			}
		};
	jQuery && ($.getScript = t)
}();
var JSON2;
if (JSON2 || (JSON2 = {}), function() {
	"use strict";

	function f(t) {
		return t < 10 ? "0" + t : t
	}
	function quote(t) {
		return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function(t) {
			var a = meta[t];
			return "string" == typeof a ? a : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + t + '"'
	}
	function str(t, a) {
		var e, n, i, r, s, o = gap,
			c = a[t];
		switch (c && "object" == typeof c && "function" == typeof c.toJSON && (c = c.toJSON(t)), "function" == typeof rep && (c = rep.call(a, t, c)), typeof c) {
			cas
			e "string": return quote(c);
		case "number":
			return isFinite(c) ? String(c) : "null";
		case "boolean":
		case "null":
			return String(c);
		case "object":
			if (!c) return "null";
			if (gap += indent, s = [], "[object Array]" === Object.prototype.toString.apply(c)) {
				for (r = c.length, e = 0; e < r; e += 1) s[e] = str(e, c) || "null";
				return i = 0 === s.length ? "[]" : gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + o + "]" : "[" + s.join(",") + "]", gap = o, i
			}
			if (rep && "object" == typeof rep) for (r = rep.length, e = 0; e < r; e += 1)"string" == typeof rep[e] && (n = rep[e], i = str(n, c), i && s.push(quote(n) + (gap ? ": " : ":") + i));
			else for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (i = str(n, c), i && s.push(quote(n) + (gap ? ": " : ":") + i));
			return i = 0 === s.length ? "{}" : gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + o + "}" : "{" + s.join(",") + "}", gap = o, i
		}
	}
	"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function(t) {
		return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
	}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(t) {
		return this.valueOf()
	});
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		gap, indent, meta = {
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		},
		rep;
	"function" != typeof JSON2.stringify && (JSON2.stringify = function(t, a, e) {
		var n;
		if (gap = "", indent = "", "number" == typeof e) for (n = 0; n < e; n += 1) indent += " ";
		else "string" == typeof e && (indent = e);
		if (rep = a, a && "function" != typeof a && ("object" != typeof a || "number" != typeof a.length)) throw new Error("JSON2.stringify");
		return str("", {
			"": t
		})
	}), "function" != typeof JSON2.parse && (JSON2.parse = function(text, reviver) {
		function walk(t, a) {
			var e, n, i = t[a];
			if (i && "object" == typeof i) for (e in i) Object.prototype.hasOwnProperty.call(i, e) && (n = walk(i, e), void 0 !== n ? i[e] = n : delete i[e]);
			return reviver.call(t, a, i)
		}
		var j;
		if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(t) {
			return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
		})), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
			"": j
		}, "") : j;
		throw new SyntaxError("JSON2.parse")
	})
}(), "undefined" == typeof deconcept) var deconcept = new Object;
"undefined" == typeof deconcept.util && (deconcept.util = new Object), "undefined" == typeof deconcept.SWFObjectUtil && (deconcept.SWFObjectUtil = new Object), deconcept.SWFObject = function(t, a, e, n, i, r, s, o, c, d) {
	if (document.getElementById) {
		this.DETECT_KEY = d ? d : "detectflash", this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY), this.params = new Object, this.variables = new Object, this.attributes = new Array, t && this.setAttribute("swf", t), a && this.setAttribute("id", a), e && this.setAttribute("width", e), n && this.setAttribute("height", n), i && this.setAttribute("version", new deconcept.PlayerVersion(i.toString().split("."))), this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion(), !window.opera && document.all && this.installedVer.major > 7 && (deconcept.SWFObject.doPrepUnload = !0), r && this.addParam("bgcolor", r);
		var l = s ? s : "high";
		this.addParam("quality", l), this.setAttribute("useExpressInstall", !1), this.setAttribute("doExpressInstall", !1);
		var p = o ? o : window.location;
		this.setAttribute("xiRedirectUrl", p), this.setAttribute("redirectUrl", ""), c && this.setAttribute("redirectUrl", c)
	}
}, deconcept.SWFObject.prototype = {
	useExpressInstall: function(t) {
		this.xiSWFPath = t ? t : "expressinstall.swf", this.setAttribute("useExpressInstall", !0)
	},
	setAttribute: function(t, a) {
		this.attributes[t] = a
	},
	getAttribute: function(t) {
		return this.attributes[t]
	},
	addParam: function(t, a) {
		this.params[t] = a
	},
	getParams: function() {
		return this.params
	},
	addVariable: function(t, a) {
		this.variables[t] = a
	},
	getVariable: function(t) {
		return this.variables[t]
	},
	getVariables: function() {
		return this.variables
	},
	getVariablePairs: funct
	ion() {
		var t, a = new Array,
			e = this.getVariables();
		for (t in e) a[a.length] = t + "=" + e[t];
		return a
	},
	getSWFHTML: function() {
		var t = "";
		if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
			this.getAttribute("doExpressInstall") && (this.addVariable("MMplayerType", "PlugIn"), this.setAttribute("swf", this.xiSWFPath)), t = '<embed type="application/x-shockwave-flash" src="' + this.getAttribute("swf") + '" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '" style="' + this.getAttribute("style") + '"', t += ' id="' + this.getAttribute("id") + '" name="' + this.getAttribute("id") + '" ';
			var a = this.getParams();
			for (var e in a) t += [e] + '="' + a[e] + '" ';
			var n = this.getVariablePairs().join("&");
			n.length > 0 && (t += 'flashvars="' + n + '"'), t += "/>"
		} else {
			this.getAttribute("doExpressInstall") && (this.addVariable("MMplayerType", "ActiveX"), this.setAttribute("swf", this.xiSWFPath)), t = '<object id="' + this.getAttribute("id") + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '" style="' + this.getAttribute("style") + '">', t += '<param name="movie" value="' + this.getAttribute("swf") + '" />';
			var i = this.getParams();
			for (var e in i) t += '<param name="' + e + '" value="' + i[e] + '" />';
			var r = this.getVariablePairs().join("&");
			r.length > 0 && (t += '<param name="flashvars" value="' + r + '" />'), t += "</object>"
		}
		return t
	},
	write: function(t) {
		if (this.getAttribute("useExpressInstall")) {
			var a = new deconcept.PlayerVersion([6, 0, 65]);
			this.installedVer.versionIsValid(a) && !this.installedVer.versionIsValid(this.getAttribute("version")) && (this.setAttribute("doExpressInstall", !0), this.addVariable("MMredirectURL", escape(this.getAttribute("xiRedirectUrl"))), document.title = document.title.slice(0, 47) + " - Flash Player Installation", this.addVariable("MMdoctitle", document.title))
		}
		if (this.skipDetect || this.getAttribute("doExpressInstall") || this.installedVer.versionIsValid(this.getAttribute("version"))) {
			var e = "string" == typeof t ? document.getElementById(t) : t;
			return e.innerHTML = this.getSWFHTML(), !0
		}
		return "" != this.getAttribute("redirectUrl") && document.location.replace(this.getAttribute("redirectUrl")), !1
	}
}, deconcept.SWFObjectUtil.getPlayerVersion = function() {
	var t = new deconcept.PlayerVersion([0, 0, 0]);
	if (navigator.plugins && navigator.mimeTypes.length) {
		var a = navigator.plugins["Shockwave Flash"];
		a && a.description && (t = new deconcept.PlayerVersion(a.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split(".")))
	} else if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0) for (var e = 1, n = 3; e;) try {
		n++, e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + n), t = new deconcept.PlayerVersion([n, 0, 0])
	} catch (i) {
		e = null
	} else {
		try {
			var e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
		} catch (i) {
			try {
				var e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				t = new deconcept.PlayerVersion([6, 0, 21]), e.AllowScriptAccess = "always"
			} catch (i) {
				if (6 == t.major) return t
			}
			try {
				e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
			} catch (i) {}
		}
		null != e && (t = new deconcept.PlayerVersion(e.GetVariable("$version").split(" ")[1].split(",")))
	}
	return t
}, deconcept.PlayerVersion = function(t) {
	this.major = null != t[0] ? parseInt(t[0]) : 0, this.minor = null != t[1] ? parseInt(t[1]) : 0, this.rev = null != t[2] ? parseInt(t[2]) : 0
}, deconcept.PlayerVersion.prototype.versionIsValid = function(t) {
	return !(this.major < t.major) && (this.major > t.major || !(this.minor < t.minor) && (this.minor > t.minor || !(this.rev < t.rev)))
}, deconcept.util = {
	getRequestParameter: function(t) {
		var a = document.location.search || document.location.hash;
		if (null == t) return a;
		if (a) for (var e = a.substring(1).split("&"), n = 0; n < e.length; n++) if (e[n].substring(0, e[n].indexOf("=")) == t) return e[n].substring(e[n].indexOf("=") + 1);
		return ""
	}
}, deconcept.SWFObjectUtil.cleanupSWFs = function() {
	for (var t = document.getElementsByTagName("OBJECT"), a = t.length - 1; a >= 0; a--) {
		t[a].style.display = "none";
		for (var e in t[a])"function" == typeof t[a][e] && (t[a][e] = function() {})
	}
}, deconcept.SWFObject.doPrepUnload && (deconcept.unloadSet || (deconcept.SWFObjectUtil.prepUnload = function() {
	__flash_unloadHandler = function() {}, __flash_savedUnloadHandler = function() {}, window.attachEv
	ent("onunload", deconcept.SWFObjectUtil.cleanupSWFs)
}, window.attachEvent("onbeforeunload", deconcept.SWFObjectUtil.prepUnload), deconcept.unloadSet = !0)), !document.getElementById && document.all && (document.getElementById = function(t) {
	return document.all[t]
});
var getQueryParamValue = deconcept.util.getRequestParameter,
	FlashObject = deconcept.SWFObject,
	SWFObject = deconcept.SWFObject;
!
function(t) {
	t.extend(t.fn, {
		cookie: function(a, e, n) {
			var i, r, s, o;
			return arguments.length > 1 && "[object Object]" !== String(e) ? (n = t.extend({}, n), null !== e && void 0 !== e || (n.expires = -1), "number" == typeof n.expires && (i = 24 * n.expires * 60 * 60 * 1e3, r = n.expires = new Date, r.setTime(r.getTime() + i)), e = String(e), document.cookie = [encodeURIComponent(a), "=", n.raw ? e : encodeURIComponent(e), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : ""].join("")) : (n = e || {}, o = n.raw ?
			function(t) {
				return t
			} : decodeURIComponent, (s = new RegExp("(?:^|; )" + encodeURIComponent(a) + "=([^;]*)").exec(document.cookie)) ? o(s[1]) : null)
		}
	})
}(jQuery), function(t) {
	t.fn.ContentScore = function(a) {
		return this.each(function() {
			var a = t(this);
			a.find(".contentscore").mouseout(function() {
				var e = parseInt(t(".contentscore[scored='true']").attr("ranking"));
				a.find(".contentscore").each(function() {
					var a = parseInt(t(this).attr("ranking")),
						n = a <= e ? siteSetup.sitePath + "Images/fstar.gif" : siteSetup.sitePath + "Images/estar.gif";
					t(this).attr("src", n)
				})
			}).mouseover(function() {
				var e = parseInt(t(this).attr("ranking"));
				a.find(".contentscore").each(function() {
					var a = parseInt(t(this).attr("ranking")),
						n = a <= e ? siteSetup.sitePath + "Images/fstar.gif" : siteSetup.sitePath + "Images/estar.gif";
					t(this).attr("src", n)
				})
			}).click(function() {
				var a = parseInt(t(this).attr("itemId"));
				t.pe.ajax("contentpk", {
					params: {
						GenneralId: a,
						Score: parseInt(t(this).attr("ranking")),
						Type: 0
					},
					success: function(a) {
						var e = t(a),
							n = e.find("status").text();
						e.find("result").text();
						switch (n) {
						case "ok":
							t("#contentScoreInit").ContentScoreInit();
							break;
						case "AnonymousAgain":
						case "UserAgain":
							alert("对不起，您已经评价过了，请勿再评价！");
							break;
						case "err":
							alert("文章评分失败！")
						}
					}
				})
			})
		})
	}, t.fn.ContentScoreInit = function(a) {
		return this.each(function() {
			$this = t(this), t.pe.ajax("GetContentPKResult", {
				params: {
					GenneralId: $this.attr("itemId")
				},
				success: function(a) {
					var e = t(a),
						n = e.find("status").text(),
						i = e.find("totalCount").text(),
						r = e.find("averageScore").text();
					switch (n) {
					case "ok":
						$this.find(".totalCount").html(i), $this.find(".averageScore").html(r);
						break;
					case "err":
					}
				}
			})
		})
	}
}(jQuery), $(document).ready(function() {
	$("#contentScoreInit").ContentScoreInit(), $("#contentScoreRanking").ContentScore()
}), function(t) {
	t.fn.ThunderDownLoad = function(a) {
		return this.each(function() {
			var a = t(this);
			a.click(function(e) {
				e.preventDefault(), t.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//click.gamersky.com/Common/GetHits.aspx",
					data: {
						id: a.attr("itemid"),
						script: "3",
						hot: "true"
					},
					success: function(t) {}
				}), t.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//db4.gamersky.com/Common/ShowDownloadUrlJsonp.aspx",
					data: {
						urlid: a.attr("urlid"),
						id: a.attr("itemid")
					},
					success: function(t) {
						if ("ok" == t.status) {
							var e = t.body;
							thunderHrefAttr ? a.attr(thunderHrefAttr, ThunderEncode(e)) : a.attr("thunderHref", ThunderEncode(e)), a.attr("thunderPid", "51185"), a.attr("thunderResTitle", ""), a.contextmenu(function() {
								ThunderNetwork_SetHref(this)
							}), a.unbind("click"), a.click(function(t) {
								t.preventDefault(), OnDownloadClick_Simple(this, 2, 4)
							}), OnDownloadClick_Simple(a.get(0), 2, 4)
						}
					}
				})
			})
		})
	}, t(document).ready(function() {
		t(".gsthunder").ThunderDownLoad(), t(".dvurl1 li a").attr("target", "_blank")
	})
}(jQuery), function($) {
	Number.prototype.toFixed = function(t) {
		var a = this + "";
		if (t || (t = 0), a.indexOf(".") == -1 && (a += "."), a += new Array(t + 1).join("0"), new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (t + 1) + "})?)\\d*$").test(a)) {
			var a = "0" + RegExp.$2,
				e = RegExp.$1,
				n = RegExp.$3.length,
				i = !0;
			if (n == t + 2) {
				if (n = a.match(/\d/g), parseInt(n[n.length - 1]) > 4) for (var r = n.length - 2; r >= 0 && (n[r] = parseInt(n[r]) + 1, 10 == n[r]); r--) n[r] = 0, i = 1 != r;
				a = n.join("").replace(new RegExp("(\\d+)(\\d{" + t + "})\\d$"), "$1.$2")
			}
			return i && (a = a.substr(1)), (e + a).replace(/\.$/, "")
		}
		return this + ""
	}, $.fn.KuScore = function(t) {
		return this.each(function() {
			var t = $(this);
			$(".midL1_2").bind("selectstart", function() {
				return !1
			});
			var a = "R" + t.attr("data-generalId") + "-" + t.attr("data-type");
			if (void 0 !== $.fn.cookie(a)) {
				t.unbind("mousemove");
				var e = JSON2.parse($.fn.cookie(a));
				$(".S3_2").html(e.Sorce);
				var n = parseInt(2 * parseFloat(e.Sorce)) - 1;
				t.find("ul").attr("class", "u" + String(n));
				var i = 0;
				t.find("ul li").each(function(t) {
					t <= n && (0 != (1 & t) && (i += 1), i += $(this).width())
				}), t.find("span").css("left", i)
			} else {
				var r = t.offset().left + 1.5,
					s = t.width();
				t.mousemove(function(a) {
					var e = a.pageX - r,
						n = t.find("ul li").index();
					if (e >= 0 && e <= s - 13) {
						t.find("span").css("left", e), e <= 0 && ($(".S3_2").html("0.0"), t.find("ul").attr("class", ""));
						for (var i = 0, o = 0, c = "", d = 0; d <= n; d++) i = 0 != (1 & d) ? i + 7 : i + 6, o += .5, c = 1 == String(o).length ? o.toFixed(1) : o, e > i - (0 != (1 & d) ? 7 : 6) && e <= i && ($(".S3_2").html(c), t.attr("data-sorce", c), t.find("ul").attr("class", "u" + d))
					}
				})
			}
		})
	}, $.fn.Rating = function(t) {
		return this.each(function() {
			var t = $(this),
				a = t.attr("data-tips");
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//i.gamersky.com/apirating/init",
				data: {
					generalId: t.attr("data-generalId"),
					ratingType: t.attr("data-type"),
					Action: "init"
				},
				success: function(e) {
					if (e.hasOwnProperty("status")) switch (e.status) {
					case "err":
						alert("提交" + a + "错误！");
						break;
					case "existuser":
					case "existip":
						alert("已" + a + "！")
					} else $("#" + t.attr("data-totleId")).html(e.Times), $("#" + t.attr("data-avgscore")).html(10 == e.Average ? "10" : e.Average.toFixed(1))
				}
			}), t.click(function(e) {
				e.preventDefault(), $(".S31_2").unbind("mousemove");
				var n = "R" + t.attr("data-generalId") + "-" + t.attr("data-type");
				return t.is("[data-group]") && (n = "R" + t.attr("data-generalId") + "-" + t.attr("data-group")), void 0 !== $.fn.cookie(n) && null !== $.fn.cookie(n) ? void alert("已" + a + "！") : void $.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//i.gamersky.com/apirating/rating",
					data: {
						Rating: JSON2.stringify({
							GenneralId: t.attr("data-generalId"),
							Sorce: t.attr("data-sorce"),
							Type: t.attr("data-type")
						}),
						Action: "rating"
					},
					success: function(e) {
						if (e.hasOwnProperty("status")) switch (e.status) {
						case "err":
							alert("提交" + a + "错误！");
							break;
						case "existuser":
						case "existip":
							alert("已" + a + "！")
						} else $("#" + t.attr("data-totleId")).html(e.Times), $("#" + t.attr("data-avgscore")).html(10 == e.Average ? "10" : e.Average.toFixed(1)), $.fn.cookie(n, JSON2.stringify({
							GenneralId: t.attr("data-generalId"),
							Sorce: t.attr("data-sorce"),
							Type: t.attr("data-type")
						}), {
							path: "/",
							expires: 365
						}), $(".S31_2").KuScore()
					}
				})
			})
		})
	}, $.fn.DhRating = function(t) {
		return this.each(function() {
			var t = $(this),
				a = t.attr("data-tips");
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//i.gamersky.com/apirating/init",
				data: {
					generalId: t.attr("data-generalId"),
					ratingType: t.attr("data-type"),
					Action: "init"
				},
				success: function(e) {
					if (e.hasOwnProperty("status")) switch (e.status) {
					case "err":
						alert("提交" + a + "错误！");
						break;
					case "existuser":
					case "existip":
						alert("已" + a + "！")
					} else $("#" + t.attr("data-totleId")).html(e.Times), $("#" + t.attr("data-avgscore")).html("10" == e.Average ? "10" : "" + e.Average.toFixed(1))
				}
			}), t.click(function(e) {
				e.preventDefault(), $(".S31_2").unbind("mousemove");
				var n = "R" + t.attr("data-generalId") + "-" + t.attr("data-type");
				return t.is("[data-group]") && (n = "R" + t.attr("data-generalId") + "-" + t.attr("data-group")), void 0 !== $.fn.cookie(n) && null !== $.fn.cookie(n) ? void alert("已" + a + "！") : void $.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//i.gamersky.com/apirating/rating",
					data: {
						Rating: JSON2.stringify({
							GenneralId: t.attr("data-generalId"),
							Sorce: t.attr("data-sorce"),
							Type: t.attr("data-type")
						}),
						Action: "rating"
					},
					success: function(e) {
						if (e.hasOwnProperty("status")) switch (e.status) {
						case "err":
							alert("提交" + a + "错误！");
							break;
						case "existuser":
						case "existip":
							alert("已" + a + "！")
						} else $("#" + t.attr("data-totleId")).html(e.Times), $("#" + t.attr("data-avgscore")).html(10 == e.Average ? "10" : e.Average.toFixed(1)), $.fn.cookie(n, JSON2.stringify({
							GenneralId: t.attr("data-generalId"),
							Sorce: t.attr("data-sorce"),
							Type: t.attr("data-type")
						}), {
							path: "/",
							expires: 365
						}), $(".S31_2").KuScore()
					}
				})
			})
		})
	}, $.fn.RatingGamersky = function(t) {
		return this.each(function() {
			var t = $(this);
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//i.gamersky.com/apirating/grade",
				data: {
					generalId: t.attr("data-generalId"),
					Action: "grade"
				},
				success: function(a) {
					if ("" != a.EditorRating && "" != a.RatingUr
					l) {
						var e = " <a href='" + a.RatingUrl + "'  target='_blank'><div class='PFl_num S1_2'>" + a.EditorRating + "</div></a>";
						t.append(e)
					} else {
						var e = "<div class='PFl_num S1_2'>--</div>";
						t.append(e)
					}
				}
			})
		})
	}, $.fn.RatingGroup = function(options) {
		return this.each(function() {
			for (var $this = $(this), tips = $this.attr("data-tips"), number1 = $(".ratingGroupAction").length, types = "", toteid = "", c = 0; c < number1; c++) types += $(".ratingGroupAction").eq(c).attr("data-type") + ",";
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//i.gamersky.com/apirating/initgroup",
				data: {
					generalId: $this.attr("data-generalId"),
					ratingGroupType: types,
					Action: "initGroup"
				},
				success: function(data) {
					if (data.hasOwnProperty("status")) switch (data.status) {
					case "err":
						alert("提交" + tips + "错误！");
						break;
					case "existuser":
					case "existip":
						alert("已" + tips + "！")
					} else {
						$(".ratingGroupAction").each(function() {
							for (var t = !1, a = 0; a < data.length; a++) if (data[a].Type == $(this).attr("data-type")) {
								var e = $(this).attr("data-totleid");
								$("#" + e).html(data[a].Times), t = !0
							}
							if (!t) {
								var e = $(this).attr("data-totleid");
								$("#" + e).html(0)
							}
						});
						var like = $("#like").html(),
							unlike = $("#unlike").html(),
							sorce = Math.round(eval(like) / (eval(like) + eval(unlike)) * 100),
							btnWidth = $(".btn12").width();
						isNaN(sorce) ? ($(".btn12").attr("style", "margin-left:-" + btnWidth / 2 + "px;"), $(".ZSr_m").attr("style", "background-position:-74px  0;"), $("#Sorce").html(0)) : ($(".btn12").attr("style", "margin-left:" + Math.round(-btnWidth / 2 - (btnWidth / 2 - btnWidth * sorce / 100)) + "px;"), $(".ZSr_m").attr("style", "background-position:" + Math.round(-74 - (74 - 148 * sorce / 100)) + "px 0;"), $("#Sorce").html(sorce))
					}
				}
			}), $this.find(".ratingGroupAction").click(function(event) {
				event.preventDefault();
				var $thisAction = $(this);
				$(".S31_2").unbind("mousemove");
				var cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-type");
				return $thisAction.is("[data-group]") && (cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-group")), void 0 !== $.fn.cookie(cookieKey) && null !== $.fn.cookie(cookieKey) ? void alert("已" + tips + "！") : void $.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//i.gamersky.com/apirating/rating",
					data: {
						Rating: JSON2.stringify({
							GenneralId: $thisAction.attr("data-generalId"),
							Sorce: $thisAction.attr("data-sorce"),
							Type: $thisAction.attr("data-type")
						}),
						Action: "rating"
					},
					success: function(data) {
						if (data.hasOwnProperty("status")) switch (data.status) {
						case "err":
							alert("提交" + tips + "错误！");
							break;
						case "existuser":
						case "existip":
							alert("已" + tips + "！")
						} else {
							$("#" + $thisAction.attr("data-totleId")).html(data.Times);
							var like = $("#like").html(),
								unlike = $("#unlike").html(),
								sorce = Math.round(eval(like) / (eval(like) + eval(unlike)) * 100),
								btnWidth = $(".btn12").width();
							isNaN(sorce) ? ($(".btn12").attr("style", "margin-left:-" + btnWidth + "px;"), $(".ZSr_m").attr("style", "background-position:-74px 0;"), $("#Sorce").html(0)) : ($("#Sorce").html(sorce), $(".ZSr_m").attr("style", "background-position:" + Math.round(-74 - (74 - 148 * sorce / 100)) + "px 0;"), $(".btn12").attr("style", "margin-left:" + Math.round(-btnWidth / 2 - (btnWidth / 2 - btnWidth * sorce / 100)) + "px;")), $("#" + $thisAction.attr("data-avgscore")).html(10 == data.Average ? "10" : data.Average.toFixed(1)), $.fn.cookie(cookieKey, JSON2.stringify({
								GenneralId: $thisAction.attr("data-generalId"),
								Sorce: $thisAction.attr("data-sorce"),
								Type: $thisAction.attr("data-type")
							}), {
								path: "/",
								expires: 365
							}), $(".S31_2").KuScore()
						}
					}
				})
			})
		})
	}, $.fn.RatingGroupLike = function(t) {
		return this.each(function() {
			var t = $(this);
			t.find("li").each(function(t, a) {
				var e = $(a),
					n = $(a).attr("data-generalid"),
					i = $(a).attr("data-type");
				$.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//i.gamersky.com/apirating/initgroup",
					data: {
						generalId: n,
						ratingGroupType: i,
						Action: "initGroup"
					},
					success: function(t) {
						(t.length = 1) && e.find("div a .huo").html(t[0].Times)
					}
				})
			})
		})
	}, $.fn.Ratingmore = function(options) {
		return this.each(function() {
			var $this = $(this),
				gamerskyrating = $this.find(".gamerskyrating"),
				userrating = $this.find(".userrating");
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//i.gamersky.com/apirating/grade",
				data: {
					generalId: $this.attr("data-generalId"),
					Action: "grade"
				},
				success: function(t) {
					"" != t.EditorRating && "0" != t.EditorRating ? $(gamerskyrating).html(t.EditorRating) : $(gamerskyrating).html("--")
				}
			}), $.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//i.gamersky.com/apirating/init",
				data: {
					generalId: $this.attr("data-generalId"),
					ratingType: $(userrating).attr("data-type"),
					Action: "init"
				},
				success: function(t) {
					t.hasOwnProperty("status") || $(userrating).html(10 == t.Average ? "10" : t.Average.toFixed(1))
				}
			});
			for (var number1 = $this.find(".ratingGroupAction").length, types = "", toteid = "", c = 0; c < number1; c++) types += $this.find(".ratingGroupAction").eq(c).attr("data-type") + ",";
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//i.gamersky.com/apirating/initgroup",
				data: {
					generalId: $this.attr("data-generalId"),
					ratingGroupType: types,
					Action: "initGroup"
				},
				success: function(data) {
					if (!data.hasOwnProperty("status")) {
						$(".ratingGroupAction").each(function() {
							for (var t = !1, a = 0; a < data.length; a++) if (data[a].Type == $(this).attr("data-type")) {
								var e = $(this).attr("data-totleid");
								$this.find("#" + e).html(data[a].Times), t = !0
							}
							if (!t) {
								var e = $(this).attr("data-totleid");
								$this.find("#" + e).html(0)
							}
						});
						var like = $this.find("#like").html(),
							unlike = $this.find("#unlike").html(),
							sorce = Math.round(eval(like) / (eval(like) + eval(unlike)) * 100),
							btnWidth = $(".jindu").width();
						isNaN(sorce) ? $this.find(".tiao").attr("style", "width:" + btnWidth / 2 + "px;") : $this.find(".tiao").attr("style", "width:" + Math.round(btnWidth * sorce / 100) + "px;")
					}
				}
			}), $this.find(".ratingGroupAction").one("tap", function(event) {
				event.preventDefault();
				var $thisAction = $(this),
					tips = $this.attr("data-tips");
				$(".S31_2").unbind("mousemove");
				var cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-type");
				return $thisAction.is("[data-group]") && (cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-group")), void 0 !== $.fn.cookie(cookieKey) && null !== $.fn.cookie(cookieKey) ? void alert("已" + tips + "！") : void $.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//i.gamersky.com/apirating/rating",
					data: {
						Rating: JSON2.stringify({
							GenneralId: $thisAction.attr("data-generalId"),
							Sorce: $thisAction.attr("data-sorce"),
							Type: $thisAction.attr("data-type")
						}),
						Action: "rating"
					},
					success: function(data) {
						if (data.hasOwnProperty("status")) switch (data.status) {
						case "err":
							alert("提交" + tips + "错误！");
							break;
						case "existuser":
						case "existip":
							alert("已" + tips + "！")
						} else {
							$this.find("#" + $thisAction.attr("data-totleId")).html(data.Times);
							var like = $this.find("#like").html(),
								unlike = $this.find("#unlike").html(),
								sorce = Math.round(eval(like) / (eval(like) + eval(unlike)) * 100),
								btnWidth = $(".jindu").width();
							isNaN(sorce) ? $this.find(".tiao").attr("style", "width:" + btnWidth / 2 + "px;") : $this.find(".tiao").attr("style", "width:" + Math.round(btnWidth * sorce / 100) + "px;"), $.fn.cookie(cookieKey, JSON2.stringify({
								GenneralId: $thisAction.attr("data-generalId"),
								Sorce: $thisAction.attr("data-sorce"),
								Type: $thisAction.attr("data-type")
							}), {
								path: "/",
								expires: 365
							})
						}
					}
				})
			})
		})
	}, $.fn.GamerskyUserPF = function(t) {
		return this.each(function() {
			var t = $(this);
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//db5.gamersky.com/RatingJsonpAjax.aspx",
				data: {
					generalId: t.attr("data-generalId"),
					Action: "grade"
				},
				success: function(a) {
					"" != a.EditorRating && "" != a.RatingUrl ? t.find("i").html(a.EditorRating) : t.find("i").html("--")
				}
			})
		})
	}, $(document).ready(function() {
		$(".ratingGroup").RatingGroup(), $(".ratingAction").Rating(), $(".DhRatingAction").DhRating(), $(".S31_2").KuScore(), $("#gamerskyrating").RatingGamersky(), $(".ratingGroupLike").RatingGroupLike(), $(".ratingmore").Ratingmore(), $("#gamerskypf").GamerskyUserPF()
	})
}(jQuery), function($) {
	function checkIsNullOrEmpty(t) {
		return !(!t || "" == t) || (alert("描述不能为空！"), !1)
	}
	function checkEmail(t) {
		return !t || ( !! isEmail(t) || (alert("您输入的邮箱有误请从新输入"), !1))
	}
	function checkPhone(t) {
		return !t || ( !! isPhone(t) || (alert("您输入的电话有误请从新输入"), !1))
	}
	function isEmail(t) {
		var a = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		return a.test(t)
	}
	function isPhone(t) {
		var a = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
		return a.test(t)
	}
	function getQueryString(t) {
		var a, e = new RegExp("(^|&|\\?)" + t + "=([^&]*)(&|$)"),
			a = window.location.search.match(e);
		return null != a ? decodeURIComponent(a[2]) : null
	}
	$.fn.ContentCorrect = function(options) {
		return this.each(function() {
			var $this = $(
			this);
			$this.click(function(event) {
				event.preventDefault(), loadJs("uploadify", "//j.gamersky.com/Uploadify/jquery.uploadify.js", function() {
					var html = '<div class="ui-error-bj" style="display:none" ><div class="ui-error-hd"><a class="ui-error-close" href="javascript:">×</a></div><div class="ui-error-con"><div class="ui-error-tit"><span class="ui-error-text-1">标题：</span><span class="ui-error-nr"></span></div><div class="ui-error-ms"><span class="ui-error-text-2">描述：</span><div class="ui-error-textarea inputbj"><textarea class="tarea"></textarea></div></div><div class="ui-error-pic"><span class="ui-error-text" style="margin-left:30px;">上传图片 ：</span><div class="ui-error-b" style="margin-bottom:10px"><input id="buttonbj" style="display:none" name="error" type="file" multiple="false"></div><img src="" id="showPicture" /></div><div class="ui-error-phone"><span class="ui-error-text">电话：</span><div class="ui-error-input inputbj"><input type="text" class="input">\t</div></div><div class="ui-error-mail">  <span class="ui-error-text">邮箱：</span> <div class="ui-error-input inputbj"><input type="text" class="input"></div>  </div>  <div class="ui-error-tj1">  <div class="tj1-botton"><a class="buttonbj" ></a></div>  </div>   <div class="ui-error-tj2">    <div class="tj2-botton"><a class="buttonbj"></a> </div> </div> </div></div>';
					$.blockUI({
						message: $(html),
						css: {
							cursor: "auto",
							width: "0px",
							height: "0px",
							left: "50%",
							top: "50%",
							overflow: "visible",
							border: "0px"
						},
						overlayCSS: {
							backgroundColor: "#000",
							opacity: .6,
							cursor: "auto"
						},
						onBlock: function() {
							$(".blockUI").bgiframe(), $(".ui-error-tit .ui-error-nr").text($("#jcjbContentData").attr("title")), $("#buttonbj").uploadify({
								swf: "/js/Uploadify/uploadify.swf",
								uploader: "//up.gamersky.com/ReportUpload.php",
								auto: !0,
								multi: !1,
								buttonText: "选择",
								fileSizeLimit: "10MB",
								buttonImage: "//j.gamersky.com/Uploadify/select.jpg",
								fileTypeExts: "*.jpg;*.jpge;*.gif;*.png",
								wmode: "transparent",
								width: 79,
								height: 34,
								onUploadSuccess: function(file, data, response) {
									var dataObj = eval("(" + data + ")");
									$("#showPicture").attr("src", dataObj.OtherParameter), $("#showPicture").attr("picUrl", dataObj.OtherParameter).show()
								},
								onSelectError: function(t, a, e) {
									switch (a) {
									case -100:
										alert("上传的文件数量已经超出系统限制的" + $("#file_upload").uploadify("settings", "queueSizeLimit") + "个文件！");
										break;
									case -110:
										alert("文件 [" + t.name + "] 大小超出系统限制的" + $("#file_upload").uploadify("settings", "fileSizeLimit") + "大小！");
										break;
									case -120:
										alert("文件 [" + t.name + "] 大小异常！");
										break;
									case -130:
										alert("文件 [" + t.name + "] 类型不正确！");
										break;
									default:
										alert("文件上传错误！")
									}
								}
							}), $(".ui-error-bj .tj1-botton").click(function() {
								var t = {};
								t.Title = $("#jcjbContentData").attr("title"), t.GeneralId = $("#jcjbContentData").attr("data-generalId"), t.Description = $(".ui-error-ms .inputbj .tarea").val(), 0 != checkPhone($(".ui-error-phone .inputbj .input").val()) && 0 != checkIsNullOrEmpty($(".ui-error-ms .inputbj .tarea").val()) && 0 != checkEmail($(".ui-error-mail .inputbj .input").val()) && (t.Phone = $(".ui-error-phone .inputbj .input").val(), t.Email = $(".ui-error-mail .inputbj .input").val(), t.PhotoUrl = $("#showPicture").attr("picUrl"), t.IsReport = 0, t.State = 999, $.ajax({
									url: "//db5.gamersky.com/CorrectReport.aspx",
									type: "get",
									data: {
										ContentData: JSON2.stringify(t)
									},
									dataType: "jsonp",
									contentType: "application/json;charset=utf-8",
									cache: !1,
									success: function(t) {
										alert(t.body)
									},
									error: function(t) {}
								}), $.unblockUI())
							}), $(".ui-error-close").click(function() {
								$.unblockUI()
							}), $(".tj2-botton .buttonbj").click(function() {
								$.unblockUI()
							})
						},
						onUnblock: function() {
							$(".ui-error-bj").remove()
						}
					})
				})
			})
		})
	}, $.fn.ContentReport = function(options) {
		return this.each(function() {
			var $this = $(this);
			$this.click(function(event) {
				event.preventDefault(), loadJs("uploadify", "//j.gamersky.com/Uploadify/jquery.uploadify.js", function() {
					var html = '<div class="ui-error-bj" style="display:none"><div class="ui-error-hd"><a class="ui-error-close" href="javascript:">×</a></div><div class="ui-error-con"><div class="ui-error-tit"><span class="ui-error-text-1">标题：</span><span class="ui-error-nr"></span></div><div class="ui-error-ms"><span class="ui-error-text-2">描述：</span><div class="ui-error-textarea inputbj"><textarea class="tarea"></textarea></div></div><div class="ui-error-pic"><span class="ui-error-text" style="margin-left:30px;">上传图片 ：</span><div class="ui-error-b" style="margin-bottom:10px" ><input id="buttonbj" style="display:none;" name="error" type="file" multiple="false"></div><img src="" id="showPicture" /></div><div class="ui-error-phone"><span class="ui-error-text">电话：</span><div class="ui-error-input inputbj"><input type="text" class="input">\t</div></div><div class="ui-error-mail"><span class="ui-error-text">邮箱：</span> <div class="ui-error-input inputbj"><input type="text" class="input"></div>  </div>  <div class="ui-error-tj1">  <div class="tj1-botton"><a class="buttonbj" ></a></div>  </div>   <div class="ui-error-tj2">    <div class="tj2-botton"><a class="buttonbj"></a> </div></div></div></div>';
					$.blockUI({
						message: $(html),
						css: {
							cursor: "auto",
							width: "0px",
							height: "0px",
							left: "50%",
							top: "50%",
							overflow: "visible",
							border: "0px"
						},
						overlayCSS: {
							backgroundColor: "#000",
							opacity: .6,
							cursor: "auto"
						},
						onBlock: function() {
							$(".blockUI").bgiframe(), $(".ui-error-tit .ui-error-nr").text($("#jcjbContentData").attr("title")), $("#buttonbj").uploadify({
								swf: "/js/Uploadify/uploadify.swf",
								uploader: "//up.gamersky.com/ReportUpload.php",
								auto: !0,
								multi: !1,
								buttonText: "选择",
								fileSizeLimit: "10MB",
								buttonImage: "//j.gamersky.com/Uploadify/select.jpg",
								fileTypeExts: "*.jpg;*.jpge;*.gif;*.png",
								wmode: "transparent",
								width: 79,
								height: 34,
								onUploadSuccess: function(file, data, response) {
									var dataObj = eval("(" + data + ")");
									$("#showPicture").attr("src", dataObj.OtherParameter), $("#showPicture").attr("picUrl", dataObj.OtherParameter).show()
								},
								onSelectError: function(t, a, e) {
									switch (a) {
									case -100:
										alert("上传的文件数量已经超出系统限制的" + $("#file_upload").uploadify("settings", "queueSizeLimit") + "个文件！");
										break;
									case -110:
										alert("文件 [" + t.name + "] 大小超出系统限制的" + $("#file_upload").uploadify("settings", "fileSizeLimit") + "大小！");
										break;
									case -120:
										alert("文件 [" + t.name + "] 大小异常！");
										break;
									case -130:
										alert("文件 [" + t.name + "] 类型不正确！");
										break;
									default:
										alert("文件上传错误！")
									}
								}
							}), $(".ui-error-bj .tj1-botton").click(function() {
								var t = {};
								t.Title = $("#jcjbContentData").attr("title"), t.GeneralId = $("#jcjbContentData").attr("data-generalId"), t.Description = $(".ui-error-ms .inputbj .tarea").val(), 0 != checkPhone($(".ui-error-phone .inputbj .input").val()) && 0 != checkIsNullOrEmpty($(".ui-error-ms .inputbj .tarea").val()) && 0 != checkEmail($(".ui-error-mail .inputbj .input").val()) && (t.Phone = $(".ui-error-phone .inputbj .input").val(), t.Email = $(".ui-error-mail .inputbj .input").val(), t.PhotoUrl = $("#showPicture").attr("picUrl"), t.IsReport = 1, t.IsInit = 1, $.ajax({
									url: "//db5.gamersky.com/CorrectReport.aspx",
									type: "get",
									data: {
										ContentData: JSON2.stringify(t)
									},
									dataType: "jsonp",
									contentType: "application/json;charset=utf-8",
									cache: !1,
									success: function(t) {
										alert(t.body)
									},
									error: function(t) {}
								}), $.unblockUI())
							}), $(".ui-error-close").click(function() {
								$.unblockUI()
							}), $(".tj2-botton .buttonbj").click(function() {
								$.unblockUI()
							})
						},
						onUnblock: function() {
							$(".ui-error-bj").remove()
						}
					})
				})
			})
		})
	}, $.fn.Collection = function(t) {
		return this.each(function() {
			var t = $(this),
				a = $("#jcjbContentData").attr("data-generalId");
			t.click(function(t) {
				t.preventDefault(), $.ajax({
					url: "//i.gamersky.com/api/addcollect",
					type: "get",
					data: {
						generalId: a
					},
					dataType: "jsonp",
					success: function(t) {
						"ok" == t.status ? alert("收藏成功！") : alert(t.body)
					},
					err
					or: function(t) {}
				})
			})
		})
	}, $(document).ready(function() {
		$("#jcjbContentData").length > 0 && $(".JCJB").show(), $(".btnContentReport").ContentReport(), $(".btnContentCorrect").ContentCorrect(), $(".btnCollection").Collection()
	})
}(jQuery), function(t) {
	t.fn.SoftGl = function(a) {
		return this.each(function() {
			var a = "PE_U_Soft";
			null != t("#jcjbContentData").attr("data-tableName") && (a = t("#jcjbContentData").attr("data-tableName"));
			var e = {
				GeneralId: t("#jcjbContentData").attr("data-generalId"),
				NodeId: t("#jcjbContentData").attr("data-nodeId"),
				Top: 8,
				TableName: a
			};
			t.ajax({
				type: "POST",
				url: "//db2.gamersky.com/ContentAjaxNew.aspx",
				dataType: "jsonp",
				data: {
					jsondata: JSON2.stringify({
						type: "getcorrelation",
						GeneralId: e.GeneralId,
						NodeId: e.NodeId,
						Top: e.Top,
						TableName: e.TableName
					})
				},
				success: function(a) {
					var e = a;
					if (void 0 == e || e.length <= 0) t("#softwenda").hide();
					else for (var n = 0; n < e.length; n++) t("#softwenda").find(".wd").append('<li class="like"><a href="' + e[n].url + '" target="_blank">' + e[n].title + "</a></li>")
				}
			})
		})
	}, t.fn.SoftCorrelation = function(a) {
		return this.each(function() {
			var e = t(this),
				n = a,
				i = e.find(".contt").eq(n),
				r = i.attr("value"),
				s = !1;
			e.find(".contt").each(function(a, e) {
				var n = t(e).find(".txt .like li").length;
				n <= 0 && (t(e).hide(), s = !0, r = parseInt(r) + parseInt(t(e).attr("value")), i.find(".tit").removeClass().addClass("tit tp" + r), i.find(".txt").removeClass().addClass("txt th" + r), i.find(".like").removeClass().addClass("like lh" + r))
			});
			var o = parseInt(r) - 1;
			0 == n ? t(".txtlist .tl_like.tr .contt:eq(0) .txt .like li:gt(" + o + ")").remove() : t(".txtlist .tl_like.tl .contt:eq(1) .txt .like li:gt(" + o + ")").remove()
		})
	}, t.fn.DownContentHot = function(a) {
		return this.each(function() {
			var a = t(this),
				e = a.attr("data-ganeralId");
			t.ajax({
				type: "POST",
				url: "//db2.gamersky.com/ContentAjaxNew.aspx",
				dataType: "jsonp",
				data: {
					jsondata: JSON2.stringify({
						type: "getcontenthot",
						GeneralId: e
					})
				},
				success: function(t) {
					var e = t;
					"ok" == e.status && a.html("&nbsp;" + e.body)
				}
			})
		})
	}, t(document).ready(function() {
		t(".td_dl[itemprop='inContentHot']").DownContentHot(), t("#softwenda").SoftGl(), t(".txtlist .tl_like.tl").SoftCorrelation(1), t(".txtlist .tl_like.tr").SoftCorrelation(0)
	})
}(jQuery), function(t) {
	t.fn.WapContentVote = function(a) {
		return this.each(function() {
			var a = t(this),
				e = a.attr("data-id");
			t.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//db5.gamersky.com/ContentVoteJsonp.aspx",
				data: {
					id: e,
					a: "0"
				},
				success: function(n) {
					if (n.items.length > 0) {
						a.find(".votetitle").html(n.vote.VoteTitle);
						var i = "",
							r = "radio";
						n.vote.ItemType > 0 && (r = "checkbox");
						for (var s = 0, o = 0; o < n.items.length; o++) s += n.items[o].VoteNumber;
						for (var c = 0; c < n.items.length; c++) {
							var d = c + 1,
								l = n.items[c].VoteNumber / s * 100 + "%";
							i += '<p><span class="ymw-con-vote-iptwrap"><input id="ymwVote' + d + '" name="ymwVoteRio" type="' + r + '" value="' + n.items[c].Title + '"></span><label for="ymwVote' + d + '">' + n.items[c].Title + '</label><span class="ymw-con-vote-pro"><i style="width:' + l + '"></i></span><span class="ymw-con-vote-num">' + n.items[c].VoteNumber + "票</span></p>"
						}
						var p = t(i);
						a.find(".votetitle").after(p), a.show(), a.find("input[name='ymwVoteRio']").click(function() {
							var a = t(this);
							a.attr("checked", "checked")
						}), a.find(".toupiao-vbtn").click(function() {
							var n = "";
							return a.find("input[name='ymwVoteRio']").each(function() {
								t(this).attr("checked") && (n.length > 0 && (n += ","), n += t(this).attr("value"))
							}), 0 == n.length ? void alert("请至少选择一个选项！") : (t.ajax({
								type: "GET",
								dataType: "jsonp",
								url: "//db5.gamersky.com/ContentVoteJsonp.aspx",
								data: {
									id: e,
									a: "1",
									v: n
								},
								success: function(t) {
									a.addClass("ymw-con-vote-res"), "ok" == t.status ? alert("投票成功！") : alert(t.message)
								}
							}), !1)
						})
					} else a.hide()
				}
			})
		})
	}, t.fn.WapHotVote = function(a) {
		return this.each(function() {
			var a = t(this),
				e = t(this).attr("data-itemId");
			t.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//db5.gamersky.com/VoteJson.aspx",
				data: {
					id: e,
					a: "init"
				},
				success: function(t) {
					var e = "<h5>" + t.RedPoint + "</h5><p>" + t.RedDescription + "</p>",
						n = "<h5>" + t.BluePoint + "</h5><p>" + t.BlueDescription + "</p>";
					a.find(".ymwRedPoint").html(e), a.find(".ymwBluePoint").html(n), a.find(".redPollNumber").attr("data-num", t.RedPoll).html(t.RedPoll + "人"), a.find(".bluePollNumber").attr("data-num", t.RedPoll).html(t.BluePoll + "人");
					var i = parseInt(t.RedPoll),
						r = parseIn
						t(t.BluePoll),
						s = i + r,
						o = i / s * 100 + "%";
					0 == s && (o = "50%"), a.find(".yu-pro-r").css("width", o)
				}
			}), a.find(".votebtn").click(function() {
				$votebtn = t(this);
				var n = "waphotvote-" + e;
				return void 0 !== t.fn.cookie(n) && null !== t.fn.cookie(n) ? void(($votebtn.hasClass("OK") || $votebtn.hasClass("NO")) && alert("您已投过票")) : void t.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//db5.gamersky.com/VoteJson.aspx",
					data: {
						id: e,
						a: "vote",
						p: $votebtn.attr("data-point")
					},
					success: function(e) {
						if ("ok" == e.status) {
							"red" == $votebtn.attr("data-point") ? (a.find(".redPollNumber").html(parseInt(a.find(".redPollNumber").html()) + 1), a.find(".redPollNumber").attr("data-num", parseInt(a.find(".redPollNumber").html()))) : (a.find(".bluePollNumber").html(parseInt(a.find(".bluePollNumber").html()) + 1), a.find(".bluePollNumber").attr("data-num", parseInt(a.find(".bluePollNumber").html())));
							var i = parseInt(a.find(".redPollNumber").html()),
								r = parseInt(a.find(".bluePollNumber").html()),
								s = i + r,
								o = i / s * 100 + "%";
							a.find(".yu-pro-r").css("width", o), t.fn.cookie(n, "1", {
								path: "/",
								expires: 365
							})
						} else($votebtn.hasClass("OK") || $votebtn.hasClass("NO")) && alert("您已投过票")
					}
				})
			})
		})
	}, t(document).ready(function() {
		t(".wapvote").WapContentVote(), t(".hotVote").WapHotVote()
	})
}(jQuery), function(t) {
	t.fn.cycm = function(a) {
		var e = "";
		t(".cy_comment").each(function() {
			"" != e && (e += ","), e += t(this).attr("data-sid")
		}), "" != e && t.ajax({
			type: "GET",
			url: "//cm.gamersky.com/commentapi/count",
			dataType: "jsonp",
			data: {
				topic_source_id: e
			},
			success: function(a) {
				t(".cy_comment").each(function() {
					if (a.result.hasOwnProperty(t(this).attr("data-sid"))) {
						var e = a.result[t(this).attr("data-sid")];
						"true" == t(this).attr("data-isconret") ? t(this).text(e.comments) : t(this).text(e.comments)
					}
				})
			}
		})
	}, t.fn.ContentHit = function(a) {
		return this.each(function() {
			var a = t(this);
			t.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//click.gamersky.com/Common/GetHits.aspx",
				data: {
					id: a.attr("generalId"),
					script: "3"
				},
				success: function(t) {
					a.html(t.hits + "°")
				}
			})
		})
	}, t.fn.ContentWapHit = function(a) {
		return this.each(function() {
			var a = t(this);
			t.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//click.gamersky.com/Common/GetWapHits.aspx",
				data: {
					id: a.attr("generalId"),
					script: 3
				},
				success: function(t) {
					a.html(t.waphits)
				}
			})
		})
	}, t.fn.GetHitShouYou = function() {
		var a = t(".yu-icon.yu-btn-android").attr("data-itemId"),
			e = t(".yu-icon.yu-btn-android").attr("data-fieldname");
		t.ajax({
			type: "GET",
			dataType: "jsonp",
			url: "//db5.gamersky.com/HitShouYou.aspx",
			data: {
				ID: a,
				fieldname: e
			},
			success: function(a) {
				t(".wapandroid").html(a.body)
			}
		})
	}, t.fn.GetHitSyIos = function() {
		var a = t(".yu-icon.yu-btn-ios").attr("data-itemId"),
			e = t(".yu-icon.yu-btn-ios").attr("data-fieldname");
		t.ajax({
			type: "GET",
			dataType: "jsonp",
			url: "//db5.gamersky.com/HitShouYou.aspx",
			data: {
				ID: a,
				fieldname: e
			},
			success: function(a) {
				t(".Ios").html(a.body)
			}
		})
	}, t(document).ready(function() {
		t(".cy_comment").cycm(), t(".wapandroid").GetHitShouYou(), t(".Ios").GetHitSyIos(), t("#countn").ContentHit(), t("#wapcountn").ContentWapHit(), t("#SelectPage").change(function() {
			var a = window.location.href,
				e = /\.(shtml)/i,
				n = ".html";
			e.test(a) && (n = ".shtml");
			var i = t(".cy_comment").attr("data-sid");
			1 == t("#SelectPage").val() ? window.location.href = "Content-" + i + n : window.location.href = "Content-" + i + "_" + t("#SelectPage").val() + n
		});
		var a = navigator.userAgent,
			e = (navigator.appVersion, a.indexOf("Android") > -1 || a.indexOf("Linux") > -1);
		1 == e ? t("#sy").attr("href", "/shouyou/android/") : t("#sy").attr("href", "/shouyou/ios/"), t(document).on("click", ".countHit,.countHitSql", function() {
			var a = t(this),
				e = "false";
			a.hasClass("countHitSql") && (e = "true");
			var n = "false";
			a.attr("data-hot") && (n = a.attr("data-hot"));
			var i = "";
			a.attr("data-fieldName") && (i = a.attr("data-fieldName")), t.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//click.gamersky.com/Common/GetHits.aspx",
				data: {
					id: a.attr("data-itemid"),
					script: "3",
					hot: n,
					fieldName: i,
					judge: e
				},
				success: function(t) {}
			})
		})
	})
}(jQuery);
var _config = {
	sso: {
		onlySSO: !0
	},
	registerUrl: "//i.gamersky.com/user/register/",
	hide_face: 1,
	showFloorNum: 1
};
!
function(t) {
	var a = "//db5.gamersky.com/LabelJsonpAjax.aspx";
	t.fn.supportMeInit = function(e) {
		return this.each(function() {
			var e = t(this),
				n = parseInt(e.attr("data-itemId")),
				i = e.attr("data-field"),
				r = !1,
				s = e.attr("data-table");
			s || (s = "PE_U_Video"), t.fn.cookie("GamerSkySupport" + n) && (r = !0);
			var o = {
				type: "updatelabel",
				labelname: "读取支持反对率",
				attr: {
					itemId: n,
					field: i,
					tableName: s
				}
			};
			t.ajax({
				type: "GET",
				url: a,
				dataType: "jsonp",
				data: {
					jsondata: JSON2.stringify(o)
				},
				success: function(t) {
					e.find("span").length > 0 ? e.find("span").text(t.body) : e.text(t.body)
				}
			})
		})
	}, t.fn.supportMe = function(e) {
		return this.each(function() {
			var e = t(this),
				n = parseInt(e.attr("data-itemId")),
				i = e.attr("data-field"),
				r = e.attr("data-table");
			r || (r = "PE_U_Video");
			var s = e.attr("data-auto");
			if (s && "true" == s) {
				var o = {
					type: "updatelabel",
					labelname: "Digg统计",
					attr: {
						itemId: n,
						field: i,
						tableName: r
					}
				};
				t.ajax({
					type: "GET",
					url: a,
					dataType: "jsonp",
					data: {
						jsondata: JSON2.stringify(o)
					},
					success: function(t) {}
				})
			}
			e.click(function() {
				var s = !1;
				if (t.fn.cookie("GamerSkySupport" + n) && (s = !0), s) return alert("已投票！"), !1;
				t.fn.cookie("GamerSkySupport" + n, 1, {
					path: "/"
				});
				var o = {
					type: "updatelabel",
					labelname: "Digg统计",
					attr: {
						itemId: n,
						field: i,
						tableName: r
					}
				};
				return t.ajax({
					type: "GET",
					url: a,
					dataType: "jsonp",
					data: {
						jsondata: JSON2.stringify(o)
					},
					success: function(t) {
						e.supportMeInit()
					}
				}), !1
			}), e.supportMeInit()
		})
	}, t(document).ready(function() {
		t("a.supportMe").supportMe()
	})
}(jQuery), function(t) {
	var a = "//db5.gamersky.com/LabelJsonpAjax.aspx";
	t.fn.GamerSkyPlayer = function(a) {
		var e = {
			height: "100%",
			width: "100%",
			videoSource: ".ymwQhYuanBtn"
		};
		return a && t.extend(e, a), this.each(function() {
			t(e.videoSource).on("touchend", function(a) {
				var n = t(this);
				n.siblings().removeClass("current"), n.addClass("current");
				var i = t(this).attr("data-sitename"),
					r = t(this).attr("data-vid"),
					s = t(this).attr("data-source");
				s || (s = "");
				var o = "",
					c = "",
					d = !1,
					l = "";
				switch (i) {
				case "youku":
					c = "http://static.youku.com/v1.0.0222/v/swf/player.swf?VideoIDS=" + r, o += "&isShowRelatedVideo=false&amp;showAd=0&amp;show_pre=1&amp;show_next=1&amp;VideoIDS=" + r + "&amp;isAutoPlay=true&amp;isDebug=false&amp;UserID=&amp;winType=interior&amp;playMovie=true&amp;RecordCode=1001,1002,1003,1004,1005,1006,2001,3001,3002,3003,3004,3005,3007,3008,9999", d = !0, l = "http://player.youku.com/embed/" + r;
					break;
				case "tudou":
					;
					o = "tvcCode=-1&hd=2", c = "http://tudou.com/v/" + r + "/&autoPlay=true", r.indexOf("code:") >= 0 && (t.browser.msie && ("6.0" == t.browser.version || "7.0" == t.browser.version || "8.0" == t.browser.version || "9.0" == t.browser.version) ? c = "http://tudou.com/v/" + r.replace("code:", "") + "/&autoPlay=true" : (d = !0, l = "http://www.tudou.com/programs/view/html5embed.action?code=" + r.replace("code:", "") + "&autoPlay=true"));
					break;
				case "tudou2":
					o = "tvcCode=-1&hd=2", c = "http://js.tudouui.com/bin/lingtong/PortalPlayer_60.swf?tvcCode=-1&hd=2&iid=" + r;
					break;
				case "ku6":
					c = "http://player.ku6cdn.com/default/out/pv201109151705.swf?ver=108&vid=" + r + "&type=v&referer=";
					break;
				case "sina":
					c = "http://p.you.video.sina.com.cn/swf/bokePlayer20130723_V4_1_42_21.swf?vid=" + r + "&clip_id=&imgurl=&auto=1&vblog=1&type=0&tabad=1&autoLoad=1&autoPlay=1&as=0&tjAD=0&tj=0&casualPlay=1&head=0&logo=0&share=0";
					break;
				case "qq":
					c = "http://mat1.qq.com/news/act3/js/QQPlayer3.swf?vid=" + r + "&skin=http://mat1.qq.com/news/act3/js/skins/QQPlayerSkin.swf&autoplay=1";
					break;
				case "qq2":
					c = "http://imgcache.qq.com/tencentvideo_v1/player/TencentPlayer.swf?_v=20110829&vid=" + r + "&autoplay=1";
					break;
				case "pptv":
					c = r.length > 13 ? "http://player.pptv.com/v/" + r + ".swf" : "http://player.pptv.com/cid/" + r + ".swf";
					break;
				case "sohu":
				case "sohuvid":
					c = "http://share.vrs.sohu.com/" + r + "/v.swf&skinNum=1&topBar=0&showRecommend=0&autoplay=true&api_key=e68e42f2beae6ba9ad6bd25e2653632f&fbarad=";
					break;
				case "sohuid":
					c = "http://share.vrs.sohu.com/my/v.swf&topBar=1&id=" + r + "&autoplay=true&from=page";
					break;
				case "letv":
					c = "http://i7.imgs.letv.com/player/swfPlayer.swf?id=" + r + "&autoplay=1&isPlayerAd=0";
					break;
				case "letv1":
					c = r.replace(/&width=\d+/g, "").replace(/&height=\d+/g, ""), d = !0, l = c + "&width=" + e.width + "&height=" + e.height;
				case "qingkong":
					c = "http://donghua.dmzj.com/flvplayer.swf?file=http://v.qingkong.net/bp/a.php/" + r + ".mp4&autostart=true";
					break;
				case "cntv":
					c = "http://player.cntv.cn/standard/cntvOutSidePlayer.swf?videoId=VIDE100165778382&videoCenterId=" + r;
					break;
				case "56":
					c = "http://player.56.com/v_" + r + ".swf/1030_ycc20060631.swf";
					break;
				case "iqiyi":
					c = r.replace("&coop=测试&cid=", "") + "&cid=qc_105082_300395
&bd=1&autoplay=1&coop=coop_1010_ymxk&source=" + s, d = !0, l = c;
					break;
				case "17173":
					c = "http://f.v.17173cdn.com/flash/PreloaderFileFirstpage.swf?cid=" + r + "&refer=";
					break;
				case "ac":
					c = "http://static.acfun.mm111.net/player/ACFlashPlayer.out.swf?type=page&url=http://www.acfun.tv/v/" + r;
					break;
				case "bi":
					c = "http://static.hdslb.com/miniloader.swf?aid=" + r + "&page=1";
					break;
				default:
					c = r
				}
				if (d) {
					var p = '<iframe height="' + e.height + '" width="' + e.width + '" src="' + l + '" frameborder=0 allowfullscreen></iframe>';
					"youku" == i ? t.getScript("http://player.youku.com/jsapi", function() {
						player = new YKU.Player("gamersky_player_box", {
							client_id: "6bfe5b183f11e7d9",
							vid: r,
							show_related: !1
						})
					}) : t("#gamersky_player_box").html(p)
				} else {
					var u = new SWFObject(c, "gsvobject", e.width, e.height, "9.0.0", "#000000");
					u.addParam("allowfullscreen", "true"), u.addParam("allownetworking", "all"), u.addParam("allowscriptaccess", "always"), u.addParam("wmode", "opaque"), u.addParam("quality", "high"), u.addParam("flashvars", o), u.write("gamersky_player_box")
				}
			}), t(e.videoSource).eq(0).trigger("touchend")
		})
	}, t.fn.WapsupportMeInit = function(e) {
		return this.each(function() {
			var e = t(this),
				n = parseInt(e.attr("data-itemId")),
				i = e.attr("data-field"),
				r = !1,
				s = e.attr("data-table");
			s || (s = "PE_U_Video"), t.fn.cookie("GamerSkySupport" + n) && (r = !0);
			var o = {
				type: "updatelabel",
				labelname: "读取支持反对率",
				attr: {
					itemId: n,
					field: i,
					tableName: s
				}
			};
			t.ajax({
				type: "GET",
				url: a,
				dataType: "jsonp",
				data: {
					jsondata: JSON2.stringify(o)
				},
				success: function(t) {
					e.hasClass("play") && e.html("<i class='yu-icon yu-icon-play'></i>" + t.body), e.hasClass("ok") && e.html("<i class='yu-icon yu-icon-zan'></i>" + t.body), e.hasClass("no") && e.html("<i class='yu-icon yu-icon-cai'></i>" + t.body)
				}
			})
		})
	}, t.fn.WapsupportMe = function(e) {
		return this.each(function() {
			var e = t(this),
				n = parseInt(e.attr("data-itemId")),
				i = e.attr("data-field"),
				r = e.attr("data-table");
			r || (r = "PE_U_Video");
			var s = e.attr("data-auto");
			if (s && "true" == s) {
				var o = {
					type: "updatelabel",
					labelname: "Digg统计",
					attr: {
						itemId: n,
						field: i,
						tableName: r
					}
				};
				t.ajax({
					type: "GET",
					url: a,
					dataType: "jsonp",
					data: {
						jsondata: JSON2.stringify(o)
					},
					success: function(t) {}
				})
			}
			t(this).on("tap", function(s) {
				var o = !1;
				if (t.fn.cookie("GamerSkySupport" + n) && (o = !0), !o) {
					t.fn.cookie("GamerSkySupport" + n, 1, {
						path: "/"
					});
					var c = {
						type: "updatelabel",
						labelname: "Digg统计",
						attr: {
							itemId: n,
							field: i,
							tableName: r
						}
					};
					t.ajax({
						type: "GET",
						url: a,
						dataType: "jsonp",
						data: {
							jsondata: JSON2.stringify(c)
						},
						success: function(t) {
							e.WapsupportMeInit()
						}
					})
				}
			}), e.WapsupportMeInit()
		})
	}, t(document).ready(function() {
		t(".wapsupportMe").WapsupportMe()
	})
}(jQuery);
var ymwapJs = {
	closeScroll: function() {
		$("html,body").addClass("hideScroll")
	},
	openScroll: function() {
		$("html,body").removeClass("hideScroll")
	},
	hMeun: function() {
		$(".ymw-meun").on("click", function() {
			$(this).toggleClass("cur"), $(".ymwMeunPop").toggleClass("cur")
		})
	},
	sliderFun: function() {
		$(".ymwSlider").each(function() {
			var t = new Swiper($(this), {
				direction: "horizontal",
				loop: !0,
				pagination: $(this).find(".swiper-pagination"),
				autoplay: 3e3,
				autoplayDisableOnInteraction: !1
			});
			t.onResize()
		})
	},
	scrollImgFun: function() {
		$(".ymwScroImg").each(function() {
			var t = new Swiper($(this), {
				pagination: $(this).find(".swiper-pagination"),
				slidesPerView: "auto",
				slidesPerGroup: 3,
				paginationClickable: !0
			});
			t.onResize()
		})
	},
	indexNavNew: function() {
		var t, a = (new Swiper("#ymwHeaderSwp", {
			slidesPerView: "auto",
			slideClass: "ymwHeaderSwpItem"
		}), !0),
			e = $("#ywmHeaderSearchPop");
		$("#ywmHeaderSearchBtn").on("click", function() {
			var n = $(this);
			clearTimeout(t), a === !0 ? (n.addClass("cur"), e.addClass("cur"), t = setTimeout(function() {
				e.find("input").eq(0).focus()
			}, 500), a = !1) : (n.removeClass("cur"), e.removeClass("cur"), a = !0)
		})
	},
	tabFun: function() {
		var t = $(".ymwTab");
		t.each(function() {
			function t() {
				e.find(".active-nav").removeClass("active-nav");
				var t = e.find(".swiper-slide").eq(c.activeIndex).addClass("active-nav");
				if (!t.hasClass("swiper-slide-visible")) if (t.index() > o.activeIndex) {
					var a = Math.floor(o.width / t.width()) - 1;
					o.slideTo(t.index() - a)
				} else o.slideTo(t.index())
			}
			function a() {
				c.slideTo(s, 0, !1), t()
			}
			var e = $(this).find(".ymwTabNav"),
				n = $(this).find(".ymwTabCon"),
				i = $(this).attr("data-navnum"),
				r = $(this).attr("data-rRo"),
				s = $(this).attr("data-def") || 0,
				o = new Swiper(e, {
					watchSlidesProgress: !0,
					watchSlidesVisibility: !0,
					slidesPerView: i,
					resistanceRatio: r,
					onTap: function() {
						c.slideTo(o.clickedIndex)
					},
					onInit: function() {
						e.find(".swiper-slide").eq(0).addClass("active-nav")
					}
				}),
				c = new Swiper(n, {
					autoHeight: !0,
					onSlideChangeStart: function() {
						t()
					}
				});
			a(), $(window).resize(function() {
				setTimeout(function() {
					var t = $(".ymwtNav").find(".swiper-wrapper").width() / 3;
					o.slides.css("width", t + "px"), o.update(!0), c.update(!0)
				}, 100)
			})
		})
	},
	listPic: function() {
		var t = $(window).width(),
			a = (t - 42) / 2,
			e = $(".ymw-list-pic").find("li").eq(0).find("img").attr("src"),
			n = new Image;
		n.src = e;
		n.height, n.width;
		$(".ymw-list-pic").find("li").each(function() {
			$(this).css({
				width: a + "px"
			}), $(this).find("img").css({
				height: n.height * a / n.width + "px"
			})
		})
	},
	listThree: function(t) {
		var a = $(window).width(),
			e = (a - 28 - 36) / 3;
		$(t).find("li").each(function() {
			$(this).find("a").css({
				width: e + "px"
			});
			var t = $(this).find("a").eq(0).find("img").attr("src"),
				a = new Image;
			a.src = t;
			a.height, a.width;
			$(this).find("a").find("img").css({
				height: a.height * e / a.width + "px"
			})
		})
	},
	fixTabNav: function() {
		function t() {
			function t() {
				a = $(window).scrollTop(), a >= e ? $(".ymwTabNavFixed").css({
					position: "fixed",
					top: "0",
					left: "50%",
					"margin-left": "-" + n / 2 + "px",
					width: n - 28 + "px",
					"z-index": "99992"
				}).parent().css({
					"padding-top": $(".ymwTabNavFixed").height() + 20 + "px"
				}) : $(".ymwTabNavFixed").css({
					position: "",
					top: "",
					left: "",
					"margin-left": "",
					"z-index": "",
					width: ""
				}).parent().css({
					"padding-top": ""
				})
			}
			var n = $(window).width();
			n > 720 && (n = 720), e = $(".ymwTabNavFixed").parent().offset().top, t(), $(window).scroll(function() {
				t()
			})
		}
		var a, e;
		t(), $(window).resize(t)
	},
	sxFun: function() {
		function t(t, a) {
			t.isEnd ? a.removeClass("ymwWS") : a.addClass("ymwWS")
		}
		$(".ymwSxScroImg").each(function() {
			var a, e = $(this),
				n = $(this).find(".cur").parent().index();
			a = n > 0 ? n : 0;
			var i = new Swiper($(this), {
				freeMode: !0,
				freeModeSticky: !0,
				slidesPerView: "auto",
				onInit: function(n) {
					n.slideTo(a, 300, !1), t(n, e)
				},
				onSlideChangeEnd: function(a) {
					t(a, e)
				}
			});
			i.onResize()
		});
		var a = !1;
		$(".ymwSxbtn").on("tap", function() {
			1 == a ? ($(".ymwSxPop,.ymw-sx-pop-mask").removeClass("cur"), $(this).removeClass("cur"), $(".ymw-sx-pop-mask").remove(), a = !1) : ($(".ymwSxPop,.ymw-sx-pop-mask").addClass("cur"), $(this).addClass("cur"), $(".ymw-sx-pop-mask").css({
				height: $(window).height() + "px"
			}), a = !0, setTimeout(function() {
				$(".ymw-sx-pop-mask").on("tap", function() {
					$(this).removeClass("cur"), $(".ymwSxPop,.ymwSxbtn").removeClass("cur"), a = !1
				})
			}, 500))
		})
	},
	jtFunc: function() {
		function t(t) {
			var a = t.find(".swiper-slide").eq(0).find("img").attr("src"),
				e = new Image;
			e.src = a;
			var n = e.height,
				i = e.width;
			i / n > 1 ? t.find("img").css({
				height: "177px"
			}) : t.find("img").css({
				height: "250px"
			})
		}
		$(".ymwJtImg").each(function() {
			var a = $(this);
			t(a);
			var e = new Swiper($(this), {
				freeMode: !0,
				freeModeSticky: !0,
				slidesPerView: "auto",
				spaceBetween: 8
			});
			e.onResize()
		})
	},
	zkFunc: function() {
		$(".ymw-autoHide").each(function() {
			for (var t = $(this), a = !0, e = t.find(".ymw-autoHide-txt").children(), n = 0, i = 0; i < e.length; i++) n += e.eq(i).height();
			n < 105 ? t.find(".ymw-autoHide-btn").hide() : t.find(".ymw-autoHide-btn").show(), t.find(".ymw-autoHide-btn").on("click", function(e) {
				e.preventDefault(), 1 == a ? (t.find(".ymw-autoHide-txt").css({
					"max-height": n + "px"
				}), $(this).addClass("cur").text("收起"), a = !1) : (t.find(".ymw-autoHide-txt").css({
					"max-height": ""
				}), $(this).removeClass("cur").text("展开"), a = !0)
			}), $(window).resize(function() {
				if (0 == a) {
					n = 0;
					for (var i = 0; i < e.length; i++) n += e.eq(i).height();
					n < 105 ? t.find(".ymw-autoHide-btn").hide() : t.find(".ymw-autoHide-btn").show(), t.find(".ymw-autoHide-txt").css({
						"max-height": n + "px"
					})
				} else {
					n = 0;
					for (var i = 0; i < e.length; i++) n += e.eq(i).height();
					n < 105 ? t.find(".ymw-autoHide-btn").hide() : t.find(".ymw-autoHide-btn").show()
				}
			})
		})
	},
	pfFunc: function() {
		function t(t) {
			t.on("touchend", function(t) {
				t.preventDefault();
				var e = "您的评分" + $(this).html(),
					n = $(this).html();
				a.find(".ymw-pf-btn-s1").html(e), $(".ymw-pf-pop").remove(), unlockHtml();
				var i = $("#myScore").attr("data-generalid"),
					r = $("#myScore").attr("data-type"),
					s = $("#myScore").attr("data-tips"),
					o = "WapPL" + i;
				null !== $.fn.cookie(o) ? alert("对不起，您已经提交过评分！") : $.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//db5.gamersky.com/RatingJsonpAjax.aspx",
					data: {
						Rating: JSON2.stringify({
							GenneralId: i,
							Sorce: n,
							Type: r
						}),
						Action: "rating"
					},
					success: function(t) {
						if (t.hasOwnProperty("status")) switch (t.status) {
						case "err":
							alert("提交" + s + "错误！");
							break;
						case "existuser":
						case "existip":
							alert("已" + s + "！")
						} else $.fn.cookie(o, e, {
							path: "/",
							expires: 365
						})
					}
				})
			})
		}
		for (var a = $(".ymw-pf-btn"), e = "", n = [], i = 0; i < 20; i++) i % 2 == 0 ? n[i] = '<a href="javascript:;" class="ymw-pf-pop-nums-btn">' + .5 * (i + 1) + "</a>" : i < 19 ? n[i] = '<a href="javascript:;" class="ymw-pf-pop-nums-btn">' + .5 * (i + 1) + ".0</a>" : n[i] = '<a href="javascript:;" class="ymw-pf-pop-nums-btn">' + .5 * (i + 1) + "</a>";
		e = '<div class="ymw-pf-pop"><div class="ymw-pf-pop-mask"></div><div class="ymw-pf-pop-main"><h5>选择您的分数</h5><div class="clearfix ymw-pf-pop-nums">' + n.join("") + '</div><a href="javascript:;" class="ymw-pf-pop-close"></a></div></div>';
		var r = $("#myScore").attr("data-generalid"),
			s = "WapPL" + r;
		null !== $.fn.cookie(s) && a.find(".ymw-pf-btn-s1").html($.fn.cookie(s)), a.each(function() {
			$(this).on("tap", function(a) {
				a.preventDefault();
				var n = $(this).attr("data-generalid"),
					i = "WapPL" + n;
				null == $.fn.cookie(i) && ($("body").append(e), t($(".ymw-pf-pop-nums-btn")), lockHtml(), $(".ymw-pf-pop").find(".ymw-pf-pop-mask").on("tap", function(t) {
					t.preventDefault(), $(".ymw-pf-pop").remove(), unlockHtml()
				}), $(".ymw-pf-pop").find(".ymw-pf-pop-close").on("click", function(t) {
					t.preventDefault(), $(".ymw-pf-pop").remove(), unlockHtml()
				}))
			})
		})
	},
	qukTo: function() {
		function t() {
			var t = $(".ymw-backtotop");
			a.scroll(function() {
				a.scrollTop() > e / 2 ? t.addClass("cur") : t.removeClass("cur")
			})
		}
		var a = $(window),
			e = a.height(),
			n = '<div class="ymw-backtotop"><a id="ymwBTT" class="ymw-btt-btn"></a>';
		$(".ymw-contxt").length > 0 && $(".ymw-article-nav-pop").length <= 0 && (n += '<a id="ymwBTC" class="ymw-btc-btn">评论</a>'), $(".ymw-article-nav-pop").length && (n += '<a id="ymwOPN" class="ymw-opn-btn"></a>'), n += "</div>", $("body").append(n), t(), $(window).resize(t), $("#ymwBTT").on("click", function(t) {
			t.preventDefault(), $("html,body").animate({
				scrollTop: $("body").offset().top
			}, 300)
		}), $("#ymwBTC").on("click", function(t) {
			t.preventDefault(), $("html,body").animate({
				scrollTop: $(".ymw-comm").offset().top
			}, 300)
		}), $("#ymwOPN").on("click", function(t) {
			t.preventDefault(), ymwapJs.openAnPop()
		});
		var i = !1;
		$(window).scroll(function() {
			$(".ymw-backtotop").css({
				opacity: "1"
			}), i && clearTimeout(i), i = setTimeout(function() {
				$(".ymw-backtotop").css({
					opacity: "0.2"
				})
			}, 500)
		})
	},
	dhsets: function() {
		function t() {
			var t = $(window).width(),
				a = 9 * t / 16;
			$(".ymw-congame-dh-con-vd,.playArea").css({
				width: t + "px",
				height: a + "px"
			})
		}
		function a() {
			$(".ymwQhYuanBtnMask").on("tap", function() {
				m.slideDown(250), $(".ymw-congame-dh-con-ctl-l").find(".ymwQhYuanBtn").each(function() {
					$(this).on("tap", function() {
						m.append($(".ymw-congame-dh-con-ctl-l-btn").find(".ymwQhYuanBtn")), $(".ymw-congame-dh-con-ctl-l-btn").append($(this)), $(".ymw-congame-dh-con-ctl-l").find(".ymwQhYuanBtn").removeClass("current"), $(this).addClass("current").off("tap"), m.slideUp(150)
					})
				})
			})
		}
		var e = $(".ymw-juji"),
			n = e.find(".ymwTabNav"),
			i = n.attr("data-navnum"),
			r = n.attr("data-rRo");
		defAct = n.attr("data-def") || 0;
		var s = new Swiper(n, {
			watchSlidesProgress: !0,
			watchSlidesVisibility: !0,
			slidesPerView: i,
			resistanceRatio: r,
			onInit: function() {
				n.find(".swiper-slide-active").addClass("active-nav")
			}
		}),
			o = $(".ymw-juji"),
			c = parseInt(o.attr("data-itemid")),
			d = parseInt(o.attr("playOrderId")),
			l = o.attr("data-generalId"),
			p = {
				isCache: !1,
				cacheTime: 0,
				GeneralId: c
			};
		$.ajax({
			type: "GET",
			url: "//db2.gamersky.com/WapAjax.aspx",
			data: {
				json: JSON2.stringify(p),
				jsondata: "getdhsets"
			},
			async: !1,
			dataType: "jsonp",
			success: function(t) {
				function a() {
					var a;
					if (t.length > 30) {
						for (var e = i; e >= 1; e--) {
							var r = 30 * (e - 1) + 1,
								o = 30 * e;
							r <= d && o >= d && (a = i - e)
						}
						s.slideTo(a, 200, !1), n.find(".swiper-slide").eq(a).find("a").trigger("click")
					}
				}
				function e() {
					var t = parseInt($(".ymwJJtabnav").find(".active-nav").find("a").attr("data-min")),
						a = parseInt($(".ymwJJtabnav").find(".active-nav").find("a").attr("data-max"));
					$(".ymwJJtabcon li[data-hit='1']").each(function(e, n) {
						parseInt($(n).attr("data-playorder")) >= t && parseInt($(n).attr("data-playorder")) <= a ? $(n).show() : $(n).hide()
					}), $(".ymwJJtabnav").find("a").on("click", function() {
						var t = $(this),
							a = parseInt(t.attr("data-min
")),
							e = parseInt(t.attr("data-max"));
						$(".ymwJJtabcon li[data-hit='1']").each(function(t, n) {
							parseInt($(n).attr("data-playorder")) >= a && parseInt($(n).attr("data-playorder")) <= e ? $(n).show() : $(n).hide()
						}), $(".ymwJJtabnav").find(".swiper-slide").removeClass("active-nav"), t.parent().addClass("active-nav")
					})
				}
				var i = 0,
					r = "",
					c = "",
					p = [];
				t.length > 30 && (i = Math.ceil(t.length / 30) - 1), t.length % 30 > 0 && (i += 1);
				for (var u = 1; u <= t.length; u++) {
					var m = "";
					t[u - 1].GeneralID == parseInt(l) && (m = "class=cur"), t.length > 30 ? p[u] = "<li data-hit='1' data-playorder='" + t[u - 1].playOrderId + "' style='display: none'><a " + m + " href='/donghua/" + t[u - 1].GeneralID + ".html'>" + t[u - 1].EpisodeTitle + "</a></li>" : p[u] = "<li data-hit='0' data-playorder='" + t[u - 1].playOrderId + "'><a " + m + " href='/donghua/" + t[u - 1].GeneralID + ".html'>" + t[u - 1].EpisodeTitle + "</a></li>"
				}
				if (r = '<ul class="clearfix">' + p.join("") + "</ul>", t.length > 30) for (var f = i; f >= 1; f--) {
					var h = 30 * (f - 1) + 1,
						y = 30 * f;
					y > t.length && (y = t.length);
					var g = "";
					h <= d && y >= d && (g = "active-nav"), g = f == i ? "active-nav" : "", c += "<div class='swiper-slide " + g + "' ><a href='javascript:; ' data-min='" + h + "' data-max='" + y + "'>" + y + "-" + h + "</a></div>"
				} else t.length > 0 && (c = "<div class='swiper-slide active-nav'><a href='javascript:; ' data-min='1' data-max='" + t.length + "'>1-" + t.length + "</a></div>");
				o.find(".ymwJJtabnav").html(c), o.find(".ymwJJtabcon").html(r), s.update(), e(), a()
			}
		}), $(".yu-btn-yuan").addClass("ymwQhYuanBtn");
		var u = $(".ymwQhYuanBtn").length;
		t(), $("#gamersky_player_box").GamerSkyPlayer(), $(window).resize(function() {
			t()
		});
		var m = $(".ymw-congame-dh-con-ctl-l-btns");
		return m.append($(".ymw-congame-dh-con-ctl-l").find(".yu-btn-yuan:gt(0)")), 1 !== u && void a()
	},
	glFunc: function() {
		function t() {
			$(".ymw-zmqkt").each(function() {
				$(this).on("click", function() {
					$("#ymwGlallNav").removeClass("cur"), unlockHtml();
					var t = $(this).attr("data-lito");
					$("html,body").animate({
						scrollTop: $("." + t).offset().top - 47
					}, 300)
				})
			})
		}
		function a() {
			c.find(".active-nav").removeClass("active-nav");
			var t = c.find(".swiper-slide").eq(m.activeIndex).addClass("active-nav");
			if (!t.hasClass("swiper-slide-visible")) if (t.index() > u.activeIndex) {
				var a = Math.floor(u.width / t.width()) - 1;
				u.slideTo(t.index() - a)
			} else u.slideTo(t.index())
		}
		function e() {
			1 == m.activeIndex ? ($(".ymwA-Z").addClass("cur"), $(".ymw-backtotop").hide()) : ($(".ymwA-Z").removeClass("cur"), $(".ymw-backtotop").show())
		}
		function n() {
			m.slideTo(defAct, 0, !1), a()
		}
		function i(t) {
			t.preventDefault();
			var a = $(this),
				e = a.attr("data-zm"),
				n = a.attr("reload"),
				i = '{PE.Label id="获取Wap攻略推荐列表" page="5" size="100" type="all" zm="' + e + '" /}',
				r = {
					isCache: !1,
					cacheTime: 0,
					templateKey: "",
					templata: i
				};
			$.ajax({
				type: "GET",
				url: "//db2.gamersky.com/WapAjax.aspx",
				data: {
					json: JSON2.stringify(r),
					jsondata: "putlabelbody"
				},
				dataType: "jsonp",
				beforeSend: function() {
					a.text("加载中...")
				},
				success: function(t) {
					"true" == n ? (a.attr("reload", !1), a.before(t.body), a.html("已全部展开")) : a.html("已全部展开")
				},
				complete: function() {
					d.find(".swiper-wrapper").css({
						height: $(".ymw-glall-con").height() + "px"
					}), setTimeout(function() {
						d.find(".swiper-wrapper").css({
							height: $(".ymw-glall-con").height() + "px"
						})
					}, 3e3), a.off().css({
						color: "#ddd"
					})
				},
				error: function() {
					navigator.userAgent.indexOf("UCBrowser") > -1 && alert("请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果")
				}
			})
		}
		var r = "",
			s = $(".wapglDataButton");
		s.each(function() {
			$(this).on("click", i), r += '<li><a href="javascript:;" class="ymw-zmqkt" data-lito="ymw-glall-' + $(this).attr("data-zm") + '"><span>' + $(this).attr("data-zm") + "</span></a></li>"
		}), $("#ymwGlallNav").find(".ymw-fullpop-con").html(r), $("#ymwA-Z").on("click", function() {
			$(this);
			$("#ymwGlallNav").addClass("cur"), lockHtml(), $("#ymwGlallNav").find(".ymw-fullpop-close").on("click", function() {
				$("#ymwGlallNav").removeClass("cur"), unlockHtml()
			})
		}), $(window).resize(function() {
			1 == $("#ymwGlallNav").hasClass("cur") && ($("#ymwGlallNav").removeClass("cur"), unlockHtml())
		}), t();
		var o = $(".ymwTabGL"),
			c = o.find(".ymwTabNav"),
			d = o.find(".ymwTabCon"),
			l = o.attr("data-navnum"),
			p = o.attr("data-rRo");
		defAct = o.attr("data-def") || 0;
		var u = new Swiper(c, {
			watchSlidesProgress: !0,
			watchSlidesVisibility: !0,
			slidesPerView: l,
			resistanceRatio: p,
			onTap: function() {
				m.slideTo(u.clickedIndex)
			},
			onInit: function() {
				c.find(".swiper-slide").eq(0).addClass("active-nav")
			}
		}),
			m = new Swiper(d, {
				autoHeight: !0,
				onSlideChangeStart: function() {
					a()
				},
				onSlideChangeEnd: function() {
					e()
				}
			});
		n(), $(window).resize(function() {
			setTimeout(function() {
				var t = $(".ymwtNav").find(".swiper-wrapper").width() / 3;
				u.slides.css("width", t + "px"), u.update(!0), m.update(!0)
			}, 100)
		}), $(window).resize(function() {})
	},
	searchPageFunc: function() {
		var t = $(".ymwsRespage"),
			a = t.find(".ymwTabNav"),
			e = a.attr("data-navnum"),
			n = a.attr("data-rRo");
		defAct = a.attr("data-def") || 0;
		new Swiper(a, {
			slidesPerView: e,
			resistanceRatio: n,
			onInit: function() {
				a.find(".swiper-slide").eq(defAct).addClass("active-nav")
			}
		})
	},
	SyLinkFun: function() {
		var t = navigator.userAgent,
			a = (navigator.appVersion, t.indexOf("Android") > -1 || t.indexOf("Linux") > -1);
		$(".ymwSyLink").each(function() {
			1 == a ? $(this).attr("href", "http://wap.gamersky.com/shouyou/android/") : $(this).attr("href", "http://wap.gamersky.com/shouyou/ios/")
		})
	},
	htmlAndroidiOs: function() {
		var t = navigator.userAgent,
			a = (navigator.appVersion, t.indexOf("Android") > -1 || t.indexOf("Linux") > -1);
		1 == a ? ($("html").removeClass("ymw-iOsWap"), $("html").addClass("ymw-androidWap")) : ($("html").removeClass("ymw-androidWap"), $("html").addClass("ymw-iOsWap"))
	},
	ymwPzDataFun: function() {
		var t = $(".ymwPzData"),
			a = ($(".ymwPzDataIn"), t.find(".PZ.DD")),
			e = t.find(".PZ.TJ");
		a.find("li.tit").remove(), e.find("li.tit").remove(), $(".ymwPzDataIn").find(".swiper-slide").eq(0).html(a), $(".ymwPzDataIn").find(".swiper-slide").eq(1).html(e);
		var n = t.find(".PZXQ").length;
		0 === n && $(".ymw-peizhi").remove()
	},
	ymwsyScoreFun: function() {
		function t(t) {
			return void 0 !== t.originalEvent.targetTouches[0] && void 0 !== t.originalEvent.targetTouches[0].pageX && (t.pageX = t.originalEvent.targetTouches[0].pageX), void 0 !== t.originalEvent.targetTouches[0] && void 0 !== t.originalEvent.targetTouches[0].pageY && (t.pageY = t.originalEvent.targetTouches[0].pageY), t
		}
		function a() {
			$(".ymsSyDlStarsWrap").on("touchstart", function(t) {
				t.preventDefault(), p.changeState(t), o.removeClass("cur")
			}), $(".ymsSyDlStarsWrap").on("touchmove", function(t) {
				t.preventDefault(), p.changeState(t)
			}), $(".ymsSyDlStarsWrap").on("touchend", function() {
				o.addClass("cur")
			})
		}
		function e() {
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//i.gamersky.com/api/logincheck",
				success: function(t) {
					"ok" == t.status ? a() : null !== $.fn.cookie(f) ? (h = parseInt($.fn.cookie(f), 10), y = h % 2 == 0 ? h / 2 : (h + 1) / 2, r.find(".ymw_score_stars").find("span").width(10 * h + "%"), s.find("span").html(d[y - 1])) : a()
				}
			}), o.off(), o.on("click", function(t) {
				t.preventDefault();
				var a = $(this),
					e = a.attr("data-scorenum"),
					n = a.attr("data-generalid"),
					i = a.attr("data-type"),
					r = a.attr("data-tips"),
					s = "WapPL" + n;
				a.attr("data-scoretxt");
				o.removeClass("cur"), $.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//i.gamersky.com/apirating/rating",
					data: {
						Rating: JSON2.stringify({
							GenneralId: n,
							Sorce: e,
							Type: i
						}),
						Action: "rating"
					},
					success: function(t) {
						if (t.hasOwnProperty("status")) switch (t.status) {
						case "err":
							alert("提交" + r + "错误！");
							break;
						case "existuser":
						case "existip":
							alert("已" + r + "！")
						}
						$(".ymsSyDlStarsWrap").off(), $.fn.cookie(s, e, {
							path: "/",
							expires: 365
						})
					}
				})
			})
		}
		function n() {
			var t = c.attr("data-generalid"),
				a = c.attr("data-type"),
				e = c.attr("data-sorce"),
				n = c.attr("data-tips"),
				i = "R" + c.attr("data-generalid") + "likeother";
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				url: "//i.gamersky.com
/apirating/initgroup",
				data: {
					generalId: t,
					ratingGroupType: a,
					Action: "initGroup"
				},
				success: function(t) {
					t.hasOwnProperty("status") ? console.log(t) : c.find("span").text(t[0].Times)
				}
			}), null !== $.fn.cookie(i) ? c.addClass("cur") : c.on("click", function() {
				c.addClass("cur"), $.fn.cookie(i, 1, {
					path: "/",
					expires: 365
				}), $.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//i.gamersky.com/apirating/rating",
					data: {
						Rating: JSON2.stringify({
							GenneralId: t,
							Sorce: e,
							Type: a
						}),
						Action: "rating"
					},
					success: function(t) {
						if (t.hasOwnProperty("status")) switch (t.status) {
						case "err":
							alert("提交" + n + "错误！");
							break;
						case "existuser":
						case "existip":
							alert("已" + n + "！")
						} else console.log("ok")
					}
				})
			})
		}
		var i, r = $("#ymsSyDlStarsWrap"),
			s = $("#myScoreTxt"),
			o = $("#ymwScoreSubmit"),
			c = $("#ymwScoreLike"),
			d = ["不忍直视", "平庸之作", "不妨一试", "公认佳作", "不容错过"],
			l = function() {
				r.find(".ymw_score_stars").find("i").css("width", r.find(".ymw_score_stars").width() + "px"), i = setTimeout(function() {
					r.find(".ymw_score_stars").find("i").css("width", r.find(".ymw_score_stars").width() + "px")
				}, 500)
			};
		l.prototype = {
			positionInfos: function() {
				var t, a = r.find(".ymw_score_stars");
				return t = {
					width: a.width(),
					left: a.offset().left
				}
			},
			changeState: function(a) {
				var e, n = t(a),
					i = u.left,
					c = u.width,
					l = n.pageX;
				e = l - i, conDtc = e / c > 1 ? 1 : e / c, starNum = Math.floor(10 * conDtc) % 2 == 0 ? Math.floor(10 * conDtc) / 2 : (Math.floor(10 * conDtc) - 1) / 2, starNum = starNum < 0 ? 0 : starNum, scorenum = starNum > 4 ? 10 : 2 * (starNum + 1), scorenum = scorenum < 0 ? 0 : scorenum;
				var p = 100 * conDtc + "%";
				r.find(".ymw_score_stars").find("span").width(p), s.find("span").text(d[starNum]), o.attr({
					"data-scorenum": scorenum,
					"data-scoretxt": d[starNum]
				})
			}
		};
		var p = new l,
			u = p.positionInfos(),
			m = o.attr("data-generalid"),
			f = "WapPL" + m,
			h = 0,
			y = 0;
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			url: "//i.gamersky.com/apirating/getcontentratingloginfo",
			data: {
				generalId: m
			},
			success: function(t) {
				var a, n, i, o, c;
				"ok" == t.status ? (a = $.parseJSON(t.body), n = Math.floor(a.Sorce), o = parseInt(a.Sorce, 10), c = o % 2 == 0 ? o : o + 1, i = n % 2 == 0 ? n / 2 : (n + 1) / 2, r.find(".ymw_score_stars").find("span").width(10 * c + "%"), s.find("span").html(d[i - 1])) : e()
			}
		}), n()
	},
	ymwListJxFunc: function() {
		function addList(baseData) {
			var tmpDom = "",
				othersData, rens;
			if (baseData.others) try {
				othersData = eval("(" + baseData.others + ")"), rens = othersData.reasons
			} catch (err) {
				console.error(baseData.tit + "  “精选简介”字段有一个错误需要处理：" + err), othersData = {
					subtitle: "",
					bigimg: "http://image.gamersky.com/webimg13/nopic.png"
				}, rens = ""
			} else console.error(baseData.tit + "  “精选简介”字段数据为空"), othersData = {
				subtitle: "",
				bigimg: "http://image.gamersky.com/webimg13/nopic.png"
			}, rens = "";
			tmpDom += '<li data-id="' + baseData.id + '"><div class="lmc_tit"><a href="' + baseData.url + '">', tmpDom += baseData.icon, tmpDom += '</a><h5><a href="' + baseData.url + '">', tmpDom += baseData.tit, tmpDom += "</a></h5><p>", tmpDom += othersData.subtitle, tmpDom += '</p><a class="lmc_like ymwLike" data-generalId="' + baseData.id + '">0</a></div><a class="lmc_img" href="' + baseData.url + '"><img src="' + lazyLoadImgHolder + '" data-src="' + othersData.bigimg + '" alt="游民星空" class="lmcLzimg"></a>';
			for (var i = 0; i < rens.length; i++) tmpDom += '<p class="lmc_para">' + rens[i] + "</p>";
			return tmpDom += "</li>"
		}
		function likeFunc() {
			var t = $(".ymwLike"),
				a = "喜欢";
			t.each(function() {
				var t = $(this),
					e = t.attr("data-generalId"),
					n = "R" + e + "-5";
				$.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//i.gamersky.com/apirating/initgroup",
					data: {
						generalId: e,
						ratingGroupType: 5,
						Action: "initGroup"
					},
					success: function(a) {
						a.hasOwnProperty("status") || t.html(a[0].Times)
					},
					error: function(a) {
						t.html("请刷新")
					}
				}), void 0 !== $.fn.cookie(n) && null !== $.fn.cookie(n) ? t.addClass("cur") : t.on("click", function() {
					t.addClass("cur"), $.ajax({
						type: "GET",
						dataType: "jsonp",
						url: "//i.gamersky.com/apirating/rating",
						data: {
							Rating: JSON2.stringify({
								GenneralId: e,
								Sorce: 1,
								Type: 5
							}),
							Action: "rating"
						},
						success: function(i) {
							if (i.hasOwnProperty("status")) switch (i.status) {
							case "err":
								alert("提交" + a + "错误！");
								break;
							case "existuser":
							case "existip":
								alert("已" + a + "！")
							} else t.html(i.Times);
							$.fn.cookie(n, JSON2.stringify({
								GenneralId: e,
								Sorce: 1,
								Type: 5
							}), {
								path: "/",
								expires: 365
							})
						}
					}), t.off()
				})
			})
		}
		function getListData(initSet) {
			var jsondata = {
				type: "getwaplabelpage",
				isCache: !0,
				cacheTime: 0,
				templatekey: initSet.templatekey,
				id: initSet.id,
				nodeId: initSet.nodeid,
				page: initSet.page,
				nodes: initSet.nodes
			},
				listDom = "";
			$.ajax({
				type: "GET",
				async: !1,
				url: "//db2.gamersky.com/LabelJsonpAjax.aspx",
				data: {
					jsondata: JSON2.stringify(jsondata)
				},
				dataType: "jsonp",
				beforeSend: function() {
					moreBtn.addClass("ymw-more-loading").find("span").html("正在加载")
				},
				success: function(data) {
					function loadImgsFunc(t, a, e) {
						var n = new Image;
						n.src = t, n.onload = function() {
							if (initnum++, $(e).hasClass("lmcLzimg") && $(e).attr("src", $(e).attr("data-src")), initnum >= a) {
								var t = $list.closest(".swiper-slide").height() + "px";
								$list.closest(".swiper-wrapper").css("height", t)
							}
						}
					}
					var gd = data.body,
						newData, strStart, strEnd, parseData, initnum = 0,
						imglist;
					if (data.body.indexOf("没有任何记录") > 0) moreBtn.attr("data-txt", "全部加载完成"), moreBtn.off();
					else {
						strStart = gd.indexOf("bodyDataStart") + 13, strEnd = gd.indexOf("bodyDataEnd") - strStart, newData = gd.substr(strStart, strEnd) + "]";
						try {
							parseData = eval("(" + newData + ")")
						} catch (err) {
							console.error("parseData has a error:" + err)
						}
						$.each(parseData, function(t, a) {
							listDom += addList(a)
						}), $list.append(listDom), imglist = $list.find("img");
						for (var i = 0; i < imglist.length; i++) loadImgsFunc(imglist[i].src, imglist.length, imglist[i]);
						likeFunc()
					}
				},
				complete: function() {
					setTimeout(function() {
						var t = $list.closest(".swiper-slide").height() + "px";
						$list.closest(".swiper-wrapper").css("height", t)
					}, 300), moreBtn.removeClass("ymw-more-loading").find("span").html(moreBtn.attr("data-txt"))
				},
				error: function() {
					navigator.userAgent.indexOf("UCBrowser") > -1 && alert("请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果")
				}
			})
		}
		function getMoreList() {
			moreBtn.on("click", function() {
				var t = $list.find("li").eq(-1).attr("data-id");
				listSet.page;
				listSet.id = t, listSet.page++, getListData(listSet)
			})
		}
		var $list = $(".ymwListJx"),
			listData, moreBtn = $(".ymwListJxMore"),
			lazyLoadImgHolder = "http://image.gamersky.com/webimg13/loadpic.gif",
			listSet = {
				templatekey: $list.attr("templatekey"),
				id: 0,
				nodeid: $list.attr("data-nodeid"),
				page: $list.attr("data-page"),
				nodes: $list.attr("nodes")
			};
		getListData(listSet), getMoreList()
	},
	ymwListZoneFunc: function() {
		function iGetInnerText(t) {
			var a = t.replace(/\s+/g, "");
			return a = a.replace(/<\/?.+?>/g, ""), a = a.replace(/[\r\n]/g, "")
		}
		function renderListNav() {
			var t = "",
				a = zoneConf.blockData;
			t += '<div class="lmz_nav_row">';
			var e = 0;
			$.each(a, function(a, n) {
				e++, "zq_rmzq" != a && (t += '<a data-tar="' + a + '">' + n.nav + "</a>", "zq_dz" != a && "zq_gd" != a || (t += '</div><div class="lmz_nav_row">'))
			}), t += "</div>", listNav.html(t), listNav.find(".lmz_nav_row").each(function() {
				var t = $(this),
					a = t.find("a").length,
					e = ['<a class="navPlaceHolder">占位</a>', '<a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a>', '<a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a>', '<a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a>'];
				a < 5 && t.append(e[4 - a])
			}), listNav.find("a").on("click", function() {
				var t = $(this),
					a = t.attr("data-tar"),
					e = $("#" + a).offset().top - 48;
				$("html,body").animate({
					scrollTop: e
				}, 300)
			})
		}
		function listLi(t) {
			var a = "";
			return a += '<li><a href="' + t.url + '"><span class="lmz_img"><img src="' + t.imgsrc + '" alt="' + t.tit + '"></span><span class="lmz_tit">' + t.tit + '</span><span class="lmz_platform"><i class="txt">平台：</i>', "none" != t.andIos && (a += "未知"), "none" != t.and && (a += '<i class="lmz_icons lmz_icons_andorid"></i>'), "none" != t.ios && (a += '<i class="lmz_icons lmz_icons_ios"></i>'), a += '</span><i class="lmz_time"><i class="txt">上市：</i><i class="time">' + t.time + "</i></i></a></li>"
		}
		function createListCon(itemData, key) {
			var listConDom = "",
				conData = itemData,
				conDataSim, conDataSimFormat, newArrayData = [],
				itemsShow = !0;
			conDataSim = $(".dataArea").find("." + conData.dataArea).html();
			try {
				conDataSimFormat = eval("(" + iGetInnerText(conDataSim) + ")")
			} catch (err) {
				console.error(conData.nav + "-数据错误（数据不存在）：" + err), itemsShow = !1
			}
			if (listConDom += '<div class="lmz_items" id="' + key + '">', listConDom += "<h5><span>" + conData.nav + "</span></h5>", listConDom += '<ul class="lmz_flex_row">', conDataSim) for (var i = 0; i < conDataSimFormat.length; i++) i < 6 ? (listConDom += listLi(conDataSimFormat[i]), 2 == i && (listConDom += '</ul><ul class="lmz_flex_row">')) : newArrayData.push(conDataSimFormat[i]);
			return listConDom += '</ul><a class="lmz_more ymwListZoneMore" data-list="' + key + '">点击
展开</a>', listConDom += "</div>", 0 == itemsShow && (listConDom = "", newArrayData = []), [listConDom, newArrayData]
		}
		function createListConMore(t) {
			var a = "",
				e = t;
			a += '<ul class="lmz_flex_row">';
			for (var n = 0; n < e.length; n++) a += listLi(e[n]), (n + 1) % 3 == 0 && n != e.length - 1 && (a += '</ul><ul class="lmz_flex_row">');
			return a += "</ul>"
		}
		function addPlaceHolder() {
			listCon.find(".lmz_flex_row").each(function() {
				var t = $(this),
					a = t.find("li").length;
				2 == a && t.append("<li></li>")
			})
		}
		function listMore() {
			var t = $list.find(".ymwListZoneMore");
			t.on("click", function() {
				var t = $(this),
					a = "",
					e = t.attr("data-list"),
					n = zoneConf.blockData[e].realData;
				a += createListConMore(n), t.remove(), $("#" + e).append(a);
				var i = $list.closest(".swiper-slide").height() + "px";
				$list.closest(".swiper-wrapper").css("height", i), addPlaceHolder()
			})
		}
		function renderListCon() {
			var t = "",
				a = zoneConf.blockData;
			$.each(a, function(a, e) {
				var n = createListCon(e, a);
				t += n[0], e.realData = n[1]
			}), listCon.html(t), listMore(), addPlaceHolder(), listCon.find(".lmz_items").each(function() {
				$(this).find("li").length < 6 && $(this).find(".lmz_more").remove()
			})
		}
		var $list = $(".ymwListZone"),
			listNav = $list.find(".lmz_nav"),
			listCon = $list.find(".lmz_items_wrap"),
			zoneConf = {};
		zoneConf = {
			blockData: {
				zq_rmzq: {
					nav: "热门专区",
					dataArea: "dataArea_rmzq",
					realData: ""
				},
				zq_jsby: {
					nav: "角色扮演",
					dataArea: "dataArea_jsby",
					realData: ""
				},
				zq_kp: {
					nav: "卡牌",
					dataArea: "dataArea_kp",
					realData: ""
				},
				zq_pk: {
					nav: "跑酷",
					dataArea: "dataArea_pk",
					realData: ""
				},
				zq_tf: {
					nav: "塔防",
					dataArea: "dataArea_tf",
					realData: ""
				},
				zq_dz: {
					nav: "动作",
					dataArea: "dataArea_dz",
					realData: ""
				},
				zq_yywd: {
					nav: "音乐舞蹈",
					dataArea: "dataArea_yywd",
					realData: ""
				},
				zq_sj: {
					nav: "射击",
					dataArea: "dataArea_sj",
					realData: ""
				},
				zq_ty: {
					nav: "体育",
					dataArea: "dataArea_ty",
					realData: ""
				},
				zq_yc: {
					nav: "养成",
					dataArea: "dataArea_yc",
					realData: ""
				},
				zq_gd: {
					nav: "格斗",
					dataArea: "dataArea_gd",
					realData: ""
				},
				zq_cljy: {
					nav: "策略经营",
					dataArea: "dataArea_cljy",
					realData: ""
				},
				zq_qp: {
					nav: "棋牌",
					dataArea: "dataArea_qp",
					realData: ""
				}
			}
		}, renderListNav(), renderListCon()
	},
	zpFunc: function() {
		function t(t) {
			return void 0 !== t.originalEvent.targetTouches[0] && void 0 !== t.originalEvent.targetTouches[0].pageX && (t.pageX = t.originalEvent.targetTouches[0].pageX), void 0 !== t.originalEvent.targetTouches[0] && void 0 !== t.originalEvent.targetTouches[0].pageY && (t.pageY = t.originalEvent.targetTouches[0].pageY), t
		}
		function a(t) {
			i.each(function(a) {
				a <= t && ($(this).addClass("cur"), r.html(s[t]))
			})
		}
		function e(e) {
			var r = n.find(".ymw_stars"),
				s = r.width(),
				o = r.offset().left,
				c = t(e).pageX - o,
				d = parseInt(c / s * 10 / 2),
				l = d > 4 ? 4 : d;
			return i.removeClass("cur"), a(l < 0 ? 0 : l), !$(".ymw_zp_pf_wd .tpbtn").eq(0).hasClass("cur") && (r.submitMyScore(l), void($(".ymw_zp_pf_wd .tpbtn").eq(1).hasClass("cur") || $(".ymw_zp_pf_wd .tpbtn").eq(1).addwanFun()))
		}
		var n = $("#ymwZpAreaStar"),
			i = n.find("a"),
			r = n.find("span"),
			s = ["渣作，不玩也罢", "平庸，索然无味", "一般，普普通通", "佳作，值得一玩", "神作，不容错过"];
		n.find(".ymw_stars").on({
			touchstart: function(t) {
				return "未上市" == $(".ymw_zp_pf_wd").attr("date-selltime") ? (alert("该游戏未上市！"), !1) : void $.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//i.gamersky.com/api/logincheck",
					success: function(a) {
						"ok" == a.status ? e(t) : ($(".ymw-loginpop-btns").insertYmwLoginPop(), $(".ymw-loginpop-btns").QZloginForm())
					}
				})
			},
			touchmove: function(t) {
				t.preventDefault(), e(t)
			},
			touchend: function(t) {
				t.preventDefault();
				n.find("a.cur").index()
			}
		})
	},
	openAnPop: function() {
		var t = $("body").scrollTop(),
			a = $(".ymw-article-nav-pop");
		window.gsArticleNavSt = t;
		var e = $(window).width() / 7.2,
			n = $(window).height() - 1.3 * e;
		a.find(".ymw-anp-con").css("height", n + "px"), a.addClass("cur"), ymwapJs.closeScroll(), $(window).resize(function() {
			e = $(window).width() / 7.2, n = $(window).height() - 1.3 * e, a.find(".ymw-anp-con").css("height", n + "px")
		}), $("#ymwAdBottom").length > 0 && $("#ymwAdBottom").hide();
		var i = a.find("a.cur").offset().top - a.find(".ymw-anp-con-scroll").offset().top;
		a.find(".ymw-anp-con-scroll").scrollTop(i)
	},
	closeAnPop: function() {
		var t = $(".ymw-article-nav-pop");
		t.find(".ymw-anp-con-scroll").scrollTop(0), t.removeClass("cur"), ymwapJs.openScroll(), $("html,body").animate({
			scrollTop: window.gsArticleNavSt
		}, 0), $("#ymwAdBottom").length > 0 && $("#ymwAdBottom").show()
	},
	articleNav: function() {
		function t() {
			function t() {
				var t, e = $(".ymw-article-nav-select"),
					n = (e.html(), e.find("option:selected").html()),
					i = e.find("option:selected").val();
				t = '<a class="ymw-article-nav-in-d"><span>' + n + "</span></a>", $(t).insertAfter(a.find(".ymw-article-nav-in-t"));
				var r = "",
					s = window.location.href,
					o = /\.(shtml)/i,
					c = $(".cy_comment").attr("data-sid"),
					d = ".html";
				return o.test(s) && (d = ".shtml"), r += "<ul>", e.find("option").each(function(t, a) {
					var e, n = $(this),
						s = n.val(),
						o = n.html();
					e = 1 == s ? "Content-" + c + d : "Content-" + c + "_" + s + d, r += s == i ? '<li><a class="cur" href="' + e + '">' + o + "</a></li>" : '<li><a href="' + e + '">' + o + "</a></li>"
				}), r += "</ul>"
			}
			var a = $(".ymw-article-nav-in"),
				e = "";
			e += '<div class="ymw-article-nav-pop"><div class="ymw-anp-tit"><i></i>文章导航</div><a class="ymw-anp-close"></a><div class="ymw-anp-con"><div class="ymw-anp-con-scroll">', e += t(), e += "</div></div></div>", $("body").append(e);
			var n = a.find(".ymw-article-nav-in-d"),
				i = $(".ymw-article-nav-pop");
			n.on("click", ymwapJs.openAnPop), i.find(".ymw-anp-close").on("click", ymwapJs.closeAnPop);
			var r;
			i.find(".ymw-anp-con-scroll").find("a").on("click", function(t) {
				var a = $(this).attr("href"),
					e = navigator.userAgent,
					n = (navigator.appVersion, e.indexOf("Android") > -1 || e.indexOf("Linux") > -1);
				ymwapJs.closeAnPop(), 1 == n && (t.preventDefault(), clearTimeout(r), r = setTimeout(function() {
					window.location = a
				}, 200))
			})
		}
		var a = !0;
		$(".ymw-article-nav-select").find("option").each(function() {
			0 == $(this).html().length && (a = !1)
		}), a ? t() : $(".ymw-article-nav-in").remove()
	},
	gsSCMfunc: function() {
		function t() {
			var t = $(".gs_strategy_collect"),
				a = t.find(".gs_sc_item_btn"),
				e = t.find(".gs_sc_item");
			e.each(function() {
				$(this).find("li").each(function() {
					var t = $(this).find("a");
					t.attr("href", t.attr("waphref")), t.removeAttr("target")
				})
			}), t.find(".gs_sc_item_more").each(function() {
				var t = $(this);
				t.attr("href", t.attr("waphref")), t.removeAttr("target")
			}), a.on("click", function() {
				var t = $(this);
				"true" === t.attr("data-clk") ? (e.removeClass("cur"), a.attr("data-clk", "false")) : (e.removeClass("cur"), t.closest(".gs_sc_item").addClass("cur"), a.attr("data-clk", "false"), t.attr("data-clk", "true"))
			}), a.attr("data-clk", "false"), e.eq(0).addClass("cur").find(".gs_sc_item_btn").attr("data-clk", "true")
		}
		var a = $("#gsSCM");
		a.find(".collectbox").show(), a.find(".gs_sc_item").length <= 0 ? a.remove() : t()
	},
	gsListFunc: function() {
		function t() {
			function t() {
				var t = a.find(".gs_sc_item.cur");
				if (t.length > 0) {
					var e = $("body").scrollTop() > $("html").scrollTop() ? $("body").scrollTop() : $("html").scrollTop(),
						n = t.offset().top,
						i = e + 46;
					n < i && $("html,body").animate({
						scrollTop: n - 46
					}, 100)
				}
			}
			var a = $(".gs_strategy_collect"),
				e = a.find(".gs_sc_item_btn"),
				n = a.find(".gs_sc_item");
			a.find(".gs_sc_tit").hide(), n.each(function() {
				$(this).find("li").each(function() {
					var t = $(this).find("a");
					t.attr("href", t.attr("waphref")), t.removeAttr("target")
				})
			}), a.find(".gs_sc_item_more").each(function() {
				var t = $(this);
				t.attr("href", t.attr("waphref")), t.removeAttr("target")
			}), e.on("click", function() {
				var i, r = $(this);
				"true" === r.attr("data-clk") ? (e.attr("data-clk", "false"), n.removeClass("cur")) : (n.removeClass("cur"), e.attr("data-clk", "false"), r.attr("data-clk", "true"), r.closest(".gs_sc_item").addClass("cur")), t(), i = a.closest(".swiper-slide").height(), a.closest(".swiper-wrapper").css("height", i + "px")
			}), e.attr("data-clk", "false"), n.eq(0).addClass("cur").find(".gs_sc_item_btn").attr("data-clk", "true")
		}
		var a = $("#gsGlList"),
			e = $("#gsGlListSCM");
		if (e.find(".collectbox").show(), e.find(".gs_sc_item").length <= 0) e.closest(".swiper-slide").remove(), a.attr("data-navnum", 2), a.find(".ymwTabNav").find(".swiper-slide").eq(0).remove();
		else {
			t();
			var n = $(".gs_strategy_collect").closest(".swiper-slide").height();
			$(".gs_strategy_collect").closest(".swiper-wrapper").css("height", n + "px")
		}
	},
	getHotsCount: function() {
		$(".gsShowHots").length > 0 && $(".gsShowHots").each(function() {
			var t = $(this);
			t.find("li").each(function() {
				var t = $(this),
					a = t.find(".gsHots"),
					e = a.data("hots"),
					n = a.attr("data-isld");
				"false" == n && $.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//click.gamersky.com/Common/GetHits.aspx",
					data: {
						id: e,
						script: "3"
					},
					success: function(t) {
						a.html("人气：" + t.hits), a.attr("data-isld", !0)
					}
				})
			})
		})
	},
	doJs: function(t, a) {
		0 == !t.length && a && a()
	}
},
	ymwapDataJs = {
		getCmnums: function() {
			var t = "";
			$(".cy_
comment").each(function() {
				"" != t && (t += ","), t += $(this).attr("data-sid")
			}), "" != t && $.ajax({
				type: "GET",
				url: "//cm.gamersky.com/commentapi/count",
				dataType: "jsonp",
				data: {
					topic_source_id: t
				},
				success: function(t) {
					$(".cy_comment").each(function() {
						if (t.result.hasOwnProperty($(this).attr("data-sid"))) {
							var a = t.result[$(this).attr("data-sid")];
							$(this).text(a.comments)
						}
					})
				}
			})
		},
		newsloadmoreFunc: function() {
			function t(a) {
				a.preventDefault();
				var e = $(this),
					n = (e.attr("data-txt"), $(".ymwNews")),
					i = n.attr("templateKey"),
					r = parseInt(n.attr("data-page")) + 1,
					s = n.attr("data-nodeId"),
					o = $(".ymwNews").find("li").eq(-1).attr("data-id"),
					c = $(".ymwNews").attr("nodes"),
					d = {
						type: "getwaplabelpage",
						isCache: !0,
						cacheTime: 60,
						templatekey: i,
						id: o,
						nodeId: s,
						page: r,
						nodes: c
					};
				return $.ajax({
					type: "GET",
					url: "//db2.gamersky.com/LabelJsonpAjax.aspx",
					data: {
						jsondata: JSON2.stringify(d)
					},
					dataType: "jsonp",
					beforeSend: function() {
						e.addClass("ymw-more-loading").find("span").html("正在加载"), e.off()
					},
					success: function(t) {
						n.attr("data-page", r), t.body.indexOf("没有任何记录") > 0 ? e.attr("data-txt", "全部加载完成") : $(t.body).insertBefore(e)
					},
					complete: function() {
						e.removeClass("ymw-more-loading"), e.find("span").html(e.attr("data-txt")), ymwapDataJs.getCmnums(), e.on("touchend", t)
					},
					error: function() {
						navigator.userAgent.indexOf("UCBrowser") > -1 && alert("请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果")
					}
				}), !1
			}
			$ymwLdMoreBtn = $(".newsloadmore"), $ymwLdMoreBtn.on("touchend", t)
		},
		ymwListMoreFun: function() {
			var t = $(".ymwListMore");
			t.each(function() {
				for (var t = $(this), a = t.find("li"), e = t.attr("data-listshow"), n = t.find(".ymwListMoreBtn"), i = n.attr("data-link"), r = n.attr("data-txt"), s = e; s < a.length; s++) a.eq(s).hide();
				n.on("click", function(t) {
					t.preventDefault();
					for (var n = e; n < a.length; n++) a.eq(n).show();
					$(this).attr("href", i).off().find("span").html(r)
				})
			})
		},
		ymwSpecialmoreFun: function() {
			function t(a) {
				a.preventDefault();
				var e = $(this),
					n = (e.attr("data-txt"), e.closest(".speciallist")),
					i = n.attr("data-templatekey"),
					r = parseInt(n.attr("data-page")) + 1,
					s = n.attr("data-specialid"),
					o = n.attr("data-isSpecialId"),
					c = {
						type: "getwapspecialpage",
						isCache: !0,
						cacheTime: 60,
						specialId: s,
						isSpecialId: o,
						templatekey: i,
						page: r
					};
				$.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//db2.gamersky.com/LabelJsonpAjax.aspx",
					data: {
						jsondata: JSON2.stringify(c)
					},
					beforeSend: function() {
						e.addClass("ymw-more-loading").find("span").html("正在加载"), e.off()
					},
					success: function(t) {
						(t.status = "ok") && (n.attr("data-page", r), t.totalPages <= r ? (t.totalPages == r && $(t.body).insertBefore(e), e.attr("data-txt", "全部加载完成")) : t.totalPages > r && $(t.body).insertBefore(e), ymwapJs.getHotsCount())
					},
					complete: function() {
						e.removeClass("ymw-more-loading"), e.find("span").html(e.attr("data-txt"));
						var a = e.closest(".swiper-slide").height() + "px";
						e.closest(".swiper-wrapper").css("height", a), e.on("touchend", t)
					},
					error: function() {
						navigator.userAgent.indexOf("UCBrowser") > -1 && alert("请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果")
					}
				})
			}
			$btn = $(".specialmore"), $btn.each(function() {
				$(this).on("touchend", t)
			})
		},
		ymwKulistloadmoreFun: function() {
			function t(a) {
				a.preventDefault();
				var e = $(this),
					n = (e.attr("data-txt"), e.closest(".wapList")),
					i = n.find("li").length,
					r = n.attr("data-nodeid"),
					s = n.attr("data-modeid"),
					o = n.attr("Keyword"),
					c = n.attr("data-gamelid"),
					d = parseInt(n.attr("data-page")) + 1,
					l = n.attr("data-type"),
					p = "{PE.Label id='获取wap游戏内容页相关内容' gameLib='" + c + "' page='" + d + "' size='10' nodeid='" + r + "' specialid='' Keyword='" + o + "' ModelId='" + s + "' type='" + l + "' /}",
					u = {
						isCache: !1,
						cacheTime: 0,
						templateKey: "",
						templata: p
					};
				$.ajax({
					type: "GET",
					url: "//db2.gamersky.com/WapAjax.aspx",
					data: {
						json: JSON2.stringify(u),
						jsondata: "putlabelbody"
					},
					dataType: "jsonp",
					beforeSend: function() {
						e.addClass("ymw-more-loading").find("span").html("正在加载"), e.off()
					},
					success: function(t) {
						n.attr("data-page", d), i < 10 * (d - 1) ? e.attr("data-txt", "全部加载完成") : $(t.body).insertBefore(e)
					},
					complete: function() {
						e.removeClass("ymw-more-loading"), e.find("span").html(e.attr("data-txt"));
						var a = e.closest(".swiper-slide").height() + "px";
						e.closest(".swiper-wrapper").css("height", a), e.on("touchend", t), ymwapDataJs.getCmnums()
					},
					error: function() {
						navigator.userAgent.indexOf("UCBrowser") > -1 && alert("请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果")
					}
				})
			}
			$btn = $(".kulistloadmore"), $btn.each(function() {
				$(this).on("touchend", t)
			})
		},
		ymwNewglldmoreFun: function() {
			function t(a) {
				a.preventDefault();
				var e = $(this),
					n = parseInt(e.attr("data-page")) + 1,
					i = '{PE.Label id="获取Wap攻略推荐列表" page="' + n + '" size="20" type="new" zm="" /}',
					r = {
						isCache: !1,
						cacheTime: 0,
						templateKey: "",
						templata: i
					};
				return $.ajax({
					type: "GET",
					url: "//db2.gamersky.com/WapAjax.aspx",
					data: {
						json: JSON2.stringify(r),
						jsondata: "putlabelbody"
					},
					dataType: "jsonp",
					beforeSend: function() {
						e.addClass("ymw-more-loading").find("span").html("正在加载"), e.off()
					},
					success: function(t) {
						e.attr("data-page", n), $(t.body).insertBefore(e)
					},
					complete: function() {
						e.removeClass("ymw-more-loading"), e.find("span").html(e.attr("data-txt"));
						var a = e.closest(".swiper-slide").height() + "px";
						e.closest(".swiper-wrapper").css("height", a), e.on("touchend", t)
					},
					error: function() {
						navigator.userAgent.indexOf("UCBrowser") > -1 && alert("请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果")
					}
				}), !1
			}
			$btn = $(".glnewmore"), $btn.each(function() {
				$(this).on("touchend", t)
			})
		},
		searchFun: function() {
			function t(t, a) {
				13 != t.which || t.shiftKey || (t.preventDefault(), e($(this)))
			}
			function a(t, a) {
				t.preventDefault(), e($(this).parent().find(".ymw-search-ipt"))
			}
			function e(t) {
				var a = t.val(),
					e = $(".ymw-search-nav .cur").attr("date-node");
				"undefined" == typeof e && (e = "all"), "" != a && a != i && (a = encodeURIComponent(a.replace("<", "").replace(">", "")), window.location.href = "http://wap.gamersky.com/" + e + "/search.html?keyword=" + a)
			}
			var n = $("#ymwSearchIn"),
				i = "输入搜索内容";
			n.each(function() {
				var e = $(this),
					n = e.find(".ymwSearchBtn"),
					r = e.find(".ymw-search-ipt");
				r.on("keypress", t), n.on("tap", a), r.on({
					focus: function() {
						$(this).val() == i && $(this).val("")
					},
					blur: function() {
						"" == $(this).val() && $(this).val(i)
					}
				})
			})
		},
		wapSearchMoreFunc: function() {
			function t(a) {
				a.preventDefault();
				var e = $(this),
					n = (e.attr("data-txt"), $(".wapList")),
					i = n.attr("data-dataurl"),
					r = n.attr("data-pagesize"),
					s = n.attr("data-type"),
					o = parseInt(n.attr("data-page")) + 1,
					c = parseInt(n.attr("date-totalpage")),
					d = n.attr("excludeItems"),
					l = n.attr("keyword");
				$.ajax({
					type: "GET",
					url: i,
					dataType: "html",
					data: {
						page: o,
						pageSize: r,
						type: s,
						excludeItems: d,
						keyword: l
					},
					beforeSend: function() {
						e.addClass("ymw-more-loading").find("span").html("正在加载"), e.off()
					},
					success: function(t) {
						n.attr("data-page", o), c < o ? e.attr("data-txt", "全部加载完成") : (n.append(t), ymwapDataJs.getCmnums())
					},
					complete: function() {
						e.removeClass("ymw-more-loading"), e.find("span").html(e.attr("data-txt")), e.on("touchend", t), ymwapJs.doJs($(".ymw-list-three"), ymwapJs.listThree(".ymw-list-three")), setTimeout(function() {
							ymwapJs.listThree(".ymw-list-three"), resizeSwpH(e)
						}, 2e3)
					},
					error: function() {
						navigator.userAgent.indexOf("UCBrowser") > -1 && alert("请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果"), console.log("错误")
					}
				})
			}
			$wapSMBtn = $(".wapSearchButton"), $wapSMBtn.on("touchend", t)
		},
		waploadmoreFunc: function() {
			function t(a) {
				a.preventDefault();
				var e = $(this),
					n = (e.attr("data-txt"), $(this).closest(".wapList")),
					i = n.attr("templateKey"),
					r = parseInt(n.attr("data-page")) + 1,
					s = n.attr("data-nodeId"),
					o = n.find("li").eq(-1).attr("data-id"),
					c = n.attr("nodes"),
					d = {
						type: "getwaplabelpage",
						isCache: !0,
						cacheTime: 60,
						templatekey: i,
						id: o,
						nodeId: s,
						page: r,
						nodes: c
					};
				return $.ajax({
					type: "GET",
					url: "//db2.gamersky.com/LabelJsonpAjax.aspx",
					data: {
						jsondata: JSON2.stringify(d)
					},
					dataType: "jsonp",
					beforeSend: function() {
						e.addClass("ymw-more-loading").find("span").html("正在加载"), e.off()
					},
					success: function(t) {
						n.attr("data-page", r), t.body.indexOf("没有任何记录") > 0 ? e.attr("data-txt", "全部加载完成") : ($(t.body).insertBefore(e), ymwapDataJs.getUserScore())
					},
					complete: function() {
						e.removeClass("ymw-more-loading"), e.find("span").html(e.attr("data-txt")), ymwapDataJs.getCmnums();
						var a = e.closest(".swiper-slide").height() + "px";
						e.closest(".swiper-wrapper").css("height", a), e.on("touchend", t)
					},
					error: function() {
						navigator.userAgent.indexOf("UCBrowser") > -1 && alert("请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果")
					}
				}), !1
			}
			$ymwLdMoreBtn = $(".wapDataButton"), $ymwLdMoreBtn.on("click", t)
		},
		waploadmoreAFunc: function() {
			function t(a) {
				a.preventDefault();
				var e = $(this),
					n = (e.attr("data-txt"), $(this).closest(".wapListA")),
					i = n.attr("templateKey"),
					r = parseInt(n.attr("data-page")) + 1,
					s = n.attr("data-nodeId"),
					o = n.find("li").eq(-2).find("a").eq(-1).attr("data-id"),
					c = n.attr("nodes"),
					d = {
						type: "getwaplabelp
age",
						isCache: !0,
						cacheTime: 60,
						templatekey: i,
						id: o,
						nodeId: s,
						page: r,
						nodes: c
					};
				return $.ajax({
					type: "GET",
					url: "//db2.gamersky.com/LabelJsonpAjax.aspx",
					data: {
						jsondata: JSON2.stringify(d)
					},
					dataType: "jsonp",
					beforeSend: function() {
						e.addClass("ymw-more-loading").find("span").html("正在加载"), e.off()
					},
					success: function(t) {
						n.attr("data-page", r), t.body.indexOf("没有任何记录") > 0 ? e.attr("data-txt", "全部加载完成") : ($(t.body).insertBefore(e.prev()), e.prev().remove())
					},
					complete: function() {
						e.removeClass("ymw-more-loading"), e.find("span").html(e.attr("data-txt")), e.on("touchend", t), ymwapJs.listThree(".ymw-list-three"), resizeSwpH(e), isImgLoad($(this).closest(".wapListA").find("img"), function() {
							ymwapJs.listThree(".ymw-list-three"), resizeSwpH(e)
						}), setTimeout(function() {
							ymwapJs.listThree(".ymw-list-three"), resizeSwpH(e)
						}, 2e3)
					},
					error: function() {
						navigator.userAgent.indexOf("UCBrowser") > -1 && alert("请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果")
					}
				}), !1
			}
			$ymwLdMoreBtn = $(".wapDataButtonA"), $ymwLdMoreBtn.on("touchend", t)
		},
		waploadmoreDHFunc: function() {
			function t(a) {
				a.preventDefault();
				var e = $(this),
					n = (e.attr("data-txt"), $(this).closest(".wapList")),
					i = (n.attr("templateKey"), parseInt(n.attr("data-page")) + 1),
					r = (n.attr("data-nodeId"), n.find("li").eq(-1).attr("data-id"), n.attr("nodes"), '{PE.Label id="获取Wap动画列表" page="' + i + '" size="20" type="red" /}'),
					s = {
						isCache: !1,
						cacheTime: 0,
						templateKey: "",
						templata: r
					};
				return $.ajax({
					type: "GET",
					url: "//db2.gamersky.com/WapAjax.aspx",
					data: {
						json: JSON2.stringify(s),
						jsondata: "putlabelbody"
					},
					dataType: "jsonp",
					beforeSend: function() {
						e.addClass("ymw-more-loading").find("span").html("正在加载"), e.off()
					},
					success: function(t) {
						n.attr("data-page", i), t.body.indexOf("没有任何记录") > 0 ? e.attr("data-txt", "全部加载完成") : $(t.body).insertBefore(e)
					},
					complete: function() {
						e.removeClass("ymw-more-loading"), e.find("span").html(e.attr("data-txt")), ymwapDataJs.getCmnums(), e.on("touchend", t), resizeSwpH(n)
					},
					error: function() {
						navigator.userAgent.indexOf("UCBrowser") > -1 && alert("请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果")
					}
				}), !1
			}
			$ymwLdMoreBtn = $(".wapDataButtonDH"), $ymwLdMoreBtn.on("touchend", t)
		},
		wapConMoreFunc: function() {
			function t(a) {
				a.preventDefault();
				var e = $(this),
					n = (e.attr("data-txt"), $(this).closest(".wapList")),
					i = n.attr("templateKey"),
					r = parseInt(n.attr("data-page")) + 1,
					s = (n.attr("data-nodeId"), e.attr("data-generalid")),
					o = {
						isCache: !1,
						cacheTime: 0,
						templateKey: i,
						id: s,
						page: r
					};
				return $.ajax({
					type: "GET",
					url: "//db2.gamersky.com/TemplateJsonp.aspx",
					data: {
						jsondata: JSON2.stringify(o)
					},
					dataType: "jsonp",
					beforeSend: function() {
						e.addClass("ymw-more-loading").find("span").html("正在加载"), e.off()
					},
					success: function(t) {
						(t.status = "ok") && (n.attr("data-page", r), r >= t.totalPages ? (e.attr("data-txt", "全部加载完成"), r == t.totalPages && $(t.body).insertAfter(n.find("li").last())) : $(t.body).insertAfter(n.find("li").last()))
					},
					complete: function() {
						e.removeClass("ymw-more-loading"), e.find("span").html(e.attr("data-txt")), ymwapDataJs.getCmnums(), e.on("touchend", t), resizeSwpH(n)
					},
					error: function() {
						navigator.userAgent.indexOf("UCBrowser") > -1 && alert("请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果")
					}
				}), !1
			}
			$ymwLdMoreBtn = $(".wapContentButton"), $ymwLdMoreBtn.on("touchend", t)
		},
		tagldmoreFunc: function() {
			function t(a) {
				a.preventDefault();
				var e = $(this),
					n = (e.attr("data-txt"), e.parent().find(".wapList")),
					i = n.attr("data-dataurl"),
					r = n.attr("data-pagesize"),
					s = n.attr("data-type"),
					o = n.attr("data-sort"),
					c = parseInt(n.attr("data-page")) + 1,
					d = parseInt(n.attr("date-totalpage"));
				$.ajax({
					type: "GET",
					url: i,
					dataType: "html",
					data: {
						page: c,
						pageSize: r,
						type: s,
						sort: o
					},
					beforeSend: function() {
						e.addClass("ymw-more-loading").find("span").html("正在加载"), e.off()
					},
					success: function(t) {
						n.attr("data-page", c), d < c ? e.attr("data-txt", "全部加载完成") : d == c ? (e.attr("data-txt", "全部加载完成"), n.append(t), ymwapDataJs.getCmnums()) : (n.append(t), ymwapDataJs.getCmnums())
					},
					complete: function() {
						e.removeClass("ymw-more-loading"), e.find("span").html(e.attr("data-txt")), e.on("touchend", t), ymwapJs.doJs($(".ymw-list-three"), ymwapJs.listThree(".ymw-list-three")), resizeSwpH(n)
					},
					error: function() {
						navigator.userAgent.indexOf("UCBrowser") > -1 && alert("请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果"), console.log("错误")
					}
				})
			}
			$wapTagBtn = $(".wapTagButton"), $wapTagBtn.on("touchend", t)
		},
		getUserScore: function() {
			$(".ymwUserScoreShow").each(function() {
				var t = $(this),
					a = t.attr("data-generalId");
				$.ajax({
					type: "GET",
					dataType: "jsonp",
					url: "//i.gamersky.com/apirating/init",
					data: {
						generalId: a,
						ratingType: 0,
						Action: "init"
					},
					success: function(a) {
						if (a.hasOwnProperty("status")) switch (a.status) {
						case "err":
							console.log("提交" + tips + "错误！");
							break;
						case "existuser":
						case "existip":
							console.log("已" + tips + "！")
						} else {
							var e = Math.floor(a.Average);
							t.addClass("ymw-star" + e).html("<span>(" + a.Times + "人参与)</span>")
						}
					}
				})
			})
		}
	};
ymwapJs.htmlAndroidiOs(), ymwapJs.doJs($("#ymwHeaderSwp"), ymwapJs.indexNavNew), ymwapJs.doJs($("#gsGlList"), ymwapJs.gsListFunc), ymwapJs.doJs($(".ymw-meun"), ymwapJs.hMeun), ymwapJs.doJs($(".ymwSlider"), ymwapJs.sliderFun), ymwapJs.doJs($(".ymwScroImg"), ymwapJs.scrollImgFun), ymwapJs.doJs($(".ymw-list-three"), ymwapJs.listThree(".ymw-list-three")), ymwapJs.doJs($(".ymwTab"), ymwapJs.tabFun), ymwapJs.doJs($(".ymwTabNavFixed"), ymwapJs.fixTabNav), ymwapJs.doJs($(".ymwSxbtn"), ymwapJs.sxFun), ymwapJs.doJs($(".ymwJtImg"), ymwapJs.jtFunc), ymwapJs.doJs($(".ymw-autoHide"), ymwapJs.zkFunc), ymwapJs.doJs($(".ymw-pf-btn"), ymwapJs.pfFunc), ymwapJs.doJs($(".ymw-juji"), ymwapJs.dhsets), ymwapJs.doJs($(".ymw-glal-list-2017"), ymwapJs.glFunc), ymwapJs.doJs($(".ymwsRespage"), ymwapJs.searchPageFunc), ymwapJs.doJs($(".ymwSyLink"), ymwapJs.SyLinkFun), ymwapJs.doJs($(".ymwPzData"), ymwapJs.ymwPzDataFun), ymwapJs.doJs($(".ymwListJx"), ymwapJs.ymwListJxFunc), ymwapJs.doJs($(".ymwListZone"), ymwapJs.ymwListZoneFunc), ymwapJs.doJs($(".ymsSyDlStarsWrap"), ymwapJs.ymwsyScoreFun), ymwapJs.doJs($("#ymwZpAreaStar"), ymwapJs.zpFunc), ymwapJs.doJs($(".ymw-article-nav-in"), ymwapJs.articleNav), ymwapJs.doJs($("#gsSCM"), ymwapJs.gsSCMfunc), ymwapJs.doJs($(".newsloadmore"), ymwapDataJs.newsloadmoreFunc), ymwapJs.doJs($(".ymwListMore"), ymwapDataJs.ymwListMoreFun), ymwapJs.doJs($(".specialmore"), ymwapDataJs.ymwSpecialmoreFun), ymwapJs.doJs($(".kulistloadmore"), ymwapDataJs.ymwKulistloadmoreFun), ymwapJs.doJs($(".glnewmore"), ymwapDataJs.ymwNewglldmoreFun), ymwapJs.doJs($("#ymwSearchIn"), ymwapDataJs.searchFun), ymwapJs.doJs($(".wapSearchButton"), ymwapDataJs.wapSearchMoreFunc), ymwapJs.doJs($(".wapDataButton"), ymwapDataJs.waploadmoreFunc), ymwapJs.doJs($(".wapDataButtonA"), ymwapDataJs.waploadmoreAFunc), ymwapJs.doJs($(".wapDataButtonDH"), ymwapDataJs.waploadmoreDHFunc), ymwapJs.doJs($(".wapContentButton"), ymwapDataJs.wapConMoreFunc), ymwapJs.doJs($(".wapTagButton"), ymwapDataJs.tagldmoreFunc), ymwapJs.doJs($(".ymwUserScoreShow"), ymwapDataJs.getUserScore), ymwapJs.getHotsCount(), $(window).resize(function() {
	ymwapJs.doJs($(".ymw-list-three"), ymwapJs.listThree(".ymw-list-three")), ymwapJs.doJs($(".ymwSxbtn"), ymwapJs.sxFun), ymwapJs.doJs($(".ymwJtImg"), ymwapJs.jtFunc), ymwapJs.doJs($(".ymwsRespage"), ymwapJs.searchPageFunc), ymwapJs.doJs($("#ymsSyDlStarsWrap"), ymwapJs.ymwsyScoreFun)
}), ymwapJs.qukTo();
var t_img, isLoad = !0;
$(".playArea").length > 0 && $(".ymw-congame-dh-con").length < 1 && resizeVD(), $(".ymw-rel-infos").find("iframe").length > 0 && $(window).resize(function() {
	var t = $(window).width() - 28,
		a = 9 * t / 16;
	$(".ymw-rel-infos").find("iframe").css({
		width: t + "px",
		height: a + "px"
	})
}), function() {
	$("#loading").length > 0 && loadingFun()
}();