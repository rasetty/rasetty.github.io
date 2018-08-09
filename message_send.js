
var message,
    token,
    count,
    interval,
    begin,
    link,
    N,
    countN;
function start(){
    message = document.getElementById('text').value;
    count = document.getElementById('count').value;
	begin = document.getElementById('begin').value;
	interval = document.getElementById('interval').value * 1000;
	token = document.getElementById('token').value;
	link = document.getElementById('link').value;
	N  = document.getElementById('N').value;
	countN = document.getElementById('countN').value;
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
   function baz(){
      var newBegin = begin;
          const CONFIG = {
          app: {
              dev: true
          },
          access_token: token
      };
      function postMsg(peer_id, msg, callback) {
          $.ajax({
              url: 'https://api.vk.com/method/messages.send',
              jsonp: 'callback',
              dataType: 'jsonp',
              data: {
                  access_token: CONFIG.access_token,
                  peer_id: peer_id,
                  message: msg,
                  attachment: link,
                  v: '5.74'
              },
              
              success: jsonp=> callback(jsonp)
              
          });

      }
      var timerId = setInterval(()=> {
          let peer_id = 2000000000 + newBegin++;
      
          postMsg(peer_id, message, jsonp=> {});
      }, interval);
      
      setTimeout(function() {
          clearInterval(timerId);
      }, interval * count);}
      var timer = setInterval(baz, N * 60 * 1000); 
      setTimeout(function(){ 
      clearInterval(timer); 
      }, N * 60 * 1000 * (countN - 1));
      baz();
};  
function сlear(){
	localStorage.clear();
	window.location.reload();
}
function save(){
	localStorage.setItem('tokenS', document.getElementById('token').value); 
	localStorage.setItem('textS', document.getElementById('text').value); 
	localStorage.setItem('intervalS', document.getElementById('interval').value); 
	localStorage.setItem('linkS', document.getElementById('link').value); 
	localStorage.setItem('countS', document.getElementById('count').value);
	localStorage.setItem('beginS', document.getElementById('begin').value);  
}


document.getElementById('token').value = localStorage.getItem('tokenS')
document.getElementById('text').value = localStorage.getItem('textS')
document.getElementById('link').value = localStorage.getItem('linkS')
document.getElementById('count').value = localStorage.getItem('countS')
document.getElementById('begin').value = localStorage.getItem('beginS')
document.getElementById('interval').value = localStorage.getItem('intervalS')
