
let playerControl,player;
let ALL_LOADED=1;

function setup() {

	createCanvas();//Make a canvas the size of our window
	roomControl = new RoomController();
	// createRoom(10,10);
	roomControl.renderMap();
	// new Player 
	player = setupPlayer();
	playerMovement = new MovementController(player,20,true);
	
	//Remove to turn off debug mode
	turnOnDebugMode(true, false);
	
	
}

function draw() {
	clear();
	playerMovement.handleInput();
	makeCameraFollowPlayer();
	//FPS counter, needs to be in draw to
	//render properly
	renderStats();
}