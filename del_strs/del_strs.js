const orig = document.getElementById('orig'),
	del = document.getElementById('del'),
	amountOrig = document.getElementById('amountOrig'),
	amountDel = document.getElementById('amountDel');
orig.addEventListener('keyup', (event)=>{
	if(event.keyCode == 13 && event.ctrlKey) format();
})
del.addEventListener('keyup', (event)=>{
	if(event.keyCode == 13 && event.ctrlKey) format();
})
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

	for(let i = 0; i < textDel.length; i++) {
		if (textDel[i] == '\n') counter++;
	}
	for(let i = counter; i > 0; i--){
		textDel = textDel.replaceAll('\n\n', '\n');
	}
	del.value = textDel;
	amountDel.innerHTML = 'Strings: ' + del.value.split('\n').length;
}


function format(){
	let textOrig = orig.value;
	const textDel = del.value.split('\n');
	for (let i = 0; i <= textDel.length; i++){
		textOrig = textOrig.replaceAll('\n' + textDel[i], '');
		textOrig = textOrig.replaceAll(textDel[i] + '\n', '');
	}
	orig.value = textOrig;
}