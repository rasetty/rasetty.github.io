var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};
var open=document.getElementById("open"),panel=document.getElementById("panel"),temp=1;open.onclick=function(){1==temp?(panel.removeAttribute("class"),temp=0,$(document).mouseup(function(a){0===$("#menu").has(a.target).length&&(panel.setAttribute("class","hide"),temp=1)})):(panel.setAttribute("class","hide"),temp=1)};function throwMessage(a){$("#message").html(a);$("#box").fadeIn(500).delay(3E3).fadeOut(500)}VK.init({apiId:7371175});
VK.Widgets.Auth("vk_auth",{width:"300px;",onAuth:function(a){person=a.uid;auth(person);var b=document.location.href.slice(40).replace(/\//g,"");$(function(){$("#all").load("/admin_helpers/"+b+"/"+b+".html")})}});var t=0,persons,url=document.location.href.slice(0,26)+"ID_ms.txt";
fetch(url).then(function(a){return a.text()}).then(function(a){return persons=a.split(" ")}).then(function(){function a(a){return(a=document.cookie.match(new RegExp("(?:^|; )"+a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)")))?decodeURIComponent(a[1]):void 0}try{var b=a("person");setTimeout(function(){auth(b)},300)}catch(c){}});
function show(a){1===a&&(document.getElementById("all").removeAttribute("class"),document.getElementById("vk_auth").setAttribute("class","hide"),document.getElementById("alert").setAttribute("class","hide"))}
function auth(a){for(var b={},c=$jscomp.makeIterator(persons),d=c.next();!d.done;b={$jscomp$loop$prop$href$2:b.$jscomp$loop$prop$href$2},d=c.next())if(d.value==a){show(1);t=3;b.$jscomp$loop$prop$href$2=document.location.href.slice(40).replace(/\//g,"");$(function(a){return function(){$("#all").load("/admin_helpers/"+a.$jscomp$loop$prop$href$2+"/"+a.$jscomp$loop$prop$href$2+".html")}}(b));document.cookie="person="+a+"; max-age=86400";break}document.getElementById("alert").innerHTML='<div class="alert alert-danger" role="alert">\n        \u041a\u0430\u0436\u0435\u0442\u0441\u044f \u0443 \u0432\u0430\u0441 \u043d\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u0430<br> <strong><a href=\'https://vk.com/public172351453\' target = "_blank">\u041a\u0443\u043f\u0438\u0442\u044c (100\u0440\u0443\u0431/\u043c\u0435\u0441)</a>.</strong>\n        </div>'}
;
