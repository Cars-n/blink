let playerControl,player,fadeScreen, footsteps, doorCreak;
let ALL_LOADED=1;

function preload() {
	brickImage = loadImage('./assets/sand-brick-tileset-texture.png');
	floorBoardImage = loadImage("assets/floorboards.png");
	doorImage=loadImage("assets/Door.png");
	soundFormats('mp3');
	doorCreak = loadSound('assets/audio/doorCreak.mp3');
	doorCreak.setVolume(0.5);
	footsteps = loadSound('assets/audio/footsteps.mp3');
	footsteps.setVolume(0.5);
}

function setup() {
	createCanvas();//Make a canvas the size of our window
	fadeScreen = createFadeScreen(); //Creates a screen that's black and fades in and out with the fadeInAndOut function
	//Creates Room Controller. 
	roomControl = new RoomController();
	// createRoom(10,10);
	roomControl.renderMap();
	// new Player 
	player = setupPlayer();
	playerMovement = new MovementController(player,3,true);
	
	
	//Remove to turn off debug mode
	//turnOnDebugMode(true, false);
	
	
}

function draw() {
	clear();
	fadeInAndOut(fadeScreen);
	if (kb.presses('.')){
		fadeScreenNow();
	}
	movementSounds(player,footsteps);
	playerMovement.handleInput();
	 
	//Create a new room
	//fadeInAndOut(fadeScreen);
	//FPS counter, needs to be in draw to
	//render properly
	//renderStats();
}