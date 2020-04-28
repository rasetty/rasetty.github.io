//появление и скрытие меню на телефоне
let open = document.getElementById('open'),
	panel = document.getElementById('panel'),
	temp = 1;
open.onclick = function(){
	if(temp == 1){
		panel.removeAttribute('class');
		temp = 0;
		//тут пишем и закрывалку и стоп зщакрывалки
		$(document).mouseup(function (e){
   			let container = $("#menu");
    		if (container.has(e.target).length === 0){
        		panel.setAttribute('class', 'hide');
        		temp = 1;
    		}
		});
		//
	}else{
		panel.setAttribute('class', 'hide');
		temp = 1;
	}
}
//подгрузка html
let href = document.location.href.slice(40).replace(/\//g, '');
$(function(){
	$("#all").load('/admin_helpers' + '/' + href + '/' + href + ".html");
});