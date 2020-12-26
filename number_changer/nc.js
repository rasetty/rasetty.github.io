document.addEventListener('keydown', (event)=>checkKey(event));
document.getElementById('format').onclick = format;
const prefix = document.getElementById('prefix');
function checkKey(event){
	if(event.keyCode == 13 && event.ctrlKey) format();
}

function newForm(line, id) {
	if(line.length == 10 && line[0] == 9){//чек на форму без 8
		line = '7' + line;
	}
	if(line == '') return;
	if(line.length !== 11 || (line.slice(0, 2) != '89' && line.slice(0, 2) != '79')) return 0;//проверка полноты номера

	if(document.getElementById('type2').checked === true){
		if(!id){//с ид или без
			return "89" + line.slice(2, 11);
		}else{
			return prefix.value + id + ": 89" + line.slice(2, 11); //выводим ид и новую форму номера
		}
	}else if(document.getElementById('type3').checked === true){
		if(!id){//с ид или без
			return "+79" + line.slice(2, 4) + '-' + line.slice(4, 7) + '-' + line.slice(7, 9) + '-' + line.slice(9, 11);
		}else{
			return prefix.value + id + ": +79" + line.slice(2, 4) + '-' + line.slice(4, 7) + '-' + line.slice(7, 9) + '-' + line.slice(9, 11); //выводим ид и новую форму номера
		}
	}else{
		if(!id){//с ид или без
			return "+79" + line.slice(2, 11);
		}else{
			return prefix.value + id + ": +79" + line.slice(2, 11); //выводим ид и новую форму номера
		}
	}
}
function format(){
	let text = document.getElementsByTagName("textarea")[0].value, //данные текстэреа
  		lines = text.split("\n"), //массив номеров
		bad = '',
		id = 0;
		if(document.getElementById('toggle').checked === true) id = 1; //если ид нужен
		text = ''; //обнулили текст
	for (let line of lines){ //пеербор по номерам
		line = line.replace(/\D/g, ''); //берем только цифры
		let formatted = newForm(line, id); //измененный номер
		if(formatted === 0){ //если номер хуевий
			bad += line + "\n"; //зпись его в бэд
		}else if(formatted != undefined){
			text += formatted + "\n";  //иначе если все ок то ид++ текст меняем
			if(id) id++;
		}
	}
	if(bad.length !== 0) text += "\nbad:\n" + bad; //заполняем бэд если есть
	document.getElementsByTagName("textarea")[1].value = text; //выводим
}

/*
+79833842970

228
89833842970

79833842970
9833842970
1488

79-83-38-42-97----0
*/