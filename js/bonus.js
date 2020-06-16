var bonus;

var numberOfBonus = 0;

var img = document.getElementById('img');

var chanceForBonus;
var bonus_x, bonus_y;
var listOfBonus = ['ExtraLife', 'Increase', 'Death', 'ChangeDirection'];
var randomNameBonus;
var bonus_dy = 1;
var bonusPlatform_size_x = 100;

function createBonus() {
	randomNameBonus = Math.floor(Math.random()*4);
	
	bonus[numberOfBonus] = {
		bonus_x : bonus_x,
		bonus_y : bonus_y,
		nameOfBonus : listOfBonus[randomNameBonus],
		exist : true,
	};
	numberOfBonus++;
}


function drawBonus(){
	for (var i = 0;i<numberOfBonus;i++){
		ctx.beginPath();
		if(bonus[i].exist==true && numberOfBonus!=0){
			img.src='bonuses/bonus'+bonus[i].nameOfBonus+'.png';
			ctx.drawImage(img,bonus[i].bonus_x-10,bonus[i].bonus_y-10);
		}
		ctx.closePath();
	}
}



function activateBonus(name) {
		if (name=='ExtraLife'){
			life++;
			isLifeZero = false;
		}
		if (name=='Increase'){
			platform_size_x = bonusPlatform_size_x;
			setTimeout(function(){
				platform_size_x = 50;
			},6000);
		}
		if (name=='ChangeDirection'){
			var isToLeft_Right = Boolean(Math.floor(Math.random()*2));
			var isToTop_Down = Boolean(Math.floor(Math.random()*2));
			if (isToLeft_Right && isToTop_Down) {
				dx=-dx;
				dy=-dy;
			}

			else if (isToLeft_Right) dx=-dx;
			else if (isToTop_Down) dy=-dy;
			
		}
		if (name=='Death'){
			isLifeZero = true;
			isAlive = false;
			isStart = false;
			isHaveExtraLife = false;
		}
}