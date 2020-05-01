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
						owner_id: firstPost["source_id"],
						post_id: firstPost["post_id"],
						attachments: !attachments ? "" : attachments[randAtt],
						message: comm[randComm],
						v: '5.103'
					}, success: ()=>{document.getElementById('log').innerHTML += "<b>Bot опубликовал новый комментарий: https://vk.com/wall" + firstPost["source_id"] + "_" + firstPost["post_id"] + " в группе: " + group["name"] + "</b>"}})
				}
			}
		})
	}, interval);
}