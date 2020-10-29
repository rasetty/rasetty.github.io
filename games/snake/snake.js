function get(value) {
	for (let res = value; res % box != 0; res--) {
		value = res - 1;
	}
	return value
}
let canvas = document.getElementById("game"),
	ctx = canvas.getContext("2d"),
	box = 32,
	content = document.getElementById('content');
canvas.width = get(content.offsetWidth);
canvas.height = get(content.offsetHeight);

let foodImg = new Image()

foodImg.src = "media/food.png";
let score = 0,
	game = setInterval(draw, 50),
	food = {
		x: Math.floor( (Math.random() * get(canvas.width) / box) ) * box,
		y: Math.floor( (Math.random() * get(canvas.height) / box) ) * box 
	},
	snake = [],
	dir;
	snake[0] = {
		x: get(canvas.width / 2),
		y: get(canvas.height / 2)
	}
	document.addEventListener('keydown', direction);
	function direction() {
		if ((event.keyCode == 37 || event.keyCode == 65) && dir != 'right'){
			dir = 'left';
		}
		else if((event.keyCode == 38 || event.keyCode == 87) && dir != 'down'){
			dir = 'up';
		}
		else if((event.keyCode == 39 || event.keyCode == 68) && dir != 'left'){
			dir = 'right';
		}
		else if((event.keyCode == 40 || event.keyCode == 83) && dir != 'up'){
			dir = 'down';
		}
	}

function draw() {
	ctx.fillStyle = 'grey';
	ctx.fillRect(0, 0, get(canvas.width) + box, get(canvas.height) + box);
	//ctx.drawImage(ground, 0, 0);
	ctx.drawImage(foodImg, food.x, food.y);
	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = 'green';
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	let snakeX = snake[0].x,
		snakeY = snake[0].y;
	if (food.x == snakeX && food.y == snakeY){
		score++;
		food = {
			x: Math.floor( (Math.random() * get(canvas.width) / box) ) * box,
			y: Math.floor( (Math.random() * get(canvas.height) / box) ) * box 
		};
		snake.push
	}else{
		snake.pop();
	}

	if (snakeX >= get(canvas.width) - box && dir == 'right'){
		snakeX = -box;
	}

	if (snakeX <= 0 && dir == 'left'){
		snakeX = get(canvas.width);
	}

	if (snakeY <= 0 && dir == 'up'){
		snakeY = get(canvas.height);
	}

	if (snakeY >= get(canvas.height) - box && dir == 'down'){
		snakeY = -box;
	}




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
добавить счет, уровень сложности на выбор и убийство в себя кнопка заново и мб рекорд
вернуть интерфейс паузы

/*
document.addEventListener("keydown", a)
function a(event){
    console.log(event.keyCode)
}
http://prntscr.com/v997l6
*/
