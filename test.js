var str,
    text = '';
function getValue(){
	str = document.getElementById('str').value;
};


function decod(){

    for (var i = str.length - 1; i !== - 1; i--) {
    	text += str[i];
    };
    document.getElementById('out').innerHTML = text;
    text = '';
};