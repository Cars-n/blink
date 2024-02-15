
let playerControl,player;
let ALL_LOADED=1;
let notPlayer;

function preload() {
	brickImage = loadImage('./assets/sand-brick-tileset-texture.png');
	floorBoardImage = loadImage("assets/floorboards.png");
	doorImage=loadImage("assets/Door.png");

}
//Group to specify which sprites we want to interact with event tiles.
// let eventTileInteractable;
function setup() {

	createCanvas(1920,1080,"fullscreen");//Make a canvas the size of our window
	roomControl = new RoomController();
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