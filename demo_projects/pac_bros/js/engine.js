

var world = [
	 [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	 [2,0,1,1,1,1,1,2,3,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2,3,2],
	 [2,1,2,2,2,2,1,2,2,2,2,1,2,2,2,1,2,1,2,2,2,2,2,1,2,1,2,2,2,2,2,2,1,2,1,2],
	 [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2],
	 [2,2,2,1,6,6,6,6,6,1,6,6,6,6,1,6,6,6,6,6,1,6,6,6,6,6,1,6,1,3,1,6,1,2,1,2],
	 [2,1,1,1,1,1,6,1,1,1,6,7,8,6,1,6,3,6,3,6,1,6,3,6,3,6,1,6,6,6,6,6,1,2,1,2],
	 [2,1,2,3,2,1,6,1,2,1,6,9,10,6,1,6,0,6,0,6,1,6,0,6,0,6,1,1,1,6,1,1,1,1,1,2],
	 [2,1,2,2,2,1,6,1,2,1,6,6,6,6,1,6,1,6,1,6,1,6,1,6,1,6,1,2,1,6,1,2,2,2,1,2],
	 [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2],
	 [2,1,2,2,1,2,2,2,2,2,1,2,1,2,2,2,2,1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,1,2],
	 [2,1,3,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,3,2,1,1,1,1,1,1,1,1,1,1,1,3,2,0,2],
	 [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];
var score = 0;
var life = 5;

var pacman1 = {
	x: 1,
	y: 1,
	X: NaN
};
var pacman2 = {
	x: 34,
	y: 10,
	X: NaN
};
var ghost1 = {
	x: 16,
	y: 6,
	X: NaN
};
var ghost2 = {
	x: 18,
	y: 6,
	X: NaN
};
var ghost3 = {
	x: 22,
	y: 6,
	X: NaN
};
var ghost4 = {
	x: 24,
	y: 6,
	X: NaN
};


function displayWorld(){
	var output='';

	for(var i=0; i<world.length; i++){
		output += "\n<div class='row'>\n";
		for(var j=0; j<world[i].length; j++){
			if(world[i][j]==2) {
				output += "<div class='brick'></div>";
			} else if(world[i][j]==1) { // 1 = blue brick
				output += "<div class='coin'></div>";
			} else if(world[i][j]==0) { // 0 = empty space
				output += "<div class='empty'></div>";
			} else if(world[i][j]==3) { // 3 = cherry
				output += "<div class='cherry'></div>";
			} else if(world[i][j]==4) { //4 = poop
				output += "<div class='poop'></div>";
			} else if(world[i][j]==5) { //5 = ghost
				output += "<div class='ghost'></div>";
			} else if(world[i][j]==6) { //6 = name brick
				output += "<div class='name'></div>";
			} else if(world[i][j]==7) { //7 = photo1
				output += "<div class='tommy1'></div>";
			} else if(world[i][j]==8) { //8 = photo2
				output += "<div class='tommy2'></div>";
			} else if(world[i][j]==9) { //9 = photo3
				output += "<div class='tommy3'></div>";
			} else if(world[i][j]==10) { //10 = photo4
				output += "<div class='tommy4'></div>";
			}

		}
		output +="\n</div>";
	}
	// console.log(output);
	document.getElementById('world').innerHTML = output;
}



function displayPacman(){
	document.getElementById('pacman1').style.top= pacman1.y*20+"px";
	document.getElementById('pacman1').style.left= pacman1.x*20+"px";
	document.getElementById('pacman2').style.top= pacman2.y*20+"px";
	document.getElementById('pacman2').style.left= pacman2.x*20+"px";
}

function randomGhost(){
	var ghosts = ['ghost1.gif', 'ghost2.gif', 'ghost3.gif', 'ghost4.gif', 'ghost5.gif', 'ghost6.gif', 'ghost7.gif'];
	
	$('.ghost1').each(function(){
		$(this).css({'background': 'url(./image/' + ghosts[Math.floor(Math.random() * ghosts.length)] + ')',
			'background-repeat':'no-repeat',
			'background-position':'center',
			'background-size':'140%',
			'top': ghost1.y*20+"px",
			'left': ghost1.x*20+"px"
		});
	});
	$('.ghost2').each(function(){
		$(this).css({'background': 'url(./image/' + ghosts[Math.floor(Math.random() * ghosts.length)] + ')',
			'background-repeat':'no-repeat',
			'background-position':'center',
			'background-size':'140%',
			'top': ghost2.y*20+"px",
			'left': ghost2.x*20+"px"
		});
	});
	$('.ghost3').each(function(){
		$(this).css({'background': 'url(./image/' + ghosts[Math.floor(Math.random() * ghosts.length)] + ')',
			'background-repeat':'no-repeat',
			'background-position':'center',
			'background-size':'140%',
			'top': ghost3.y*20+"px",
			'left': ghost3.x*20+"px"
		});
	});
	$('.ghost4').each(function(){
		$(this).css({'background': 'url(./image/' + ghosts[Math.floor(Math.random() * ghosts.length)] + ')',
			'background-repeat':'no-repeat',
			'background-position':'center',
			'background-size':'140%',
			'top': ghost4.y*20+"px",
			'left': ghost4.x*20+"px"
		});
	});
}

function displayGhost(){
	randomGhost();
}



function displayScore(){
	document.getElementById('score').innerHTML = score;
}

function displayLife(){	
	document.getElementById('life').innerHTML = life;
}

displayWorld();
displayPacman();
displayScore();
displayLife();
displayGhost();

document.onkeydown = function(e){
	if((e.keyCode == 37 && world[pacman1.y][pacman1.x-1] != 2) &&
		(e.keyCode == 37 && world[pacman1.y][pacman1.x-1] != 6)){ //left
		pacman1.x--;
		document.getElementById('pacman1').style.transform = "scaleX(-1)";
	} else if((e.keyCode == 39 && world[pacman1.y][pacman1.x+1] != 2) &&
				(e.keyCode == 39 && world[pacman1.y][pacman1.x+1] != 6)){ //right
		pacman1.x++;
		document.getElementById('pacman1').style.transform = "scaleX(1)";
	} else if ((e.keyCode == 38 && world[pacman1.y-1][pacman1.x] != 2) &&
				(e.keyCode == 38 && world[pacman1.y-1][pacman1.x] != 6)){ //up
		pacman1.y--;
		document.getElementById('pacman1').style.transform = "rotate(270deg)";
	} else if ((e.keyCode == 40 && world[pacman1.y+1][pacman1.x] != 2) &&
				(e.keyCode == 40 && world[pacman1.y+1][pacman1.x] != 6)){ //down
		pacman1.y++;
		document.getElementById('pacman1').style.transform = "rotate(90deg)";
	}

	if((e.keyCode == 37 && world[pacman2.y][pacman2.x-1] != 2) &&
		(e.keyCode == 37 && world[pacman2.y][pacman2.x-1] != 6)){ //left
		pacman2.x--;
		document.getElementById('pacman2').style.transform = "scaleX(-1)";
	} else if((e.keyCode == 39 && world[pacman2.y][pacman2.x+1] != 2) &&
				(e.keyCode == 39 && world[pacman2.y][pacman2.x+1] != 6)){ //right
		pacman2.x++;
		document.getElementById('pacman2').style.transform = "scaleX(1)";
	} else if ((e.keyCode == 38 && world[pacman2.y-1][pacman2.x] != 2) &&
				(e.keyCode == 38 && world[pacman2.y-1][pacman2.x] != 6)){ //up
		pacman2.y--;
		document.getElementById('pacman2').style.transform = "rotate(270deg)";
	} else if ((e.keyCode == 40 && world[pacman2.y+1][pacman2.x] != 2) &&
				(e.keyCode == 40 && world[pacman2.y+1][pacman2.x] != 6)){ //down
		pacman2.y++;
		document.getElementById('pacman2').style.transform = "rotate(90deg)";
	}

	
	if(world[pacman1.y][pacman1.x]==1){ //eat coin 10 points!
		world[pacman1.y][pacman1.x]=0;
		score+=10;
		displayWorld();
		displayScore();
	} else if (world[pacman1.y][pacman1.x]==3){ //eat cherry 50 points!
		world[pacman1.y][pacman1.x]=0;
		score+=50;
		displayWorld();
		displayScore();
	} else if (world[pacman1.y][pacman1.x]==0){ //walk empty, poop will appear!
		world[pacman1.y][pacman1.x]=4;
		// score+=50;
		displayWorld();
		displayScore();
	} else if (world[pacman1.y][pacman1.x]==4){ //walk on poop, -3 points!
		world[pacman1.y][pacman1.x]=0;
		score-=4;
		displayWorld();
		displayScore();
	}

	if(world[pacman2.y][pacman2.x]==1){ //eat coin 10 points!
		world[pacman2.y][pacman2.x]=0;
		score+=10;
		displayWorld();
		displayScore();
	} else if (world[pacman2.y][pacman2.x]==3){ //eat cherry 50 points!
		world[pacman2.y][pacman2.x]=0;
		score+=50;
		displayWorld();
		displayScore();
	} else if (world[pacman2.y][pacman2.x]==0){ //walk empty, poop will appear!
		world[pacman2.y][pacman2.x]=4;
		// score+=50;
		displayWorld();
		displayScore();
	} else if (world[pacman2.y][pacman2.x]==4){ //walk on poop, -3 points!
		world[pacman2.y][pacman2.x]=0;
		score-=4;
		displayWorld();
		displayScore();
	}

	// console.log(e.keyCode);

	displayPacman();
	displayGhost(); //sole purpose: ghost color change.
	mind_fuck();

		//meet ghost, -20 points! -1 life! 
	if ((JSON.stringify(pacman1)==JSON.stringify(ghost1)) ||
		(JSON.stringify(pacman1)==JSON.stringify(ghost2)) ||
		(JSON.stringify(pacman1)==JSON.stringify(ghost3)) ||
		(JSON.stringify(pacman1)==JSON.stringify(ghost4))){ 
		score-=20;
		life--; //later, when life reaches 0, put "GAME OVER"
		displayWorld();
		displayScore();
		displayLife();
	}

		//meet ghost, -20 points! -1 life! 
	if ((JSON.stringify(pacman2)==JSON.stringify(ghost1)) ||
		(JSON.stringify(pacman2)==JSON.stringify(ghost2)) ||
		(JSON.stringify(pacman2)==JSON.stringify(ghost3)) ||
		(JSON.stringify(pacman2)==JSON.stringify(ghost4))){ 
		score-=20;
		life--; //later, when life reaches 0, put "GAME OVER"
		displayWorld();
		displayScore();
		displayLife();
	}
	
	if (life==0){
		alert('You used all your lives! Game Over!');
		location.reload();
	}
}

setInterval(function(){ ghostMovement() }, 350);

function ghostMovement() {
	//ghost1 movement
	//case where all walls except down side
	if(	(world[ghost1.y][ghost1.x-1] == 2 ||
		 world[ghost1.y][ghost1.x-1] == 6) &&
		(world[ghost1.y][ghost1.x+1] == 2 ||
		 world[ghost1.y][ghost1.x+1] == 6)&&
		(world[ghost1.y-1][ghost1.x] == 2 ||
		 world[ghost1.y-1][ghost1.x] == 6) ) 
	{ 
			ghost1.y++;
	} 
	//case where all walls except up side
	else if (	(world[ghost1.y][ghost1.x-1] == 2 ||
				 world[ghost1.y][ghost1.x-1] == 6) &&
				(world[ghost1.y][ghost1.x+1] == 2 ||
				 world[ghost1.y][ghost1.x+1] == 6)&&
				(world[ghost1.y+1][ghost1.x] == 2 ||
				 world[ghost1.y+1][ghost1.x] == 6) )
	{
		ghost1.y--;
	}
	//case where all walls except right side
	else if (	(world[ghost1.y][ghost1.x-1] == 2 ||
				 world[ghost1.y][ghost1.x-1] == 6) &&
				(world[ghost1.y-1][ghost1.x] == 2 ||
				 world[ghost1.y-1][ghost1.x] == 6)&&
				(world[ghost1.y+1][ghost1.x] == 2 ||
				 world[ghost1.y+1][ghost1.x] == 6) )
	{
		ghost1.x++;
	}
	//case where all walls except left side
	else if (	(world[ghost1.y][ghost1.x+1] == 2 ||
				 world[ghost1.y][ghost1.x+1] == 6) &&
				(world[ghost1.y-1][ghost1.x] == 2 ||
				 world[ghost1.y-1][ghost1.x] == 6)&&
				(world[ghost1.y+1][ghost1.x] == 2 ||
				 world[ghost1.y+1][ghost1.x] == 6)  )
	{
		ghost1.x--;
	}
	//case where left side and right side have walls.
	else if (	(world[ghost1.y][ghost1.x+1] == 2 ||
				 world[ghost1.y][ghost1.x+1] == 6) &&
				(world[ghost1.y][ghost1.x-1] == 2 ||
				 world[ghost1.y][ghost1.x-1] == 6))
	{
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost1.y--;
		} else {
			ghost1.y++;
		}
	}
	//case where up side and down side have walls.
	else if (	(world[ghost1.y+1][ghost1.x] == 2 ||
				 world[ghost1.y+1][ghost1.x] == 6) &&
				(world[ghost1.y-1][ghost1.x] == 2 ||
				 world[ghost1.y-1][ghost1.x] == 6))
	{
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost1.x--;
		} else {
			ghost1.x++;
		}
	}
	//case where left side and down side have walls.
	else if (	(world[ghost1.y][ghost1.x-1] == 2 ||
				 world[ghost1.y][ghost1.x-1] == 6) &&
				(world[ghost1.y+1][ghost1.x] == 2 ||
				 world[ghost1.y+1][ghost1.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost1.x++;
		} else {
			ghost1.y--;
		}
	}
	//case where up side and left side have walls.
	else if (	(world[ghost1.y][ghost1.x-1] == 2 ||
				 world[ghost1.y][ghost1.x-1] == 6) &&
				(world[ghost1.y-1][ghost1.x] == 2 ||
				 world[ghost1.y-1][ghost1.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost1.x++;
		} else {
			ghost1.y++;
		}
	}
	//case where down side and right side have walls.
	else if (	(world[ghost1.y][ghost1.x+1] == 2 ||
				 world[ghost1.y][ghost1.x+1] == 6) &&
				(world[ghost1.y+1][ghost1.x] == 2 ||
				 world[ghost1.y+1][ghost1.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost1.x--;
		} else {
			ghost1.y--;
		}
	}
	//case where right side and up side have walls.
	else if (	(world[ghost1.y][ghost1.x+1] == 2 ||
				 world[ghost1.y][ghost1.x+1] == 6) &&
				(world[ghost1.y-1][ghost1.x] == 2 ||
				 world[ghost1.y-1][ghost1.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost1.x--;
		} else {
			ghost1.y++;
		}
	}
	//case where left side has wall.
	else if (	(world[ghost1.y][ghost1.x-1] == 2 ||
				 world[ghost1.y][ghost1.x-1] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost1.x++;
		} else if(choice_3==2){
			ghost1.y++;
		} else {
			ghost1.y--;
		}
	}
	//case where right side has wall.
	else if (	(world[ghost1.y][ghost1.x+1] == 2 ||
				 world[ghost1.y][ghost1.x+1] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost1.x--;
		} else if(choice_3==2){
			ghost1.y++;
		} else {
			ghost1.y--;
		}
	}
	//case where up side has wall.
	else if (	(world[ghost1.y-1][ghost1.x] == 2 ||
				 world[ghost1.y-1][ghost1.x] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost1.x--;
		} else if(choice_3==2){
			ghost1.X++;
		} else {
			ghost1.y++;
		}
	}
	//case where down side has wall
	else if (	(world[ghost1.y+1][ghost1.x] == 2 ||
				 world[ghost1.y+1][ghost1.x] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost1.x--;
		} else if(choice_3==2){
			ghost1.X++;
		} else {
			ghost1.y--;
		}
	} 
	//case where all sides are open (no walls)
	else { 
		var choice_4 = Math.floor((Math.random()*4)+1);
		if(choice_4==1){
			ghost1.x--;
		} else if(choice_4==2){
			ghost1.X++;
		} else if(choice_4==3){
			ghost1.y++;
		} else {
			ghost1.y--;
		}
	}
	
	//ghost2 movement
	//case where all walls except down side
	if(	(world[ghost2.y][ghost2.x-1] == 2 ||
		 world[ghost2.y][ghost2.x-1] == 6) &&
		(world[ghost2.y][ghost2.x+1] == 2 ||
		 world[ghost2.y][ghost2.x+1] == 6)&&
		(world[ghost2.y-1][ghost2.x] == 2 ||
		 world[ghost2.y-1][ghost2.x] == 6) ) 
	{ 
			ghost2.y++;
	} 
	//case where all walls except up side
	else if (	(world[ghost2.y][ghost2.x-1] == 2 ||
				 world[ghost2.y][ghost2.x-1] == 6) &&
				(world[ghost2.y][ghost2.x+1] == 2 ||
				 world[ghost2.y][ghost2.x+1] == 6)&&
				(world[ghost2.y+1][ghost2.x] == 2 ||
				 world[ghost2.y+1][ghost2.x] == 6) )
	{
		ghost2.y--;
	}
	//case where all walls except right side
	else if (	(world[ghost2.y][ghost2.x-1] == 2 ||
				 world[ghost2.y][ghost2.x-1] == 6) &&
				(world[ghost2.y-1][ghost2.x] == 2 ||
				 world[ghost2.y-1][ghost2.x] == 6)&&
				(world[ghost2.y+1][ghost2.x] == 2 ||
				 world[ghost2.y+1][ghost2.x] == 6) )
	{
		ghost2.x++;
	}
	//case where all walls except left side
	else if (	(world[ghost2.y][ghost2.x+1] == 2 ||
				 world[ghost2.y][ghost2.x+1] == 6) &&
				(world[ghost2.y-1][ghost2.x] == 2 ||
				 world[ghost2.y-1][ghost2.x] == 6)&&
				(world[ghost2.y+1][ghost2.x] == 2 ||
				 world[ghost2.y+1][ghost2.x] == 6)  )
	{
		ghost2.x--;
	}
	//case where left side and right side have walls.
	else if (	(world[ghost2.y][ghost2.x+1] == 2 ||
				 world[ghost2.y][ghost2.x+1] == 6) &&
				(world[ghost2.y][ghost2.x-1] == 2 ||
				 world[ghost2.y][ghost2.x-1] == 6))
	{
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost2.y--;
		} else {
			ghost2.y++;
		}
	}
	//case where up side and down side have walls.
	else if (	(world[ghost2.y+1][ghost2.x] == 2 ||
				 world[ghost2.y+1][ghost2.x] == 6) &&
				(world[ghost2.y-1][ghost2.x] == 2 ||
				 world[ghost2.y-1][ghost2.x] == 6))
	{
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost2.x--;
		} else {
			ghost2.x++;
		}
	}
	//case where left side and down side have walls.
	else if (	(world[ghost2.y][ghost2.x-1] == 2 ||
				 world[ghost2.y][ghost2.x-1] == 6) &&
				(world[ghost2.y+1][ghost2.x] == 2 ||
				 world[ghost2.y+1][ghost2.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);
		if(choice_2==1){
			ghost2.x++;
		} else {
			ghost2.y--;
		}
	}
	//case where up side and left side have walls.
	else if (	(world[ghost2.y][ghost2.x-1] == 2 ||
				 world[ghost2.y][ghost2.x-1] == 6) &&
				(world[ghost2.y-1][ghost2.x] == 2 ||
				 world[ghost2.y-1][ghost2.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost2.x++;
		} else {
			ghost2.y++;
		}
	}
	//case where down side and right side have walls.
	else if (	(world[ghost2.y][ghost2.x+1] == 2 ||
				 world[ghost2.y][ghost2.x+1] == 6) &&
				(world[ghost2.y+1][ghost2.x] == 2 ||
				 world[ghost2.y+1][ghost2.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost2.x--;
		} else {
			ghost2.y--;
		}
	}
	//case where right side and up side have walls.
	else if (	(world[ghost2.y][ghost2.x+1] == 2 ||
				 world[ghost2.y][ghost2.x+1] == 6) &&
				(world[ghost2.y-1][ghost2.x] == 2 ||
				 world[ghost2.y-1][ghost2.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost2.x--;
		} else {
			ghost2.y++;
		}
	}
	//case where left side has wall.
	else if (	(world[ghost2.y][ghost2.x-1] == 2 ||
				 world[ghost2.y][ghost2.x-1] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost2.x++;
		} else if(choice_3==2){
			ghost2.y++;
		} else {
			ghost2.y--;
		}
	}
	//case where right side has wall.
	else if (	(world[ghost2.y][ghost2.x+1] == 2 ||
				 world[ghost2.y][ghost2.x+1] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost2.x--;
		} else if(choice_3==2){
			ghost2.y++;
		} else {
			ghost2.y--;
		}
	}
	//case where up side has wall.
	else if (	(world[ghost2.y-1][ghost2.x] == 2 ||
				 world[ghost2.y-1][ghost2.x] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost2.x--;
		} else if(choice_3==2){
			ghost2.X++;
		} else {
			ghost2.y++;
		}
	}
	//case where down side has wall
	else if (	(world[ghost2.y+1][ghost2.x] == 2 ||
				 world[ghost2.y+1][ghost2.x] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost2.x--;
		} else if(choice_3==2){
			ghost2.X++;
		} else {
			ghost2.y--;
		}
	} 
	//case where all sides are open (no walls)
	else { 
		var choice_4 = Math.floor((Math.random()*4)+1);	
		if(choice_4==1){
			ghost2.x--;
		} else if(choice_4==2){
			ghost2.X++;
		} else if(choice_4==3){
			ghost2.y++;
		} else {
			ghost2.y--;
		}
	}

	//ghost3 movement
	//case where all walls except down side
	if(	(world[ghost3.y][ghost3.x-1] == 2 ||
		 world[ghost3.y][ghost3.x-1] == 6) &&
		(world[ghost3.y][ghost3.x+1] == 2 ||
		 world[ghost3.y][ghost3.x+1] == 6)&&
		(world[ghost3.y-1][ghost3.x] == 2 ||
		 world[ghost3.y-1][ghost3.x] == 6) ) 
	{ 
			ghost3.y++;
	} 
	//case where all walls except up side
	else if (	(world[ghost3.y][ghost3.x-1] == 2 ||
				 world[ghost3.y][ghost3.x-1] == 6) &&
				(world[ghost3.y][ghost3.x+1] == 2 ||
				 world[ghost3.y][ghost3.x+1] == 6)&&
				(world[ghost3.y+1][ghost3.x] == 2 ||
				 world[ghost3.y+1][ghost3.x] == 6) )
	{
		ghost3.y--;
	}
	//case where all walls except right side
	else if (	(world[ghost3.y][ghost3.x-1] == 2 ||
				 world[ghost3.y][ghost3.x-1] == 6) &&
				(world[ghost3.y-1][ghost3.x] == 2 ||
				 world[ghost3.y-1][ghost3.x] == 6)&&
				(world[ghost3.y+1][ghost3.x] == 2 ||
				 world[ghost3.y+1][ghost3.x] == 6) )
	{
		ghost3.x++;
	}
	//case where all walls except left side
	else if (	(world[ghost3.y][ghost3.x+1] == 2 ||
				 world[ghost3.y][ghost3.x+1] == 6) &&
				(world[ghost3.y-1][ghost3.x] == 2 ||
				 world[ghost3.y-1][ghost3.x] == 6)&&
				(world[ghost3.y+1][ghost3.x] == 2 ||
				 world[ghost3.y+1][ghost3.x] == 6)  )
	{
		ghost3.x--;
	}
	//case where left side and right side have walls.
	else if (	(world[ghost3.y][ghost3.x+1] == 2 ||
				 world[ghost3.y][ghost3.x+1] == 6) &&
				(world[ghost3.y][ghost3.x-1] == 2 ||
				 world[ghost3.y][ghost3.x-1] == 6))
	{
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost3.y--;
		} else {
			ghost3.y++;
		}
	}
	//case where up side and down side have walls.
	else if (	(world[ghost3.y+1][ghost3.x] == 2 ||
				 world[ghost3.y+1][ghost3.x] == 6) &&
				(world[ghost3.y-1][ghost3.x] == 2 ||
				 world[ghost3.y-1][ghost3.x] == 6))
	{
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost3.x--;
		} else {
			ghost3.x++;
		}
	}
	//case where left side and down side have walls.
	else if (	(world[ghost3.y][ghost3.x-1] == 2 ||
				 world[ghost3.y][ghost3.x-1] == 6) &&
				(world[ghost3.y+1][ghost3.x] == 2 ||
				 world[ghost3.y+1][ghost3.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost3.x++;
		} else {
			ghost3.y--;
		}
	}
	//case where up side and left side have walls.
	else if (	(world[ghost3.y][ghost3.x-1] == 2 ||
				 world[ghost3.y][ghost3.x-1] == 6) &&
				(world[ghost3.y-1][ghost3.x] == 2 ||
				 world[ghost3.y-1][ghost3.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost3.x++;
		} else {
			ghost3.y++;
		}
	}
	//case where down side and right side have walls.
	else if (	(world[ghost3.y][ghost3.x+1] == 2 ||
				 world[ghost3.y][ghost3.x+1] == 6) &&
				(world[ghost3.y+1][ghost3.x] == 2 ||
				 world[ghost3.y+1][ghost3.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost3.x--;
		} else {
			ghost3.y--;
		}
	}
	//case where right side and up side have walls.
	else if (	(world[ghost3.y][ghost3.x+1] == 2 ||
				 world[ghost3.y][ghost3.x+1] == 6) &&
				(world[ghost3.y-1][ghost3.x] == 2 ||
				 world[ghost3.y-1][ghost3.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost3.x--;
		} else {
			ghost3.y++;
		}
	}
	//case where left side has wall.
	else if (	(world[ghost3.y][ghost3.x-1] == 2 ||
				 world[ghost3.y][ghost3.x-1] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost3.x++;
		} else if(choice_3==2){
			ghost3.y++;
		} else {
			ghost3.y--;
		}
	}
	//case where right side has wall.
	else if (	(world[ghost3.y][ghost3.x+1] == 2 ||
				 world[ghost3.y][ghost3.x+1] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost3.x--;
		} else if(choice_3==2){
			ghost3.y++;
		} else {
			ghost3.y--;
		}
	}
	//case where up side has wall.
	else if (	(world[ghost3.y-1][ghost3.x] == 2 ||
				 world[ghost3.y-1][ghost3.x] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost3.x++;
		} else if(choice_3==2){
			ghost3.X--;
		} else {
			ghost3.y++;
		}
	}
	//case where down side has wall
	else if (	(world[ghost3.y+1][ghost3.x] == 2 ||
				 world[ghost3.y+1][ghost3.x] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost3.x++;
		} else if(choice_3==2){
			ghost3.X--;
		} else {
			ghost3.y--;
		}
	} 
	//case where all sides are open (no walls)
	else { 
		var choice_4 = Math.floor((Math.random()*4)+1);	
		if(choice_4==1){
			ghost3.x++;
		} else if(choice_4==2){
			ghost3.X--;
		} else if(choice_4==3){
			ghost3.y++;
		} else {
			ghost3.y--;
		}
	}

	//ghost4 movement
	//case where all walls except down side
	if(	(world[ghost4.y][ghost4.x-1] == 2 ||
		 world[ghost4.y][ghost4.x-1] == 6) &&
		(world[ghost4.y][ghost4.x+1] == 2 ||
		 world[ghost4.y][ghost4.x+1] == 6)&&
		(world[ghost4.y-1][ghost4.x] == 2 ||
		 world[ghost4.y-1][ghost4.x] == 6) ) 
	{ 
			ghost4.y++;
	} 
	//case where all walls except up side
	else if (	(world[ghost4.y][ghost4.x-1] == 2 ||
				 world[ghost4.y][ghost4.x-1] == 6) &&
				(world[ghost4.y][ghost4.x+1] == 2 ||
				 world[ghost4.y][ghost4.x+1] == 6)&&
				(world[ghost4.y+1][ghost4.x] == 2 ||
				 world[ghost4.y+1][ghost4.x] == 6) )
	{
		ghost4.y--;
	}
	//case where all walls except right side
	else if (	(world[ghost4.y][ghost4.x-1] == 2 ||
				 world[ghost4.y][ghost4.x-1] == 6) &&
				(world[ghost4.y-1][ghost4.x] == 2 ||
				 world[ghost4.y-1][ghost4.x] == 6)&&
				(world[ghost4.y+1][ghost4.x] == 2 ||
				 world[ghost4.y+1][ghost4.x] == 6) )
	{
		ghost4.x++;
	}
	//case where all walls except left side
	else if (	(world[ghost4.y][ghost4.x+1] == 2 ||
				 world[ghost4.y][ghost4.x+1] == 6) &&
				(world[ghost4.y-1][ghost4.x] == 2 ||
				 world[ghost4.y-1][ghost4.x] == 6)&&
				(world[ghost4.y+1][ghost4.x] == 2 ||
				 world[ghost4.y+1][ghost4.x] == 6)  )
	{
		ghost4.x--;
	}
	//case where left side and right side have walls.
	else if (	(world[ghost4.y][ghost4.x+1] == 2 ||
				 world[ghost4.y][ghost4.x+1] == 6) &&
				(world[ghost4.y][ghost4.x-1] == 2 ||
				 world[ghost4.y][ghost4.x-1] == 6))
	{
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost4.y--;
		} else {
			ghost4.y++;
		}
	}
	//case where up side and down side have walls.
	else if (	(world[ghost4.y+1][ghost4.x] == 2 ||
				 world[ghost4.y+1][ghost4.x] == 6) &&
				(world[ghost4.y-1][ghost4.x] == 2 ||
				 world[ghost4.y-1][ghost4.x] == 6))
	{
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost4.x--;
		} else {
			ghost4.x++;
		}
	}
	//case where left side and down side have walls.
	else if (	(world[ghost4.y][ghost4.x-1] == 2 ||
				 world[ghost4.y][ghost4.x-1] == 6) &&
				(world[ghost4.y+1][ghost4.x] == 2 ||
				 world[ghost4.y+1][ghost4.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost4.x++;
		} else {
			ghost4.y--;
		}
	}
	//case where up side and left side have walls.
	else if (	(world[ghost4.y][ghost4.x-1] == 2 ||
				 world[ghost4.y][ghost4.x-1] == 6) &&
				(world[ghost4.y-1][ghost4.x] == 2 ||
				 world[ghost4.y-1][ghost4.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost4.x++;
		} else {
			ghost4.y++;
		}
	}
	//case where down side and right side have walls.
	else if (	(world[ghost4.y][ghost4.x+1] == 2 ||
				 world[ghost4.y][ghost4.x+1] == 6) &&
				(world[ghost4.y+1][ghost4.x] == 2 ||
				 world[ghost4.y+1][ghost4.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost4.x--;
		} else {
			ghost4.y--;
		}
	}
	//case where right side and up side have walls.
	else if (	(world[ghost4.y][ghost4.x+1] == 2 ||
				 world[ghost4.y][ghost4.x+1] == 6) &&
				(world[ghost4.y-1][ghost4.x] == 2 ||
				 world[ghost4.y-1][ghost4.x] == 6))
	{ 
		var choice_2 = Math.floor((Math.random()*2)+1);	
		if(choice_2==1){
			ghost4.x--;
		} else {
			ghost4.y++;
		}
	}
	//case where left side has wall.
	else if (	(world[ghost4.y][ghost4.x-1] == 2 ||
				 world[ghost4.y][ghost4.x-1] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost4.x++;
		} else if(choice_3==2){
			ghost4.y++;
		} else {
			ghost4.y--;
		}
	}
	//case where right side has wall.
	else if (	(world[ghost4.y][ghost4.x+1] == 2 ||
				 world[ghost4.y][ghost4.x+1] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost4.x--;
		} else if(choice_3==2){
			ghost4.y++;
		} else {
			ghost4.y--;
		}
	}
	//case where up side has wall.
	else if (	(world[ghost4.y-1][ghost4.x] == 2 ||
				 world[ghost4.y-1][ghost4.x] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost4.x--;
		} else if(choice_3==2){
			ghost4.X++;
		} else {
			ghost4.y++;
		}
	}
	//case where down side has wall
	else if (	(world[ghost4.y+1][ghost4.x] == 2 ||
				 world[ghost4.y+1][ghost4.x] == 6) )
	{ 
		var choice_3 = Math.floor((Math.random()*3)+1);	
		if(choice_3==1){
			ghost4.x--;
		} else if(choice_3==2){
			ghost4.X++;
		} else {
			ghost4.y--;
		}
	} 
	//case where all sides are open (no walls)
	else { 
		var choice_4 = Math.floor((Math.random()*4)+1);	
		if(choice_4==1){
			ghost4.x++;
		} else if(choice_4==2){
			ghost4.X--;
		} else if(choice_4==3){
			ghost4.y++;
		} else {
			ghost4.y--;
		}
	}

	displayGhost();
}

mind_fuck();
function mind_fuck(){
	$('.name').each(function(){
		$(this).css('background-color',random_color());
	});
}
function random_color()
  {
     var rgb = ['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];
     color = '#';  //this is what we'll return!
     for(var i = 0; i < 6; i++) 
     {
        x = Math.floor((Math.random()*16));
        color += rgb[x]; 
     }
     return color;
  }

