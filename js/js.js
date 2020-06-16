
var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");


var isPlay = false;
var isAlive = true;
var isStart = false;
var isGameBegin = false;
var isLifeZero = true;
var isHaveExtraLife = false;

var deathLine = 275;
var life = 0;

var soundAtPlatform = new Audio();


var arrayStart = ['Ready', 'Stady', 'GO!'];
var countWord = 0;

soundAtPlatform.preload = 'auto';
soundAtPlatform.src = 'sound/atPlatform.mp3';

var soundAtWall = new Audio();
soundAtWall.preload = 'auto';
soundAtWall.src = 'sound/atWall.mp3';

var score = 0;

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;



var ballRadius = 10;

var color = [];


ctx.fillStyle = "purple";



var x = canvasWidth/2;
var y = canvas.height-30;

var dx = 0;
var dy = 0;




var platform_size_x = 50;
var platform_size_y = 10;

var platform_y = canvasHeight-20;
var platform_x = canvasWidth/2-(platform_size_x/2);

var platform_dx_moveLeft = 0;
var platform_dx_moveRight = 0;
var platform_dx = 3;


function drawPlatform() {
	ctx.beginPath();
	ctx.fillRect(platform_x,platform_y,platform_size_x,platform_size_y);
	ctx.fill();
	ctx.closePath();
}



function drawScore() {
	ctx.font = '20px Arial';
	ctx.textAlign = 'left';
	ctx.fillText("Score: " + score,0,20);
}
function drawLife() {
	ctx.font = '20px Arial';
	ctx.textAlign = 'right';
	ctx.fillText("Life: " + life,canvasWidth,20);
}
function drawBalanceLife () {
	ctx.textAlign = "center";
	ctx.font = '30px Arial';
	ctx.fillText("Left " + life + " life!",canvasWidth/2,canvasHeight/2);
	ctx.font = '20px Arial';
	ctx.fillText('To continue press "Enter/Space"', canvasWidth/2,canvasHeight/2+30);
}
function drawLose() {
	ctx.textAlign = "center";
	ctx.font = '30px Arial';
	ctx.fillText("YOU DIED! Your score: " + score,canvasWidth/2,canvasHeight/2);
	ctx.font = '20px Arial';
	ctx.fillText('To play again press "Enter/Space"', canvasWidth/2,canvasHeight/2+30);
}
function drawTextToStart() {
	ctx.textAlign = "center";
	ctx.font = '30px Arial';
	ctx.fillText("HELLO & WELCOME",canvasWidth/2,canvasHeight/2);
	ctx.font = '20px Arial';
	ctx.fillText('To start a game press "Enter/Space"', canvasWidth/2,canvasHeight/2+30);
}

function drawWordToStart() {
	ctx.textAlign = 'center';
	ctx.font = '30px Arial';
	ctx.fillText(arrayStart[countWord],canvasWidth/2,canvasHeight/2);
}
function drawVersion() {
	ctx.fillStyle = "white";
	ctx.textAlign = 'left';
	ctx.font = '16px Arial';
	ctx.fillText("v0.2",5,canvasHeight-5);
}
function drawDieLine() {
	ctx.fillStyle = "red";
	ctx.fillRect(0,275,canvasWidth,2);
	ctx.fill();
	ctx.closePath();
	ctx.fillStyle = "white";
}





var blocks;
var numberOfRow = 0;

var number_blocks_in_row = 5;
var count_blocks_on_screen = 14;

var block_size_x = 70;
var block_size_y = 20;


function drawRowBlocks() {
	ctx.beginPath();
	ctx.fillStyle = "red";
	for (var j=0;j<numberOfRow;j++){
		for (var i = 0; i < number_blocks_in_row; i++) {
			if (blocks[j][i].exist==true)
			ctx.fillRect(blocks[j][i].block_x,blocks[j][i].block_y,blocks[j][i].size_x,blocks[j][i].size_y);
		}
	}	
	ctx.fillStyle = "White";
	ctx.fill();
	ctx.closePath();
}


