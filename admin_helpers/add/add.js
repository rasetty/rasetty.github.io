//основная функция
function start(){
//создание переменных для работы
	let token = document.getElementById('token').value,
		id = document.getElementById('id').value,
		interval = document.getElementById('interval').value * 1000,
		count = document.getElementById('count').value,
		begin = document.getElementById('begin').value,
		twenty = count / 20,
		remainder = count % 20,
		newBegin = begin - 1;
//проверка полноты данных
	if(token == ''){
		return alert('Не введен токен');
	};
	if(id == ''){
		return alert('Не указан id приглашаемого');
	};
	if(interval == ''){
		return alert('Не указан интервал');
	};
	if(count == ''){
		return alert('Не указано во сколько бесед добавить');
	};
	if(begin == ''){
		return alert('Не указано начало добавления');
	};
	alert('Добавление началось, будет закончено через ' + (Math.round( 20 * interval / 1000 / 60 * twenty) + (twenty * 60) ) + ' минут(ы)');
	//сама функция добавления
	function add(chat, id) {
		$.ajax({
			url: 'https://api.vk.com/method/messages.getChat',
			jsonp: 'callback',
			dataType: 'jsonp',
			data: {
				access_token: token,
				chat_id: chat,
				v: '5.45'
			},
			success: jsonp=> {
				if(jsonp.response.members_count > 499 ){
					return
				}
			}  
		});

		$.ajax({
			url: 'https://api.vk.com/method/messages.addChatUser',
			jsonp: 'callback',
			dataType: 'jsonp',
			data: {
				access_token: token,
				chat_id: chat,
				user_id: id,
				v: '5.45'
			},
			
			success: jsonp=> {
				var date = new Date();
				var time = date.getHours()+":"+date.getMinutes();
				console.log(jsonp, time);
				if(jsonp.response == 1 ){
					document.getElementById('log').innerHTML += 'Добавлен ' + time + '\n';
				}else{
					document.getElementById('log').innerHTML += 'Ошибка ' + time + '\n';
				}
			}  
		});
	}
//для запусков
	async function iter() {
		if (twenty <= 2){
			clearInterval(big);
		}
		let mini = await new Promise ( (resolve)=> {
			let timer = setInterval(()=>{
				if(((newBegin + (begin - 1)) % 21 == 0 && (newBegin + (begin - 1)) != 0) || (newBegin + (begin - 1) > count)){
					clearInterval(timer);
					resolve();			
				}else{
					add(newBegin, id);
					newBegin++;
				}
			}, interval);
		twenty--;
		newBegin++;
	})}
//биг запускает рассылку каждый час мини на 20 человек
	let big = setInterval(iter, 3660000);//3660000
	iter();
}
//удаление данных
function clear(){
	localStorage.clear();
	window.location.reload();
}
//сохранение данных
function save(){
	localStorage.setItem('tokenS', document.getElementById('token').value); 
	localStorage.setItem('intervalS', document.getElementById('interval').value); 
	localStorage.setItem('countS', document.getElementById('count').value);
	localStorage.setItem('beginS', document.getElementById('begin').value); 
}
//восстановление сохраненных данных
document.getElementById('token').value = localStorage.getItem('tokenS');
document.getElementById('count').value = localStorage.getItem('countS');
document.getElementById('begin').value = localStorage.getItem('beginS');
document.getElementById('interval').value = localStorage.getItem('intervalS');
//создание событий
document.getElementById('start').onclick = start;
document.getElementById('saveData').onclick = save;
document.getElementById('clearData').onclick = clear;
