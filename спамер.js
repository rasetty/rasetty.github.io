function start(){

	var message = document.getElementById('message').value, //получаю сообщение
	    token = document.getElementById('token').value, //получаю токен
	    attachments = (document.getElementById('attachments').value).substring(29), //получаю сразу ссылку
	    groups = (document.getElementById('groups').value).split(' '), //получаю ссылки
	    i = groups.length - 1, //узнаю колво ссылок групп
	    interval = document.getElementById('interval').value * 1000; //задаю интервал
	
	function post(callback) {
		
		$.ajax({
	        url: 'https://api.vk.com/method/wall.post',
	        jsonp: 'callback',
	        dataType: 'jsonp',
	        data: {
	            access_token: token,
	            owner_id: (groups[i]).substring(19) * (-1),
	            from_group: 0,
	            message: message,
	            attachments: attachments,
	            v: '5.80'
	        },
	        success: jsonp=> {
	        	callback(jsonp)
	        	var capt,
	        	    sid = jsonp.error.captcha_sid,
	        	    keyCapt,
	        	    clientKey = document.getElementById('clientKey')
	        	    taskId;

	        	if(jsonp.error.error_code == 14) { //если нужна капча

                	function toDataURL(src, callback, outputFormat){
						var img = new Image();
						img.crossOrigin = 'Anonymous';
						img.onload = function() {
							var canvas = document.createElement('CANVAS'); 
							var ctx = canvas.getContext('2d'); 
							var dataURL; 
							canvas.height = this.naturalHeight; 
							canvas.width = this.naturalWidth; 
							ctx.drawImage(this, 0, 0); 
							dataURL = canvas.toDataURL(outputFormat); 
							callback(dataURL); 
						}; 
						img.src = src; 
						if (img.complete || img.complete === undefined) {
							img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="; 
							img.src = src; 
						} 
					} toDataURL( jsonp.error.captcha_img, function(dataUrl) {
					      capt = dataUrl;
					});//перевод капчи в база 56

					$.ajax({
						url: 'https://api.anti-captcha.com/createTask',
						type: 'JSON POST',
						jsonp: 'res',
						data:{
   						"clientKey": clientKey,
   						"task":
   						    {
   						        "type":"ImageToTextTask",
   						        "body": capt
   						    }},
   						    success: jsonp=> {taskId = res.taskId}
   						        
        				})//отправка изобржения на антикапчу

   					setTimeout( function(){

   						$.ajax({
							url: 'https://api.anti-captcha.com/getTaskResult',
							type: 'JSON POST',
							jsonp: 'res',
							data: {
   								"clientKey": clientKey,
   								"taskId": taskId
   							 },   
   							success: jsonp=> {keyCapt = res.solution.text}
   						        
        				
   					})

   					}, 8000)
	        	
	        }
 		}})
 		postC(callback, sid, keyCapt)
	}//посчу одну запись
		
	function postC(callback, sid, key) {
		
		$.ajax({
	        url: 'https://api.vk.com/method/wall.post',
	        jsonp: 'callback',
	        dataType: 'jsonp',
	        data: {
	            access_token: token,
	            owner_id: (groups[i]).substring(19) * (-1),
	            from_group: 0,
	            message: message,
	            attachments: attachments,
	            captcha_sid: sid,
	            captcha_key: key,
	            v: '5.80'
	        },
	        success: jsonp=> {
	        	callback(jsonp)
	        	
	        }
 		});
	

	var process = setInterval(function(){

		post(jsonp=> {console.log(jsonp)})
	}, interval); //запускаю цикл
    
	setTimeout(function(){
		clearInterval(process)
	},interval * groups.length) //остановка цикла 

}
}




function сlear(){
	localStorage.clear();
	window.location.reload();
}
function save(){
	localStorage.setItem('tokenS', document.getElementById('token').value); 
	localStorage.setItem('messageS', document.getElementById('message').value); 
	localStorage.setItem('intervalS', document.getElementById('interval').value);
	localStorage.setItem('groupsS', document.getElementById('groups').value);  
	localStorage.setItem('attachmentsS', document.getElementById('attachments').value); 
}

document.getElementById('token').value = localStorage.getItem('tokenS');
document.getElementById('message').value = localStorage.getItem('messageS');
document.getElementById('attachments').value = localStorage.getItem('attachmentsS');
document.getElementById('groups').value = localStorage.getItem('groupsS');
document.getElementById('interval').value = localStorage.getItem('intervalS');





