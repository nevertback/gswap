/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    function converted(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            return config.json ? JSON.parse(s) : s;
        } catch (er) { }
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        var result = key ? undefined : {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = decode(parts.join('='));

            if (key && key === name) {
                result = converted(cookie);
                break;
            }

            if (!key) {
                result[name] = converted(cookie);
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== undefined) {
            // Must not alter options, thus extending a fresh object...
            $.cookie(key, '', $.extend({}, options, { expires: -1 }));
            return true;
        }
        return false;
    };

}));
(function () {
   
    var _getScript = function (url, callback) {
        var head = document.getElementsByTagName('head')[0],
            js = document.createElement('script');

        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', url);

        head.appendChild(js);

        //执行回调
        var callbackFn = function () {
            if (typeof callback === 'function') {
                callback();
            }
        };

        if (document.all) { //IE
            js.onreadystatechange = function () {
                if (js.readyState == 'loaded' || js.readyState == 'complete') {
                    callbackFn();
                }
            }
        } else {
            js.onload = function () {
                callbackFn();
            }
        }
    }
    if (jQuery) {
        $.getScript = _getScript;
    }

})();
/*
    http://www.JSON.org/json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.



var JSON2;
if (!JSON2) {
    JSON2 = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON2.stringify !== 'function') {
        JSON2.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON2.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON2.parse !== 'function') {
        JSON2.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON2.parse');
        };
    }
}());

/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;
// jQuery.cookie plugin
// 
// Copyright (c) 2010, 2012 
// @author Klaus Hartl (stilbuero.de)
// @author Daniel Lacy (daniellacy.com)
// 
// Dual licensed under the MIT and GPL licenses:
// http://www.opensource.org/licenses/mit-license.php
// http://www.gnu.org/licenses/gpl.html
 (function ($) {
    $.extend($.fn, {
        cookie: function (key, value, options) {
            var days, time, result, decode

            // A key and value were given. Set cookie.
            if (arguments.length > 1 && String(value) !== "[object Object]") {
                // Enforce object
                options = $.extend({}, options)

                if (value === null || value === undefined) options.expires = -1

                if (typeof options.expires === 'number') {
                    days = (options.expires * 24 * 60 * 60 * 1000)
                    time = options.expires = new Date()

                    time.setTime(time.getTime() + days)
                }

                value = String(value)

                return (document.cookie = [
                    encodeURIComponent(key), '=',
                    options.raw ? value : encodeURIComponent(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '',
                    options.path ? '; path=' + options.path : '',
                    options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                ].join(''))
            }

            // Key and possibly options given, get cookie
            options = value || {}

            decode = options.raw ? function (s) { return s } : decodeURIComponent

            return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null
        }

    })
})(jQuery);

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
                    url: "http://click.gamersky.com/Common/GetHits.aspx",
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
                    url: "http://db4.gamersky.com/Common/ShowDownloadUrlJsonp.aspx",
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
(function ($) {

    Number.prototype.toFixed = function (d) {
        var s = this + "";
        if (!d) d = 0;
        if (s.indexOf(".") == -1) s += ".";
        s += new Array(d + 1).join("0");
        if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
            var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
            if (a == d + 2) {
                a = s.match(/\d/g);
                if (parseInt(a[a.length - 1]) > 4) {
                    for (var i = a.length - 2; i >= 0; i--) {
                        a[i] = parseInt(a[i]) + 1;
                        if (a[i] == 10) {
                            a[i] = 0;
                            b = i != 1;
                        } else break;
                    }
                }
                s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");

            } if (b) s = s.substr(1);
            return (pm + s).replace(/\.$/, "");
        } return this + "";

    };
    $.fn.KuScore = function (options) {
        return this.each(function () {
            var $this = $(this);
            $(".midL1_2").bind("selectstart", function () { return false; });	//禁止选中复制

            var cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-type");

            if ($.fn.cookie(cookieKey) !== undefined) {
                $this.unbind("mousemove");

                var kuScore = JSON2.parse($.fn.cookie(cookieKey));
                $(".S3_2").html(kuScore.Sorce);
                var scoreEle = parseInt(parseFloat(kuScore.Sorce) * 2) - 1;
                $this.find("ul").attr("class", "u" + String(scoreEle));
                var leftWidth = 0;
                $this.find("ul li").each(function (i) {
                    if (i <= scoreEle) {
                        if ((i & 1) != 0) {
                            leftWidth = leftWidth + 1;
                        }
                        leftWidth = leftWidth + $(this).width();
                    }
                });
                $this.find("span").css("left", leftWidth);
            }
            else {
                var vL = $this.offset().left + 1.5, vW = $this.width();
                $this.mousemove(function (event) {
                    var Le = event.pageX - vL, inde = $this.find("ul li").index();
                    if (Le >= 0 && Le <= vW - 13) {
                        $this.find("span").css("left", Le);
                        if (Le <= 0) { $(".S3_2").html("0.0"); $this.find("ul").attr("class", ""); }
                        var LL = 0, j = 0, htm = "";
                        for (var i = 0; i <= inde; i++) {
                            LL = (i & 1) != 0 ? LL + 7 : LL + 6;
                            j = j + 0.5;
                            htm = String(j).length == 1 ? j.toFixed(1) : j;
                            if (Le > LL - ((i & 1) != 0 ? 7 : 6) && Le <= LL) { $(".S3_2").html(htm); $this.attr("data-sorce", htm); $this.find("ul").attr("class", "u" + i); }
                        }
                    }
                });
            }
        });
    };
    $.fn.Rating = function (options) {
        return this.each(function () {
            var $this = $(this);
            var tips = $this.attr("data-tips");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/init",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingType': $this.attr("data-type"), 'Action': "init" },
                success: function (data) {
                    if (data.hasOwnProperty("status")) {
                        switch (data.status) {
                            case "err":
                                alert("提交" + tips + "错误！");
                                break;
                            case "existuser":
                            case "existip":
                                alert("已" + tips + "！");
                                break;
                            default:

                                break;
                        }
                    }
                    else {
                        $("#" + $this.attr("data-totleId")).html(data.Times);
                        $("#" + $this.attr("data-avgscore")).html(data.Average == 10 ? "10" : data.Average.toFixed(1));
                    }

                }
            });
            $this.click(function (event) {
                event.preventDefault();
                $(".S31_2").unbind("mousemove");
                var cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-type");

                if ($this.is('[data-group]')) {
                    cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-group");
                }
                if ($.fn.cookie(cookieKey) !== undefined && $.fn.cookie(cookieKey) !== null) {
                    alert("已" + tips + "！");
                    return;
                }

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://i.gamersky.com/apirating/rating",
                    data: { 'Rating': JSON2.stringify({ "GenneralId": $this.attr("data-generalId"), 'Sorce': $this.attr("data-sorce"), 'Type': $this.attr("data-type") }), 'Action': "rating" },
                    success: function (data) {
                        if (data.hasOwnProperty("status")) {
                            switch (data.status) {
                                case "err":
                                    alert("提交" + tips + "错误！");
                                    break;
                                case "existuser":
                                case "existip":
                                    alert("已" + tips + "！");
                                    break;
                                default:

                                    break;
                            }
                        }
                        else {
                            $("#" + $this.attr("data-totleId")).html(data.Times);
                            $("#" + $this.attr("data-avgscore")).html(data.Average == 10 ? "10" : data.Average.toFixed(1));

                            $.fn.cookie(cookieKey, JSON2.stringify({ "GenneralId": $this.attr("data-generalId"), 'Sorce': $this.attr("data-sorce"), 'Type': $this.attr("data-type") }), { path: "/", expires: 365 });

                            $(".S31_2").KuScore();

                        }
                    }
                });

            });
        });
    };
    $.fn.DhRating = function (options) {
        return this.each(function () {
            var $this = $(this);
            var tips = $this.attr("data-tips");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/init",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingType': $this.attr("data-type"), 'Action': "init" },
                success: function (data) {
                    if (data.hasOwnProperty("status")) {
                        switch (data.status) {
                            case "err":
                                alert("提交" + tips + "错误！");
                                break;
                            case "existuser":
                            case "existip":
                                alert("已" + tips + "！");
                                break;
                            default:

                                break;
                        }
                    }
                    else {
                        $("#" + $this.attr("data-totleId")).html(data.Times);
                        $("#" + $this.attr("data-avgscore")).html(data.Average == "" + 10 ? "10" : ""+data.Average.toFixed(1));
                    }

                }
            });
            $this.click(function (event) {
                event.preventDefault();
                $(".S31_2").unbind("mousemove");
                var cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-type");

                if ($this.is('[data-group]')) {
                    cookieKey = "R" + $this.attr("data-generalId") + "-" + $this.attr("data-group");
                }
                if ($.fn.cookie(cookieKey) !== undefined && $.fn.cookie(cookieKey) !== null) {
                    alert("已" + tips + "！");
                    return;
                }

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://i.gamersky.com/apirating/rating",
                    data: { 'Rating': JSON2.stringify({ "GenneralId": $this.attr("data-generalId"), 'Sorce': $this.attr("data-sorce"), 'Type': $this.attr("data-type") }), 'Action': "rating" },
                    success: function (data) {
                        if (data.hasOwnProperty("status")) {
                            switch (data.status) {
                                case "err":
                                    alert("提交" + tips + "错误！");
                                    break;
                                case "existuser":
                                case "existip":
                                    alert("已" + tips + "！");
                                    break;
                                default:

                                    break;
                            }
                        }
                        else {
                            $("#" + $this.attr("data-totleId")).html(data.Times);
                            $("#" + $this.attr("data-avgscore")).html(data.Average == 10 ? "10" : data.Average.toFixed(1));

                            $.fn.cookie(cookieKey, JSON2.stringify({ "GenneralId": $this.attr("data-generalId"), 'Sorce': $this.attr("data-sorce"), 'Type': $this.attr("data-type") }), { path: "/", expires: 365 });

                            $(".S31_2").KuScore();

                        }
                    }
                });

            });
        });
    };
    $.fn.RatingGamersky = function (options) {
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/grade",
                data: { 'generalId': $this.attr("data-generalId"), 'Action': "grade" },
                success: function (data) {
                    if (data.EditorRating != "" && data.RatingUrl != "") {
                        var html = " <a href='" + data.RatingUrl + "'  target='_blank'><div class='PFl_num S1_2'>" + data.EditorRating + "</div></a>";
                        $this.append(html);
                    }
                    else {
                        var html = "<div class='PFl_num S1_2'>--</div>";
                        $this.append(html);
                    }

                }
            });


        });
    };
    $.fn.RatingGroup = function (options) {
        return this.each(function () {
            var $this = $(this);
            var tips = $this.attr("data-tips");
            var number1 = $(".ratingGroupAction").length;
            var types = "";
            var toteid = "";
            for (var c = 0; c < number1; c++) {
                types += $(".ratingGroupAction").eq(c).attr("data-type") + ",";
            }
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/initgroup",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingGroupType': types, 'Action': "initGroup" },
                success: function (data) {
                    if (data.hasOwnProperty("status")) {
                        switch (data.status) {
                            case "err":
                                alert("提交" + tips + "错误！");
                                break;
                            case "existuser":
                            case "existip":
                                alert("已" + tips + "！");
                                break;
                            default:

                                break;
                        }
                    }
                    else {
                        $(".ratingGroupAction").each(function () {
                            var hasType = false;
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].Type == $(this).attr("data-type")) {
                                    var totleid = $(this).attr("data-totleid");
                                    $("#" + totleid).html(data[i].Times);
                                    hasType = true;
                                }
                            }

                            if (!hasType) {
                                var totleid = $(this).attr("data-totleid");
                                $("#" + totleid).html(0);
                            }
                        });

                        var like = $("#like").html();
                        var unlike = $("#unlike").html();
                        var sorce = Math.round((eval(like) / (eval(like) + eval(unlike))) * 100);
                        var btnWidth = $(".btn12").width();
                        if (isNaN(sorce)) {
                            $(".btn12").attr("style", "margin-left:-"+btnWidth/2+"px;");
                            $(".ZSr_m").attr("style", "background-position:-74px  0;");
                            $("#Sorce").html(0);
                        }
                        else {
                            $(".btn12").attr("style", "margin-left:" + Math.round(-btnWidth / 2 - (btnWidth / 2 - btnWidth * sorce / 100)) + "px;");
                            $(".ZSr_m").attr("style", "background-position:" + Math.round(-74 - (74 - 148 * sorce / 100)) + "px 0;");
                            $("#Sorce").html(sorce);
                        }
                    }
                }
            });


            $this.find(".ratingGroupAction").click(function (event) {
                event.preventDefault();
                var $thisAction = $(this);
                $(".S31_2").unbind("mousemove");
                var cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-type");

                if ($thisAction.is('[data-group]')) {
                    cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-group");
                }
                if ($.fn.cookie(cookieKey) !== undefined && $.fn.cookie(cookieKey) !== null) {
                    alert("已" + tips + "！");
                    return;
                }

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://i.gamersky.com/apirating/rating",
                    data: { 'Rating': JSON2.stringify({ "GenneralId": $thisAction.attr("data-generalId"), 'Sorce': $thisAction.attr("data-sorce"), 'Type': $thisAction.attr("data-type") }), 'Action': "rating" },
                    success: function (data) {
                        if (data.hasOwnProperty("status")) {
                            switch (data.status) {
                                case "err":
                                    alert("提交" + tips + "错误！");
                                    break;
                                case "existuser":
                                case "existip":
                                    alert("已" + tips + "！");
                                    break;
                                default:

                                    break;
                            }
                        }
                        else {

                            $("#" + $thisAction.attr("data-totleId")).html(data.Times);
                            var like = $("#like").html();
                            var unlike = $("#unlike").html();
                            var sorce = Math.round((eval(like) / (eval(like) + eval(unlike))) * 100);
                            var btnWidth = $(".btn12").width();
                            if (isNaN(sorce)) {
                                $(".btn12").attr("style", "margin-left:-"+btnWidth+"px;");
                                $(".ZSr_m").attr("style", "background-position:-74px 0;");
                                $("#Sorce").html(0);
                            }
                            else {
                                $("#Sorce").html(sorce);
                                $(".ZSr_m").attr("style", "background-position:" + Math.round(-74 - (74 - 148 * sorce / 100)) + "px 0;");
                                $(".btn12").attr("style", "margin-left:" + Math.round(-btnWidth / 2 - (btnWidth / 2 - btnWidth * sorce / 100)) + "px;");
                            }
                            $("#" + $thisAction.attr("data-avgscore")).html(data.Average == 10 ? "10" : data.Average.toFixed(1));

                            $.fn.cookie(cookieKey, JSON2.stringify({ "GenneralId": $thisAction.attr("data-generalId"), 'Sorce': $thisAction.attr("data-sorce"), 'Type': $thisAction.attr("data-type") }), { path: "/", expires: 365 });

                            $(".S31_2").KuScore();

                        }
                    }
                });
            });


        });
    };
    $.fn.RatingGroupLike = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.find("li").each(function (i, element) {
                var $lithis = $(element);
                var generalid = $(element).attr("data-generalid");
                var types = $(element).attr("data-type");
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://i.gamersky.com/apirating/initgroup",
                    data: { 'generalId': generalid, 'ratingGroupType': types, 'Action': "initGroup" },
                    success: function (data) {
                        if (data.length = 1) {
                            $lithis.find("div a .huo").html(data[0].Times);
                        }
                    }
                });

            });
        });
    };
    $.fn.Ratingmore = function (options) {
        return this.each(function () {
            var $this = $(this);
            var gamerskyrating = $this.find(".gamerskyrating");//本站评分
            var userrating = $this.find(".userrating");//用户评分
            //用户评分
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/grade",
                data: { 'generalId': $this.attr("data-generalId"), 'Action': "grade" },
                success: function (data) {
                    if (data.EditorRating != "" && data.EditorRating != "0") {
                        $(gamerskyrating).html(data.EditorRating);
                    }
                    else {
                        $(gamerskyrating).html("--");
                    }
                }
            });
            //本站评分
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/init",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingType': $(userrating).attr("data-type"), 'Action': "init" },
                success: function (data) {
                    if (!data.hasOwnProperty("status")) {
                        $(userrating).html(data.Average == 10 ? "10" : data.Average.toFixed(1));
                    }
                }
            });
            //喜欢和不喜欢
            var number1 = $this.find(".ratingGroupAction").length;
            var types = "";
            var toteid = "";
            for (var c = 0; c < number1; c++) {
                types += $this.find(".ratingGroupAction").eq(c).attr("data-type") + ",";
            }
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/initgroup",
                data: { 'generalId': $this.attr("data-generalId"), 'ratingGroupType': types, 'Action': "initGroup" },
                success: function (data) {
                    if (!data.hasOwnProperty("status")) {
                        $(".ratingGroupAction").each(function () {
                            var hasType = false;
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].Type == $(this).attr("data-type")) {
                                    var totleid = $(this).attr("data-totleid");
                                    $this.find("#" + totleid).html(data[i].Times);
                                    hasType = true;
                                }
                            }

                            if (!hasType) {
                                var totleid = $(this).attr("data-totleid");
                                $this.find("#" + totleid).html(0);
                            }
                        });

                        var like = $this.find("#like").html();
                        var unlike = $this.find("#unlike").html();
                        var sorce = Math.round((eval(like) / (eval(like) + eval(unlike))) * 100);
                        var btnWidth = $(".jindu").width();
                        if (isNaN(sorce)) {
                            $this.find(".tiao").attr("style", "width:" + btnWidth / 2 + "px;");
                        }
                        else {
                            $this.find(".tiao").attr("style", "width:" + Math.round(btnWidth * sorce / 100) + "px;");
                        }
                    }
                }
            });
          
            $this.find(".ratingGroupAction").one('tap',function (event) {
                event.preventDefault();
                var $thisAction = $(this);
                var tips = $this.attr("data-tips");
                $(".S31_2").unbind("mousemove");
                var cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-type");

                if ($thisAction.is('[data-group]')) {
                    cookieKey = "R" + $thisAction.attr("data-generalId") + "-" + $thisAction.attr("data-group");
                }
                if ($.fn.cookie(cookieKey) !== undefined && $.fn.cookie(cookieKey) !== null) {
                    alert("已" + tips + "！");
                    return;
                }

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://i.gamersky.com/apirating/rating",
                    data: { 'Rating': JSON2.stringify({ "GenneralId": $thisAction.attr("data-generalId"), 'Sorce': $thisAction.attr("data-sorce"), 'Type': $thisAction.attr("data-type") }), 'Action': "rating" },
                    success: function (data) {
                        if (data.hasOwnProperty("status")) {
                            switch (data.status) {
                                case "err":
                                    alert("提交" + tips + "错误！");
                                    break;
                                case "existuser":
                                case "existip":
                                    alert("已" + tips + "！");
                                    break;
                                default:

                                    break;
                            }
                        }
                        else {
                            $this.find("#" + $thisAction.attr("data-totleId")).html(data.Times);
                            var like = $this.find("#like").html();
                            var unlike = $this.find("#unlike").html();
                            var sorce = Math.round((eval(like) / (eval(like) + eval(unlike))) * 100);
                            var btnWidth = $(".jindu").width();
                            if (isNaN(sorce)) {
                                $this.find(".tiao").attr("style", "width:" + btnWidth / 2 + "px;");
                            }
                            else {
                                $this.find(".tiao").attr("style", "width:" + Math.round(btnWidth * sorce / 100) + "px;");
                            }
                            $.fn.cookie(cookieKey, JSON2.stringify({ "GenneralId": $thisAction.attr("data-generalId"), 'Sorce': $thisAction.attr("data-sorce"), 'Type': $thisAction.attr("data-type") }), { path: "/", expires: 365 });

                        }
                    }
                });
            });
        });
    };
    $.fn.GamerskyUserPF = function (options) {
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://db5.gamersky.com/RatingJsonpAjax.aspx",
                data: { 'generalId': $this.attr("data-generalId"), 'Action': "grade" },
                success: function (data) {
                    if (data.EditorRating != "" && data.RatingUrl != "") {
                        $this.find('i').html(data.EditorRating);
                    }
                    else {
                        $this.find('i').html("--");
                    }
                }
            });


        });
    };
    $(document).ready(function () {
        $(".ratingGroup").RatingGroup();
        $(".ratingAction").Rating();
        $(".DhRatingAction").DhRating();
        $(".S31_2").KuScore();
        $("#gamerskyrating").RatingGamersky();
        $(".ratingGroupLike").RatingGroupLike();
        $(".ratingmore").Ratingmore();
        $("#gamerskypf").GamerskyUserPF();
    });
})(jQuery);

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
                loadJs("uploadify", "http://j.gamersky.com/Uploadify/jquery.uploadify.js", function () {
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
                                'uploader': 'http://up.gamersky.com/ReportUpload.php',
                                'auto': true,
                                'multi': false,
                                'buttonText': '选择',
                                'fileSizeLimit': '10MB',
                                'buttonImage': 'http://j.gamersky.com/Uploadify/select.jpg',
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
                                    url: 'http://db5.gamersky.com/CorrectReport.aspx',
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
                loadJs("uploadify", "http://j.gamersky.com/Uploadify/jquery.uploadify.js", function () {
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
                                'uploader': 'http://up.gamersky.com/ReportUpload.php',
                                'auto': true,
                                'multi': false,
                                'buttonText': '选择',
                                'fileSizeLimit': '10MB',
                                'buttonImage': 'http://j.gamersky.com/Uploadify/select.jpg',
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
                                    url: 'http://db5.gamersky.com/CorrectReport.aspx',
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
                    url: 'http://i.gamersky.com/api/addcollect',
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
(function ($) {
    $.fn.SoftGl = function (options) {
        return this.each(function () {
            var tableName = "PE_U_Soft";
            if ($("#jcjbContentData").attr("data-tableName") != null) {
                tableName = $("#jcjbContentData").attr("data-tableName");
            }
            var op = {
                GeneralId: $("#jcjbContentData").attr("data-generalId"),
                NodeId: $("#jcjbContentData").attr("data-nodeId"),
                Top: 8,
                TableName: tableName
            };

            $.ajax({
                type: "POST",
                url: "http://db2.gamersky.com/ContentAjaxNew.aspx",
                dataType: "jsonp",
                data: {
                    jsondata: JSON2.stringify({ type: "getcorrelation", GeneralId: op.GeneralId, NodeId: op.NodeId, Top: op.Top, TableName: op.TableName })
                },
                success: function (response) {
                    var data = response;
                    if (data == undefined || data.length <= 0) {
                        $("#softwenda").hide();
                    }
                    else {
                        for (var i = 0; i < data.length; i++) {
                            $("#softwenda").find(".wd").append('<li class="like"><a href="' + data[i].url + '" target="_blank">' + data[i].title + '</a></li>');
                        }
                    }
                }
            });
        });
    };
    $.fn.SoftCorrelation = function (options) {
        return this.each(function () {
            var $this = $(this);
            var location = options;
            var locationContt = $this.find(".contt").eq(location);
            var locationConttLength = locationContt.attr("value");//locationContt.find(".txt .like li").length;
            var isRemove = false;
            $this.find(".contt").each(function (index, element) {
                var conttlilength = $(element).find(".txt .like li").length;
                if (conttlilength <= 0) {
                    $(element).hide();
                    isRemove = true;
                    locationConttLength = parseInt(locationConttLength) + parseInt($(element).attr("value"));
                    locationContt.find(".tit").removeClass().addClass("tit tp" + locationConttLength);
                    locationContt.find(".txt").removeClass().addClass("txt th" + locationConttLength);
                    locationContt.find(".like").removeClass().addClass("like lh" + locationConttLength);
                }
            });
            var lastLength = parseInt(locationConttLength) - 1;
            if (location == 0) {
                $(".txtlist .tl_like.tr .contt:eq(0) .txt .like li:gt(" + lastLength + ")").remove();
            }
            else {
                $(".txtlist .tl_like.tl .contt:eq(1) .txt .like li:gt(" + lastLength + ")").remove();
            }
        });
    };
    $.fn.DownContentHot = function(options){
        return this.each(function(){
            var $this = $(this);
            var ganeralId = $this.attr("data-ganeralId");
            $.ajax({
                type: "POST",
                url: "http://db2.gamersky.com/ContentAjaxNew.aspx",
                dataType: "jsonp",
                data: {
                    jsondata: JSON2.stringify({ type: "getcontenthot", GeneralId:ganeralId})
                },
                success: function (response) {
                    var data = response;
                    if (data.status=="ok")
                     {
                        $this.html("&nbsp;"+data.body);
                     };
                }
            });
        })
    }

    $(document).ready(function () {
        $(".td_dl[itemprop='inContentHot']").DownContentHot();
        $("#softwenda").SoftGl();
        $(".txtlist .tl_like.tl").SoftCorrelation(1);
        $(".txtlist .tl_like.tr").SoftCorrelation(0);
    });
})(jQuery);
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

(function ($) {
    $.fn.cycm = function (options) {
        var cycm = "";
        $(".cy_comment").each(function () {
            if (cycm != "") {
                cycm = cycm + ","
            }
            cycm = cycm + $(this).attr("data-sid");
        });
        if (cycm != "") {
            $.ajax({
                type: "GET",
                url: "http://cm.gamersky.com/commentapi/count",
                dataType: "jsonp",
                data: {
                    topic_source_id: cycm
                },
                success: function (responseJson) {
                    $(".cy_comment").each(function () {
                        if (responseJson.result.hasOwnProperty($(this).attr("data-sid"))) {
                            var cmobj = responseJson.result[$(this).attr("data-sid")];
                            if (($(this).attr("data-isconret"))=="true")
                            {
                                $(this).text(cmobj.comments);
                            }
                            else {
                                $(this).text(cmobj.comments);
                            }
                           
                        }
                    });
                }
            });
        }
    };
    $.fn.ContentHit = function (options) {
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://click.gamersky.com/Common/GetHits.aspx",
                data: {
                    id: $this.attr("generalId"),
                    script: "3"
                },
                success: function (data) {
                    $this.html(data.hits+'°');
                }
            });
        });
    };

    $.fn.ContentWapHit = function (options) {
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://click.gamersky.com/Common/GetWapHits.aspx",
                data: {
                    id: $this.attr("generalId"), script:3,
                },
                success: function (data) {
                    $this.html(data.waphits);
                }
            });
        });
    };
    $.fn.GetHitShouYou = function () {
        var itemid = $(".yu-icon.yu-btn-android").attr("data-itemId");
        var fieldname = $(".yu-icon.yu-btn-android").attr("data-fieldname");
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://db5.gamersky.com/HitShouYou.aspx",
            data: { 'ID': itemid, 'fieldname': fieldname },
            success: function (data) {
                $(".wapandroid").html(data.body);
            }
        });
    };
    $.fn.GetHitSyIos = function () {
        var itemid = $(".yu-icon.yu-btn-ios").attr("data-itemId");
        var fieldname = $(".yu-icon.yu-btn-ios").attr("data-fieldname");
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://db5.gamersky.com/HitShouYou.aspx",
            data: { 'ID': itemid, 'fieldname': fieldname },
            success: function (data) {
                $(".Ios").html(data.body);
            }
        });
    } 
    $(document).ready(function () {      
        $(".cy_comment").cycm();
        $(".wapandroid").GetHitShouYou();
        $(".Ios").GetHitSyIos();
        $("#countn").ContentHit();
        $("#wapcountn").ContentWapHit();
        $("#SelectPage").change(function () {
            var url = window.location.href;
            var reg = /\.(shtml)/i;
            var suffix = ".html";
            if (reg.test(url)) {
                suffix=".shtml"
            }
            var id = $(".cy_comment").attr("data-sid");
            if ($("#SelectPage").val() == 1) {
                window.location.href = "Content-" + id + suffix;
            } else {
                window.location.href = "Content-" + id + "_" + $("#SelectPage").val() + suffix;
            }
        });
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        if (isAndroid == true) {
            $("#sy").attr("href", "/shouyou/android/");           
        }
        else {
            $("#sy").attr("href", "/shouyou/ios/");          
        }
        $(document).on("click", ".countHit,.countHitSql", function () {
            var $this = $(this);
            var judge = "false";
            if ($this.hasClass("countHitSql")) {
                judge = "true";
            }
            var hot = 'false';
            if ($this.attr("data-hot")) {
                hot = $this.attr("data-hot");
            }
            var fieldName = "";
            if ($this.attr("data-fieldName")) {
                fieldName = $this.attr("data-fieldName");
            }
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://click.gamersky.com/Common/GetHits.aspx",
                data: { id: $this.attr("data-itemid"), script: "3", hot: hot, fieldName: fieldName, judge: judge },
                success: function (data) { }
            });
        });
    }); 
})(jQuery);
var _config = {
    sso: {
        onlySSO: true
    },
    registerUrl: 'http://i.gamersky.com/user/register/',
    hide_face: 1,
    showFloorNum: 1
};
// JavaScript Document
///<reference path="/js/jquery-1.8.3.js"/>
///<reference path="00.swfobject.js"/>
///<reference path="00.jquery.cookie.js"/>
///<reference path="00.json2.js"/>
///<reference path="01.video.js"/>
(function ($) {
    var labelJsonpUrl = "http://db5.gamersky.com/LabelJsonpAjax.aspx";
    $.fn.supportMeInit = function (options) {
        return this.each(function () {        
            var $this = $(this);
            var itemId=parseInt($this.attr("data-itemId"));
            var field= $this.attr("data-field");           
            var isSupport = false;
            var tableName = $this.attr("data-table");
            if (!tableName) {
                tableName = 'PE_U_Video';
            }
            if ($.fn.cookie("GamerSkySupport" + itemId)) {
                isSupport = true;
            }

            var jsondata = {
                type: "updatelabel", labelname: "读取支持反对率", attr: {
                    itemId: itemId,
                    field: field,
                    tableName: tableName
                }
            };
            $.ajax({
                type: "GET",
                url: labelJsonpUrl,
                dataType: "jsonp",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                success: function (responseJson) {
                    if ($this.find("span").length > 0) {
                        $this.find("span").text(responseJson.body);
                    } else {
                        $this.text(responseJson.body);
                    }
                }
            });
        })
    };  
    $.fn.supportMe = function (options)  {       
        return this.each(function () {
            var $this = $(this);
            var itemId = parseInt($this.attr("data-itemId"));
            var field = $this.attr("data-field");
            var tableName = $this.attr("data-table");
            if (!tableName) {
                tableName = 'PE_U_Video';
            }
            var autoUpdate = $this.attr("data-auto");
            if (autoUpdate && autoUpdate == 'true') {
                var jsondata = {
                    type: "updatelabel", labelname: "Digg统计", attr: {
                        itemId:itemId,
                        field: field,
                        tableName: tableName
                    }
                };
                $.ajax({
                    type: "GET",
                    url: labelJsonpUrl,
                    dataType: "jsonp",
                    data: {
                        jsondata: JSON2.stringify(jsondata)
                    },
                    success: function (responseJson) {
                    }
                });
            }
            $this.click(function () {
                var isSupport = false;
                if ($.fn.cookie("GamerSkySupport" + itemId)) {
                    isSupport = true;
                }
                if (isSupport) {
                    alert("已投票！");
                    return false;
                }
                $.fn.cookie("GamerSkySupport" + itemId, 1, { path: "/" });
                var jsondata = {
                    type: "updatelabel", labelname: "Digg统计", attr: {
                        itemId: itemId,
                        field: field,
                        tableName: tableName
                    }
                };
                $.ajax({
                    type: "GET",
                    url: labelJsonpUrl,
                    dataType: "jsonp",
                    data: {
                        jsondata: JSON2.stringify(jsondata)
                    },
                    success: function (responseJson) {
                        $this.supportMeInit();
                    }
                });
                return false;
            });
            $this.supportMeInit();          
        });    
    }
    $(document).ready(function () {
        $("a.supportMe").supportMe();
    });
})(jQuery);
///<reference path="/js/jquery-1.8.3.js"/>
///<reference path="00.swfobject.js"/>
///<reference path="01.video.js"/>

(function ($) {
    var labelJsonpUrl = "http://db5.gamersky.com/LabelJsonpAjax.aspx";

    function isMobile() {
        var sUserAgent = navigator.userAgent.toLowerCase(),
        bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
        bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
        bIsMidp = sUserAgent.match(/midp/i) == "midp",
        bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
        bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
        bIsAndroid = sUserAgent.match(/android/i) == "android",
        bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
        bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile",
        bIsWebview = sUserAgent.match(/webview/i) == "webview";
        return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
    }
    $.fn.GamerSkyPlayer = function (options) {
        var config = {
            'height': '100%',
            'width': '100%',
            'videoSource': '.ymwQhYuanBtn'
        };

        if (options) { $.extend(config, options); }
        return this.each(function () {
            $(config.videoSource).on('touchend', function (event) {
                var $this = $(this);
                $this.siblings().removeClass('current');
                $this.addClass('current');
                var site_name = $(this).attr("data-sitename");
                var vid = $(this).attr("data-vid");
                var source = $(this).attr("data-source");
                if (!source) {
                    source = "";
                }
                var flashvars = "";
                var play_url = "";
                var iframe = false;
                var iframeUrl = "";
                switch (site_name) {
                    case 'youku':
                        play_url = 'http://static.youku.com/v1.0.0222/v/swf/player.swf?VideoIDS=' + vid;
                        flashvars += '&isShowRelatedVideo=false&amp;showAd=0&amp;show_pre=1&amp;show_next=1&amp;VideoIDS=' + vid + '&amp;isAutoPlay=true&amp;isDebug=false&amp;UserID=&amp;winType=interior&amp;playMovie=true&amp;RecordCode=1001,1002,1003,1004,1005,1006,2001,3001,3002,3003,3004,3005,3007,3008,9999';
                        iframe = true;
                        iframeUrl = "http://player.youku.com/embed/" + vid;
                        break;
                    case 'tudou':
                        var digit_regex = /^\d+$/;
                        flashvars = 'tvcCode=-1&hd=2';
                        play_url = 'http://tudou.com/v/' + vid + '/&autoPlay=true';

                        if (vid.indexOf("code:") >= 0) {
                            if ($.browser.msie) {
                                if ($.browser.version == "6.0" || $.browser.version == "7.0" || $.browser.version == "8.0" || $.browser.version == "9.0") {
                                    play_url = 'http://tudou.com/v/' + vid.replace("code:", "") + '/&autoPlay=true';
                                }
                                else {
                                    iframe = true;
                                    iframeUrl = "http://www.tudou.com/programs/view/html5embed.action?code=" + vid.replace("code:", "") + "&autoPlay=true";
                                }
                            }
                            else {
                                iframe = true;
                                iframeUrl = "http://www.tudou.com/programs/view/html5embed.action?code=" + vid.replace("code:", "") + "&autoPlay=true";
                            }
                        }
                        break;
                    case 'tudou2':
                        flashvars = 'tvcCode=-1&hd=2';
                        play_url = 'http://js.tudouui.com/bin/lingtong/PortalPlayer_60.swf?tvcCode=-1&hd=2&iid=' + vid;
                        break;
                    case 'ku6':
                        play_url = "http://player.ku6cdn.com/default/out/pv201109151705.swf?ver=108&vid=" + vid + "&type=v&referer=";
                        break;
                    case 'sina':
                        play_url = "http://p.you.video.sina.com.cn/swf/bokePlayer20130723_V4_1_42_21.swf?vid=" + vid + "&clip_id=&imgurl=&auto=1&vblog=1&type=0&tabad=1&autoLoad=1&autoPlay=1&as=0&tjAD=0&tj=0&casualPlay=1&head=0&logo=0&share=0";
                        break;
                    case 'qq':
                        play_url = 'http://mat1.qq.com/news/act3/js/QQPlayer3.swf?vid=' + vid + '&skin=http://mat1.qq.com/news/act3/js/skins/QQPlayerSkin.swf&autoplay=1'
                        break;
                    case 'qq2':
                        play_url = 'http://imgcache.qq.com/tencentvideo_v1/player/TencentPlayer.swf?_v=20110829&vid=' + vid + '&autoplay=1';
                        break;
                    case 'pptv':
                        play_url = (vid.length > 13) ? 'http://player.pptv.com/v/' + vid + '.swf' : 'http://player.pptv.com/cid/' + vid + '.swf';
                        break;
                    case 'sohu':
                    case 'sohuvid':
                        play_url = 'http://share.vrs.sohu.com/' + vid + '/v.swf&skinNum=1&topBar=0&showRecommend=0&autoplay=true&api_key=e68e42f2beae6ba9ad6bd25e2653632f&fbarad=';
                        break;
                    case 'sohuid':
                        play_url = 'http://share.vrs.sohu.com/my/v.swf&topBar=1&id=' + vid + '&autoplay=true&from=page';
                        break;
                    case 'letv':
                        play_url = 'http://i7.imgs.letv.com/player/swfPlayer.swf?id=' + vid + '&autoplay=1&isPlayerAd=0';
                        break;
                    case 'letv1':
                        play_url = vid.replace(/&width=\d+/g, "").replace(/&height=\d+/g, "");
                        iframe = true;
                        iframeUrl = play_url + "&width=" + config.width + "&height=" + config.height;
                    case 'qingkong':
                        play_url = 'http://donghua.dmzj.com/flvplayer.swf?file=http://v.qingkong.net/bp/a.php/' + vid + '.mp4&autostart=true';
                        break;
                    case 'cntv':
                        play_url = 'http://player.cntv.cn/standard/cntvOutSidePlayer.swf?videoId=VIDE100165778382&videoCenterId=' + vid;
                        break;
                    case '56':
                        play_url = 'http://player.56.com/v_' + vid + '.swf/1030_ycc20060631.swf';
                        break;
                    case 'iqiyi':
                        play_url = vid.replace("&coop=测试&cid=", "") + "&cid=qc_105082_300395&bd=1&autoplay=1&coop=coop_1010_ymxk" + "&source=" + source;
                        iframe = true;
                        iframeUrl = play_url;
                        break;
                    case '17173':
                        //play_url = 'http://f.v.17173cdn.com/flash/PreloaderFileFirstpage.swf?cid=' + vid + "&autoplay=1"; 
                        play_url = 'http://f.v.17173cdn.com/flash/PreloaderFileFirstpage.swf?cid=' + vid + '&refer=';
                        break;
                    case 'ac':
                        play_url = 'http://static.acfun.mm111.net/player/ACFlashPlayer.out.swf?type=page&url=http://www.acfun.tv/v/' + vid;
                        break;
                    case 'bi':
                        play_url = "http://static.hdslb.com/miniloader.swf?aid=" + vid + "&page=1";
                        break;
                    default:
                        play_url = vid;
                        break;
                }
                if (iframe) {                    
                    var iframeHtml = '<iframe height="' + config.height + '" width="' + config.width + '" src="' + iframeUrl + '" frameborder=0 allowfullscreen></iframe>';
                    if (site_name == 'youku') {
                        $.getScript('http://player.youku.com/jsapi', function() {
                            player = new YKU.Player("gamersky_player_box", {
                                client_id: '6bfe5b183f11e7d9',
                                vid: vid,
                                show_related: false
                            });
                        });
                    } else {
                        $("#gamersky_player_box").html(iframeHtml);
                    }
                } else {
                    var swf_obj = new SWFObject(play_url, 'gsvobject', config.width, config.height, '9.0.0', '#000000');
                    swf_obj.addParam('allowfullscreen', 'true');
                    swf_obj.addParam('allownetworking', 'all');
                    swf_obj.addParam('allowscriptaccess', 'always');
                    swf_obj.addParam('wmode', 'opaque');
                    swf_obj.addParam('quality', 'high');
                    swf_obj.addParam('flashvars', flashvars);
                    swf_obj.write('gamersky_player_box');
                }                             
            });
            $(config.videoSource).eq(0).trigger("touchend");
        });
    };

    $.fn.WapsupportMeInit = function (options) {
        return this.each(function () {
            var $this = $(this);
            var itemId = parseInt($this.attr("data-itemId"));
            var field = $this.attr("data-field");
            var isSupport = false;
            var tableName = $this.attr("data-table");
            if (!tableName) {
                tableName = 'PE_U_Video';
            }
            if ($.fn.cookie("GamerSkySupport" + itemId)) {
                isSupport = true;
            }
            var jsondata = {
                type: "updatelabel", labelname: "读取支持反对率", attr: {
                    itemId: itemId,
                    field: field,
                    tableName: tableName
                }
            };
            $.ajax({
                type: "GET",
                url: labelJsonpUrl,
                dataType: "jsonp",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                success: function (responseJson) {
                    if ($this.hasClass("play")) {
                        $this.html("<i class='yu-icon yu-icon-play'></i>" + responseJson.body + "");
                    }
                    if ($this.hasClass("ok")) {
                        $this.html("<i class='yu-icon yu-icon-zan'></i>" + responseJson.body + "");
                    }
                    if ($this.hasClass("no")) {
                        $this.html("<i class='yu-icon yu-icon-cai'></i>" + responseJson.body + "");
                    }
                }
            });
        })
    };
    $.fn.WapsupportMe = function (options) {
        return this.each(function () {
            var $this = $(this);
            var itemId = parseInt($this.attr("data-itemId"));
            var field = $this.attr("data-field");

            var tableName = $this.attr("data-table");
            if (!tableName) {
                tableName = 'PE_U_Video';
            }
            var autoUpdate = $this.attr("data-auto");
            if (autoUpdate && autoUpdate == 'true') {
                var jsondata = {
                    type: "updatelabel", labelname: "Digg统计", attr: {
                        itemId: itemId,
                        field: field,
                        tableName: tableName
                    }
                };
                $.ajax({
                    type: "GET",
                    url: labelJsonpUrl,
                    dataType: "jsonp",
                    data: {
                        jsondata: JSON2.stringify(jsondata)
                    },
                    success: function (responseJson) {
                    }
                });
            }
            $(this).on('tap', function (event) {
                var isSupport = false;
                if ($.fn.cookie("GamerSkySupport" + itemId)) {
                    isSupport = true;
                }
                if (isSupport) {
                    return;
                }
                $.fn.cookie("GamerSkySupport" + itemId, 1, { path: "/" });
                var jsondata = {
                    type: "updatelabel", labelname: "Digg统计", attr: {
                        itemId: itemId,
                        field: field,
                        tableName: tableName
                    }
                };
                $.ajax({
                    type: "GET",
                    url: labelJsonpUrl,
                    dataType: "jsonp",
                    data: {
                        jsondata: JSON2.stringify(jsondata)
                    },
                    success: function (responseJson) {
                        $this.WapsupportMeInit();
                    }
                });

            });
            $this.WapsupportMeInit();
        });
    }
    $(document).ready(function () {        
        $(".wapsupportMe").WapsupportMe();
        // var iframeLength = document.getElementsByTagName("iframe").length;
        // var embedLenfth = document.getElementsByTagName("embed").length;
        // $("#leshitvauto").height(document.body.clientWidth * (9 / 16)).width(document.body.clientWidth - 20);
        // if (iframeLength > 0) {
        //     for (var i = 0; i < iframeLength; i++) {
        //         var iframeElements = document.getElementsByTagName("iframe")[i];
        //         if (iframeElements.style["display"] != "none") {
        //             iframeElements.removeAttribute("style");
        //         }
        //         iframeElements.height = document.body.clientWidth * (9 / 16);
        //         iframeElements.width = document.body.clientWidth - 20;
        //     }

        // }
        // if (embedLenfth > 0) {
        //     for (var n = 0; n < embedLenfth; n++) {
        //         if (document.getElementsByTagName("embed")[n].style["display"] != "none") {
        //             document.getElementsByTagName("embed")[n].removeAttribute("style");
        //         }
        //         document.getElementsByTagName("embed")[n].height = document.body.clientWidth * (9 / 16);
        //         document.getElementsByTagName("embed")[n].width = document.body.clientWidth - 20;
        //     }
        // }
    });
})(jQuery);

/*
global $,Swiper
 */
