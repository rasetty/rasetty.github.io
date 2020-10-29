let rock = document.getElementById('rock'),
	scissor = document.getElementById('scissor'),
	paper = document.getElementById('paper'),
	enemy = document.getElementById('enemy'),
	values = [1, 2, 3],
	warrior,
	repeat = document.getElementById('repeat'),
	counter = document.getElementById('counter'),
	result = document.getElementById('result');

//анимация, задержка и кнопка еще раз
function remove(one, two, three) {
	one.style.opacity = 0;
	two.style.opacity = 0;
	three.style.gridArea = 'scissor';
	three.classList.remove("choice");
	one.onclick = null;
	two.onclick = null;
	three.onclick = null;
	counter.innerHTML = '3';
	setTimeout(()=>{counter.innerHTML = '2'}, 1000);
	setTimeout(()=>{counter.innerHTML = '1'}, 2000);
	setTimeout(()=>{repeat.style.display = 'block'}, 3500);
}
//рандом и результат
function fight(client) {
	counter.innerHTML = ''
	//находим "бойца" компьютера и показываем игроку
	switch(values[( Math.floor(Math.random() * 3) )]) {
		case 1:
			enemy.src = 'media/rock.png';
			warrior = 1;
			break;
		case 2:
			enemy.src = 'media/scissor.png';
			warrior = 2;
			break;
		case 3:
			enemy.src = 'media/paper.png';
			warrior = 3;
			break;
	}
	//узнаем кто подебил и говрим пользователю
	if(warrior == 1 && client == 2){
		result.innerHTML = 'Lose :(';
	} 
	else if(warrior == 1 && client == 3){
		result.innerHTML = 'Win!';
	}
	else if(warrior == 2 && client == 3){
		result.innerHTML = 'Lose :(';
	}
	else if(warrior == 2 && client == 1){
		result.innerHTML = 'Win!';
	}
	else if(warrior == 3 && client == 1){
		result.innerHTML = 'Lose :(';
	}
	else if(warrior == 3 && client == 2){
		result.innerHTML = 'Win!';
	}else{
		result.innerHTML = 'Tie';
	}

}
//вещаю онклики
async function chooseRock() {
	await new Promise((resolve)=>{
		remove(scissor, paper, rock);
		setTimeout(()=>{resolve()}, 3000)
	})
	fight(1);
}
rock.onclick = chooseRock;

async function chooseScissor() {
	await new Promise((resolve)=>{
		remove(paper, rock, scissor);
		setTimeout(()=>{resolve()}, 3000)
	})
	fight(2);
}
scissor.onclick = chooseScissor;

async function choosePaper() {
	await new Promise((resolve)=>{
		remove(scissor, rock, paper);
		setTimeout(()=>{resolve()}, 3000)
	})
	fight(3);
}
paper.onclick = choosePaper;

//перезапуск игры
repeat.onclick = function() {
	rock.style.gridArea = 'rock';
	scissor.style.gridArea = 'scissor';
	paper.style.gridArea = 'paper';
	rock.classList.add("choice");
	scissor.classList.add("choice");
	paper.classList.add("choice");
	enemy.src = '';
	rock.style.opacity = 255;
	scissor.style.opacity = 255;
	paper.style.opacity = 255;
	repeat.style.display = 'none';
	result.innerHTML = 'Choose it';
	rock.onclick = chooseRock;
	scissor.onclick = chooseScissor;
	paper.onclick = choosePaper;
}
/**/
