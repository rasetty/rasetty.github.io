//создание новых вложений
var iForName = 0;
function create(){
	if (iForName >= 10){
		return
	}else{
		iForName++;
	};
	var name = 'link' + iForName;
	var em = document.createElement('em');
	em.innerHTML = 'Ссылка на прикрепляемый файл';
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('class', 'input');
	input.setAttribute('id', name);
	var place = document.getElementById('js');
	place.appendChild(em);
	place.appendChild(input);
}
//создание переменных для работы
let message,
	token,
	count,
	interval,
	begin,
	link,
	N,
	countN,
	newDur;
//основная функция
function start(){
	if(t !==3) return
//сбор данных
	let newBegin = begin;
	message = document.getElementById('text').value;
	count = document.getElementById('count').value;
	begin = document.getElementById('begin').value;
	interval = document.getElementById('interval').value * 1000;
	token = document.getElementById('key').value;
	N  = document.getElementById('N').value;
	countN = document.getElementById('countN').value;
	if(checkbox.checked == true) newDur = 0;
	for (let i = 0; i <= iForName; i++) {
		link = document.getElementById('link' + i).value + ',';
	}
//провека полноты данных
	if (message == ''){
		return alert('Не введен текст рассылки');
	};
	if (token == ''){
		return alert('Не введен токен');
	};
	if (interval == ''){
		return alert('Не указан интервал');
	};
	if (count == ''){
		return alert('Не указано во сколько бесед слать');
	};
	if (begin == ''){
		return alert('Не указано начало рассылки');
	}
	if (countN == ''){
		return alert('Не указано количество рассылок');
	}
	if (countN != 1 && N == ''){
		return alert('Не указано время между рассылками');
	}
	//проверка на правильность
	if (N * 60 * 1000 * (countN - 1) >= 2147483648) {
		return alert('Слишком большое количество рассылок, укажите меньше или используйте "бесконечно"');
	}
	//закреп
	function pin(peer_id, id) {
		$.ajax({
		url: 'https://api.vk.com/method/messages.pin',
		jsonp: 'callback',
		dataType: 'jsonp',
		data: {
			access_token: token,
			peer_id: peer_id,
			message_id: id,
			v: '5.45'
		},
		success: jsonp=> console.log(jsonp)
		});
	}
//уведомление о начале
	alert('Рассылка началась, будет закончена через ' + (Math.round(count * interval / 60 / 1000)) + ' минут(ы)');
//функция отправления сообщений без закрепа
	function send(){
	
	function postMsg(peer_id, msg) {
		$.ajax({
		url: 'https://api.vk.com/method/messages.send',
		jsonp: 'callback',
		dataType: 'jsonp',
		data: {
			access_token: token,
			peer_id: peer_id,
			message: msg,
			attachment: link,             
			v: '5.45'
		},
		
		success: jsonp=> {
			/*if ($("#myCheckbox").prop("checked")true){
				pin(peer_id, jsonp.response)
			}*/
				var date = new Date();
				var time = date.getHours()+":"+date.getMinutes();

				console.log(jsonp, time)
			
		}
		    
		});
	}
		let timerId = setInterval(()=> {
			let peer_id = 2000000000 + newBegin++;
			postMsg(peer_id, message);
		}, interval);
		setTimeout(function() {
			console.log('Рассылка закончена');
			clearInterval(timerId);
		}, interval * count);
	}
//запуск и отключение
	let timer = setInterval(send, N * 60 * 1000);
	if(newDur != 0)
	setTimeout(function(){ 
		console.log('Рассылка отключена');
		clearInterval(timer); 
	}, N * 60 * 1000 * (countN - 1));
	send();
};
//удаление данных
function clear(){
	localStorage.clear();
	window.location.reload();
}
//сохранение данных
function save(){
	localStorage.setItem('keyS', document.getElementById('key').value); 
	localStorage.setItem('textS', document.getElementById('text').value); 
	localStorage.setItem('intervalS', document.getElementById('interval').value); 
	localStorage.setItem('countS', document.getElementById('count').value);
	localStorage.setItem('beginS', document.getElementById('begin').value);
	localStorage.setItem('NS', document.getElementById('N').value);
	localStorage.setItem('countNS', document.getElementById('countN').value);  
}
//восстановление сохраненных данных
document.getElementById('key').value = localStorage.getItem('keyS');
document.getElementById('text').value = localStorage.getItem('textS');
document.getElementById('count').value = localStorage.getItem('countS');
document.getElementById('begin').value = localStorage.getItem('beginS');
document.getElementById('interval').value = localStorage.getItem('intervalS');
document.getElementById('N').value = localStorage.getItem('NS');
document.getElementById('countN').value = localStorage.getItem('countNS');
//события документа
document.getElementById('create').onclick = create;
document.getElementById('start').onclick = start;
document.getElementById('saveData').onclick = save;
document.getElementById('clearData').onclick = clear;
//проверка чекбокса
let checkbox = document.getElementById('inf'),
	inf = document.getElementById('countN'),
	duration;
checkbox.onchange = function(){
	if(checkbox.checked == true){
		console.log('on');
		inf.value = 0;
		inf.setAttribute('readonly', true)
		duration = 0;
	}else{
		console.log('off');
		inf.removeAttribute('readonly');
	}
}