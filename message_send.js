var iForName = 0;
var iForRestr = 1;
var captcha = false;
function create(){
	if (iForRestr == 10) {
		return
	} else {
		iForRestr++;
	};
    var name = 'link' + iForName++; 
	var em = document.createElement('em');
	em.innerHTML = 'Ссылка на прикрепляемый файл';
	var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('class', 'input');
    input.setAttribute('id', name);
    var place = document.getElementById('js');
    place.appendChild(em);
    place.appendChild(input);
    iForName++;
}
var message,
    token,
    count,
    interval,
    begin,
    link,
    N,
    countN;

function start(){
  if (!("Notification" in window)) {
    alert('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
    if (!(permission === "granted")) {
      alert('Вы запретили показывать уведомления'); 
    }
  });      
  }
	if ($("#myCheckbox").prop("checked")){
		withPin();
	} else {
	usual();
}

function withPin(){
	message = document.getElementById('text').value;
    count = document.getElementById('count').value;
	begin = document.getElementById('begin').value;
	interval = document.getElementById('interval').value * 1000;
	token = document.getElementById('token').value;
	if(iForName == 1){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value;
	}else if(iForName == 2){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value;
	}else if(iForName == 3){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value;
	}else if(iForName == 4){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value;
	}else if(iForName == 5){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value +
		 ',' + document.getElementById('link5').value;
	}else if(iForName == 6){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value + 
		',' + document.getElementById('link5').value + ',' + document.getElementById('link6').value;
	}else if(iForName == 7){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value + 
		',' + document.getElementById('link5').value + ',' + document.getElementById('link6').value + ',' + document.getElementById('link7').value;
	}else if(iForName == 8){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value + 
		',' + document.getElementById('link5').value + ',' + document.getElementById('link6').value + ',' + document.getElementById('link7').value + ',' + document.getElementById('link8').value;
	}else if(iForName == 9){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value + 
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
    function pin(){

	var newBegin2 = begin;

    const CONFIG = {
    app: {
        dev: true
    },
    access_token: token
};
function postMsg(peer_id, msg, callback) {
  if (captcha){
      count++;
      alert('Капча')
      captcha = false;
      return
    };
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

        success: jsonp=> {callback(jsonp)
            if(jsonp.error.error_code == 14){
                captcha = true;
              }else{
                captcha = false;
              };
        }
    });
}

function pinMsg(peer_id, msgId, callback) {
    $.ajax({
        url: 'https://api.vk.com/method/messages.pin',
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {
            access_token: CONFIG.access_token,
            peer_id: peer_id,
            message_id: msgId,
            v: '5.74'
        },

        success: jsonp=> callback(jsonp)
    });
}

var timerId = setInterval(()=> {
    let peer_id = 2000000000 + newBegin2++;

    postMsg(peer_id, message, jsonp=> {
        pinMsg(peer_id, jsonp.response, jsonp=> {console.log(jsonp);});
    });
}, interval);

setTimeout(function() {
    clearInterval(timerId);
}, interval * count);}

var timer = setInterval(pin, N * 60 * 1000); 
setTimeout(function(){ 
clearInterval(timer); 
}, N * 60 * 1000 * (countN - 1));
pin();
}

function usual(){
    link0 = document.getElementById('link').value;
    message = document.getElementById('text').value;
    count = document.getElementById('count').value;
	  begin = document.getElementById('begin').value;
	  interval = document.getElementById('interval').value * 1000;
	  token = document.getElementById('token').value;
	if(iForName == 1){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value;
	}else if(iForName == 2){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value;
	}else if(iForName == 3){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value;
	}else if(iForName == 4){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value;
	}else if(iForName == 5){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value +
		 ',' + document.getElementById('link5').value;
	}else if(iForName == 6){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value + 
		',' + document.getElementById('link5').value + ',' + document.getElementById('link6').value;
	}else if(iForName == 7){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value + 
		',' + document.getElementById('link5').value + ',' + document.getElementById('link6').value + ',' + document.getElementById('link7').value;
	}else if(iForName == 8){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value + 
		',' + document.getElementById('link5').value + ',' + document.getElementById('link6').value + ',' + document.getElementById('link7').value + ',' + document.getElementById('link8').value;
	}else if(iForName == 9){
		link = document.getElementById('link').value + ',' + document.getElementById('link1').value + ',' + document.getElementById('link2').value + ',' + document.getElementById('link3').value + ',' + document.getElementById('link4').value + 
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
   function baz(){
      var newBegin = begin;
          const CONFIG = {
          app: {
              dev: true
          },
          access_token: token
      };
      function postMsg(peer_id, msg, callback) {
        if (captcha){
      		count++;
      		alert('Капча');
      		captcha = false;
      		return 
    };
          $.ajax({
              url: 'https://api.vk.com/method/messages.send',
              jsonp: 'callback',
              dataType: 'jsonp',
              data: {
                  access_token: CONFIG.access_token,
                  peer_id: peer_id,
                  message: msg,
                  attachment: link0,
                   
                  v: '5.74'
              },
              
              success: jsonp=> {
              	callback(jsonp)
                if(jsonp.error.error_code === 14){
                	captcha = true;
              	}else{
                	captcha = false;
              	};
              }
              
          });

      }
      var timerId = setInterval(()=> {
          let peer_id = 2000000000 + newBegin++;
          postMsg(peer_id, message, jsonp=> {console.log(jsonp)});
      }, interval);
      
      setTimeout(function() {
          clearInterval(timerId);
      }, interval * count);}
      var timer = setInterval(baz, N * 60 * 1000); 
      setTimeout(function(){ 
      clearInterval(timer); 
      }, N * 60 * 1000 * (countN - 1));
      baz();
}};  
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

document.getElementById('token').value = localStorage.getItem('tokenS');
document.getElementById('text').value = localStorage.getItem('textS');
document.getElementById('link').value = localStorage.getItem('linkS');
document.getElementById('count').value = localStorage.getItem('countS');
document.getElementById('begin').value = localStorage.getItem('beginS');
document.getElementById('interval').value = localStorage.getItem('intervalS')