function drawRowBlockss() {
	blocks[numberOfRow]= [];
	for (var j = 0; j < number_blocks_in_row; j++){
		blocks[numberOfRow][j] = {
			size_x : 75,
			size_y : 20,
			block_x : 20*(j+1)+(block_size_x*j)+9*j,
			block_y : -24,
			exist : true,
			number : numberOfRow,
		};
	}
}

function drawRowBlockssFirsltly() {
	for (var i=0;i<3;i++) {
		blocks[i]=[];
		for (var j = 0; j < number_blocks_in_row; j++){
			blocks[i][j] = {
				size_x : 75,
				size_y : 20,
				block_x : (20*(j+1)+(block_size_x*j))+ 9*j,
				block_y : (-24*(-(i+1)*2))-72,
				exist : true,
				number : numberOfRow,
			};
		}
	}
}





function switchColor() {
	color[0] = Math.floor(Math.random()*156);
	color[1] = Math.floor(Math.random()*156);
	color[2] = Math.floor(Math.random()*156);
}

function drawBall() {
	
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0, Math.PI*2);
	ctx.fillStyle= 'rgb('+color[0]+','+color[1]+","+color[2]+')';
	ctx.fill();
	ctx.closePath();
}

var isWork = false;

function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	if (!isPlay) {
		drawTextToStart();
	}



	else if(isPlay){



		if (isWork) moveBlocks();
		drawVersion();
		drawRowBlocks();
		drawBonus();
		drawBall();
		drawPlatform();
		

		ctx.fillStyle = "white";
		
		drawScore();
		drawLife();
		drawDieLine();
	
		x+=dx;
		y+=dy;
		
		for (var i=0;i<numberOfBonus;i++) {
			if(bonus[i].exist==true){
				bonus[i].bonus_y += bonus_dy;
			}
		}

		
		///////////////////////////////////// PLATFORM \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		if (platform_dx_moveLeft==1) {
			platform_x-=platform_dx;
		}
		else if (platform_dx_moveRight==1) {
			platform_x+=platform_dx;
		}


		if (platform_x+platform_size_x==canvasWidth){

		 	platform_dx=0;
		}
		else if (platform_x<=2){
			platform_dx=0;
		}
		//////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

		///////////////////////////////////////// BLOCKS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		for (var i=0;i<numberOfRow; i++) {
			for (var j =0;j<number_blocks_in_row;j++){

				if ((blocks[i][j].block_y+block_size_y==y-ballRadius && dy<0) || (blocks[i][j].block_y==y+ballRadius && dy>0)) {
					if(x-ballRadius<blocks[i][j].block_x+block_size_x+2 && blocks[i][j].block_x-2<x+ballRadius && blocks[i][j].exist == true) {
						blocks[i][j].exist = false;
						dy = -dy;
						score++;
						chanceForBonus = Math.floor(Math.random()*5);
						if (chanceForBonus==1) {
							bonus_x = blocks[i][j].block_x+(70/2);
							bonus_y = blocks[i][j].block_y+block_size_y;
							createBonus();
						}
					}
				}
				else if (((dx>0 && blocks[i][j].block_x==x+ballRadius || dx<0 && blocks[i][j].block_x+block_size_x == x-ballRadius))) {
					if (blocks[i][j].block_y<=y+10 && blocks[i][j].block_y+block_size_y>=y-10 && blocks[i][j].exist == true){
						blocks[i][j].exist = false;
						dx = -dx;
						score++;
						chanceForBonus = Math.floor(Math.random()*5);
						if (chanceForBonus==1) {
							bonus_x = blocks[i][j].block_x+(70/2);
							bonus_y = blocks[i][j].block_y+block_size_y;
							createBonus();
						}
					}
				}
				if (blocks[i][j].block_y>=deathLine && blocks[i][j].exist==true) {
					isAlive = false;
				}
			}
		}





		////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

		/////////////////////////////////////////// BONUS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		
		for (var i=0;i<numberOfBonus;i++){
			if (bonus[i].bonus_y == canvasHeight-20 && bonus[i].bonus_x+ballRadius>=platform_x && bonus[i].bonus_x- ballRadius <=platform_x+platform_size_x) {
				bonus[i].exist= false;
				bonus[i].bonus_x = -100;
			 	activateBonus(bonus[i].nameOfBonus);
			}
		}


	 	///////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

		/////////////////////////////////////////// MOVE BALL \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

		if (y+ballRadius == canvasHeight-20 && x+ballRadius>=platform_x && x-ballRadius<=platform_x+platform_size_x && dy>0) {

										//////////////// CHANGE SPEED \\\\\\\\\\\\\\
			if (platform_dx_moveLeft==1 && dx>0){
				if (1<Math.abs(dx) && Math.abs(dx)<=2) {
					dx--;
				}
			}
			else if (platform_dx_moveLeft==1 && dx<0) {
				if (1<=Math.abs(dx) && Math.abs(dx)<2) {
					dx--;
				}
			}
			else if (platform_dx_moveRight==1 && dx<0) {
				if (1<Math.abs(dx) && Math.abs(dx)<=2) {
					dx++;
				}
			}
			else if (platform_dx_moveRight==1 && dx>0) {
				if (1<=Math.abs(dx) && Math.abs(dx)<2) {
					dx++;
				}
			}

			else if (dx==0){
				if (platform_dx_moveLeft==1) {
					dx=-1;
				}
				else if (platform_dx_moveRight==1) {
					dx=1;
				}
			}
									/////////////////////////\\\\\\\\\\\\\\\\\\\\\

			dy=-dy;
			soundAtPlatform.currentTime = 0;
			soundAtPlatform.play();

		}

		else if (y+ballRadius == canvasHeight ) {
			dy = 0;
			dx = 0;
			clearInterval(intervalMoveBlocks);
			
			if (life!=0) {
				life--;
				drawBalanceLife();
				
				isAlive = false;
				isHaveExtraLife = true;
				clearInterval(intervalDraw);
				clearInterval(intervalMoveBlocks);
			}
			else {
				isLifeZero = true;
				isAlive = false;
				isStart = false;
				isHaveExtraLife = false;
			}
		}

		if (y + dy < ballRadius || y + dy > canvasHeight-ballRadius) {
			switchColor();
	
			soundAtWall.currentTime = 0;
			soundAtWall.play();

			dy = -dy;
		}
	
		if (x + dx > canvasWidth-ballRadius || x + dx < ballRadius) {
			switchColor();
			soundAtWall.currentTime = 0;
			soundAtWall.play();
			dx = -dx;
		}

									



		////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	
		if (!isAlive && !isHaveExtraLife) {
			drawLose();
			clearInterval(intervalDraw);
		}

	}
}

