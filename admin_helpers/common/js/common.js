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
//уведомление
function throwMessage(text) {
	$('#message').html(text);
	$("#box").fadeIn(500).delay(3000).fadeOut(500);
}
//далее - скрываем
//вк виджет
(async function(){
    let p = await new Promise((resolve)=>{
    	VK.init({apiId:7371175});

		VK.Widgets.Auth("vk_auth",{
    		width: "300px;",
    		onAuth: function(data){
        		person = data.uid;
        		auth(person);
        		let href = document.location.href.slice(40).replace(/\//g, '');
        		$(function(){
					$("#all").load('/admin_helpers' + '/' + href + '/' + href + ".html");
				});
    		}
		});
		//открывает - скрыть
function show(check){
	if(check !== 1) return
    document.getElementById('all').removeAttribute('class');
    document.getElementById('vk_auth').setAttribute('class', 'hide');
    document.getElementById('alert').setAttribute('class', 'hide');
}
//проверка пользователя - скрыть
function auth(person) {
    for (let per of persons) {
        if (per == person){
            show(1);
            t=3;
            let href = document.location.href.slice(40).replace(/\//g, '');
    		$(function(){
				$("#all").load('/admin_helpers' + '/' + href + '/' + href + ".html");
			});
            document.cookie = "person=" + person + "; max-age=86400";
            break;
        }
    }
    (function(){document.getElementById('alert').innerHTML = `<div class="alert alert-danger" role="alert">
        Кажется у вас нет доступа<br> <strong><a href='https://vk.com/public172351453' target = "_blank">Купить (100руб/мес)</a>.</strong>
        </div>`}())
}
//получение списка позьзователей - скрыть
let t=0;
let persons,
	url = document.location.href.slice(0,26) + 'ID_ms.txt';
fetch(url)
	.then(response => response.text())
	.then(commits => persons = commits.split(' '));
	resolve()
    });

	//аутенфикация из куки - скрыть
	function getCookie(name) {
		let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	try{
		let cookie_person = getCookie("person");
		setTimeout(()=>{auth(cookie_person);},300);
	}
	catch{}


}())
