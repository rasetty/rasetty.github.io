//переменные из DOM
const orig = document.getElementById('orig'),
	del = document.getElementById('del'),
	amountOrig = document.getElementById('amountOrig'),
	amountDel = document.getElementById('amountDel');
//назначение кнопок
orig.addEventListener('keyup', (event)=>{
	if(event.keyCode == 13 && event.ctrlKey) format();
})
del.addEventListener('keyup', (event)=>{
	if(event.keyCode == 13 && event.ctrlKey) format();
})
//удаление пустых строк при вставке
orig.oninput = ()=>{
	let textOrig = orig.value,
		counter = 0;

	for(let i = 0; i < textOrig.length; i++) {
		if (textOrig[i] == '\n') counter++;
	}
	for(let i = counter; i > 0; i--){
		textOrig = textOrig.replaceAll('\n\n', '\n');
	}
	orig.value = textOrig;
	amountOrig.innerHTML = 'Strings: ' + orig.value.split('\n').length;
}
del.oninput = ()=>{
	let textDel = del.value,
		counter = 0;

	for(let i = 0; i < textDel.length; i++){
		if (textDel[i] == '\n')counter++;
	}
	for(let i = counter; i > 0; i--){
		textDel = textDel.replaceAll('\n\n', '\n');
	}
	del.value = textDel;
	amountDel.innerHTML = 'Strings: ' + del.value.split('\n').length;
}

//функция удаления
function format(){
	//массивы строк
	let textOrig = orig.value.split('\n');
	const textDel = del.value.split('\n');
	//сравнение каждой строки с каждой и делит
	for(let j = 0; j < textDel.length; j++){
		for (let i = textOrig.length; i > 0; i--){
			if (textOrig[i] == textDel[j]){
				textOrig.splice(i, 1)
			}
		}
	}
	//удаление пустых
	for(let i = 0; i < textDel.length; i++){
		if(textDel[i] === ''){
			textDel.splice(i, 1);
		}
	}
	for(let i = 0; i < textOrig.length; i++){
		if(textOrig[i] === ''){
			textOrig.splice(i, 1);
		}
	}
	//обнуление и вывод
	orig.value = '';
	for (let i = 0; i < textOrig.length; i++){
		orig.value += textOrig[i] + '\n';
	}
}