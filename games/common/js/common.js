let href = document.location.href.slice(37).replace(/\//g, '');
$("#content").load('/games' + '/' + href + '/' + href + ".html");