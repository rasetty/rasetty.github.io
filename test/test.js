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
//вк виджет
VK.init({apiId:7371175});

VK.Widgets.Auth("vk_auth",{
    width: "300px;",
    onAuth: function(data){
        person = data.uid;
        auth(person);
    }
});


function auth(person) {
	document.getElementById('all').removeAttribute('class');
    document.getElementById('vk_auth').setAttribute('class', 'hide');
    document.getElementById('alert').setAttribute('class', 'hide');
	$(function(){
		$("#all").load("ms.html");
	});
}