var intervalForStart;
var intervalDraw;

function startGame() {
	
	draw();

	intervalForStart = setInterval(function(){
		isGameBegin = true;
		if (countWord<3){
			draw();
			drawWordToStart();
			countWord++;
		}
		else if (countWord==3) {
			countWord=0;
			
			
			if (isLifeZero){
				isWork=true;
				drawRowBlockssFirsltly();
				numberOfRow = 3;
			}

			intervalMoveBlocks = setInterval(function() {
				drawRowBlockss();
				numberOfRow++;
				isWork=true;
			},10000);
			dx = 0;
			dy = -2;
			isStart=true;
			intervalDraw = setInterval(draw,10);
			clearInterval(intervalForStart);
		}
	},1000);
}

draw();
	
	document.addEventListener('keyup', function(event){
		if(event.code == "KeyA" || event.keyCode == 37){
			platform_dx_moveLeft = 0;
		}
		if(event.code == "KeyD" || event.keyCode == 39){
			platform_dx_moveRight = 0;
		}
	});


	


	document.addEventListener('keydown', function(event){
		if((event.code == "KeyA" || event.keyCode == 37) && isAlive && isStart) {
			platform_dx_moveLeft = 1;
			platform_dx_moveRight = 0;
			if(platform_x+platform_size_x>=canvasWidth && platform_dx==0) {
				platform_dx = 3;
			}
		}
		if ((event.code == "KeyD" || event.keyCode == 39) && isAlive && isStart){
			platform_dx_moveRight = 1;
			platform_dx_moveLeft = 0;
			if(platform_x<=2 && platform_dx==0){
				platform_dx = 3;
			}
		}
		if ((event.keyCode == 13 || event.keyCode == 32) && !isAlive && isHaveExtraLife) {
			isAlive = true;
			x = canvas.width/2;
			y = canvas.height-30;
			platform_y = canvasHeight-20;
			platform_x = canvasWidth/2-(platform_size_x/2);
			startGame();
		}
		else if ((event.keyCode == 13 || event.keyCode == 32) && !isPlay) {
			isPlay = true;
			blocks = [];
			bonus = [];
			startGame();
			
		}
		else if ((event.keyCode == 13 || event.keyCode == 32) && !isAlive) {
			isAlive = true;
			score=0;
			x = canvas.width/2;
			y = canvas.height-30;
			platform_y = canvasHeight-20;
			platform_x = canvasWidth/2-(platform_size_x/2);
			blocks.length = 0;
			bonus.length = 0;
			numberOfBonus = 0;
			numberOfRow = 0;
			startGame();
		}
		

		else if ((event.keyCode == 13 || event.keyCode == 32) && isAlive && isGameBegin==true) {
			isGameBegin = false;
			clearInterval(intervalForStart);
			countWord=0;
			
			if (isLifeZero) {
				isWork=true;
				drawRowBlockssFirsltly();
				numberOfRow = 3;
			}

			intervalMoveBlocks = setInterval(function() {
				drawRowBlockss();
				numberOfRow++;
				isWork=true;
			},10000);
			dx = 0;
			dy = -2;
			isStart=true;
			intervalDraw = setInterval(draw,10);
		}
	});























