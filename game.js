man.style.left = '430px';
man.style.top = '476px';
var y = [495.5, 458.5, 421.5, 384.5, 347.5, 310.5, 273.5, 236.5, 199.5, 162.5, 125.5, 88.5, 51.5],
	i = 0;

$("#board").css("pointer-events", "none");

function play() {
	if (document.location.href != 'https://rasetty.github.io/game.html') {
		return console.log(document.location.href + '  https://rasetty.github.io/game.html')
	}
	$("#win").fadeOut(500);
	if ((rate.value === "") || (rate.value <= 0)) {
		return $('#rate_test').html('<span id="rate_test" style="color: #EA2824;">Минимальная ставка 0.01</span>')
	}
	$('#rate_test').html('<span id="rate_test">Ваша ставка:</span>')
	$("#take").fadeIn(500)
	$("#board").css("pointer-events", "auto");
}

function win() {
	$("#board").css("pointer-events", "none")
	$("#win").fadeIn(500);
}
function take() {
	$("#board").css("pointer-events", "none");
	man.style.left = '430px';
	man.style.top = '476px';
	$("#take").fadeOut(500)
}
function go(getId) {
	$("#board").css("pointer-events", "none");
	if (i >= 13) {
		return
	}
	var id = getId;
	var el = document.getElementById(id);
	man.style.left = el.getBoundingClientRect().left - game.getBoundingClientRect().left;
	
	setTimeout(function() {
		man.style.top = y[i] - 15;
		setTimeout(function() {
			$("#board").css("pointer-events", "auto");
		}, 1000);
	}, 1000);

	i++;
	if (i >= 13) {
		setTimeout(function() {	
			man.style.display = 'none';
			return win();
		}, 1000);
	}	
};
