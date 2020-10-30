//функция делающая значение кратное одному сектору
function get(value) {
	for (let res = value; res % box != 0; res--) {
		value = res - 1;
	}
	return value
}
let canvas = document.getElementById("game"),
	ctx = canvas.getContext("2d"),
	box = 32,//document.getElementById('box').innerHTML * 1, //32
	content = document.getElementById('content'),
	pause = document.getElementsByClassName('pause'),
	menuPause = document.getElementById('menuPause'),
	suicide = document.getElementById('suicide'),
	died = document.getElementById('died'),
	close = document.getElementById('close'),
	max = 10,
	play = !false,
	repeat = document.getElementById('repeat'),
	contin = document.getElementById('play'),
	save;
function stopGame(Save){
	save = Save;
	if(menuPause.style.display != 'none'){
		//играем
		menuPause.style.display = 'none';
		game = setInterval(draw, (getSpeed() * 10) + 30);
		console.log('I created it')
		play = !true;
	}else{
		//пауза
		menuPause.style.display = 'flex';
		clearInterval(game);
		console.log('I deleted it')
		play = !false;
	}
}
function kill() {
	died.style.display = 'flex';
	died.style.top = (canvas.height - died.offsetHeight) / 2 + 'px';
	died.style.right = (canvas.width - died.offsetWidth) / 2 + 'px';
}
close.onclick = ()=>{
	died.style.display = 'none';
	stopGame(false);
}
//работа с кнопкой паузы
//pause[0].style.top = innerHeight - (innerHeight - document.getElementById('header').offsetHeight);
document.addEventListener('keydown', ()=>{
	if(event.keyCode == 27) stopGame(true)
});
pause[0].onclick = ()=>stopGame(true);
pause[1].onclick = ()=>stopGame(true);
repeat.onclick = ()=>stopGame(false);
//задаем канвасу размеры
canvas.width = get(content.offsetWidth);
canvas.height = get(content.offsetHeight);
//меню
menuPause.style.top = (canvas.height - menuPause.offsetHeight) / 2 + 'px'; //canvas.height / 2 * 0.8 + 'px';
menuPause.style.left = (canvas.width - menuPause.offsetWidth) / 2 + 'px';//тут
//установка суецыда
suicide.onclick = function() {
	if(kys == 0){
		suicide.value = 'Suicide: On';
		kys = 1;
	}else{
		suicide.value = 'Suicide: Off';
		kys = 0;
	}
}
//установка скоростей
function getSpeed() {
	let speed = document.getElementById('speed'),
		speedV = speed.innerHTML;
	document.getElementById('dec').onclick = function(){
		if(speedV > 1) speedV--;
		speed.innerHTML = speedV;
	}
	document.getElementById('inc').onclick = function(){
		if(speedV < 9) speedV++;
		speed.innerHTML = speedV;
	}
	return speedV = max - speedV;
}
//картинка еды
let foodImg = new Image()
foodImg.src = "media/food.png";
//все игровые параметры
let score = 0,
	game = setInterval(draw, (getSpeed() * 10) + 30),
	food = {
		x: Math.floor( (Math.random() * get(canvas.width) / box) ) * box,
		y: Math.floor( (Math.random() * get(canvas.height) / box) ) * box 
	},
	snake = [],
	dir,
	kys = 0;
snake[0] = {
	x: get(canvas.width / 2),
	y: get(canvas.height / 2)
}
//проверка еды на не попадание в змею
function createFood() {
	for (var i = 0; i < snake.length; i++) {
		if(snake[i].x == food.x && snake[i].y == food.y){
			food = {
				x: Math.floor( (Math.random() * get(canvas.width) / box) ) * box,
				y: Math.floor( (Math.random() * get(canvas.height) / box) ) * box 
			}
			createFood();
		}
	}
}
//основная функция - рисуем весь холст
function draw() {
	//переопределяем все
	if (!save){
		score = 0;
		food = {
			x: Math.floor( (Math.random() * get(canvas.width) / box) ) * box,
			y: Math.floor( (Math.random() * get(canvas.height) / box) ) * box 
		};
		snake = [];
		dir = undefined;
		getSpeed();
		if(suicide.value == 'Suicide: Off'){
			kys = 0
		}else{
			kys = 1;
		};
		snake[0] = {
			x: get(canvas.width / 2),
			y: get(canvas.height / 2)
		}
		createFood();
		save = !save;
	}
	if(play) return;
	//получаем направление движения
	document.addEventListener('keydown', direction);
	function direction() {
		if ((event.keyCode == 37 || event.keyCode == 65) && dir != 'right') dir = 'left';
		else if((event.keyCode == 38 || event.keyCode == 87) && dir != 'down') dir = 'up';
		else if((event.keyCode == 39 || event.keyCode == 68) && dir != 'left') dir = 'right';
		else if((event.keyCode == 40 || event.keyCode == 83) && dir != 'up') dir = 'down';
		document.removeEventListener('keydown', direction)
	}
	//рисуем бэк
	ctx.fillStyle = '#BBBBBB';
	ctx.fillRect(0, 0, get(canvas.width) + box, get(canvas.height) + box);
	//ctx.drawImage(ground, 0, 0);
	//рисуем еду
	ctx.drawImage(foodImg, food.x, food.y);
	//рисуем змею
	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = 'green';
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}
	//рисуем счет
	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(score, box * 0.5, box * 1.7);
	//координаты головы
	let snakeX = snake[0].x,
		snakeY = snake[0].y;
	//проверка на съедение убийство себя
	for (var i = 1; i < snake.length; i++) {
		if(snake[i].x == snakeX && snake[i].y == snakeY && kys == 1){
			return kill();
		}
	}
	//проверка на съедение еды и создание новой
	if (food.x == snakeX && food.y == snakeY){
		score++;
		food = {
			x: Math.floor( (Math.random() * get(canvas.width) / box) ) * box,
			y: Math.floor( (Math.random() * get(canvas.height) / box) ) * box 
		};
		createFood();
		snake.push
	}else{
		snake.pop();
	}
	//телепорты из края в край
	if (snakeX >= get(canvas.width) - box && dir == 'right') snakeX = -box;
	if (snakeX <= 0 && dir == 'left') snakeX = get(canvas.width);
	if (snakeY <= 0 && dir == 'up') snakeY = get(canvas.height);
	if (snakeY >= get(canvas.height) - box && dir == 'down') snakeY = -box;

	//движение змеи
	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};
	snake.unshift(newHead);
}
/*
	мб рекорд(в меню паузы)
	суецыд(в меню паузы)
	настройки игры с сохранением(в меню паузы)
	
	кнопки для змейки на телефоне
	адаптация под телефон хедера
*/