//gamersky js
//by Mrrr.Tian
//c:2016.05.05
//u:2018
var ymwapJs = {
	closeScroll:function () {
        $('html,body').addClass('hideScroll');
    },
	openScroll:function () {
        $('html,body').removeClass('hideScroll');
    },
	hMeun : function() {
	    $('.ymw-meun').on('click', function () {
	        $(this).toggleClass('cur');
	        $('.ymwMeunPop').toggleClass('cur');
		});
	},
	sliderFun: function() {
        $('.ymwSlider').each(function() {
            var mySwiper = new Swiper($(this), {
                direction: 'horizontal',
                loop: true,
                pagination: $(this).find('.swiper-pagination'),
                autoplay: 3000,
                autoplayDisableOnInteraction : false
            });
            mySwiper.onResize()
        });	  
	},
	scrollImgFun: function() {
        $('.ymwScroImg').each(function() {
            var mySwiper = new Swiper($(this), {
                pagination: $(this).find('.swiper-pagination'),
                slidesPerView : 'auto',
                slidesPerGroup : 3,
                paginationClickable :true
            });
            mySwiper.onResize()
        });	  
	},
    indexNavNew:function () {
        var mySwiper = new Swiper('#ymwHeaderSwp', {
            slidesPerView : 'auto',
            slideClass : 'ymwHeaderSwpItem'
        });
        var searchBtbClk = true,$searchPop = $('#ywmHeaderSearchPop'),iptTimer;
        $('#ywmHeaderSearchBtn').on('click',function () {
            var $this = $(this);
            clearTimeout(iptTimer);
            if(searchBtbClk === true){
                $this.addClass('cur');
                $searchPop.addClass('cur');
                iptTimer = setTimeout(function () {
                    $searchPop.find('input').eq(0).focus();
                },500);
                searchBtbClk = false;
            }else{
                $this.removeClass('cur');
                $searchPop.removeClass('cur');
                searchBtbClk = true;
            }
        });
    },
    tabFun: function() {
        var ymwt = $('.ymwTab');
        ymwt.each(function(){
            var ymwtNav = $(this).find('.ymwTabNav'),
            ymwtCon = $(this).find('.ymwTabCon'),
            navNum = $(this).attr('data-navnum'),
            rRo = $(this).attr('data-rRo'),
            defAct = $(this).attr('data-def')||0;
            var mySwiper2 = new Swiper(ymwtNav, {
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                slidesPerView: navNum,
                resistanceRatio : rRo,
                onTap: function() {
                    mySwiper3.slideTo(mySwiper2.clickedIndex)
                },
                onInit: function() {
                    ymwtNav.find('.swiper-slide').eq(0).addClass('active-nav');
                }
            });
            var mySwiper3 = new Swiper(ymwtCon, {
                autoHeight: true,
                onSlideChangeStart: function() {
                    updateNavPosition()
                }
            });
            function updateNavPosition() {
                ymwtNav.find('.active-nav').removeClass('active-nav');
                var activeNav = ymwtNav.find('.swiper-slide').eq(mySwiper3.activeIndex).addClass('active-nav');
                if (!activeNav.hasClass('swiper-slide-visible')) {
                    if (activeNav.index() > mySwiper2.activeIndex) {
                        var thumbsPerNav = Math.floor(mySwiper2.width / activeNav.width()) - 1;
                        mySwiper2.slideTo(activeNav.index() - thumbsPerNav)
                    } else {
                        mySwiper2.slideTo(activeNav.index())
                    }
                }
            }
            function goDef(){
                mySwiper3.slideTo(defAct, 0, false);
                updateNavPosition();
            }
            goDef();
            $(window).resize(function(){
                setTimeout(function(){
                    var w = $('.ymwtNav').find('.swiper-wrapper').width()/3;
                    mySwiper2.slides.css('width',w+'px');
                    mySwiper2.update(true);
                    mySwiper3.update(true);
                },100);                
            });                                        
        }); 
    },
	listPic:function(){
		var ww = $(window).width(),liw = (ww - 14*3)/2;
        var imgsrc = $('.ymw-list-pic').find('li').eq(0).find('img').attr('src');
        var nimg = new Image();
        nimg.src = imgsrc;
        var imgh = nimg.height,
        imgw = nimg.width;
		$('.ymw-list-pic').find('li').each(function(){
            $(this).css({ 'width': liw + 'px' });            
            $(this).find('img').css({ 'height': nimg.height * liw / nimg.width + 'px' });
        });
	},
    listThree:function(thli){
        var ww = $(window).width(),liw = (ww - 14*2 - 18*2)/3;
        $(thli).find('li').each(function(){
            $(this).find('a').css({ 'width': liw + 'px' });
            var imgsrc = $(this).find('a').eq(0).find('img').attr('src');
            var nimg = new Image();
            nimg.src = imgsrc;
            var imgh = nimg.height,
            imgw = nimg.width;
            $(this).find('a').find('img').css({ 'height': nimg.height * liw / nimg.width + 'px' });
            //$(this).find('a').find('p').css({ 'top': nimg.height * liw / nimg.width - 24 + 'px','width':nimg.width * liw / nimg.width - 16 +'px'});
        });
    },
    fixTabNav:function(){
        var st,ft;
        function ymwTNF(){
            var $ww = $(window).width();
            if($ww>720){
                $ww = 720;
            }
            ft = $('.ymwTabNavFixed').parent().offset().top;
            function fixScl() {
                st = $(window).scrollTop();
                if(st >= ft){
                    $('.ymwTabNavFixed').css({'position':'fixed','top':'0','left':'50%','margin-left':'-'+$ww/2+'px','width':$ww - 28 + 'px','z-index':'99992'}).parent().css({'padding-top':$('.ymwTabNavFixed').height()+20+'px'});
                }else{
                    $('.ymwTabNavFixed').css({'position':'','top':'','left':'','margin-left':'','z-index':'','width':''}).parent().css({'padding-top':''});
                }
            }
            fixScl();
            $(window).scroll(function(){
                fixScl();
            });
        }
        ymwTNF();
        $(window).resize(ymwTNF);
    },
    sxFun:function(){
        $('.ymwSxScroImg').each(function() {
            var $this = $(this),
            cn = $(this).find('.cur').parent().index(),tn;
            cn>0?tn=cn:tn=0;
            var mySwiper = new Swiper($(this),{
                freeMode : true,
                freeModeSticky : true,
                slidesPerView : 'auto',
                onInit:function(swiper){
                    swiper.slideTo(tn, 300, false);
                    addSdw(swiper,$this)
                }, onSlideChangeEnd: function(swiper) {
                    addSdw(swiper,$this)
                }
            });
            mySwiper.onResize();
        });  
        function addSdw(swiper,a){
            if (swiper.isEnd) {
                a.removeClass('ymwWS');
            } else {
                a.addClass('ymwWS');
            }
        }
        var tf = false;
        $('.ymwSxbtn').on('tap',function(){            
            if(tf==true){                
                $('.ymwSxPop,.ymw-sx-pop-mask').removeClass('cur');
                $(this).removeClass('cur');
                $('.ymw-sx-pop-mask').remove();
                tf = false;
            }else{
                $('.ymwSxPop,.ymw-sx-pop-mask').addClass('cur');
                $(this).addClass('cur');
                $('.ymw-sx-pop-mask').css({'height':$(window).height()+'px'});
                tf = true;
                setTimeout(function(){
                    $('.ymw-sx-pop-mask').on('tap',function(){
                        $(this).removeClass('cur');        
                        $('.ymwSxPop,.ymwSxbtn').removeClass('cur');
                        tf = false;          
                    });
                },500);             
            }            
        });
    },
    //截图
    jtFunc:function(){
        function setImg(a){
            var imgsrc = a.find('.swiper-slide').eq(0).find('img').attr('src');
            var nimg = new Image();
            nimg.src = imgsrc;
            var imgh = nimg.height,
            imgw = nimg.width;
            if(imgw/imgh>1){
                a.find('img').css({'height': 177 + 'px'});
            }else{
                a.find('img').css({'height': 250 + 'px'});
            }            
        }
        $('.ymwJtImg').each(function() {
            var $this = $(this);
            setImg($this);
            var mySwiper = new Swiper($(this),{
                freeMode : true,
                freeModeSticky : true,
                slidesPerView : 'auto',
                spaceBetween : 8
            });
            mySwiper.onResize();
        }); 
    },
    //展开
    zkFunc:function(){
        $('.ymw-autoHide').each(function(){
            var $this=$(this),tf=true;
            var txtp=$this.find('.ymw-autoHide-txt').children(),sumH=0;
            for (var i = 0; i < txtp.length; i++) {
                sumH += txtp.eq(i).height();
            };
            if(sumH<105){
                $this.find('.ymw-autoHide-btn').hide();
            }else{
                $this.find('.ymw-autoHide-btn').show()
            }
            
            $this.find('.ymw-autoHide-btn').on('click',function(event){
                event.preventDefault();
                if(tf == true){
                    $this.find('.ymw-autoHide-txt').css({'max-height':sumH + 'px'});
                    $(this).addClass('cur').text("收起");
                    tf=false;
                }else{
                    $this.find('.ymw-autoHide-txt').css({'max-height':''});
                    $(this).removeClass('cur').text("展开");
                    tf=true;
                }
            });
            $(window).resize(function(){
                if (tf == false) {
                    sumH = 0;
                    for (var i = 0; i < txtp.length; i++) {
                        sumH += txtp.eq(i).height();
                    };
                    if (sumH < 105) {
                        $this.find('.ymw-autoHide-btn').hide();
                    }else{
                        $this.find('.ymw-autoHide-btn').show()
                    }
                    $this.find('.ymw-autoHide-txt').css({
                        'max-height': sumH + 'px'
                    });
                } else {
                    sumH = 0;
                    for (var i = 0; i < txtp.length; i++) {
                        sumH += txtp.eq(i).height();
                    };
                    if (sumH < 105) {
                        $this.find('.ymw-autoHide-btn').hide();
                    }else{
                        $this.find('.ymw-autoHide-btn').show()
                    }
                }
            });
        });
    },
    //评分
    pfFunc:function(){
        var mbtn = $('.ymw-pf-btn'),pfpop='',pfnums=[];
        for (var i = 0; i < 20; i++) {
            if(i%2==0){
                pfnums[i] = '<a href="javascript:;" class="ymw-pf-pop-nums-btn">' + (i+1)*0.5 + '</a>';
            }else if(i<19){
                pfnums[i] = '<a href="javascript:;" class="ymw-pf-pop-nums-btn">' + (i+1)*0.5 + '.0</a>';
            }else{
                pfnums[i] = '<a href="javascript:;" class="ymw-pf-pop-nums-btn">' + (i+1)*0.5 + '</a>';
            }
        };
        pfpop = '<div class="ymw-pf-pop"><div class="ymw-pf-pop-mask"></div><div class="ymw-pf-pop-main"><h5>选择您的分数</h5><div class="clearfix ymw-pf-pop-nums">' + pfnums.join('') +'</div><a href="javascript:;" class="ymw-pf-pop-close"></a></div></div>';

        var TT = $("#myScore").attr("data-generalid");
        var cookiesKey = "WapPL" + TT;
        if ($.fn.cookie(cookiesKey) !== null) {
            mbtn.find('.ymw-pf-btn-s1').html($.fn.cookie(cookiesKey));
        }

        mbtn.each(function(){
            $(this).on('tap',function(event){
                event.preventDefault();
                var TT = $(this).attr("data-generalid");
                var cookieKey = "WapPL" + TT;
                if ($.fn.cookie(cookieKey) == null) {
                    $('body').append(pfpop);
                    smtPf($('.ymw-pf-pop-nums-btn'));
                    lockHtml()
                    $('.ymw-pf-pop').find('.ymw-pf-pop-mask').on('tap',function(event){
                        event.preventDefault();
                        $('.ymw-pf-pop').remove();
                        unlockHtml();
                    });
                    $('.ymw-pf-pop').find('.ymw-pf-pop-close').on('click',function(event){
                        event.preventDefault();
                        $('.ymw-pf-pop').remove();
                        unlockHtml();
                    });
                }                
            });
        });
        //提交评分
        function smtPf(btn) {
            btn.on('touchend', function(event) {
                event.preventDefault();
                var chTxt = '您的评分' + $(this).html();
                var num = $(this).html();
                mbtn.find('.ymw-pf-btn-s1').html(chTxt);
                $('.ymw-pf-pop').remove();
                unlockHtml();

                var TT = $("#myScore").attr("data-generalid");
                var dataType = $("#myScore").attr("data-type");
                var tips = $("#myScore").attr("data-tips");
                var cookieKey = "WapPL" + TT;
                if ($.fn.cookie(cookieKey) !== null) {
                    alert("对不起，您已经提交过评分！");
                } else {
                    $.ajax({
                        type: "GET",
                        dataType: "jsonp",
                        url: "http://db5.gamersky.com/RatingJsonpAjax.aspx",
                        data: {
                            'Rating': JSON2.stringify({
                                "GenneralId": TT,
                                'Sorce': num,
                                'Type': dataType
                            }),
                            'Action': "rating"
                        },
                        success: function(data) {
                            if (data.hasOwnProperty("status")) {
                                switch (data.status) {
                                    case "err":
                                        alert("提交" + tips + "错误！");
                                        break;
                                    case "existuser":
                                    case "existip":
                                        alert("已" + tips + "！");
                                        break;
                                    default:
                                        break;
                                }
                            } else {
                                $.fn.cookie(cookieKey, chTxt, {
                                    path: "/",
                                    expires: 365
                                });
                            }
                        }
                    });
                }
            });
        }
        

    },
    //快速跳转
    qukTo:function(){
        var $wind = $(window),$windw=$wind.height();
        var qk = '<div class="ymw-backtotop"><a id="ymwBTT" class="ymw-btt-btn"></a>';
        if($('.ymw-contxt').length>0 && $('.ymw-article-nav-pop').length<=0){
            qk += '<a id="ymwBTC" class="ymw-btc-btn">评论</a>';
        }
        if($('.ymw-article-nav-pop').length){
            qk += '<a id="ymwOPN" class="ymw-opn-btn"></a>';
        }
        qk += '</div>';
        $('body').append(qk);
        function btnFun(){
            var $bbwrap=$('.ymw-backtotop');
            
            $wind.scroll(function () {
                if ($wind.scrollTop() > $windw/2) {
                    $bbwrap.addClass('cur');
                } else {
                    $bbwrap.removeClass('cur');
                }
            });
        }
        btnFun();
        $(window).resize(btnFun);
        $('#ymwBTT').on('click', function (event) {
            event.preventDefault();
            $('html,body').animate({scrollTop:$('body').offset().top}, 300);
        });
        $('#ymwBTC').on('click', function (event) {
            event.preventDefault();
            $('html,body').animate({scrollTop:$('.ymw-comm').offset().top}, 300);
        });
        $('#ymwOPN').on('click', function (event) {
            event.preventDefault();
            ymwapJs.openAnPop();
        });
        var timeout = false;
        $(window).scroll(function(){
            $('.ymw-backtotop').css({'opacity':'1'});
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function() {
                $('.ymw-backtotop').css({'opacity':'0.2'});
            },500);
            
        });
    },
    //剧集
    dhsets: function () {        
        var $wrap = $('.ymw-juji'),
        ymwtNav = $wrap.find('.ymwTabNav'),
        navNum = ymwtNav.attr('data-navnum'),
        rRo = ymwtNav.attr('data-rRo')
        defAct = ymwtNav.attr('data-def')||0;
        var mySwiperJJ = new Swiper(ymwtNav, {
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            slidesPerView: navNum,
            resistanceRatio : rRo,
            onInit: function() {
                ymwtNav.find('.swiper-slide-active').addClass('active-nav');
            }
        });        
        var jjDom = $('.ymw-juji');
        var generalId = parseInt(jjDom.attr("data-itemid"));
        var playOrderId = parseInt(jjDom.attr("playOrderId"));
        var id = jjDom.attr("data-generalId");
        var data = {
            isCache: false, cacheTime: 0, GeneralId: generalId
        };
        $.ajax({
            type: 'GET',
            url: "http://db2.gamersky.com/WapAjax.aspx",
            data: {
                json: JSON2.stringify(data), jsondata: "getdhsets"
            },
            async: false,
            dataType: "jsonp",
            success: function (responseJson) {
                var total = 0;
                var sclass = "";
                var html = "";
                var html2 = "";
                var htmlArr = [];
                if (responseJson.length > 30) {
                    total = Math.ceil(responseJson.length / 30) - 1;
                }
                if (responseJson.length % 30 > 0) {
                    total = total + 1;
                }
                for (var i = 1; i <= responseJson.length ; i++) {
                    var aclass = "";
                    if (responseJson[i - 1].GeneralID == parseInt(id)) {
                        aclass = "class=cur";
                    }
                    if (responseJson.length > 30) {

                        htmlArr[i] = "<li data-hit='1' data-playorder='" + responseJson[i - 1].playOrderId + "' style='display: none'><a " + aclass + " href='/donghua/" + responseJson[i - 1].GeneralID + ".html'>" + responseJson[i - 1].EpisodeTitle + "</a></li>";
                    } else {
                        htmlArr[i] = "<li data-hit='0' data-playorder='" + responseJson[i - 1].playOrderId + "'><a " + aclass + " href='/donghua/" + responseJson[i - 1].GeneralID + ".html'>" + responseJson[i - 1].EpisodeTitle + "</a></li>";
                    }
                }
                html = '<ul class="clearfix">' + htmlArr.join('') + '</ul>';

                if (responseJson.length > 30) {
                    for (var m = total; m >= 1; m--) {
                        var min = (m - 1) * 30 + 1;
                        var max = m * 30;
                        if (max > responseJson.length) {
                            max = responseJson.length;
                        }
                        var classname = "";
                        if (min <= playOrderId && max >= playOrderId) {
                            classname = "active-nav";
                        }
                        if (m == total) {
                            classname = "active-nav";
                        }
                        else {
                            classname = "";
                        }                    
                        html2 += "<div class='swiper-slide " + classname + "' ><a href='javascript:; ' data-min='" + min + "' data-max='" + max + "'>" + max + "-" + min + "</a></div>";
                    }
                }
                else {
                    if (responseJson.length > 0) {
                        html2 = "<div class='swiper-slide active-nav'><a href='javascript:; ' data-min='1' data-max='" + responseJson.length + "'>1-" + responseJson.length + "</a></div>";
                    }
                }
                jjDom.find(".ymwJJtabnav").html(html2);
                jjDom.find(".ymwJJtabcon").html(html);
                mySwiperJJ.update();
                function swpGoto() {
                    var swpgoto;
                    if (responseJson.length > 30) {
                        for (var m = total; m >= 1; m--) {
                            var min = (m - 1) * 30 + 1;
                            var max = m * 30;
                            if (min <= playOrderId && max >= playOrderId) {
                                swpgoto = total - m;
                            }
                        }
                        mySwiperJJ.slideTo(swpgoto,200,false);
                        ymwtNav.find('.swiper-slide').eq(swpgoto).find('a').trigger('click');
                    }
                }
                
                function dhsetsList(){
                    var min = parseInt($(".ymwJJtabnav").find(".active-nav").find("a").attr('data-min'));
                    var max = parseInt($(".ymwJJtabnav").find(".active-nav").find("a").attr("data-max"));
                    $(".ymwJJtabcon li[data-hit='1']").each(function (index, element) {
                        if (parseInt($(element).attr("data-playorder")) >= min && parseInt($(element).attr("data-playorder")) <= max) {
                            $(element).show();
                        } else {
                            $(element).hide();
                        }
                    });
                    $('.ymwJJtabnav').find("a").on('click',function () {
                        var $this = $(this);
                        var min = parseInt($this.attr('data-min'));
                        var max = parseInt($this.attr("data-max"));
                        $(".ymwJJtabcon li[data-hit='1']").each(function (index, element) {
                            if (parseInt($(element).attr("data-playorder")) >= min && parseInt($(element).attr("data-playorder")) <= max) {
                                $(element).show();
                            } else {
                                $(element).hide();
                            }
                        });
                        $('.ymwJJtabnav').find('.swiper-slide').removeClass('active-nav');
                        $this.parent().addClass('active-nav');
                    });
                };
                dhsetsList();
                swpGoto();
            }
        });
        $('.yu-btn-yuan').addClass('ymwQhYuanBtn');
        var yqybl = $('.ymwQhYuanBtn').length;
        function dhdom(){
            var ww = $(window).width(),wh = ww * 9/16;
            $('.ymw-congame-dh-con-vd,.playArea').css({'width':ww+'px','height':wh+'px'});
        }
        dhdom(); 
        $("#gamersky_player_box").GamerSkyPlayer();        
        $(window).resize(function(){
            dhdom();
        });
        var $yuanWrap = $('.ymw-congame-dh-con-ctl-l-btns');
        $yuanWrap.append($('.ymw-congame-dh-con-ctl-l').find('.yu-btn-yuan:gt(0)'));
        function qhYuan() {
            $('.ymwQhYuanBtnMask').on('tap', function() {
                $yuanWrap.slideDown(250);
                $('.ymw-congame-dh-con-ctl-l').find('.ymwQhYuanBtn').each(function() {
                    $(this).on('tap', function() {
                        $yuanWrap.append($('.ymw-congame-dh-con-ctl-l-btn').find('.ymwQhYuanBtn'));
                        $('.ymw-congame-dh-con-ctl-l-btn').append($(this));
                        $('.ymw-congame-dh-con-ctl-l').find('.ymwQhYuanBtn').removeClass('current');
                        $(this).addClass('current').off('tap');
                        $yuanWrap.slideUp(150);
                    });
                });
            });
        }
        if(yqybl === 1){
            return false;
        }else{
            qhYuan();
        };       
    },
    //攻略模仿
    glFunc:function(){        
        function listSize(){
            var gllist = $('.ymw-glal-list'),
            ww = $(window).width(),
            liw = (ww - 42)/2;
            gllist.find('li').each(function(){
                var imgsrc = $(this).find('a').eq(0).find('img').attr('src');
                var nimg = new Image();
                nimg.src = imgsrc;
                var imgh = nimg.height,
                imgw = nimg.width;
                $(this).find('a').css({'width':liw + 'px'});
                $(this).find('a').find('img').css({ 'height': nimg.height * liw / nimg.width + 'px' });
            });
        }
        //listSize();
        var glNavHtml = '',
        $glMoreBtn = $('.wapglDataButton');
        $glMoreBtn.each(function(){
            $(this).on('click',glMoreBtnFunc);
            glNavHtml += '<li><a href="javascript:;" class="ymw-zmqkt" data-lito="ymw-glall-'+$(this).attr('data-zm')+'"><span>'+$(this).attr('data-zm')+'</span></a></li>';
        });
        $('#ymwGlallNav').find('.ymw-fullpop-con').html(glNavHtml);
        $('#ymwA-Z').on('click',function(){  
            var $this = $(this);
            $('#ymwGlallNav').addClass('cur');
            lockHtml();
            $('#ymwGlallNav').find('.ymw-fullpop-close').on('click',function(){
                $('#ymwGlallNav').removeClass('cur');
                unlockHtml();
            });
        });
        $(window).resize(function(){
            if($('#ymwGlallNav').hasClass('cur')==true){
                $('#ymwGlallNav').removeClass('cur');
                unlockHtml();
            }
        });
        function zMqkt(){
            $('.ymw-zmqkt').each(function(){
                $(this).on('click',function(){
                    $('#ymwGlallNav').removeClass('cur');
                    unlockHtml();
                    var tarZ = $(this).attr('data-lito');
                    $('html,body').animate({scrollTop:$('.'+tarZ).offset().top-47}, 300);
                });
            });
        }
        zMqkt();
        var ymwt = $('.ymwTabGL');
        var ymwtNav = ymwt.find('.ymwTabNav'),
            ymwtCon = ymwt.find('.ymwTabCon'),
            navNum = ymwt.attr('data-navnum'),
            rRo = ymwt.attr('data-rRo');
        defAct = ymwt.attr('data-def') || 0;
        var mySwiper2 = new Swiper(ymwtNav, {
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            slidesPerView: navNum,
            resistanceRatio: rRo,
            onTap: function() {
                mySwiper3.slideTo(mySwiper2.clickedIndex)
            },
            onInit: function() {
                ymwtNav.find('.swiper-slide').eq(0).addClass('active-nav');
            }
        });
        var mySwiper3 = new Swiper(ymwtCon, {
            autoHeight: true,
            onSlideChangeStart: function() {
                updateNavPosition()
            },
            onSlideChangeEnd: function() {
                shSlNav()
            }
        });
        function updateNavPosition() {
            ymwtNav.find('.active-nav').removeClass('active-nav')
            var activeNav = ymwtNav.find('.swiper-slide').eq(mySwiper3.activeIndex).addClass('active-nav');
            if (!activeNav.hasClass('swiper-slide-visible')) {
                if (activeNav.index() > mySwiper2.activeIndex) {
                    var thumbsPerNav = Math.floor(mySwiper2.width / activeNav.width()) - 1
                    mySwiper2.slideTo(activeNav.index() - thumbsPerNav)
                } else {
                    mySwiper2.slideTo(activeNav.index())
                }
            }
        }
        function shSlNav(){
            if(mySwiper3.activeIndex==1){
                $('.ymwA-Z').addClass('cur');                
                $('.ymw-backtotop').hide();
            }else{
                $('.ymwA-Z').removeClass('cur');
                $('.ymw-backtotop').show();
            }
        }
        function goDef() {
            mySwiper3.slideTo(defAct, 0, false);
            updateNavPosition();
        }
        goDef()
        $(window).resize(function() {
            setTimeout(function() {
                var w = $('.ymwtNav').find('.swiper-wrapper').width() / 3;
                mySwiper2.slides.css('width', w + 'px');
                mySwiper2.update(true);
                mySwiper3.update(true);
            }, 100);
        });
        function glMoreBtnFunc(event) {
            event.preventDefault();
            var $this = $(this);
            var zm = $this.attr("data-zm");
            var reload = $this.attr("reload");
            var templata = "{PE.Label id=\"获取Wap攻略推荐列表\" page=\"5\" size=\"100\" type=\"all\" zm=\"" + zm + "\" /}";
            var data = {
                isCache: false, cacheTime: 0, templateKey: "", templata: templata
            };
            $.ajax({
                type: 'GET',
                url: "http://db2.gamersky.com/WapAjax.aspx",
                data: {
                    json: JSON2.stringify(data), jsondata: "putlabelbody"
                },
                dataType: "jsonp",
                beforeSend:function(){                    
                    $this.text('加载中...');
                },
                success: function (data) {
                    if (reload == "true") {
                        $this.attr("reload", false);
                        $this.before(data.body);                     
                        $this.html("已全部展开");
                    }
                    else {
                        $this.html("已全部展开");                        
                    }
                },
                complete:function(){
                    //listSize();
                    ymwtCon.find('.swiper-wrapper').css({'height':$('.ymw-glall-con').height()+'px'});
                    setTimeout(function(){
                        //listSize();
                        ymwtCon.find('.swiper-wrapper').css({'height':$('.ymw-glall-con').height()+'px'});
                    }, 3000);      
                    $this.off().css({'color':'#ddd'});           
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
        }
        $(window).resize(function(){
            //listSize();
        });
    },
    searchPageFunc:function(){
        var $wrap = $('.ymwsRespage'),
        ymwtNav = $wrap.find('.ymwTabNav'),
        navNum = ymwtNav.attr('data-navnum'),
        rRo = ymwtNav.attr('data-rRo')
        defAct = ymwtNav.attr('data-def')||0;
        var mySwiperJJ = new Swiper(ymwtNav, {
            slidesPerView: navNum,
            resistanceRatio : rRo,
            onInit: function() {
                ymwtNav.find('.swiper-slide').eq(defAct).addClass('active-nav');                
            }
        });
        
    },
    SyLinkFun:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器            
        $('.ymwSyLink').each(function(){
            if (isAndroid == true) {
                $(this).attr("href", "http://wap.gamersky.com/shouyou/android/");
            }
            else {
                $(this).attr("href", "http://wap.gamersky.com/shouyou/ios/");
            }
        });
    },
    htmlAndroidiOs:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        if (isAndroid == true) {
            $('html').removeClass('ymw-iOsWap');
            $('html').addClass('ymw-androidWap');
        }else{
            $('html').removeClass('ymw-androidWap');
            $('html').addClass('ymw-iOsWap');
        }
    },
    ymwPzDataFun:function(){
        var pzData = $('.ymwPzData'),
        pzDataIn = $('.ymwPzDataIn'),
        pzDataDD = pzData.find('.PZ.DD'),
        pzDataTJ = pzData.find('.PZ.TJ');
        pzDataDD.find('li.tit').remove();
        pzDataTJ.find('li.tit').remove();
        $('.ymwPzDataIn').find('.swiper-slide').eq(0).html(pzDataDD);
        $('.ymwPzDataIn').find('.swiper-slide').eq(1).html(pzDataTJ);
        var pzn = pzData.find('.PZXQ').length;
        if (pzn === 0) {
            $('.ymw-peizhi').remove();
        };
    },
    ymwsyScoreFun: function() {
        var $starWp = $('#ymsSyDlStarsWrap'),$scoreTxt = $('#myScoreTxt'),$scoreBtn = $('#ymwScoreSubmit'),$scoreLike = $('#ymwScoreLike'),
        scoreTxt = ['不忍直视','平庸之作','不妨一试','公认佳作','不容错过'];
        function getPos(e){
            if (e.originalEvent.targetTouches[0] !== undefined && e.originalEvent.targetTouches[0].pageX !== undefined) {
                e.pageX = e.originalEvent.targetTouches[0].pageX;
            }
            if (e.originalEvent.targetTouches[0] !== undefined && e.originalEvent.targetTouches[0].pageY !== undefined) {
                e.pageY = e.originalEvent.targetTouches[0].pageY;
            }
            return e;
        }
        var widthTimer;
        var starFuncs = function(){             
            $starWp.find('.ymw_score_stars').find('i').css('width',$starWp.find('.ymw_score_stars').width()+'px');
            widthTimer = setTimeout(function(){
                $starWp.find('.ymw_score_stars').find('i').css('width',$starWp.find('.ymw_score_stars').width()+'px')
            },500)
        }
        starFuncs.prototype = {
            positionInfos:function(){
                var infos,theStar = $starWp.find('.ymw_score_stars');
                infos = {
                    width:theStar.width(),
                    left:theStar.offset().left
                }
                return infos;
            },
            changeState:function(e){
                var ePos = getPos(e),dtc,
                s0 = starInfos.left,sw = starInfos.width,
                x = ePos.pageX;
                dtc = x - s0,
                conDtc = dtc/sw>1?1:(dtc/sw);
                starNum = Math.floor(conDtc*10)%2==0?Math.floor(conDtc*10)/2:(Math.floor(conDtc*10)-1)/2;
                starNum = starNum<0?0:starNum;
                scorenum = starNum>4?10:(starNum+1)*2;
                scorenum = scorenum<0?0:scorenum;
                var changeStar = conDtc*100+'%';
                $starWp.find('.ymw_score_stars').find('span').width(changeStar);
                $scoreTxt.find('span').text(scoreTxt[starNum]);
                $scoreBtn.attr({'data-scorenum':scorenum,'data-scoretxt':scoreTxt[starNum]})
            }
        }
        var starInfosFunc = new starFuncs();
        var starInfos = starInfosFunc.positionInfos();
        function btnTouches(){
            $('.ymsSyDlStarsWrap').on('touchstart',function (e){
                e.preventDefault()
                starInfosFunc.changeState(e);
                $scoreBtn.removeClass('cur')
            })
            $('.ymsSyDlStarsWrap').on('touchmove', function (e) {
                e.preventDefault();
                starInfosFunc.changeState(e)            
            });
            $('.ymsSyDlStarsWrap').on('touchend',function(){
                $scoreBtn.addClass('cur')
            });
        }
        //提交按钮
        var TT = $scoreBtn.attr("data-generalid");
        var cookiesKey = "WapPL" + TT,cookieNums=0,cookieNumsCalc=0;
        function scoreFunc(){
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/api/logincheck",
                success: function(responseJson) {
                    if (responseJson.status == "ok") {
                        btnTouches()
                    } else {
                        if ($.fn.cookie(cookiesKey) !== null) {
                            cookieNums = parseInt($.fn.cookie(cookiesKey), 10);
                            cookieNumsCalc = cookieNums % 2 == 0 ? cookieNums / 2 : (cookieNums + 1) / 2;
                            $starWp.find('.ymw_score_stars').find('span').width((cookieNums) * 10 + '%');
                            $scoreTxt.find('span').html(scoreTxt[cookieNumsCalc - 1]);
                        } else {
                            btnTouches()
                        }
                    }
                }
            });
            $scoreBtn.off();
            $scoreBtn.on('click',function (e){
                e.preventDefault();
                var $this = $(this),
                num = $this.attr('data-scorenum'),
                dataid = $this.attr("data-generalid"),
                dataType = $this.attr("data-type"),
                dataTips = $this.attr("data-tips"),
                cookieKey = "WapPL" + dataid,
                cookieTxt = $this.attr('data-scoretxt');
                $scoreBtn.removeClass('cur')                    
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://i.gamersky.com/apirating/rating",
                    data: {
                        Rating: JSON2.stringify({ GenneralId: dataid, Sorce: num, Type: dataType }), Action: "rating"
                    },
                    success: function(data) {
                        if (data.hasOwnProperty("status")) {
                            switch (data.status) {
                                case "err":
                                    alert("提交" + dataTips + "错误！");
                                    break;
                                case "existuser":
                                case "existip":
                                    alert("已" + dataTips + "！");
                                    break;
                                default:
                                    break;
                            }
                        } else {                                
                        }
                        $('.ymsSyDlStarsWrap').off();
                        $.fn.cookie(cookieKey, num, {path: "/",expires: 365});
                    }
                });
                
            }); 
        }       
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://i.gamersky.com/apirating/getcontentratingloginfo",
            data: {
                'generalId': TT
            },
            success: function(data) {
                var dataParse,scoreUserSubmit,scoreUserCalc,starWidthNum,starWidth;                          
                if (data.status == "ok") {
                    dataParse = $.parseJSON(data.body);
                    scoreUserSubmit = Math.floor(dataParse.Sorce);
                    starWidthNum = parseInt(dataParse.Sorce, 10);
                    starWidth = starWidthNum%2==0?starWidthNum:(starWidthNum+1);
                    scoreUserCalc = scoreUserSubmit%2==0?scoreUserSubmit/2:(scoreUserSubmit+1)/2;
                    $starWp.find('.ymw_score_stars').find('span').width(starWidth*10+'%');
                    $scoreTxt.find('span').html(scoreTxt[scoreUserCalc-1]);
                }else{
                    scoreFunc()
                }
            }
        });
        //喜欢
        function likeFun() {
            var lkId = $scoreLike.attr('data-generalid'),
            lkType = $scoreLike.attr('data-type'),
            lkScore = $scoreLike.attr('data-sorce'),
            lkTips = $scoreLike.attr('data-tips'),
            likeCookie = 'R' + $scoreLike.attr('data-generalid') + 'likeother';
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/initgroup",
                data: {
                    'generalId': lkId,
                    'ratingGroupType': lkType,
                    'Action': "initGroup"
                },
                success: function(data) {
                    if (data.hasOwnProperty("status")) {
                        console.log(data);
                    } else {
                        $scoreLike.find('span').text(data[0].Times)
                    }
                }
            });
            if ($.fn.cookie(likeCookie) !== null) {
                $scoreLike.addClass('cur');
            } else {
                $scoreLike.on('click', function() {
                    $scoreLike.addClass('cur');
                    $.fn.cookie(likeCookie, 1, {path: "/",expires: 365});
                    $.ajax({
                        type: "GET",
                        dataType: "jsonp",
                        url: "http://i.gamersky.com/apirating/rating",
                        data: {
                            'Rating': JSON2.stringify({
                                "GenneralId": lkId,
                                'Sorce': lkScore,
                                'Type': lkType
                            }),
                            'Action': "rating"
                        },
                        success: function(data) {
                            if (data.hasOwnProperty("status")) {
                                switch (data.status) {
                                    case "err":
                                        alert("提交" + lkTips + "错误！");
                                        break;
                                    case "existuser":
                                    case "existip":
                                        alert("已" + lkTips + "！");
                                        break;
                                    default:
                                        break;
                                }
                            } else {
                                console.log('ok')
                            }
                        }
                    });
                })
            }
        }
        likeFun()
    },
    ymwListJxFunc:function(){
        var $list = $('.ymwListJx'),listData,moreBtn = $('.ymwListJxMore'),lazyLoadImgHolder = 'http://image.gamersky.com/webimg13/loadpic.gif';
        var listSet = {
            templatekey:$list.attr('templatekey'),
            id:0,
            nodeid:$list.attr('data-nodeid'),
            page:$list.attr('data-page'),
            nodes:$list.attr('nodes'),
        }
        function addList(baseData){
            var tmpDom = '',othersData,rens;
            if(baseData.others){
                try{
                    othersData = eval("("+baseData.others+")");
                    rens = othersData.reasons;
                }catch(err){
                    console.error(baseData.tit+"  “精选简介”字段有一个错误需要处理："+err);
                    othersData = {
                        subtitle:'',
                        bigimg:'http://image.gamersky.com/webimg13/nopic.png'
                    }
                    rens='';
                }                
            }else{
                console.error(baseData.tit+"  “精选简介”字段数据为空");
                othersData = {
                    subtitle:'',
                    bigimg:'http://image.gamersky.com/webimg13/nopic.png'
                }
                rens='';
            }
            tmpDom += '<li data-id="'+baseData.id+'"><div class="lmc_tit"><a href="'+baseData.url+'">';
            tmpDom += baseData.icon;
            tmpDom += '</a><h5><a href="'+baseData.url+'">';
            tmpDom += baseData.tit;
            tmpDom += '</a></h5><p>';
            tmpDom += othersData.subtitle;
            tmpDom += '</p><a class="lmc_like ymwLike" data-generalId="'+baseData.id+'">0</a></div><a class="lmc_img" href="'+baseData.url+'"><img src="'+lazyLoadImgHolder+'" data-src="'+othersData.bigimg+'" alt="游民星空" class="lmcLzimg"></a>';
            for (var i = 0; i < rens.length; i++) {
                tmpDom += '<p class="lmc_para">'+rens[i]+'</p>';
            };
            tmpDom += '</li>';
            return tmpDom;
        }
        function likeFunc(){
            var $like = $('.ymwLike'),tips = "喜欢";
            $like.each(function(){
                var $this = $(this),generalId = $this.attr("data-generalId"),cookieKey = "R" + generalId + "-5";
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://i.gamersky.com/apirating/initgroup",
                    data: {'generalId': generalId,'ratingGroupType': 5,'Action': "initGroup"},
                    success: function(data) {
                        if (!data.hasOwnProperty("status")){
                            $this.html(data[0].Times)
                        }                        
                    },
                    error:function(err){
                        $this.html('请刷新')
                    }
                });
                if ($.fn.cookie(cookieKey) !== undefined && $.fn.cookie(cookieKey) !== null) {
                    $this.addClass('cur');
                }else{
                    $this.on('click',function(){
                        $this.addClass('cur');
                        $.ajax({
                            type: "GET",
                            dataType: "jsonp",
                            url: "http://i.gamersky.com/apirating/rating",
                            data: {'Rating':JSON2.stringify({ "GenneralId": generalId,'Sorce': 1,'Type':5}),'Action':"rating" },
                            success: function (data) {
                                if (data.hasOwnProperty("status")) {
                                    switch (data.status) {
                                        case "err":
                                            alert("提交" + tips + "错误！");
                                            break;
                                        case "existuser":
                                        case "existip":
                                            alert("已" + tips + "！");
                                            break;
                                        default:    
                                            break;
                                    }
                                }
                                else{
                                    $this.html(data.Times);
                                }
                                $.fn.cookie(cookieKey, JSON2.stringify({ "GenneralId":generalId,'Sorce':1,'Type':5}),{ path:"/",expires: 365 });
                            }
                        });
                        $this.off();
                    })
                }
            });
        }
        function getListData(initSet){
            var jsondata = {
                type: "getwaplabelpage", isCache: true, cacheTime: 0, templatekey: initSet.templatekey, id: initSet.id, nodeId: initSet.nodeid, page: initSet.page, nodes: initSet.nodes
            },listDom = '';
            $.ajax({
                type: 'GET',
                async:false,
                url: "http://db2.gamersky.com/LabelJsonpAjax.aspx",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                dataType: "jsonp",
                beforeSend:function(){
                    moreBtn.addClass('ymw-more-loading').find('span').html('正在加载');
                },
                success: function (data) {
                    var gd = data.body,newData,strStart,strEnd,parseData,initnum = 0,imglist;
                    function loadImgsFunc(urls,maxnum,tar){
                        var obj = new Image();
                        obj.src = urls;
                        obj.onload = function(){
                            initnum++;
                            if($(tar).hasClass('lmcLzimg')){
                                $(tar).attr('src',$(tar).attr('data-src'))
                            };
                            if(initnum >= maxnum){
                                var h = $list.closest('.swiper-slide').height() + 'px';
                                $list.closest('.swiper-wrapper').css('height',h);
                            }
                        }
                    }
                    if (data.body.indexOf("没有任何记录") > 0) {
                        moreBtn.attr('data-txt','全部加载完成');
                        moreBtn.off();
                    }else{
                        strStart = gd.indexOf('bodyDataStart')+13;
                        strEnd = gd.indexOf('bodyDataEnd') - strStart;
                        newData = gd.substr(strStart,strEnd) + ']';
                        try{
                            parseData = eval("("+newData+")");
                        }catch(err){
                            console.error("parseData has a error:"+err)
                        }
                        $.each(parseData,function(index,items){
                            listDom += addList(items);                            
                        })
                        $list.append(listDom);
                        imglist = $list.find('img');
                        for (var i = 0; i < imglist.length; i++) {
                            loadImgsFunc(imglist[i].src,imglist.length,imglist[i])
                        };
                        likeFunc();
                    }                    
                },
                complete:function(){  
                    setTimeout(function(){
                        var h = $list.closest('.swiper-slide').height() + 'px';
                        $list.closest('.swiper-wrapper').css('height',h);
                    },300);                  
                    moreBtn.removeClass('ymw-more-loading').find('span').html(moreBtn.attr('data-txt'));
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
        }
        function getMoreList(){
            moreBtn.on('click',function(){
                var lastId = $list.find('li').eq(-1).attr('data-id'),pageNum = listSet.page;
                listSet.id = lastId;
                listSet.page++;
                getListData(listSet);
            })
        }
        getListData(listSet);
        getMoreList()
    },
    ymwListZoneFunc:function(){
        var $list = $('.ymwListZone'),
            listNav = $list.find('.lmz_nav'),
            listCon = $list.find('.lmz_items_wrap'),
            zoneConf = {};
        zoneConf = {
            blockData:{
                zq_rmzq:{nav:'热门专区',dataArea:'dataArea_rmzq',realData:''},
                zq_jsby:{nav:'角色扮演',dataArea:'dataArea_jsby',realData:''},
                zq_kp:{nav:'卡牌',dataArea:'dataArea_kp',realData:''},
                zq_pk:{nav:'跑酷',dataArea:'dataArea_pk',realData:''},
                zq_tf:{nav:'塔防',dataArea:'dataArea_tf',realData:''},
                zq_dz:{nav:'动作',dataArea:'dataArea_dz',realData:''},
                zq_yywd:{nav:'音乐舞蹈',dataArea:'dataArea_yywd',realData:''},
                zq_sj:{nav:'射击',dataArea:'dataArea_sj',realData:''},
                zq_ty:{nav:'体育',dataArea:'dataArea_ty',realData:''},
                zq_yc:{nav:'养成',dataArea:'dataArea_yc',realData:''},
                zq_gd:{nav:'格斗',dataArea:'dataArea_gd',realData:''},
                zq_cljy:{nav:'策略经营',dataArea:'dataArea_cljy',realData:''},
                zq_qp:{nav:'棋牌',dataArea:'dataArea_qp',realData:''}
            }
        }
        function iGetInnerText(testStr) {
            var resultStr = testStr.replace(/\s+/g, "");
            resultStr = resultStr.replace(/<\/?.+?>/g,"");
            resultStr = resultStr.replace(/[\r\n]/g, "");
            return resultStr;
        }
        function renderListNav(){
            var listNavDom = '',navData = zoneConf.blockData;
            listNavDom += '<div class="lmz_nav_row">';
            var navnums = 0;
            $.each(navData,function(index,items){
                navnums++
                if(index != 'zq_rmzq'){
                    listNavDom += '<a data-tar="'+index+'">'+items.nav+'</a>';
                    if(index=='zq_dz'||index=='zq_gd'){listNavDom += '</div><div class="lmz_nav_row">'} 
                }          
            });
            listNavDom += '</div>';          
            listNav.html(listNavDom);
            listNav.find('.lmz_nav_row').each(function(){
                var $this = $(this),aLen = $this.find('a').length;
                var placeholderA = ['<a class="navPlaceHolder">占位</a>', '<a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a>', '<a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a>', '<a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a><a class="navPlaceHolder">占位</a>'];
                if(aLen < 5){
                    $this.append(placeholderA[4-aLen]);
                }
            });
            listNav.find('a').on('click',function(){
                var $this = $(this),tarId = $this.attr('data-tar'),tarTop = $('#'+tarId).offset().top - 48;
                $('html,body').animate({scrollTop:tarTop}, 300);
            });
        };
        function listLi(lidata){
            var liDom = '';
            liDom += '<li><a href="'+lidata.url+'"><span class="lmz_img"><img src="'+lidata.imgsrc+'" alt="'+lidata.tit+'"></span><span class="lmz_tit">'+lidata.tit+'</span><span class="lmz_platform"><i class="txt">平台：</i>';
            if(lidata.andIos != 'none'){
                liDom += '未知';
            }            
            if(lidata.and != 'none'){
                liDom += '<i class="lmz_icons lmz_icons_andorid"></i>';
            }
            if(lidata.ios != 'none'){
                liDom += '<i class="lmz_icons lmz_icons_ios"></i>';
            }
            liDom += '</span><i class="lmz_time"><i class="txt">上市：</i><i class="time">'+lidata.time+'</i></i></a></li>';
            return liDom;
        }
        function createListCon(itemData,key){
            var listConDom = '',conData = itemData,conDataSim,conDataSimFormat,newArrayData=[],itemsShow = true;
            conDataSim = $('.dataArea').find('.'+conData.dataArea).html();            
            try{
                conDataSimFormat = eval("("+iGetInnerText(conDataSim)+")");
            }catch(err){
                console.error(conData.nav+"-数据错误（数据不存在）："+err);
                itemsShow = false;
            }          
            listConDom += '<div class="lmz_items" id="'+key+'">';
            listConDom += '<h5><span>'+conData.nav+'</span></h5>';
            listConDom += '<ul class="lmz_flex_row">';
            if(conDataSim){
                for (var i = 0; i < conDataSimFormat.length; i++) {
                    if(i < 6){
                        listConDom += listLi(conDataSimFormat[i]);
                        if(i==2){
                            listConDom += '</ul><ul class="lmz_flex_row">';
                        }
                    }else{
                        newArrayData.push(conDataSimFormat[i])
                    }
                };
            }
            listConDom += '</ul><a class="lmz_more ymwListZoneMore" data-list="'+key+'">点击展开</a>';
            listConDom += '</div>';            
            if(itemsShow == false){
                listConDom = '';
                newArrayData=[]
            }
            return [listConDom,newArrayData];
        }
        function createListConMore(itemData){
            var listConDom = '',conData = itemData;
            listConDom += '<ul class="lmz_flex_row">';            
            for (var i = 0; i < conData.length; i++) {                
                listConDom += listLi(conData[i]);
                if((i+1)%3==0 && i != (conData.length)-1){
                    listConDom += '</ul><ul class="lmz_flex_row">';
                }                
            };            
            listConDom += '</ul>';
            return listConDom;
        }
        function addPlaceHolder(){            
            listCon.find('.lmz_flex_row').each(function(){
                var $this = $(this),thisLi = $this.find('li').length;
                if(thisLi == 2){
                    $this.append('<li></li>');
                }
            });
        }
        function listMore(){
            var $more = $list.find('.ymwListZoneMore');
            $more.on('click',function(){
                var $this = $(this),tmpListDom = '',moreDataPos = $this.attr('data-list'),clkData = zoneConf.blockData[moreDataPos].realData;
                tmpListDom += createListConMore(clkData);
                $this.remove();
                $('#'+moreDataPos).append(tmpListDom);
                var h = $list.closest('.swiper-slide').height() + 'px';
                $list.closest('.swiper-wrapper').css('height',h);
                addPlaceHolder();
            });
        }
        function renderListCon(){
            var tmpListDom = '',istDataOri = zoneConf.blockData;
            $.each(istDataOri,function(i,items){
                var createListConRe = createListCon(items,i);
                tmpListDom += createListConRe[0];
                items.realData = createListConRe[1];                
            });
            listCon.html(tmpListDom);
            listMore();
            addPlaceHolder();
            listCon.find('.lmz_items').each(function(){
                if($(this).find('li').length<6){
                    $(this).find('.lmz_more').remove()
                };
            });
        }
        renderListNav();
        renderListCon();
    },
	//众评
    zpFunc:function () {
        var $zp = $('#ymwZpAreaStar'),zpBtn = $zp.find('a'),zpTxt = $zp.find('span'),
        zpDataList = ['渣作，不玩也罢','平庸，索然无味','一般，普普通通','佳作，值得一玩','神作，不容错过'];
        function getPos(e){
            if (e.originalEvent.targetTouches[0] !== undefined && e.originalEvent.targetTouches[0].pageX !== undefined) {
                e.pageX = e.originalEvent.targetTouches[0].pageX;
            }
            if (e.originalEvent.targetTouches[0] !== undefined && e.originalEvent.targetTouches[0].pageY !== undefined) {
                e.pageY = e.originalEvent.targetTouches[0].pageY;
            }
            return e;
        }
        function selectStar(sn) {
            zpBtn.each(function (i) {
                if(i<=sn){
                    $(this).addClass('cur');
                    zpTxt.html(zpDataList[sn]);
                }
            })
        }
        function touchSelectStars(e) {
            var $ys = $zp.find('.ymw_stars'),
                ysw = $ys.width(),ysl = $ys.offset().left;
            var posx = getPos(e).pageX - ysl;
            var slnum = parseInt(posx/ysw*10/2);
            var starIndex = slnum>4?4:slnum;
            zpBtn.removeClass('cur');
            selectStar(starIndex < 0 ? 0 : starIndex);
            if ($(".ymw_zp_pf_wd .tpbtn").eq(0).hasClass("cur")) {
                return false;
            }

            $ys.submitMyScore(starIndex);
            if(!$(".ymw_zp_pf_wd .tpbtn").eq(1).hasClass("cur"))
            {
                $(".ymw_zp_pf_wd .tpbtn").eq(1).addwanFun();
            }
        }
        $zp.find('.ymw_stars').on({
            'touchstart': function (e) {
                if ($(".ymw_zp_pf_wd").attr("date-selltime") == "未上市") { alert("该游戏未上市！"); return false; }
                $.ajax({
                    type: "GET", dataType: "jsonp", url: "http://i.gamersky.com/api/logincheck",
                    success: function (responseJson) {
                        if (responseJson.status == "ok") {                           
                            touchSelectStars(e);
                        }
                        else {
                            $(".ymw-loginpop-btns").insertYmwLoginPop();
                            $(".ymw-loginpop-btns").QZloginForm();
                        }
                    }
                })
               
            },
            'touchmove':function (e) {
                e.preventDefault();
                touchSelectStars(e);
            },
            'touchend':function (e) {
                e.preventDefault();
                var selectIndex = $zp.find('a.cur').index();             
                //$('.ymw_stars').submitMyScore(selectIndex);
            }
        });
    },
    //导航+攻略集
    openAnPop:function () {
        var nowSt = $('body').scrollTop(),
            anp = $('.ymw-article-nav-pop');
        window.gsArticleNavSt = nowSt;
        var ww = $(window).width()/7.2,wh = $(window).height()-1.3*ww;
        anp.find('.ymw-anp-con').css('height',wh+'px');
        anp.addClass('cur');
        ymwapJs.closeScroll();
        $(window).resize(function () {
            ww = $(window).width()/7.2,wh = $(window).height()-1.3*ww;
            anp.find('.ymw-anp-con').css('height',wh+'px');
        });
        if($('#ymwAdBottom').length>0){
            $('#ymwAdBottom').hide();
        }
        var curTop = anp.find('a.cur').offset().top - anp.find('.ymw-anp-con-scroll').offset().top;
        anp.find('.ymw-anp-con-scroll').scrollTop(curTop);
    },
    closeAnPop:function () {
        var anp = $('.ymw-article-nav-pop');
        anp.find('.ymw-anp-con-scroll').scrollTop(0);
        anp.removeClass('cur');
        ymwapJs.openScroll();
        $('html,body').animate({scrollTop:window.gsArticleNavSt}, 0);
        if($('#ymwAdBottom').length>0){
            $('#ymwAdBottom').show();
        }
    },
    articleNav:function () {
        var isRenderSel = true;
        function renderSelect() {
            var $an = $('.ymw-article-nav-in'),anpDom = '';
            anpDom += '<div class="ymw-article-nav-pop"><div class="ymw-anp-tit"><i></i>文章导航</div><a class="ymw-anp-close"></a><div class="ymw-anp-con"><div class="ymw-anp-con-scroll">';
            anpDom += createPop();
            function createPop() {
                var dataSel = $('.ymw-article-nav-select'),
                    dataCon = dataSel.html(),anbtnDom,
                    curTxt = dataSel.find('option:selected').html(),
                    curVal = dataSel.find('option:selected').val();
                anbtnDom = '<a class="ymw-article-nav-in-d"><span>'+curTxt+'</span></a>';
                $(anbtnDom).insertAfter($an.find('.ymw-article-nav-in-t'));
                var navList = '',
                    oriUrl = window.location.href,exTe = /\.(shtml)/i,
                    ccId = $(".cy_comment").attr("data-sid"),exnm = '.html';
                if(exTe.test(oriUrl)){
                    exnm = '.shtml';
                }
                navList += '<ul>';
                dataSel.find('option').each(function (i,item) {
                    var $this = $(this),onVal = $this.val(),onHtml = $this.html(),onUrl;
                    if(onVal == 1){
                        onUrl = 'Content-'+ccId+exnm;
                    }else{
                        onUrl = 'Content-'+ccId+'_'+onVal+exnm;
                    }
                    if(onVal == curVal){
                        navList += '<li><a class="cur" href="'+onUrl+'">'+onHtml+'</a></li>';
                    }else{
                        navList += '<li><a href="'+onUrl+'">'+onHtml+'</a></li>';
                    }
                });
                navList += '</ul>';
                return navList;
            }
            anpDom += '</div></div></div>';
            $('body').append(anpDom);
            var anBtn = $an.find('.ymw-article-nav-in-d'),anp = $('.ymw-article-nav-pop');
            anBtn.on('click',ymwapJs.openAnPop);
            anp.find('.ymw-anp-close').on('click',ymwapJs.closeAnPop);

            var locationTimer;
            anp.find('.ymw-anp-con-scroll').find('a').on('click',function (e) {
                var thisHref = $(this).attr('href');
                var u = navigator.userAgent, app = navigator.appVersion;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
                ymwapJs.closeAnPop();
                if (isAndroid == true) {
                    e.preventDefault();
                    clearTimeout(locationTimer);
                    locationTimer = setTimeout(function () {
                        window.location =  thisHref;
                    },200);
                }
            });
        }
        $('.ymw-article-nav-select').find('option').each(function () {
            if($(this).html().length == 0){
                isRenderSel = false;
            }
        });
        if(isRenderSel){
            renderSelect();
        }else{
            $('.ymw-article-nav-in').remove();
        }

    },
    gsSCMfunc:function () {
        //攻略集
        function strategyCollect() {
            var gl = $('.gs_strategy_collect'),
                glBtn = gl.find('.gs_sc_item_btn'),
                glItem = gl.find('.gs_sc_item');
            glItem.each(function () {
               $(this).find('li').each(function () {
                   var aDom = $(this).find('a');
                   aDom.attr('href',aDom.attr('waphref'));
                   aDom.removeAttr('target');
               });
            });
            gl.find('.gs_sc_item_more').each(function(){
                var aDom = $(this);
                aDom.attr('href',aDom.attr('waphref'));
                aDom.removeAttr('target');
            });
            glBtn.on('click',function () {
                var $this = $(this);
                if($this.attr('data-clk') === 'true'){
                    glItem.removeClass('cur');
                    glBtn.attr('data-clk','false');
                }else{
                    glItem.removeClass('cur');
                    $this.closest('.gs_sc_item').addClass('cur');
                    glBtn.attr('data-clk','false');
                    $this.attr('data-clk','true');
                }
            });
            glBtn.attr('data-clk','false');
            glItem.eq(0).addClass('cur').find('.gs_sc_item_btn').attr('data-clk','true');
        }
        var $gsSCM = $('#gsSCM');
        $gsSCM.find('.collectbox').show();
        if($gsSCM.find('.gs_sc_item').length<=0){
            $gsSCM.remove();
        }else{
            strategyCollect();
        }
    },
    gsListFunc:function () {
        var glList = $('#gsGlList');
        function strategyCollect() {
            var gl = $('.gs_strategy_collect'),
                glBtn = gl.find('.gs_sc_item_btn'),
                glItem = gl.find('.gs_sc_item');
            gl.find('.gs_sc_tit').hide();
            glItem.each(function () {
                $(this).find('li').each(function () {
                    var aDom = $(this).find('a');
                    aDom.attr('href',aDom.attr('waphref'));
                    aDom.removeAttr('target');
                });
            });
            gl.find('.gs_sc_item_more').each(function(){
                var aDom = $(this);
                aDom.attr('href',aDom.attr('waphref'));
                aDom.removeAttr('target');
            });
            function autoMove() {
                var itemCur = gl.find('.gs_sc_item.cur');
                if(itemCur.length>0){
                    var sti = $('body').scrollTop() > $('html').scrollTop()?$('body').scrollTop():$('html').scrollTop();
                    var dt = itemCur.offset().top,st = sti + 46;
                    if(dt < st){
                        $('html,body').animate({scrollTop:dt - 46},100);
                    }
                }
            }
            glBtn.on('click',function () {
                var $this = $(this),slHeight;
                if($this.attr('data-clk') === 'true'){
                    glBtn.attr('data-clk','false');
                    glItem.removeClass('cur');
                }else{
                    glItem.removeClass('cur');
                    glBtn.attr('data-clk','false');
                    $this.attr('data-clk','true');
                    $this.closest('.gs_sc_item').addClass('cur');
                }
                autoMove()
                slHeight = gl.closest('.swiper-slide').height()
                gl.closest('.swiper-wrapper').css('height',slHeight+'px');
            });
            glBtn.attr('data-clk','false');
            glItem.eq(0).addClass('cur').find('.gs_sc_item_btn').attr('data-clk','true');
        }
        var $gsSCM = $('#gsGlListSCM');
        $gsSCM.find('.collectbox').show();
        if($gsSCM.find('.gs_sc_item').length<=0){
            $gsSCM.closest('.swiper-slide').remove();
            glList.attr('data-navnum',2);
            glList.find('.ymwTabNav').find('.swiper-slide').eq(0).remove();
        }else{
            strategyCollect();
            var slHeightInit = $('.gs_strategy_collect').closest('.swiper-slide').height();
            $('.gs_strategy_collect').closest('.swiper-wrapper').css('height',slHeightInit+'px');
        }
    },
    getHotsCount:function () {
        if($('.gsShowHots').length>0){
            $('.gsShowHots').each(function () {
                var $ul = $(this);
                $ul.find('li').each(function () {
                    var $this = $(this),
                        $hid = $this.find('.gsHots'),
                        hid = $hid.data('hots'),
                        isld = $hid.attr('data-isld');
                    if(isld == 'false'){

                        $.ajax({
                            type: "GET",
                            dataType: "jsonp",
                            url: "http://click.gamersky.com/Common/GetHits.aspx",
                            data: {
                                id: hid,
                                script: "3"
                            },
                            success: function (data) {
                                $hid.html('人气：'+data.hits);
                                $hid.attr('data-isld',true);
                            }
                        });
                    }
                })
            })
        }
    },
	doJs:function(th,fun){
		if(!th.length == 0){
			fun&&fun();
		}
	}
}
//调用数据
var ymwapDataJs={   
    getCmnums:function(){

        var cycm = "";
        $(".cy_comment").each(function () {
            if (cycm != "") {
                cycm = cycm + ","
            }
            cycm = cycm + $(this).attr("data-sid");
        });
        if (cycm != "") {
            $.ajax({
                type: "GET",
                url: "http://cm.gamersky.com/commentapi/count",
                dataType: "jsonp",
                data: {
                    topic_source_id: cycm
                },
                success: function (responseJson) {
                    $(".cy_comment").each(function () {
                        if (responseJson.result.hasOwnProperty($(this).attr("data-sid"))) {
                            var cmobj = responseJson.result[$(this).attr("data-sid")];
                            $(this).text(cmobj.comments);
                        }
                    });
                }
            });
        }
    }, 
    newsloadmoreFunc:function(){
        $ymwLdMoreBtn = $('.newsloadmore');
        $ymwLdMoreBtn.on('touchend',ymwLdMoreBtnFun);
        function ymwLdMoreBtnFun(event) {
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var $ulist = $('.ymwNews');
            var templatekey = $ulist.attr("templateKey");
            var page = parseInt($ulist.attr("data-page")) + 1;
            var nodeid = $ulist.attr("data-nodeId");
            var id = $(".ymwNews").find('li').eq(-1).attr("data-id");
            var nodes = $('.ymwNews').attr("nodes");
            var jsondata = {
                type: "getwaplabelpage", isCache: true, cacheTime: 60, templatekey: templatekey, id: id, nodeId: nodeid, page: page, nodes: nodes
            };
            $.ajax({
                type: 'GET',
                url: "http://db2.gamersky.com/LabelJsonpAjax.aspx",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                dataType: "jsonp",
                beforeSend:function(){                    
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function (data) {
                    $ulist.attr("data-page", page);
                    if (data.body.indexOf("没有任何记录") > 0) {
                        $this.attr('data-txt','全部加载完成');
                    }
                    else {
                        $(data.body).insertBefore($this);
                    }
                },
                complete:function(){
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    ymwapDataJs.getCmnums();
                    $this.on('touchend',ymwLdMoreBtnFun);              
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
            return false;
        }
    },
    //加载更多列表
    ymwListMoreFun: function () {
        var $ul = $('.ymwListMore');
        $ul.each(function () {
            var $this = $(this),
                ulist = $this.find('li'),
                ldnum = $this.attr('data-listshow'),
                lmbtn = $this.find('.ymwListMoreBtn'),
                url = lmbtn.attr('data-link'),
                txt = lmbtn.attr('data-txt');
            for (var i = ldnum; i < ulist.length; i++) {
                ulist.eq(i).hide();
            };
            lmbtn.on('click', function (event) {
                event.preventDefault();
                for (var i = ldnum; i < ulist.length; i++) {
                    ulist.eq(i).show();
                };
                $(this).attr('href', url).off().find('span').html(txt);
            });
        });
    },
    ymwSpecialmoreFun:function () {
        $btn = $('.specialmore');
        $btn.each(function(){
            $(this).on('touchend',specialmoreFun);
        });
        function specialmoreFun(event) {
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var wapList = $this.closest('.speciallist');
            var templatekey = wapList.attr("data-templatekey");
            var page = parseInt(wapList.attr("data-page")) + 1;
            var specialid = wapList.attr("data-specialid");
            var isspecialId = wapList.attr("data-isSpecialId");
            var jsondata = {
                type: "getwapspecialpage",
                isCache: true,
                cacheTime: 60,
                specialId: specialid,
                isSpecialId: isspecialId,
                templatekey: templatekey,
                page: page
            };
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://db2.gamersky.com/LabelJsonpAjax.aspx",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                beforeSend: function() {
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function(data) {
                    if (data.status = 'ok') {
                        wapList.attr("data-page", page);
                        if (data.totalPages <= page) {
                            if (data.totalPages == page) {
                                $(data.body).insertBefore($this);
                            }
                            $this.attr('data-txt','全部加载完成');
                        } else {
                            if (data.totalPages > page) {
                                $(data.body).insertBefore($this);                                                               
                            }
                        }
                        ymwapJs.getHotsCount();
                    }
                },
                complete: function() {
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    var h = $this.closest('.swiper-slide').height() + 'px';
                    $this.closest('.swiper-wrapper').css('height',h);
                    $this.on('touchend', specialmoreFun);
                },
                error: function() {
                    if (navigator.userAgent.indexOf('UCBrowser') > -1) {
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
        }
    },
    ymwKulistloadmoreFun:function () {
        $btn = $('.kulistloadmore');
        $btn.each(function(){
            $(this).on('touchend',KulistloadmoreFun);
        });
        function KulistloadmoreFun(event) {
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var wapList = $this.closest(".wapList");
            var len = wapList.find("li").length;
            var nodeid = wapList.attr("data-nodeid");
            var modeid = wapList.attr("data-modeid");
            var Keyword = wapList.attr("Keyword");
            var gamelib = wapList.attr("data-gamelid");
            var page = parseInt(wapList.attr("data-page")) + 1;
            var type = wapList.attr('data-type');
            var templata = "{PE.Label id='获取wap游戏内容页相关内容' gameLib='" + gamelib + "' page='" + page + "' size='10' nodeid='" + nodeid + "' specialid='' Keyword='" + Keyword + "' ModelId='" + modeid + "' type='" + type + "' /}";
            var data = {
                isCache: false, cacheTime: 0, templateKey: "", templata: templata
            };
            $.ajax({
                type: 'GET',
                url: "http://db2.gamersky.com/WapAjax.aspx",
                data: {
                    json: JSON2.stringify(data), jsondata: "putlabelbody"
                },
                dataType: "jsonp",
                beforeSend: function() {
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function(data) {
                    wapList.attr("data-page", page);
                    if (len < 10 * (page - 1)) {
                        $this.attr('data-txt','全部加载完成');              
                    }
                    else {
                        $(data.body).insertBefore($this);
                    }
                },
                complete: function() {
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    var h = $this.closest('.swiper-slide').height() + 'px';
                    $this.closest('.swiper-wrapper').css('height',h);
                    $this.on('touchend', KulistloadmoreFun);
                    ymwapDataJs.getCmnums();
                },
                error: function() {
                    if (navigator.userAgent.indexOf('UCBrowser') > -1) {
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
        }
    },
    ymwNewglldmoreFun:function () {
        $btn = $('.glnewmore');
        $btn.each(function(){
            $(this).on('touchend',NewglldmoreFun);
        });
        function NewglldmoreFun(event) {
            event.preventDefault();
            var $this = $(this);
            var page = parseInt($this.attr("data-page")) + 1;
            var templata = "{PE.Label id=\"获取Wap攻略推荐列表\" page=\"" + page + "\" size=\"20\" type=\"new\" zm=\"\" /}";
            var data = {
                isCache: false, cacheTime: 0, templateKey: "", templata: templata
            };
            $.ajax({
                type: 'GET',
                url: "http://db2.gamersky.com/WapAjax.aspx",
                data: {
                    json: JSON2.stringify(data), jsondata: "putlabelbody"
                },
                dataType: "jsonp",
                beforeSend: function() {
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function(data) {
                    $this.attr("data-page", page);
                    $(data.body).insertBefore($this);                    
                },
                complete: function() {
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    var h = $this.closest('.swiper-slide').height() + 'px';
                    $this.closest('.swiper-wrapper').css('height',h);
                    $this.on('touchend', NewglldmoreFun);
                },
                error: function() {
                    if (navigator.userAgent.indexOf('UCBrowser') > -1) {
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
            return false;
        }
    },
    searchFun: function () {
        var $swrap = $('#ymwSearchIn'),
        defSecTxt = "输入搜索内容";
        $swrap.each(function(){
            var $this = $(this),
            $searchBtn = $this.find('.ymwSearchBtn'),
            $sipt = $this.find('.ymw-search-ipt');
            $sipt.on("keypress",secIptFun);
            $searchBtn.on("tap", secBtnFun);          
            $sipt.on({
                'focus':function(){
                    if($(this).val()==defSecTxt){
                        $(this).val('');
                    }
                },
                'blur':function(){
                    if($(this).val()==''){
                        $(this).val(defSecTxt);
                    }
                }
            });
        });
        
        function secIptFun(event,ipt){
            if (event.which == 13 && !event.shiftKey) {
                event.preventDefault();
                goSearch($(this));
            }
        }
        function secBtnFun(event,ipt){            
            event.preventDefault();
            goSearch($(this).parent().find('.ymw-search-ipt'));                      
        }
        function goSearch(ipt){
            var searchText = ipt.val();
            var node = $(".ymw-search-nav .cur").attr("date-node");
            if (typeof(node) == "undefined") {
                node = "all";
            }
            if (searchText != "" && searchText != defSecTxt) {
                searchText = encodeURIComponent(searchText.replace("<", "").replace(">", ""));
                window.location.href = "http://wap.gamersky.com/" + node + "/search.html?keyword=" + searchText + "";
            }
        }
    },
    wapSearchMoreFunc: function () {
        $wapSMBtn = $('.wapSearchButton');
        $wapSMBtn.on('touchend', wapSearchMoreBtn);
        function wapSearchMoreBtn(event){
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var wapList = $(".wapList");
            var dataUrl = wapList.attr("data-dataurl");
            var pageSize = wapList.attr("data-pagesize");
            var type = wapList.attr("data-type");
            var page = parseInt(wapList.attr("data-page")) + 1;
            var totalPage = parseInt(wapList.attr("date-totalpage"));
            var excludeItems = wapList.attr("excludeItems");
            var keyword = wapList.attr("keyword");
            $.ajax({
                type: "GET",
                url: dataUrl,
                dataType: "html",
                data: {
                    page: page,
                    pageSize: pageSize,
                    type: type,
                    excludeItems: excludeItems,
                    keyword: keyword
                },
                beforeSend: function() {
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function (html) {
                    wapList.attr("data-page", page);
                    if (totalPage < page) {
                        $this.attr('data-txt','全部加载完成'); 
                    }
                    else {
                        wapList.append(html);
                        ymwapDataJs.getCmnums();
                    }
                },
                complete: function() {
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    $this.on('touchend', wapSearchMoreBtn);
                    ymwapJs.doJs($('.ymw-list-three'),ymwapJs.listThree('.ymw-list-three'));
                    setTimeout(function(){
                        ymwapJs.listThree('.ymw-list-three');
                        resizeSwpH($this);
                    },2000); 
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                    console.log('错误')
                }
            });
        }
    }, 
    waploadmoreFunc:function(){
        $ymwLdMoreBtn = $('.wapDataButton');
        $ymwLdMoreBtn.on('click',ymwLdMoreBtnFun);
        function ymwLdMoreBtnFun(event) {
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var $ulist = $(this).closest('.wapList');
            var templatekey = $ulist.attr("templateKey");
            var page = parseInt($ulist.attr("data-page")) + 1;
            var nodeid = $ulist.attr("data-nodeId");
            var id = $ulist.find('li').eq(-1).attr("data-id");
            var nodes = $ulist.attr("nodes");
            var jsondata = {
                type: "getwaplabelpage", isCache: true, cacheTime: 60, templatekey: templatekey, id: id, nodeId: nodeid, page: page, nodes: nodes
            };
            $.ajax({
                type: 'GET',
                url: "http://db2.gamersky.com/LabelJsonpAjax.aspx",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                dataType: "jsonp",
                beforeSend:function(){                    
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function (data) {
                    $ulist.attr("data-page", page);
                    if (data.body.indexOf("没有任何记录") > 0) {
                        $this.attr('data-txt','全部加载完成');
                    }
                    else {
                        $(data.body).insertBefore($this);
                        ymwapDataJs.getUserScore();
                    }
                },
                complete:function(){
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    ymwapDataJs.getCmnums();
                    var h = $this.closest('.swiper-slide').height() + 'px';
                    $this.closest('.swiper-wrapper').css('height',h);
                    $this.on('touchend',ymwLdMoreBtnFun);              
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
            return false;
        }
    }, 
    waploadmoreAFunc:function(){
        $ymwLdMoreBtn = $('.wapDataButtonA');
        $ymwLdMoreBtn.on('touchend',ymwLdMoreBtnFun);
        function ymwLdMoreBtnFun(event) {
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var $ulist = $(this).closest('.wapListA');
            var templatekey = $ulist.attr("templateKey");
            var page = parseInt($ulist.attr("data-page")) + 1;
            var nodeid = $ulist.attr("data-nodeId");
            var id = $ulist.find('li').eq(-2).find('a').eq(-1).attr("data-id");
            var nodes = $ulist.attr("nodes");
            var jsondata = {
                type: "getwaplabelpage", isCache: true, cacheTime: 60, templatekey: templatekey, id: id, nodeId: nodeid, page: page, nodes: nodes
            };
            $.ajax({
                type: 'GET',
                url: "http://db2.gamersky.com/LabelJsonpAjax.aspx",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                dataType: "jsonp",
                beforeSend:function(){                    
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function (data) {
                    $ulist.attr("data-page", page);
                    if (data.body.indexOf("没有任何记录") > 0) {
                        $this.attr('data-txt','全部加载完成');
                    }
                    else {
                        $(data.body).insertBefore($this.prev());
                        $this.prev().remove();
                    }
                },
                complete:function(){
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt')); 
                    $this.on('touchend',ymwLdMoreBtnFun); 
                    ymwapJs.listThree('.ymw-list-three');
                    resizeSwpH($this);                  
                    isImgLoad($(this).closest('.wapListA').find('img'),function(){
                        ymwapJs.listThree('.ymw-list-three');
                        resizeSwpH($this);                     
                    });
                    setTimeout(function(){
                        ymwapJs.listThree('.ymw-list-three');
                        resizeSwpH($this);
                    },2000);  
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
            return false;
        }
    }, 
    waploadmoreDHFunc:function(){
        $ymwLdMoreBtn = $('.wapDataButtonDH');
        $ymwLdMoreBtn.on('touchend',ymwLdMoreBtnDHFun);
        function ymwLdMoreBtnDHFun(event) {
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var $ulist = $(this).closest('.wapList');
            var templatekey = $ulist.attr("templateKey");
            var page = parseInt($ulist.attr("data-page")) + 1;
            var nodeid = $ulist.attr("data-nodeId");
            var id = $ulist.find('li').eq(-1).attr("data-id");
            var nodes = $ulist.attr("nodes");
            var templata = "{PE.Label id=\"获取Wap动画列表\" page=\"" + page + "\" size=\"20\" type=\"red\" /}";
            var data = {
                isCache: false, cacheTime: 0, templateKey: "", templata: templata
            };
            $.ajax({
                type: 'GET',
                url: "http://db2.gamersky.com/WapAjax.aspx",
                data: {
                    json: JSON2.stringify(data), jsondata: "putlabelbody"
                },
                dataType: "jsonp",
                beforeSend:function(){                    
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function (data) {
                    $ulist.attr("data-page", page);
                    if (data.body.indexOf("没有任何记录") > 0) {
                        $this.attr('data-txt','全部加载完成');
                    }
                    else {
                        $(data.body).insertBefore($this);
                    }
                },
                complete:function(){
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    ymwapDataJs.getCmnums();
                    $this.on('touchend',ymwLdMoreBtnDHFun);   
                    resizeSwpH($ulist);           
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
            return false;
        }
    }, 
    wapConMoreFunc:function(){
        $ymwLdMoreBtn = $('.wapContentButton');
        $ymwLdMoreBtn.on('touchend',wapConMoreFunc);
        function wapConMoreFunc(event) {
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var $ulist = $(this).closest('.wapList');
            var templatekey = $ulist.attr("templateKey");
            var page = parseInt($ulist.attr("data-page")) + 1;
            var nodeid = $ulist.attr("data-nodeId");
            var id = $this.attr("data-generalid");
            var jsondata = {
                isCache: false, cacheTime: 0, templateKey: templatekey, id: id, page: page
            };
            $.ajax({
                type: 'GET',
                url: "http://db2.gamersky.com/TemplateJsonp.aspx",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                dataType: "jsonp",
                beforeSend:function(){                    
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function (data) {
                    if (data.status = 'ok') {
                        $ulist.attr("data-page", page);
                        if (page >= data.totalPages) {
                            $this.attr('data-txt','全部加载完成');
                            if (page == data.totalPages) {
                                $(data.body).insertAfter($ulist.find('li').last());
                            }
                        }
                        else {
                            $(data.body).insertAfter($ulist.find('li').last());
                        }
                    }
                },
                complete:function(){
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    ymwapDataJs.getCmnums();
                    $this.on('touchend',wapConMoreFunc);
                    //ymwapJs.doJs($('.ymw-list-pic'),ymwapJs.listPic);
                    resizeSwpH($ulist);          
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
            return false;
        }
    },
    tagldmoreFunc:function(){
        $wapTagBtn = $('.wapTagButton');
        $wapTagBtn.on('touchend', wapTagMoreBtn);
        function wapTagMoreBtn(event){
            event.preventDefault();
            var $this = $(this);
            var ttxt = $this.attr('data-txt');
            var wapList = $this.parent().find(".wapList");
            var dataUrl = wapList.attr("data-dataurl");
            var pageSize = wapList.attr("data-pagesize");
            var type = wapList.attr("data-type");
            var sort = wapList.attr("data-sort");
            var page = parseInt(wapList.attr("data-page")) + 1;
            var totalPage = parseInt(wapList.attr("date-totalpage"));
            $.ajax({
                type: "GET",
                url: dataUrl,
                dataType: "html",
                data: {
                    page: page,
                    pageSize: pageSize,
                    type: type,
                    sort: sort,
                },
                beforeSend: function() {
                    $this.addClass('ymw-more-loading').find('span').html('正在加载');
                    $this.off();
                },
                success: function (html) {
                    wapList.attr("data-page", page);
                    if (totalPage < page) {
                        $this.attr('data-txt','全部加载完成'); 
                    }else if(totalPage == page){
                        $this.attr('data-txt','全部加载完成'); 
                        wapList.append(html);
                        ymwapDataJs.getCmnums();
                    }else {
                        wapList.append(html);
                        ymwapDataJs.getCmnums();
                    }
                },
                complete: function() {
                    $this.removeClass('ymw-more-loading');
                    $this.find("span").html($this.attr('data-txt'));
                    $this.on('touchend', wapTagMoreBtn);
                    ymwapJs.doJs($('.ymw-list-three'),ymwapJs.listThree('.ymw-list-three'));
                    resizeSwpH(wapList);
                },
                error:function(){
                    if(navigator.userAgent.indexOf('UCBrowser') > -1){
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                    console.log('错误')
                }
            });
        }
    },
    getUserScore:function(){
        $('.ymwUserScoreShow').each(function() {
            var $this = $(this),
                gid = $this.attr('data-generalId');
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://i.gamersky.com/apirating/init",
                data: {
                    'generalId': gid,
                    'ratingType': 0,
                    'Action': "init"
                },
                success: function(data) {
                    if (data.hasOwnProperty("status")) {
                        switch (data.status) {
                            case "err":
                                console.log("提交" + tips + "错误！");
                                break;
                            case "existuser":
                            case "existip":
                                console.log("已" + tips + "！");
                                break;
                            default:
                                break;
                        }
                    } else {
                        //$this.find('i').html('('+data.Times+'人参与)');
                        var jsnum = Math.floor(data.Average);
                        $this.addClass('ymw-star'+ jsnum).html('<span>('+data.Times+'人参与)</span>')
                        //$this.html((data.Average == 10 ? "10" : data.Average.toFixed(1)) + '分<b>('+data.Times+')</b>');
                    }
                }
            });
        });
    }
}
ymwapJs.htmlAndroidiOs();
ymwapJs.doJs($('#ymwHeaderSwp'),ymwapJs.indexNavNew);
ymwapJs.doJs($('#gsGlList'),ymwapJs.gsListFunc);
ymwapJs.doJs($('.ymw-meun'),ymwapJs.hMeun);
ymwapJs.doJs($('.ymwSlider'),ymwapJs.sliderFun);
ymwapJs.doJs($('.ymwScroImg'),ymwapJs.scrollImgFun);
//ymwapJs.doJs($('.ymw-list-pic'),ymwapJs.listPic);
ymwapJs.doJs($('.ymw-list-three'),ymwapJs.listThree('.ymw-list-three'));
ymwapJs.doJs($('.ymwTab'),ymwapJs.tabFun);
ymwapJs.doJs($('.ymwTabNavFixed'),ymwapJs.fixTabNav);
ymwapJs.doJs($('.ymwSxbtn'),ymwapJs.sxFun);
ymwapJs.doJs($('.ymwJtImg'),ymwapJs.jtFunc);
ymwapJs.doJs($('.ymw-autoHide'),ymwapJs.zkFunc);
ymwapJs.doJs($('.ymw-pf-btn'),ymwapJs.pfFunc);
ymwapJs.doJs($('.ymw-juji'),ymwapJs.dhsets);
ymwapJs.doJs($('.ymw-glal-list-2017'),ymwapJs.glFunc);
ymwapJs.doJs($('.ymwsRespage'),ymwapJs.searchPageFunc);
ymwapJs.doJs($('.ymwSyLink'),ymwapJs.SyLinkFun);
ymwapJs.doJs($('.ymwPzData'),ymwapJs.ymwPzDataFun);
ymwapJs.doJs($('.ymwListJx'),ymwapJs.ymwListJxFunc);
ymwapJs.doJs($('.ymwListZone'),ymwapJs.ymwListZoneFunc);
ymwapJs.doJs($('.ymsSyDlStarsWrap'),ymwapJs.ymwsyScoreFun);
ymwapJs.doJs($('#ymwZpAreaStar'),ymwapJs.zpFunc);
ymwapJs.doJs($('.ymw-article-nav-in'),ymwapJs.articleNav);
ymwapJs.doJs($('#gsSCM'),ymwapJs.gsSCMfunc);

ymwapJs.doJs($('.newsloadmore'),ymwapDataJs.newsloadmoreFunc);
ymwapJs.doJs($('.ymwListMore'),ymwapDataJs.ymwListMoreFun);
ymwapJs.doJs($('.specialmore'),ymwapDataJs.ymwSpecialmoreFun);
ymwapJs.doJs($('.kulistloadmore'),ymwapDataJs.ymwKulistloadmoreFun);
ymwapJs.doJs($('.glnewmore'),ymwapDataJs.ymwNewglldmoreFun);
ymwapJs.doJs($('#ymwSearchIn'),ymwapDataJs.searchFun);
ymwapJs.doJs($('.wapSearchButton'),ymwapDataJs.wapSearchMoreFunc);
ymwapJs.doJs($('.wapDataButton'),ymwapDataJs.waploadmoreFunc);
ymwapJs.doJs($('.wapDataButtonA'),ymwapDataJs.waploadmoreAFunc);
ymwapJs.doJs($('.wapDataButtonDH'),ymwapDataJs.waploadmoreDHFunc);
ymwapJs.doJs($('.wapContentButton'),ymwapDataJs.wapConMoreFunc);
ymwapJs.doJs($('.wapTagButton'), ymwapDataJs.tagldmoreFunc);
ymwapJs.doJs($('.ymwUserScoreShow'),ymwapDataJs.getUserScore);
ymwapJs.getHotsCount();

$(window).resize(function(){
	//ymwapJs.doJs($('.ymw-list-pic'),ymwapJs.listPic);
    ymwapJs.doJs($('.ymw-list-three'),ymwapJs.listThree('.ymw-list-three'));
    ymwapJs.doJs($('.ymwSxbtn'),ymwapJs.sxFun);
    ymwapJs.doJs($('.ymwJtImg'),ymwapJs.jtFunc);
    ymwapJs.doJs($('.ymwsRespage'),ymwapJs.searchPageFunc);
    ymwapJs.doJs($('#ymsSyDlStarsWrap'),ymwapJs.ymwsyScoreFun);
});
ymwapJs.qukTo();


function lockHtml(){
    var H = $('html'),w1,w2;
    w1 = $(window).width();
    H.addClass('html-lock-test');
    w2 = $(window).width();
    H.removeClass('html-lock-test');
    $("<style type='text/css' id='lockhtmlstyle'>.htmllock-margin{margin-right:" + (w2 - w1) + "px;overflow: hidden;}</style>").appendTo("head");
    H.addClass('htmllock-margin');
}
function unlockHtml(){
    var H = $('html');
    H.removeClass('htmllock-margin');
}
var t_img;
var isLoad = true;
function isImgLoad(myimg,callback){
    myimg.each(function(){
        if(this.height === 0){
            isLoad = false;
            return false;
        }
    });
    if(isLoad){
        clearTimeout(t_img);
        callback();
    }else{
        isLoad = true;
        t_img = setTimeout(function(){
            isImgLoad(callback);
        },200);
    }
}
function resizeSwpH(ths){
    var h = ths.closest('.swiper-slide').height() + 'px';
    ths.closest('.swiper-wrapper').css('height',h); 
}

function resizeVD() {    
    $(window).resize(function() {
        var ww = $(window).width() - 28,
            wh = ww * 9 / 16;
        $('.ymw-congame-dh-con-vd,.playArea').css({
            'width': ww + 'px',
            'height': wh + 'px'
        });
    });    
}
if($('.playArea').length>0 && $('.ymw-congame-dh-con').length < 1){
    resizeVD()
}
if($('.ymw-rel-infos').find('iframe').length>0){
    $(window).resize(function() {
        var ww = $(window).width() - 28,
            wh = ww * 9 / 16;
        $('.ymw-rel-infos').find('iframe').css({
            'width': ww + 'px',
            'height': wh + 'px'
        });
    }); 
}
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