/////////////////////////////////////////////			MOBILE 				////////////////////////////

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	var heightOfScreen = document.documentElement.clientHeight;
	
	var leftOfScreen = document.getElementById("left");
	leftOfScreen.style.height = heightOfScreen + "px";
	var rightOfScreen = document.getElementById("right");
	rightOfScreen.style.height = heightOfScreen + "px";
	
	
	
	
	leftOfScreen.addEventListener('touchstart',function(){
		if (isAlive && isStart) {
			platform_dx_moveLeft = 1;
			platform_dx_moveRight = 0;
			if(platform_x+platform_size_x>=canvasWidth && platform_dx==0) {
				platform_dx = 3;
			}
		}
	});
	leftOfScreen.addEventListener('touchend',function(){
		platform_dx_moveLeft = 0;
	});




	rightOfScreen.addEventListener('touchstart',function(){
		if (isAlive && isStart) {
			platform_dx_moveRight = 1;
			platform_dx_moveLeft = 0;
			if(platform_x<=2 && platform_dx==0){
				platform_dx = 3;
			}
		}
	});
	rightOfScreen.addEventListener('touchend',function(){
		platform_dx_moveRight = 0;
	});



	document.addEventListener('click',function(){
		if(!isPlay){
			isPlay = true;
			blocks = [];
			startGame();
		}

		else if (!isAlive) {
			isAlive = true;
			score=0;
			x = canvas.width/2;
			y = canvas.height-30;
			platform_y = canvasHeight-20;
			platform_x = canvasWidth/2-(platform_size_x/2);
			blocks.length = 0;
			numberOfRow = 0;
			startGame();
		}
	});
}
///////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\