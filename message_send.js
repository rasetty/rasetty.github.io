var message,
    token,
    count,
    interval,
    begin,
    link;
function start(){
    message = document.getElementById('text').value;
    count = document.getElementById('count').value;
	begin = document.getElementById('begin').value - 1;
	interval = document.getElementById('interval').value * 1000;
	token = document.getElementById('token-in').value;
	link = document.getElementById('link').value;
    if (message == ''){
    	alert('Не введен текст рассылки');
    	return
    };
    if (token == ''){
    	alert('Не введен токен');
    	return
    };
    if (interval == ''){
    	alert('Не указан интервал');
    	return
    };
    if (count == ''){
    	alert('Не указано во сколько бесед слать');
    	return
    };
    if (begin == ''){
    	alert('Не указано начало рассылки');
    	return
    };
    alert('Рассылка началась, будет закончена через ' + (Math.round(count * interval / 60 / 1000)) + ' минут(ы)');
    interval + 0;
    function func(){ 
        $.post('https://api.vk.com/method/messages.send', { 
        access_token: token, 
        v: '5.80', 
        peer_id: 2000000000 + begin, 
        message: message, 
        attachment: link
        }, console.log), 
        begin++ 
    }; 
    var timerId = setInterval(func, interval); 
    setTimeout(function(){ 
    clearInterval(timerId); 
    }, interval * count);
};
