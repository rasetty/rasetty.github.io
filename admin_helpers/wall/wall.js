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
//основная функция
function start() {
//создание переменных для работы
	let comm = document.getElementById('comm').split('\n'),
		interval = document.getElementById('interval') * 1000,
		attachments,
		data,
		token = getElementById('token');
	for (let i = 0; i <= iForName; i++) {
		attachments = document.getElementById('link' + i).value + ',';
	}
	setInterval(()=>{
//создание рандомов
		var randComm = Math.floor(Math.random() * comm.length),
			randAtt = Math.floor(Math.random() * attachments.length);
//аякс запрос
		$.ajax({
			url: 'https://api.vk.com/method/newsfeed.get',
			jsonp: 'callback',
			dataType: 'jsonp',
			data: {
				access_token: token,
				filters: "post",
				count: 1,
				v: '5.103'
			},
		
			success: jsonp=>{ //саксесс
				console.log(jsonp);
				let firstPost = jsonp["response"]["items"][0], //первый пост полученный
					time = firstPost["date"], //время поста
					group = jsonp["response"]["groups"][0];//первая группа полученаая
				if (!data || time === data) data = time //проверка данных на существование
				if (time !== data) {
					data = 0;
					if (!firstPost["source_id"]) return //если поста не существует
					$.ajax({
					url: 'https://api.vk.com/method/wall.createComment',
					jsonp: 'callback',
					dataType: 'jsonp',
					data: {
						access_token: token,
						owner_id: firstPost["source_id"],
						post_id: firstPost["post_id"],
						attachments: !attachments ? "" : attachments[randAtt],
						message: comm[randComm],
						v: '5.103'
					}, success: (jsonp)=>{console.log(jsonp);document.getElementById('log').innerHTML += "Bot опубликовал новый комментарий: https://vk.com/wall" + firstPost["source_id"] + "_" + firstPost["post_id"] + " в группе: " + group["name"]}})
				}
			}
		})
	}, interval);
}
//сохранение данных
function save(){
	localStorage.setItem('tokenS', document.getElementById('token').value); 
	localStorage.setItem('textS', document.getElementById('text').value); 
	localStorage.setItem('intervalS', document.getElementById('interval').value); 
}
//восстановление сохраненных данных
document.getElementById('token').value = localStorage.getItem('tokenS');
document.getElementById('text').value = localStorage.getItem('textS');
document.getElementById('interval').value = localStorage.getItem('intervalS');
//события документа
document.getElementById('create').onclick = create;
document.getElementById('start').onclick = start;
document.getElementById('saveData').onclick = save;
document.getElementById('clearData').onclick = clear;