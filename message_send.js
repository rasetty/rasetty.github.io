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
	token = document.getElementById('token').value;
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
        $.ajax('https://api.vk.com/method/messages.send', { 
        access_token: token, 
        v: '5.80', 
        peer_id: 2000000000 + begin, 
        message: message, 
        attachment: link
        }), 
        begin++ 
    }; 
    var timerId = setInterval(func, interval); 
    setTimeout(function(){ 
    clearInterval(timerId); 
    }, interval * count);
};


function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  $(document).ready(function () {
    $('#token').val(getCookie('tokenSave'));
  });
  $('#token').keyup(function (eventObject) {
    document.cookie = 'tokenSave=' + eventObject.target.value;
  });
  $(document).ready(function () {
    $('#text').val(getCookie('tokenSave'));
  });
  $('#text').keyup(function (eventObject) {
    document.cookie = 'tokenSave=' + eventObject.target.value;
  });$(document).ready(function () {
    $('#interval').val(getCookie('tokenSave'));
  });
  $('#interval').keyup(function (eventObject) {
    document.cookie = 'tokenSave=' + eventObject.target.value;
  });$(document).ready(function () {
    $('#begin').val(getCookie('tokenSave'));
  });
  $('#begin').keyup(function (eventObject) {
    document.cookie = 'tokenSave=' + eventObject.target.value;
  });
  $(document).ready(function () {
    $('#link').val(getCookie('tokenSave'));
  });
  $('#link').keyup(function (eventObject) {
    document.cookie = 'tokenSave=' + eventObject.target.value;
  });
  $(document).ready(function () {
    $('#count').val(getCookie('tokenSave'));
  });
  $('#count').keyup(function (eventObject) {
    document.cookie = 'tokenSave=' + eventObject.target.value;
  });
