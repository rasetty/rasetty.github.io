const log = document.getElementById('log'),
	v = '5.126',
	cors = 'https://cors-anywhere.herokuapp.com/';
let base64,
	check = 1,
	sid = '',
	key = '';
//назначаем кнопки
document.getElementById('create').onclick = create;
document.getElementById('start').onclick = spam;
document.getElementById('saveData').onclick = save;
document.getElementById('clearData').onclick = clear;

//создание новых вложений
let iForName = 0;
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
function getData(){
	//сбор данных
	let text = document.getElementById('text').value,
		interval = document.getElementById('interval').value * 1000,
		token = document.getElementById('token').value,
		key = document.getElementById('key').value,
		groups = document.getElementById('groups').value,
		attachments;
	for (let i = 0; i <= iForName; i++) {
		attachments += document.getElementById('link' + i).value + ',';
	}
	//провека полноты данных
	if (text == ''){
		return alert('Не введен текст рассылки');
	};
	if (token == ''){
		return alert('Не введен токен');
	};
	if (interval == ''){
		return alert('Не указан интервал');
	};
	if (groups == ''){
		return alert('Не указаны паблики для спама');
	};

//делаем массив нормальных данных

	groups = groups.split("\n");//получаем массив ссылок
	//обрабатываем ссылки
	for(let group in groups){
		groups[group] = groups[group].replace(/\s/g, '');//удаляем лишние пробелы
		if(groups[group].slice(15, 19) == 'club'){//чекаем на клаб и берем ид
			groups[group] = groups[group].slice(19);
		}else if(groups[group].slice(15, 21) == 'public'){ //чекаем на паблик и берем ид
			groups[group] = groups[group].slice(21);
		}else{ //берем доменное имя
			groups[group] = groups[group].slice(15);
		}
	}
	//очищаем массив от пустых, если есть
	for (let i = 0; i <= groups.length; i++){
		if(groups[i] == ''){
			groups.splice(i, 1);
		}
	}
	//получаем массив идов
	(async function(){
		for(let group in groups){
			await new Promise((resolve)=>{
				$.ajax({
					url: 'https://api.vk.com/method/groups.getById',
					jsonp: 'callback',
					dataType: 'jsonp',
					data: {
						access_token: token,
						group_id: groups[group],
						v: v
					},
					success: (jsonp)=>{
						try{
							groups[group] = jsonp.response[0].id * (-1);
						} catch {}
						if(typeof groups[group] != 'number') groups.splice(group, 1);//удаляем если не ид
						resolve()
					}
				});
			})
		}
	}())
	return {
		text,
		interval,
		attachments,
		token,
		key,
		groups
	}
}
//преобразование каптинки по ссылке в base64
async function getBase64(captchaUrl){
    await new Promise((resolve)=> {
        let captchaImg = new Image();
        captchaImg.crossOrigin = 'anonymous';
        captchaImg.src = cors + captchaUrl;

        captchaImg.onload = ()=>{
            let canvas = document.createElement('canvas');
            canvas.width = captchaImg.width;
            canvas.height = captchaImg.height;

            let ctx = canvas.getContext('2d');
            ctx.drawImage(captchaImg, 0, 0);

			base64 = canvas.toDataURL('image/jpeg');
			console.log(base64);
			resolve();
        };
    });
}
//антикапча
async function antiCaptcha(captcha_img, captcha_sid){
	check = 0;
	sid = captcha_sid;
	await getBase64(captcha_img);
	let id;
	//отправляем капчу
	$.ajax({
		url: cors + 'https://rucaptcha.com/in.php',
		jsonp: 'callback',
		type: 'POST',
		data: {
			key: data.key,
			method: 'base64',
			body: base64
		},
		success: jsonp=>{
			console.log(jsonp);
			id = jsonp.slice(3);
		}
	})
	//просим решение капчи
	let getting = setInterval(()=>{
		$.ajax({
			url: cors + 'https://rucaptcha.com/res.php',
			jsonp: 'callback',
			type: 'GET',
			data: {
				key: data.key,
				action: 'get',
				id: id
			},
			success: jsonp=>{
				console.log(jsonp);
				if(jsonp.slice(0, 2) == 'OK'){
					key = jsonp.slice(3);
					check = 1;
					clearInterval(getting);
				}
			}
		})
	}, 5000)
}
//основная функция - пост
function post(data, i, sid, key){
	$.ajax({
		url: 'https://api.vk.com/method/wall.post',
		jsonp: 'callback',
		dataType: 'jsonp',
		data: {
			access_token: data.token,
			owner_id: data.groups[i],
			message: data.text,
			attachments: data.attachments,
			captcha_sid: sid,
            captcha_key: key,
			v: v
		},
		success: jsonp=>{
			console.log(jsonp);
			try{//проверка на получение капчи
				if(jsonp.error.error_code == 14){
					antiCaptcha(jsonp.error.captcha_img, jsonp.error.captcha_sid);
				}
			}catch{}
		}
	})
}
//начинает спам
async function spam(){
	let data = getData(),
		i = 0;
	console.log(data)
	let spamer = setInterval(
		()=>{
			if(!check) return
			post(data, i, sid, key);
			if(i == data.groups.length - 1){
				i = 0;
			}else{
				i++;
			}
		}, data.interval
	);
}
//очистка локалсториджа
function clear(){
    localStorage.clear();
    window.location.reload();
}
//сохранение данных
function save(){
    localStorage.setItem('tokenS', document.getElementById('token').value);
    localStorage.setItem('messageS', document.getElementById('text').value);
    localStorage.setItem('intervalS', document.getElementById('interval').value);
    localStorage.setItem('clientKeyS', document.getElementById('key').value);
    localStorage.setItem('groupsS', document.getElementById('groups').value);
}
//заполнение данных
document.getElementById('token').value = localStorage.getItem('tokenS');
document.getElementById('text').value = localStorage.getItem('messageS');
document.getElementById('key').value = localStorage.getItem('clientKeyS');
document.getElementById('interval').value = localStorage.getItem('intervalS')
document.getElementById('groups').value = localStorage.getItem('groupsS')

//40edc14895628851168e67ebbdf65e34
//a3ec78cbe1b3935bcc45c5ec2854ea6bc6c755de6af411d17955c704ad75a144e887b0e1cab5c3f33d66c
//d38e3107c890670d6569e255666a30aad76c20ad4517c473a421c36d71cfd3e3cd9e2ffa8f69bbc05ad4a