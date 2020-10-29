let href = document.location.href.slice(37).replace(/\//g, '');
$("#content").load('/admin_helpers' + '/' + href + '/' + href + ".html");