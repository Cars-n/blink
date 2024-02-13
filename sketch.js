let bricks, tilesGroup;
let playerControl,player;
let ALL_LOADED=1;

function setup() {

	createCanvas();//Make a canvas the size of our window
	
	createRoom(10,10);
	// new Player 
	player = setupPlayer();
	playerMovement = new MovementController(player,3,true);
	
	//Remove to turn off debug mode
	turnOnDebugMode(false, false);
	
	
}

function draw() {
	clear();
	playerMovement.handleInput();
	makeCameraFollowPlayer();
	//FPS counter, needs to be in draw to
	//render properly
	renderStats();
}