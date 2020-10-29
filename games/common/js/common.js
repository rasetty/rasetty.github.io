let href = document.location.href.slice(32).replace(/\//g, '');
$("#content").load('/games' + '/' + href + '/' + href + ".html");