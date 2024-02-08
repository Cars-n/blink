let bricks, tilesGroup;
let playerControl,player;

function setup() {
	createCanvas(windowWidth,windowHeight);//Make a canvas the size of our window
	createRoom(10,10);

	// new Player 
	player = new Sprite(300, 300, 64, 64);
	setupPlayer();
	playerMovement = new MovementController(player,3,true);
	
	//Remove to turn off debug mode
	turnOnDebugMode(true, false);
	
	
}

function draw() {
	clear();
	playerMovement.handleInput();
	
	//FPS counter, needs to be in draw to
	//render properly
	renderStats();
}