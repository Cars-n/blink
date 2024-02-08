let bricks, tilesGroup;
let playerControl,player;

function setup() {

	createCanvas(windowWidth,windowHeight);//Make a canvas the size of our window
	createRoom(10,10);
	
	// var player=new Player();
	player=new Sprite(300,305,100);
	playerControl=new MovementController(player,10);
}

function draw() {
	background('gray');
	playerControl.handleInput();
}